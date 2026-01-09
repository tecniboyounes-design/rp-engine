import { Module } from '@nestjs/common';
import { VariablesService } from './variables.service';
import { VariablesController } from './variables.controller';
import { ImosModule } from '../imos/imos.module';

@Module({
  imports: [ImosModule],
  controllers: [VariablesController],
  providers: [VariablesService],
})
export class VariablesModule {}
