import {Module} from '@nestjs/common';
import {CabinService} from './cabin.service';
import {CabinController} from './cabin.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    exports: [CabinService],
    controllers: [CabinController],
    providers: [CabinService],
    imports: [DatabaseModule]
})
export class CabinModule {
}
