import { Module } from '@nestjs/common';
import { DeviceEntity } from '@app/device/device.entity';
import { DeviceController } from '@app/device/device.controller';
import { DeviceService } from '@app/device/device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ClientEntity } from '@app/client/client.entity';
import { UserEntity } from '@app/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, DeviceEntity, UserEntity])],
  controllers: [DeviceController],
  providers: [DeviceService, AuthGuard],
  exports: [DeviceService],
})
export class DeviceModule {}
