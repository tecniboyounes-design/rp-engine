import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DescriptorEvaluatorService } from './descriptor-evaluator.service';
import { CreateDescriptorEvaluatorDto } from './dto/create-descriptor-evaluator.dto';
import { UpdateDescriptorEvaluatorDto } from './dto/update-descriptor-evaluator.dto';

@Controller('descriptor-evaluator')
export class DescriptorEvaluatorController {
  constructor(private readonly descriptorEvaluatorService: DescriptorEvaluatorService) {}

  @Post()
  create(@Body() createDescriptorEvaluatorDto: CreateDescriptorEvaluatorDto) {
    return this.descriptorEvaluatorService.create(createDescriptorEvaluatorDto);
  }

  @Get()
  findAll() {
    return this.descriptorEvaluatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descriptorEvaluatorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDescriptorEvaluatorDto: UpdateDescriptorEvaluatorDto) {
    return this.descriptorEvaluatorService.update(+id, updateDescriptorEvaluatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descriptorEvaluatorService.remove(+id);
  }
}
