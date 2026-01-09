import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AnglzoneService } from './anglzone.service';

@Controller('anglzone')
export class AnglzoneController {
  constructor(private readonly anglzoneService: AnglzoneService) {}

  @Get()
  findAll() {
    return []; // this.anglzoneService.findAll();
  }

  @Get(':NAME')
  findByName(@Param('NAME') NAME: string) {
    return this.anglzoneService.findByName(NAME);
  }

  @Post('bulk')
  async getBulk(@Body() dto: { values: string[] }) {
      return Promise.all(
          dto.values.map(v => this.anglzoneService.findByName(v))
      );
  }
}
