import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {MaterialDataService} from './material-data.service';

@Controller('material-data')
export class MaterialDataController {
  constructor(private readonly materialDataService: MaterialDataService) {}

    @Get(':NAME')
    async getMaterialData(@Param('NAME') NAME: string) {
      return this.materialDataService.findByName(NAME);
    }

    @Post(':bulk')
    async getBulk(@Body() dto: { values: string[] }) {
      return this.materialDataService.findByNames(dto.values);
    }
}
