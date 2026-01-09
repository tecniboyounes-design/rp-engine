import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {anglgrtxSelect} from "./dto/anglgrtx.types";

@Injectable()
export class AnglgrtxService {
    constructor(private readonly databaseService:DatabaseService) {}

  findAll() {
        return this.databaseService.anglgrtx.findMany();
  }

  findOne(NAME:string, INORDER:string, TREEID:string, NUM:number) {
        return this.databaseService.anglgrtx.findUnique({ where: { NAME_INORDER_TREEID_NUM: { NAME, INORDER, TREEID, NUM } } });
  }

  findByName(NAME:string) {
        return this.databaseService.anglgrtx.findMany({ where: { NAME }, select: anglgrtxSelect });
  }

    findByNames(names: string[]) {
        return this.databaseService.anglgrtx.findMany({ where: { NAME: { in: names } }, select: anglgrtxSelect });
    }
}
