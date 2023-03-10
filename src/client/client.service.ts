import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ClientEntity } from '@app/client/client.entity';
import { ClientResponseInterface } from './types/clientResponse.interface';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // Create client
  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const clientByEmail = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });
    if (clientByEmail) {
      throw new HttpException(
        'Email is taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newClient = new ClientEntity();
    Object.assign(newClient, createClientDto);
    return await this.clientRepository.save(newClient);
  }

  // Get client by Id
  async findById(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOne({ where: { id } });
  }

  // Get all clients
  async getAllClients(): Promise<ClientEntity[]> {
    return await this.clientRepository.find();
  }

  // Update client
  async updateClient(
    clientId: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientEntity> {
    const client = await this.findById(clientId);

    if (!client) {
      throw new HttpException(
        'Client does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Object.assign(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  // Delete client
  async deleteClient(id: number): Promise<DeleteResult> {
    const client = await this.findById(id);

    if (!client) {
      throw new HttpException('Client does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.clientRepository.delete({ id });
  }

  buildClientResponse(client: ClientEntity): ClientResponseInterface {
    return {
      client: {
        ...client,
      },
    };
  }
}
