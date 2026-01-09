import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {matSelect} from "../mat/dto/mat.types";
import {surfSelect} from "./dto/surf.types";

@Injectable()
export class SurfService {
    constructor(private readonly databaseService: DatabaseService) {}

    findAll() {
        return `This action returns all mat`;
    }

    findOne(NAME: string, INORDER:string) {
        return this.databaseService.sURF.findUnique({
            where: {NAME_INORDER: {NAME, INORDER},},
            select: surfSelect,});
    }

    findByName(NAME: string) {
        return this.databaseService.sURF.findMany({
            where: {NAME: NAME,},
            select: surfSelect,});
    }

    findByNames(names: string[]) {
        return this.databaseService.sURF.findMany({
            where: {NAME: {in: names}},
            select: surfSelect,});
    }
}
