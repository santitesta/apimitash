import { ConfigModule } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

import { ClientEntity } from '@app/client/client.entity';
import { DeviceEntity } from '@app/device/device.entity';
import { DeviceResponseInterface } from './types/deviceResponse.interface';
import { CreateDeviceDto } from './dto/createDevice.dto';
import { UpdateDeviceDto } from './dto/updateDevice.dto';
ConfigModule.forRoot();

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  // Create device
  async createDevice(
    clientId: number,
    createDeviceDto: CreateDeviceDto,
  ): Promise<DeviceEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new HttpException(
        'Client does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newDevice = new DeviceEntity();
    Object.assign(newDevice, createDeviceDto);
    newDevice.owner = client;
    return await this.deviceRepository.save(newDevice);
  }

  // Get device by Id
  async findById(id: number): Promise<DeviceEntity> {
    return this.deviceRepository.findOne({ where: { id } });
  }

  // Update device
  async updateDevice(
    deviceId: number,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<DeviceEntity> {
    const device = await this.findById(deviceId);
    Object.assign(device, updateDeviceDto);
    return await this.deviceRepository.save(device);
  }

  buildDeviceResponse(device: DeviceEntity): DeviceResponseInterface {
    return {
      device: {
        ...device,
      },
    };
  }
}
