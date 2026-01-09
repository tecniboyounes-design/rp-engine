import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { Prisma } from '@prisma/client';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Post()
  create(@Body() createConditionDto: Prisma.CONDITIONSCreateInput) {
    return this.conditionsService.create(createConditionDto);
  }

  @Get()
  findAll() {
    return this.conditionsService.findAll();
  }

  @Get(':conditionId')
  findOne(@Param('conditionId') conditionId: number) {
    return this.conditionsService.findOne(conditionId);
  }

  @Patch(':conditionId')
  update(@Param('conditionId') conditionId: number, @Body() updateConditionDto: Prisma.CONDITIONSUpdateInput) {
    return this.conditionsService.update(conditionId, updateConditionDto);
  }

  @Delete(':conditionId')
  remove(@Param('conditionId') conditionId: string) {
    return this.conditionsService.remove(+conditionId);
  }
}
