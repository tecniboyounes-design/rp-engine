import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DescriptorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDescriptorDto: Prisma.DESCRIPTORCreateInput) {
    return this.databaseService.dESCRIPTOR.create({
      data: createDescriptorDto,
    });
  }

  async findAll() {
    return this.databaseService.dESCRIPTOR.findMany();
  }

  async findOne(NAME: string, INORDER: string='') {
    return this.databaseService.dESCRIPTOR.findUnique({
      where: { NAME_INORDER: { NAME, INORDER } },
    });
  }

  // find many
    async findMany(values: string[]) {
        return this.databaseService.dESCRIPTOR.findMany({
            where: {
                NAME: {
                    in: values
                }
            }
        });
    }

  async update(NAME: string, INORDER: string, updateDescriptorDto: Prisma.DESCRIPTORUpdateInput) {
    return this.databaseService.dESCRIPTOR.update({
      where: { NAME_INORDER: { NAME, INORDER } },
      data: updateDescriptorDto,
    });
  }

  async delete(NAME: string, INORDER: string) {
    return this.databaseService.dESCRIPTOR.delete({
      where: { NAME_INORDER: { NAME, INORDER } },
    });
  }
}
