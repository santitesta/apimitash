import { Module } from '@nestjs/common';
import { DeviceEntity } from '@app/device/device.entity';
import { DeviceController } from '@app/device/device.controller';
import { DeviceService } from '@app/device/device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '@app/employee/guards/auth.guard';
import { ClientEntity } from '@app/client/client.entity';
import { EmployeeEntity} from '@app/employee/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, DeviceEntity, EmployeeEntity])],
  controllers: [DeviceController],
  providers: [DeviceService, AuthGuard],
  exports: [DeviceService],
})
export class DeviceModule {}
