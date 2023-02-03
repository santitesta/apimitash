import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeviceService } from '@app/device/device.service';
import { CreateDeviceDto } from './dto/createDevice.dto';
import { DeviceResponseInterface } from './types/deviceResponse.interface';
import { UpdateDeviceDto } from './dto/updateDevice.dto';

@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  // Create device
  @Post('device/:id')
  @UsePipes(new ValidationPipe())
  async createDevice(
    @Param('id') clientId: number,
    @Body('device') createDeviceDto: CreateDeviceDto,
  ): Promise<DeviceResponseInterface> {
    const device = await this.deviceService.createDevice(
      clientId,
      createDeviceDto,
    );
    return this.deviceService.buildDeviceResponse(device);
  }

  // Get device by id
  @Get('device/:id')
  async currentUser(
    @Param('id') deviceId: number,
  ): Promise<DeviceResponseInterface> {
    const device = await this.deviceService.findById(deviceId);
    return this.deviceService.buildDeviceResponse(device);
  }

  //Update device
  @Put('device/:id')
  async updateCurrentUser(
    @Param('id') deviceId: number,
    @Body('user') updateDeviceDto: UpdateDeviceDto,
  ): Promise<DeviceResponseInterface> {
    const device = await this.deviceService.updateDevice(
      deviceId,
      updateDeviceDto,
    );
    return this.deviceService.buildDeviceResponse(device);
  }
}
