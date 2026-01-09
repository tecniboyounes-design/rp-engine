import {Controller} from '@nestjs/common';
import {DescriptorCollectorService} from './descriptor-collector.service';

@Controller('descriptor-collector')
export class DescriptorCollectorController {
  constructor(private readonly descriptorCollectorService: DescriptorCollectorService) {}

  // @Get(':NAME')
  // findByName(@Param('NAME') NAME: string) {
  //   return this.descriptorCollectorService.collectDescriptorsNamesFromArticles(NAME);
  // }
  //
  // //bulk
  //   @Post('bulk')
  //   async getBulk(@Body() dto: { values: string[] }) {
  //       return this.descriptorCollectorService.anglZoneCollector(dto.values);
  //   }
}
