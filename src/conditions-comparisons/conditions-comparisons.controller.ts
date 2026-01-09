import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConditionsComparisonsService } from './conditions-comparisons.service';
import { Prisma } from '@prisma/client';

@Controller('conditions-comparisons')
export class ConditionsComparisonsController {
  constructor(private readonly conditionsComparisonsService: ConditionsComparisonsService) {}

  @Post()
  create(@Body() createConditionsComparisonDto: Prisma.CONDITIONSCOMPARISONSCreateInput) {
    return this.conditionsComparisonsService.create(createConditionsComparisonDto);
  }

  @Get()
  findAll() {
    return this.conditionsComparisonsService.findAll();
  }

  @Get(':conditionId/:termNum')
  findOne(@Param('conditionId') conditionId: number, @Param('termNum') termNum: number) {
    return this.conditionsComparisonsService.findOne(conditionId, termNum);
  }

  @Get('by-condition/:conditionId')
  findByCondition(@Param('conditionId') conditionId: number) {
    return this.conditionsComparisonsService.findByCondition(conditionId);
  }

  @Patch(':conditionId/:termNum')
  update(@Param('conditionId') conditionId: number, @Param('termNum') termNum: number, @Body() updateConditionsComparisonDto: Prisma.DESCRIPTORUpdateInput) {
    return this.conditionsComparisonsService.update(conditionId, termNum, updateConditionsComparisonDto);
  }

  @Delete(':conditionId/:termNum')
  remove(@Param('conditionId') conditionId: string, @Param('termNum') termNum: string) {
    return this.conditionsComparisonsService.remove(+conditionId, +termNum);
  }
}
