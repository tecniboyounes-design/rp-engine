import {Prisma} from "@prisma/client";

// Select fields from MAT table
export const materialDataSelect = {
    NAME: true,
    TEXT: true,
    THK: true,
    MATCAT: true,
    GRAIN: true,
    RENDER_PRZ: true
} satisfies Prisma.MATSelect;

// Select fields from RENDER table (for the JOIN)
// Note: Add the RENDER fields you want here
export const renderDataSelect = {
    RENDER_MAT: true,
    ROTATION: true,
    SCALEFAKT: true,
} satisfies Prisma.RENDERSelect;

// Type for MAT fields only
export type MaterialDataTypes = Prisma.MATGetPayload<{select: typeof materialDataSelect}>;

// Type for RENDER fields only
type RenderDataTypes = Prisma.RENDERGetPayload<{select: typeof renderDataSelect}>;

// Type for the joined result (flat structure from raw SQL)
export type MaterialDataWithRender = MaterialDataTypes & RenderDataTypes;
