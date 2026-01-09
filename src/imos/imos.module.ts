import {Module} from '@nestjs/common';
import {ImosService} from './imos.service';
import {ImosController} from './imos.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    controllers: [ImosController],
    providers: [ImosService],
    exports: [ImosService],
    imports: [DatabaseModule],
})
export class ImosModule {}
