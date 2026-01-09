import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {kmsSelect} from "./dto/kms.types";

@Injectable()
export class KmsService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    findAll() {
        return `This action returns all kms`;
    }

    findOne(NAME: string, INORDER: string) {
        return this.databaseService.kMS.findUnique({where: {NAME_INORDER: {NAME, INORDER}}, select: kmsSelect});
    }

    findByName(NAME: string) {
        return this.databaseService.kMS.findMany({
            where: {NAME},
            select: kmsSelect
        });
    }

    findByNames(names: string[]) {
        return this.databaseService.kMS.findMany({
            where: {NAME: {in: names}},
            select: kmsSelect
        })
    }
}
