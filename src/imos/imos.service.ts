import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {imosSelect, ImosTypes} from "./dto/imos.types";

@Injectable()
export class ImosService {
    constructor(private readonly databaseService: DatabaseService) {}

    findAll() {
        return this.databaseService.iMOS.findMany();
    }

    findOne(TYP: number, NAME: string, OPTNR: number, ORDERID: string) {
        return this.databaseService.iMOS.findUnique({
            where: {ORDERID_NAME_TYP_OPTNR: {TYP, NAME, OPTNR, ORDERID}}, select: imosSelect,});
    }

    findByName(NAME: string) {
        return this.databaseService.iMOS.findFirst({
            where: {NAME, OPTNR: 0, ORDERID: ''},
            select: imosSelect,});
    }

    findByNames(names: string[]) {
        return this.databaseService.iMOS.findMany({
            where: {NAME: {in: names}},
            select: imosSelect,});
    }

    // find by names recursive
    async findByNamesRecursive(names: string[]) {
        const allVariables = new Map<string, any>();
        const visited = new Set<string>();
        let currentBatch = new Set(names);

        while (currentBatch.size > 0) {
            // Fetch all variables in current batch at once
            const variables = await this.findByNames([...currentBatch]);
            const nextBatch = new Set<string>();

            for (const variable of variables) {
                visited.add(variable.NAME);
                allVariables.set(variable.NAME, variable);

                // Collect referenced variables for next batch
                if (variable.WERT?.startsWith('$')) {
                    const referencedName = variable.WERT.substring(1);
                    if (!visited.has(referencedName)) {
                        nextBatch.add(referencedName);
                    }
                }
            }

            currentBatch = nextBatch;
        }
        return Array.from(allVariables.values()) as ImosTypes[];
    }

}
