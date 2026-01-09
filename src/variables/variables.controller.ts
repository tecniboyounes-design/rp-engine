import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import { VariablesService } from './variables.service';

@Controller('variables')
export class VariablesController {
    constructor(private readonly variablesService: VariablesService) {
    }

    @Get('nested/:name')
    async getNestedVariable(@Param('name') name: string) {
        return this.variablesService.getNestedVariable(name);
    }

// Bulk resolution for multiple variables
    @Post('nested/bulk')
    async getNestedVariablesBulk(@Body() dto: {
        variables: Array<{ name: string}>;
    }) {
        return Promise.all(dto.variables.map(v => this.variablesService.getNestedVariable(v.name,))
        );
    }
}