import {Module} from '@nestjs/common';
import {MatService} from './mat.service';
import {MatController} from './mat.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [MatController],
    providers: [MatService],
    exports: [MatService],
})
export class MatModule {
}
