import { PartialType } from '@nestjs/mapped-types';
import { CreateDescriptorEvaluatorDto } from './create-descriptor-evaluator.dto';

export class UpdateDescriptorEvaluatorDto extends PartialType(CreateDescriptorEvaluatorDto) {}
