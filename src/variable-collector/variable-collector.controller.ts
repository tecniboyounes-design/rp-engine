import {Controller} from '@nestjs/common';
import {VariableCollectorService} from './variable-collector.service';

@Controller('variable-collector')
export class VariableCollectorController {
  constructor(
    private readonly variableCollectorService: VariableCollectorService,
  ) {}
}
