import { ConfigModule } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";

import { ClientEntity } from "@app/client/client.entity";
import { DeviceEntity } from "@app/device/device.entity";
import { DeviceResponseInterface } from "./types/deviceResponse.interface";
import { CreateDeviceDto } from "./dto/createDevice.dto";
import { UpdateDeviceDto } from "./dto/updateDevice.dto";
import { EmployeeEntity } from "@app/employee/employee.entity";
ConfigModule.forRoot();

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>
  ) {}

  // Create device
  async createDevice(
    clientId: number,
    createDeviceDto: CreateDeviceDto
  ): Promise<DeviceEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new HttpException(
        "Client does not exist",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const newDevice = new DeviceEntity();
    Object.assign(newDevice, createDeviceDto);
    newDevice.owner = client;
    return await this.deviceRepository.save(newDevice);
  }

  // Get device by Id
  async findById(id: number): Promise<DeviceEntity> {
    return await this.deviceRepository.findOne({ where: { id } });
  }

  // Get all devices
  async getAllDevices(): Promise<DeviceEntity[]> {
    return await this.deviceRepository.find();
  }

  // Update device
  async updateDevice(
    deviceId: number,
    updateDeviceDto: UpdateDeviceDto
  ): Promise<DeviceEntity> {
    const device = await this.findById(deviceId);

    if (!device) {
      throw new HttpException(
        "Device does not exist",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

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
