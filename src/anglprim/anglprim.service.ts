import {Injectable} from '@nestjs/common';
import {DatabaseService} from '../database/database.service';
import {anglprimSelect} from "./dto/anglprim.types";

@Injectable()
export class AnglprimService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.anglprim.findMany();
  }

  findByName(NAME: string) {
    return this.databaseService.anglprim.findMany({ where: { NAME }, select: anglprimSelect });
  }

  findByNames(names: string[]) {
    return this.databaseService.anglprim.findMany({ where: { NAME: { in: names } }, select: anglprimSelect });
  }
}
