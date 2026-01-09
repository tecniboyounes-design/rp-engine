import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {anglzoneSelect} from "./dto/anglzone.types";

@Injectable()
export class AnglzoneService {
  constructor(private databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.anglzone.findMany();
  }

  findOne(NAME: string, TREEID: string, INORDER: string) {
    return this.databaseService.anglzone.findUnique({ where: { NAME_INORDER_TREEID: { NAME, TREEID, INORDER } } });
  }

  findByName(NAME: string) {
    return this.databaseService.anglzone.findMany({
        where: { NAME },
        select: anglzoneSelect });
  }

  findByNames(names: string[]) {
    return this.databaseService.anglzone.findMany({
        where: { NAME: { in: names } },
        select: anglzoneSelect });
  }
}
