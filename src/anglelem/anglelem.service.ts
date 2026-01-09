import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {anglelemSelect} from "./dto/anglelem.types";

@Injectable()
export class AnglelemService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.anglelem.findMany();
  }

  findOne(NAME: string, TREEID: string, INORDER: string) {
    return this.databaseService.anglelem.findUnique({ where: { NAME_INORDER_TREEID: { NAME, TREEID, INORDER } } });
  }

  findByName(NAME: string) {
    return this.databaseService.anglelem.findMany({
        where: { NAME },
        select: anglelemSelect
    });
  }

  findByNames(names: string[]) {
    return this.databaseService.anglelem.findMany({
        where: { NAME: { in: names }},
        select: anglelemSelect
    });
  }
}
