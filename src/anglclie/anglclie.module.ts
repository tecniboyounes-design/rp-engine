import { Module } from '@nestjs/common';
import { AnglclieService } from './anglclie.service';
import { AnglclieController } from './anglclie.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnglclieController],
  providers: [AnglclieService],
  exports: [AnglclieService],
})
export class AnglclieModule {}
