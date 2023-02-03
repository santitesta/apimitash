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
import { UserEntity } from '@app/user/user.entity';
ConfigModule.forRoot();

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    userId: number,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<DeviceEntity> {
    const device = await this.findById(deviceId);

    if (!device) {
      throw new HttpException(
        'Device does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Object.assign(device, updateDeviceDto);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      device.inCharge = user;
    }
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
