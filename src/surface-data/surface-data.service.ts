import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {SurfaceDataWithRender} from "./dto/surface-data.types";

@Injectable()
export class SurfaceDataService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findByNames(names: string[]): Promise<SurfaceDataWithRender[]> {
        return this.databaseService.$queryRaw<SurfaceDataWithRender[]>`
            SELECT s."NAME",
                   s."TEXT",
                   s."THK",
                   s."SURFCAT",
                   s."GRAIN",
                   CASE
                       WHEN s."RENDER_PRZ" LIKE '$%' THEN s."RENDER_PRZ"  -- Example: if it starts with $
                       ELSE r."RENDER_MAT"
                    END as "RENDER"
            FROM "SURF" s
            LEFT JOIN "RENDER" r ON s."RENDER_PRZ" = r."NAME"
            WHERE s."NAME" = ANY(${names})
        `;
    }

    async findByName(names: string): Promise<SurfaceDataWithRender | null> {
        const results = await  this.databaseService.$queryRaw<SurfaceDataWithRender[]>`
            SELECT s."NAME",
                   s."TEXT",
                   s."THK",
                   s."SURFCAT",
                   s."GRAIN",
                   CASE
                       WHEN s."RENDER_PRZ" LIKE '$%' THEN s."RENDER_PRZ"  -- Example: if it starts with $
                       ELSE r."RENDER_MAT"
                    END as "RENDER"
            FROM "SURF" s
            LEFT JOIN "RENDER" r ON s."RENDER_PRZ" = r."NAME"
            WHERE s."NAME" = ${names}
            LIMIT 1
        `;
        return results[0] || null
    }
}
