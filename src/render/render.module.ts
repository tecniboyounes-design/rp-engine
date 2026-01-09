import {Module} from '@nestjs/common';
import {RenderService} from './render.service';
import {RenderController} from './render.controller';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [RenderController],
    providers: [RenderService],
    exports: [RenderService]
})
export class RenderModule {
}
