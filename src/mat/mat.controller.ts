import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {MatService} from './mat.service';

@Controller('mat')
export class MatController {
    constructor(private readonly matService: MatService) {}

    @Get()
    findAll() {
        return this.matService.findAll();
    }

    @Get(':NAME/:INORDER')
    findOne(@Param('NAME') NAME: string, @Param('INORDER') INORDER: string) {
        return this.matService.findOne(NAME, INORDER);
    }

    @Get(':NAME')
    findByName(@Param('NAME') NAME: string) {
        return this.matService.findByName(NAME);
    }

    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return this.matService.findByNames(dto.values);
    }

}
