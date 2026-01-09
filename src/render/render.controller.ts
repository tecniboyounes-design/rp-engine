import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RenderService} from './render.service';

@Controller('render')
export class RenderController {
    constructor(private readonly renderService: RenderService) {
    }

    @Get()
    findAll() {
        return this.renderService.findAll();
    }

    @Get(':NAME/:INORDER')
    findOne(@Param('NAME') NAME: string, @Param('INORDER') INORDER: string) {
        return this.renderService.findOne(NAME, INORDER);
    }

    @Get(':NAME')
    findByName(@Param('NAME') NAME: string) {
        return this.renderService.findByName(NAME);
    }

    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.renderService.findByName(v))
        );
    }
}
