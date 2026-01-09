import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {cabinSelect} from "./dto/cabin.types";

@Injectable()
export class CabinService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    findAll() {
        return `This action returns all cside`;
    }

    findOne(NAME: string, INORDER: string) {
        return this.databaseService.cABIN.findUnique({where: {NAME_INORDER: {NAME, INORDER}}, select: cabinSelect});
    }

    findByName(NAME: string) {
        return this.databaseService.cABIN.findMany({where: {NAME}, select: cabinSelect});
    }

    findByNames(names: string[]) {
        return this.databaseService.cABIN.findMany({where: {NAME: {in: names}}, select: cabinSelect});
    }
}
