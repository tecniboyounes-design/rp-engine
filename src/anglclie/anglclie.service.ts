import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {anglclieSelect} from "./dto/anglclie.types";


// a check for auto deploy per push 
@Injectable()
export class AnglclieService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.anglclie.findMany();
  }

  findOne(NAME: string, INORDER: string, DATATYPE: number, TREEID: string, TAGNAME: string) {
    return this.databaseService.anglclie.findUnique({ where: { NAME_INORDER_DATATYPE_TREEID_TAGNAME: { NAME, INORDER, DATATYPE, TREEID, TAGNAME } } });
  }

  findByName(NAME: string) {
    return this.databaseService.anglclie.findMany({
        where: { NAME },
        select: anglclieSelect
    });
  }

  findByNames(names: string[]) {
    return this.databaseService.anglclie.findMany({
        where: { NAME: { in: names } },
        select: anglclieSelect
    });
  }
}
