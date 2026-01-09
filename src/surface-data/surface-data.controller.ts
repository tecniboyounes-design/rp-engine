import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {SurfaceDataService} from './surface-data.service';

@Controller('surface-data')
export class SurfaceDataController {
  constructor(private readonly surfaceDataService: SurfaceDataService) {}

    @Get(':NAME')
    async setSurfaceData(@Param('NAME') NAME:string){
      return this.surfaceDataService.findByName(NAME)
    }

    @Post(':bulk')
    async getBulk(@Body() dto: { values: string[] }) {
        return this.surfaceDataService.findByNames(dto.values);
    }
}
