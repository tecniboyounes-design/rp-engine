import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConditionsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createConditionDto: Prisma.CONDITIONSCreateInput) {
    return this.databaseService.cONDITIONS.create({
      data: createConditionDto,
    });
  }

  findAll() {
    return this.databaseService.cONDITIONS.findMany();
  }

  findOne(conditionId: number) {
    return this.databaseService.cONDITIONS.findUnique({
      where: { CONDITIONID: +conditionId },
    });
  }

  update(conditionId: number, updateConditionDto: Prisma.CONDITIONSUpdateInput) {
    return this.databaseService.cONDITIONS.update({
      where: { CONDITIONID: conditionId },
      data: updateConditionDto,
    });
  }

  remove(conditionId: number) {
    return this.databaseService.cONDITIONS.delete({
      where: { CONDITIONID: conditionId },
    });
  }
}
