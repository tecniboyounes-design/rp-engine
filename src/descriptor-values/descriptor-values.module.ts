import { Module } from '@nestjs/common';
import { DescriptorValuesService } from './descriptor-values.service';
import { DescriptorValuesController } from './descriptor-values.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DescriptorValuesController],
  providers: [DescriptorValuesService],
  exports: [DescriptorValuesService] // Add this line to export the service
})
export class DescriptorValuesModule {}
