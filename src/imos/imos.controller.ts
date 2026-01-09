import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ImosService} from './imos.service';

@Controller('imos')
export class ImosController {
    constructor(private readonly imosService: ImosService) {
    }

    @Get()
    findAll() {
        return this.imosService.findAll();
    }


    @Get(':NAME')
    findOne(@Param('NAME') NAME: string) {
        return this.imosService.findOne(0, NAME, 0, "");
    }

    // Bulk resolution for multiple values
    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.imosService.findByName(v))
        );
    }

    @Post('recursive/bulk')
    async getBulkRecursive(@Body() dto: { values: string[] }) {
        return this.imosService.findByNamesRecursive(dto.values);
    }

}
