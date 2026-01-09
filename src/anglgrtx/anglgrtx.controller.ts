import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AnglgrtxService} from './anglgrtx.service';

@Controller('anglgrtx')
export class AnglgrtxController {
  constructor(private readonly anglgrtxService: AnglgrtxService) {}

  @Get()
  findAll() {
    return this.anglgrtxService.findAll();
  }

  @Get(':NAME/:INORDER/:TREEID/:NUM')
  findOne(@Param('NAME') NAME: string, @Param('INORDER') INORDER: string, @Param('TREEID') TREEID: string, @Param('NUM') NUM: number) {
    return this.anglgrtxService.findOne(NAME, INORDER, TREEID, NUM);
  }

  @Get(':NAME')
  findByName(@Param('NAME') NAME: string) {
    return this.anglgrtxService.findByName(NAME);
  }

  //bulk
    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.anglgrtxService.findByName(v))
        );
    }
}
