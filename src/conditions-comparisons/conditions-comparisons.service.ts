import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ConditionsComparisonsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createConditionsComparisonDto: Prisma.CONDITIONSCOMPARISONSCreateInput) {
    return this.databaseService.cONDITIONSCOMPARISONS.create({
      data: createConditionsComparisonDto,
    });
  }

  findAll() {
    return this.databaseService.cONDITIONSCOMPARISONS.findMany();
  }

  findOne(conditionId: number, termNum: number) {
    return this.databaseService.cONDITIONSCOMPARISONS.findUnique({
      where: { CONDITIONID_TERMNUM: { CONDITIONID: conditionId, TERMNUM: termNum } },
    });
  }

  findByCondition(conditionId: number) {
    return this.databaseService.cONDITIONSCOMPARISONS.findMany({
      where: { CONDITIONID: +conditionId },
    });
  }

  update(conditionId: number, termNum: number, updateConditionsComparisonDto: Prisma.DESCRIPTORUpdateInput) {
    return this.databaseService.cONDITIONSCOMPARISONS.update({
      where: { CONDITIONID_TERMNUM: { CONDITIONID: conditionId, TERMNUM: termNum } },
      data: updateConditionsComparisonDto,
    });
  }

  remove(conditionId: number, termNum: number) {
    return this.databaseService.cONDITIONSCOMPARISONS.delete({
      where: { CONDITIONID_TERMNUM: { CONDITIONID: conditionId, TERMNUM: termNum } },
    });
  }
}
