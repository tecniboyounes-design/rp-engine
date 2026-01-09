import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {KmsService} from './kms.service';

@Controller('kms')
export class KmsController {
    constructor(private readonly kmsService: KmsService) {
    }

    @Get()
    findAll() {
        return this.kmsService.findAll();
    }

    // find one NAME
    @Get(':NAME')
    findOne(@Param('NAME') NAME: string) {
        return this.kmsService.findOne(NAME, '');
    }

    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.kmsService.findByName(v))
        );
    }

}
