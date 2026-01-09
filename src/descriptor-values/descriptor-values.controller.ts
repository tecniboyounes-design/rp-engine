import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DescriptorValuesService } from './descriptor-values.service';
import { Prisma } from '@prisma/client';

@Controller('descriptor-values')
export class DescriptorValuesController {
  constructor(private readonly descriptorValuesService: DescriptorValuesService) {}

  @Post()
  create(@Body() createDescriptorValueDto: Prisma.DESCRIPTORVALUESCreateInput) {
    return this.descriptorValuesService.create(createDescriptorValueDto);
  }

  @Get()
  findAll() {
    return this.descriptorValuesService.findAll();
  }

  @Get(':NAME/:NODENUM')
  findOne(@Param('NAME') NAME: string, @Param('NODENUM') NODENUM: string) {
    return this.descriptorValuesService.findOne(NAME, +NODENUM);
  }

  @Patch(':NAME/:NODENUM')
  update(@Param('NAME') NAME: string, @Param('NODENUM') NODENUM: string, @Body() updateDescriptorValueDto: Prisma.DESCRIPTORVALUESUpdateInput) {
    return this.descriptorValuesService.update(NAME, +NODENUM, updateDescriptorValueDto);
  }

  @Delete(':NAME/:NODENUM')
  remove(@Param('NAME') NAME: string, @Param('NODENUM') NODENUM: string) {
    return this.descriptorValuesService.delete(NAME, +NODENUM);
  }
}
