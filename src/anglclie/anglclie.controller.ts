import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AnglclieService } from './anglclie.service';

@Controller('anglclie')
export class AnglclieController {
  constructor(private readonly anglclieService: AnglclieService) {}

  @Get()
  findAll() {
    return []; // this.anglclieService.findAll();
  }

  @Get(':NAME/:INORDER/:DATATYPE/:TREEID/:TAGNAME')
  findOne(@Param('NAME') NAME: string, @Param('INORDER') INORDER: string, @Param('DATATYPE') DATATYPE: number, @Param('TREEID') TREEID: string, @Param('TAGNAME') TAGNAME: string) {
    return this.anglclieService.findOne(NAME, INORDER, DATATYPE, TREEID, TAGNAME);
  }

  @Get(':NAME')
  findByName(@Param('NAME') NAME: string) {
    return this.anglclieService.findByName(NAME);
  }

  // bulk
    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.anglclieService.findByName(v))
        );
    }
}
