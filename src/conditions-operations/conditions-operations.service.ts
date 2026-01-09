import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ConditionsOperationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createConditionsOperationDto: Prisma.CONDITIONSOPERATIONSCreateInput) {
    return this.databaseService.cONDITIONSOPERATIONS.create({
      data: createConditionsOperationDto,
    });
  }

  findAll() {
    return this.databaseService.cONDITIONSOPERATIONS.findMany();
  }

  findOne(conditionsId: number, termNum: number) {
    return this.databaseService.cONDITIONSOPERATIONS.findUnique({
      where: { CONDITIONID_TERMNUM: { CONDITIONID: +conditionsId, TERMNUM: termNum } },
    });
  }

  findByCondition(conditionsId: number) {
    return this.databaseService.cONDITIONSOPERATIONS.findMany({
      where: { CONDITIONID: +conditionsId },
    });
  }

  update(conditionsId: number, termNum: number, updateConditionsOperationDto: Prisma.CONDITIONSOPERATIONSUpdateInput) {
    return this.databaseService.cONDITIONSOPERATIONS.update({
      where: { CONDITIONID_TERMNUM: { CONDITIONID: +conditionsId, TERMNUM: termNum } },
      data: updateConditionsOperationDto,
    });
  }

  remove(conditionsId: number, termNum: number) {
    return this.databaseService.cONDITIONSOPERATIONS.delete({
      where: { CONDITIONID_TERMNUM: { CONDITIONID: +conditionsId, TERMNUM: termNum } },
    });
  }
}
