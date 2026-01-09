import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AnglelemService } from './anglelem.service';

@Controller('anglelem')
export class AnglelemController {
  constructor(private readonly anglelemService: AnglelemService) {}

  @Get()
  findAll() {
    return []; // this.anglelemService.findAll();
  }

  @Get(':NAME/:TREEID/:INORDER')
  findOne(@Param('NAME') NAME: string, @Param('TREEID') TREEID: string, @Param('INORDER') INORDER: string) {
    return this.anglelemService.findOne(NAME, TREEID, INORDER);
  }

  @Get(':NAME')
  findByName(@Param('NAME') NAME: string) {
    return this.anglelemService.findByName(NAME);
  }

  // bulk
    @Post('bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return Promise.all(
            dto.values.map(v => this.anglelemService.findByName(v))
        );
    }
}
