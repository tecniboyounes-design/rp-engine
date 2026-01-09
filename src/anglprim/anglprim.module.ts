import { Module } from '@nestjs/common';
import { AnglprimService } from './anglprim.service';
import { AnglprimController } from './anglprim.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnglprimController],
  providers: [AnglprimService],
  exports: [AnglprimService],
})
export class AnglprimModule {}
