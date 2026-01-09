import { Module } from '@nestjs/common';
import { KmsService } from './kms.service';
import { KmsController } from './kms.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
  controllers: [KmsController],
  providers: [KmsService],
    exports: [KmsService]
})
export class KmsModule {}
