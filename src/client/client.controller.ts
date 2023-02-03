import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ClientService } from "@app/client/client.service";
import { ClientResponseInterface } from "./types/clientResponse.interface";
import { CreateClientDto } from "@app/client/dto/createClient.dto";
import { DeleteResult } from "typeorm";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UpdateClientDto } from "./dto/updateClient.dto";

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  // Create client
  @Post('client')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('client') createClientDto: CreateClientDto): Promise<ClientResponseInterface> {
    const client = await this.clientService.createClient(createClientDto);
    return this.clientService.buildClientResponse(client);
  }

  // Get client by id
  @Get('client/:id')
  async currentUser(
    @Param('id') clientId: number
  ): Promise<ClientResponseInterface> {
    const client = await this.clientService.findById(clientId);
    return this.clientService.buildClientResponse(client);
  }

  //Update client
  @Put('client/:id')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @Param('id') clientId: number,
    @Body('client') updateClientDto: UpdateClientDto
  ): Promise<ClientResponseInterface> {
    const client = await this.clientService.updateClient(clientId, updateClientDto);
    return this.clientService.buildClientResponse(client);
  }

  //Delete client
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @Param('id') clientId: number,
  ): Promise<DeleteResult> {
    return await this.clientService.deleteClient(clientId);
  }
}