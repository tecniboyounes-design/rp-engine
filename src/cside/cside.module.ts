import {Module} from '@nestjs/common';
import {CsideService} from './cside.service';
import {CsideController} from './cside.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [CsideController],
    providers: [CsideService],
    exports: [CsideService]
})
export class CsideModule {
}
