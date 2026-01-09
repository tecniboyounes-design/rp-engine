import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConditionsOperationsService } from './conditions-operations.service';
import { Prisma } from '@prisma/client';

@Controller('conditions-operations')
export class ConditionsOperationsController {
  constructor(private readonly conditionsOperationsService: ConditionsOperationsService) {}

  @Post()
  create(@Body() createConditionsOperationDto: Prisma.CONDITIONSOPERATIONSCreateInput) {
    return this.conditionsOperationsService.create(createConditionsOperationDto);
  }

  @Get()
  findAll() {
    return this.conditionsOperationsService.findAll();
  }

  @Get(':conditionId/:termNum')
  findOne(@Param('conditionId') conditionId: number, @Param('termNum') termNum: number) {
    return this.conditionsOperationsService.findOne(conditionId, termNum);
  }

  @Get('by-condition/:conditionId')
  findByCondition(@Param('conditionId') conditionId: number) {
    return this.conditionsOperationsService.findByCondition(conditionId);
  }

  @Patch(':conditionId/:termNum')
  update(@Param('conditionId') conditionId: number, @Param('termNum') termNum: number, @Body() updateConditionsOperationDto: Prisma.CONDITIONSOPERATIONSUpdateInput) {
    return this.conditionsOperationsService.update(conditionId, termNum, updateConditionsOperationDto);
  }

  @Delete(':conditionId/:termNum')
  remove(@Param('conditionId') conditionId: string, @Param('termNum') termNum: string) {
    return this.conditionsOperationsService.remove(+conditionId, +termNum);
  }
}
