import {Controller, Get, Param} from '@nestjs/common';
import {DescriptorDataService} from './descriptor-data.service';

@Controller('descriptor-data')
export class DescriptorDataController {
  constructor(private readonly descriptorDataService: DescriptorDataService) {}

  @Get()
  findAll() {
    return this.descriptorDataService.findAll();
  }

  @Get(':NAME')
  findOne(@Param('NAME') NAME: string) {
    return this.descriptorDataService.findOne(NAME);
  }
}
