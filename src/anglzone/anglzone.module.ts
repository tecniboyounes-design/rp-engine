import { Module } from '@nestjs/common';
import { AnglzoneService } from './anglzone.service';
import { AnglzoneController } from './anglzone.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnglzoneController],
  providers: [AnglzoneService],
  exports: [AnglzoneService],
})
export class AnglzoneModule {}
