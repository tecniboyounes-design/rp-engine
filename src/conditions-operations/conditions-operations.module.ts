import { Module } from '@nestjs/common';
import { ConditionsOperationsService } from './conditions-operations.service';
import { ConditionsOperationsController } from './conditions-operations.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConditionsOperationsController],
  providers: [ConditionsOperationsService],
  exports: [ConditionsOperationsService],
})
export class ConditionsOperationsModule {}
