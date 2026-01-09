import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AnglprimService } from './anglprim.service';

@Controller('anglprim')
export class AnglprimController {
  constructor(private readonly anglprimService: AnglprimService) {}

  @Get()
  findAll() {
    return []; // this.anglprimService.findAll();
  }

  @Get(':NAME')
  findByName(@Param('NAME') NAME: string) {
    return this.anglprimService.findByName(NAME);
  }

  @Post('bulk')
  async getBulk(@Body() dto: { values: string[] }) {
      return Promise.all(
          dto.values.map(v => this.anglprimService.findByName(v))
      );
  }
}
