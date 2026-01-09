import {Module} from '@nestjs/common';
import {SurfService} from './surf.service';
import {SurfController} from './surf.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [SurfController],
    providers: [SurfService],
    exports: [SurfService]
})
export class SurfModule {
}
