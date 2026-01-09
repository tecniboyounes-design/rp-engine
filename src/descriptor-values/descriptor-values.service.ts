import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DescriptorValuesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDescriptorValueDto: Prisma.DESCRIPTORVALUESCreateInput) {
    return this.databaseService.dESCRIPTORVALUES.create({
      data: createDescriptorValueDto,
    });
  }

  findAll() {
    return this.databaseService.dESCRIPTORVALUES.findMany();
  }

  findOne(NAME: string, NODENUM: number) {
    return this.databaseService.dESCRIPTORVALUES.findUnique({
      where: { NAME_NODENUM: { NAME, NODENUM } },
    });
  }

    findByDescriptorName(NAME: string) {
        return this.databaseService.dESCRIPTORVALUES.findMany({
            where: { NAME: { equals: NAME } }
        });
    }

  update(NAME: string, NODENUM: number, updateDescriptorValueDto: Prisma.DESCRIPTORVALUESUpdateInput) {
    return this.databaseService.dESCRIPTORVALUES.update({
      where: { NAME_NODENUM: { NAME, NODENUM } },
      data: updateDescriptorValueDto,
    });
  }

  delete(NAME: string, NODENUM: number) {
    return this.databaseService.dESCRIPTORVALUES.delete({
      where: { NAME_NODENUM: { NAME, NODENUM } },
    });
  }
}
