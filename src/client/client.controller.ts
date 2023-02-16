import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientService } from '@app/client/client.service';
import { ClientResponseInterface } from './types/clientResponse.interface';
import { CreateClientDto } from '@app/client/dto/createClient.dto';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@app/employee/guards/auth.guard';
import { UpdateClientDto } from './dto/updateClient.dto';
import { ClientEntity } from './client.entity';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Create client
  @Post('client')
  @UsePipes(new ValidationPipe())
  async createClient(
    @Body('client') createClientDto: CreateClientDto,
  ): Promise<ClientResponseInterface> {
    const client = await this.clientService.createClient(createClientDto);
    return this.clientService.buildClientResponse(client);
  }

  // Get client by id
  @Get('client/:id')
  async currentClient(
    @Param('id') clientId: number,
  ): Promise<ClientResponseInterface> {
    const client = await this.clientService.findById(clientId);
    return this.clientService.buildClientResponse(client);
  }

  // Get all clients
  @Get('/clients')
  async getAllClients(): Promise<ClientEntity[]> {
    return await this.clientService.getAllClients();
  }

  //Update client
  @Put('client/:id')
  @UseGuards(AuthGuard)
  async updateCurrentClient(
    @Param('id') clientId: number,
    @Body('client') updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseInterface> {
    const client = await this.clientService.updateClient(
      clientId,
      updateClientDto,
    );
    return this.clientService.buildClientResponse(client);
  }

  //Delete client
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteArticle(@Param('id') clientId: number): Promise<DeleteResult> {
    return await this.clientService.deleteClient(clientId);
  }
}
