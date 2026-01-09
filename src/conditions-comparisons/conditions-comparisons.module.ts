import { Module } from '@nestjs/common';
import { ConditionsComparisonsService } from './conditions-comparisons.service';
import { ConditionsComparisonsController } from './conditions-comparisons.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConditionsComparisonsController],
  providers: [ConditionsComparisonsService],
  exports: [ConditionsComparisonsService],
})
export class ConditionsComparisonsModule {}
