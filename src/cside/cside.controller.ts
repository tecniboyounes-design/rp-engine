import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CsideService} from './cside.service';

@Controller('cside')
export class CsideController {
  constructor(private readonly csideService: CsideService) {}

  @Get()
  findAll() {
    return this.csideService.findAll();
  }

  @Get(':NAME')
  findOne(@Param('NAME') NAME: string) {
    return this.csideService.findOne(NAME,'');
  }

  @Post(':bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.csideService.findByName(v))
        );
    }
}
