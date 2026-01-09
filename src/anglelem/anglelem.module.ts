import { Module } from '@nestjs/common';
import { AnglelemService } from './anglelem.service';
import { AnglelemController } from './anglelem.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnglelemController],
  providers: [AnglelemService],
  exports: [AnglelemService],
})
export class AnglelemModule {}
