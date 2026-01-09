import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CabinService} from './cabin.service';

@Controller('cabin')
export class CabinController {
  constructor(private readonly cabinService: CabinService) {}

    @Get()
    findAll() {
        return this.cabinService.findAll();
    }

    @Get(':NAME')
    findOne(@Param('NAME') NAME: string) {
        return this.cabinService.findOne(NAME,'');
    }

    @Post(':bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.cabinService.findByName(v))
        );
    }
}
