import { Module } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { ConditionsController } from './conditions.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConditionsController],
  providers: [ConditionsService],
  exports: [ConditionsService],
})
export class ConditionsModule {}
