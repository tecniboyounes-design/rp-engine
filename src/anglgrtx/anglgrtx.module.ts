import { Module } from '@nestjs/common';
import { AnglgrtxService } from './anglgrtx.service';
import { AnglgrtxController } from './anglgrtx.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnglgrtxController],
  providers: [AnglgrtxService],
  exports: [AnglgrtxService],
})
export class AnglgrtxModule {}
