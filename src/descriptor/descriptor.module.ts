import { Module } from '@nestjs/common';
import { DescriptorService } from './descriptor.service';
import { DescriptorController } from './descriptor.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DescriptorController],
  providers: [DescriptorService],
  exports: [DescriptorService]
})
export class DescriptorModule {}
