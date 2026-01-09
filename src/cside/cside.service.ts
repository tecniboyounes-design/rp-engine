import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {csideSelect} from "./dto/cside.types";

@Injectable()
export class CsideService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    findAll() {
        return `This action returns all cside`;
    }

    findOne(NAME: string, INORDER: string) {
        return this.databaseService.cSIDE.findUnique({where: {NAME_INORDER: {NAME, INORDER}}, select: csideSelect});
    }

    findByName(NAME: string) {
        return this.databaseService.cSIDE.findMany({where: {NAME}, select: csideSelect});
    }

    findByNames(names: string[]) {
        return this.databaseService.cSIDE.findMany({where: {NAME: {in: names}}, select: csideSelect});
    }
}
