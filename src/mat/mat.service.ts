import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {matSelect} from "./dto/mat.types";

@Injectable()
export class MatService {
    constructor(private readonly databaseService: DatabaseService) {}

    findAll() {
        return `This action returns all mat`;
    }

    findOne(NAME: string, INORDER:string) {
        return this.databaseService.mAT.findUnique({
            where: {NAME_INORDER: {NAME, INORDER},},
            select: matSelect,});
    }

    findByName(NAME: string) {
        return this.databaseService.mAT.findMany({
            where: {NAME: NAME,},
            select: matSelect,});
    }

    findByNames(names: string[]) {
        return this.databaseService.mAT.findMany({
            where: {NAME: {in: names}},
            select: matSelect,});
    }
}
