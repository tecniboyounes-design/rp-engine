import { Injectable } from '@nestjs/common';
import { CreateDescriptorEvaluatorDto } from './dto/create-descriptor-evaluator.dto';
import { UpdateDescriptorEvaluatorDto } from './dto/update-descriptor-evaluator.dto';

@Injectable()
export class DescriptorEvaluatorService {
  create(createDescriptorEvaluatorDto: CreateDescriptorEvaluatorDto) {
    return 'This action adds a new descriptorEvaluator';
  }

  findAll() {
    return `This action returns all descriptorEvaluator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} descriptorEvaluator`;
  }

  update(id: number, updateDescriptorEvaluatorDto: UpdateDescriptorEvaluatorDto) {
    return `This action updates a #${id} descriptorEvaluator`;
  }

  remove(id: number) {
    return `This action removes a #${id} descriptorEvaluator`;
  }
}
