import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {renderSelect} from "./dto/render.types";

@Injectable()
export class RenderService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    findAll() {
        return `This action returns all render`;
    }

    findOne(NAME: string, INORDER: string) {
        return this.databaseService.rENDER.findUnique(
            {where: {NAME_INORDER: {NAME, INORDER}}}
        );
    }

    findByName(NAME: string) {
        return this.databaseService.rENDER.findMany({where: {NAME}, select: renderSelect});
    }

    findByNames(names: string[]) {
        return this.databaseService.rENDER.findMany({where: {NAME: {in: names}}, select: renderSelect});
    }
}
