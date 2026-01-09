import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {SurfService} from './surf.service';

@Controller('surf')
export class SurfController {
  constructor(private readonly surfService: SurfService) {}

    @Get()
    findAll() {
        return this.surfService.findAll();
    }

    @Get(':NAME/:INORDER')
    findOne(@Param('NAME') NAME: string, @Param('INORDER') INORDER: string) {
        return this.surfService.findOne(NAME, INORDER);
    }

    @Get(':NAME')
    findByName(@Param('NAME') NAME: string) {
        return this.surfService.findByName(NAME);
    }

    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return this.surfService.findByNames(dto.values)
    }
}
