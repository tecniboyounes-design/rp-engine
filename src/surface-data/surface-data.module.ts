import {Module} from '@nestjs/common';
import {SurfaceDataService} from './surface-data.service';
import {SurfaceDataController} from './surface-data.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports:[DatabaseModule],
    controllers: [SurfaceDataController],
    providers: [SurfaceDataService],
    exports:[SurfaceDataService]
})
export class SurfaceDataModule {
}
