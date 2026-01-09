import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DescriptorService } from './descriptor.service';
import { Prisma } from '@prisma/client';

@Controller('descriptor')
export class DescriptorController {
  constructor(private readonly descriptorService: DescriptorService) {}

  @Post()
  create(@Body() createDescriptorDto: Prisma.DESCRIPTORCreateInput) {
    return this.descriptorService.create(createDescriptorDto);
  }

  @Get()
  findAll() {
    return this.descriptorService.findAll();
  }

  @Get(':NAME')
  @Get(':NAME/:INORDER')
  findOne(@Param('NAME') NAME: string, @Param('INORDER') INORDER: string = '') {
    return this.descriptorService.findOne(NAME, INORDER);
  }

  @Delete(':NAME/:INORDER')
  remove(@Param('NAME') NAME: string, @Param('INORDER') INORDER: string) {
    return this.descriptorService.delete(NAME, INORDER);
  }

  // bulk
    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.descriptorService.findOne(v))
        );
    }
}
