import {Module} from '@nestjs/common';
import {MaterialDataService} from './material-data.service';
import {MaterialDataController} from './material-data.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [MaterialDataController],
    providers: [MaterialDataService],
    exports: [MaterialDataService],
})
export class MaterialDataModule {
}
