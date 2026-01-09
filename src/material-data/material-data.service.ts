import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {MaterialDataWithRender} from "./dto/material-data.types";

@Injectable()
export class MaterialDataService {
    constructor(private databaseService: DatabaseService) {}

    // Raw SQL with JOIN - returns typed result
    async findByNames(names: string[]): Promise<MaterialDataWithRender[]> {
        return this.databaseService.$queryRaw<MaterialDataWithRender[]>`
            SELECT m."NAME",
                   m."TEXT",
                   m."THK",
                   m."MATCAT",
                   m."GRAIN",
                   CASE
                       WHEN m."RENDER_PRZ" LIKE '$%' THEN m."RENDER_PRZ"  -- Example: if it starts with $
                       ELSE r."RENDER_MAT"
                    END as "RENDER"
            FROM "MAT" m
            LEFT JOIN "RENDER" r ON m."RENDER_PRZ" = r."NAME"
            WHERE m."NAME" = ANY(${names})
        `;
    }

    async findByName(name: string): Promise<MaterialDataWithRender | null> {
        const results = await this.databaseService.$queryRaw<MaterialDataWithRender[]>`
        SELECT m."NAME",
               m."TEXT",
               m."THK",
               m."MATCAT",
               m."GRAIN",
               CASE
                   WHEN m."RENDER_PRZ" LIKE '$%' THEN m."RENDER_PRZ"  -- Example: if it starts with $
                   ELSE r."RENDER_MAT"
                END as "RENDER"
        FROM "MAT" m
        LEFT JOIN "RENDER" r ON m."RENDER_PRZ" = r."NAME"
        WHERE m."NAME" = ${name}
        LIMIT 1
    `;

        return results[0] || null;
    }
}

//         return this.databaseService.cSIDE.findMany({where: {NAME: {in: names}}, select: csideSelect});