import {Prisma} from "@prisma/client";

// Select fields from MAT table
export const surfaceDataSelect = {
    NAME: true,
    TEXT: true,
    THK: true,
    SURFCAT: true,
    GRAIN: true,
    RENDER_PRZ: true
} satisfies Prisma.SURFSelect;

// Select fields from RENDER table (for the JOIN)
// Note: Add the RENDER fields you want here
export const renderDataSelect = {
    RENDER_MAT: true,
    ROTATION: true,
    SCALEFAKT: true,
} satisfies Prisma.RENDERSelect;

// Type for MAT fields only
export type SurfaceDataTypes = Prisma.MATGetPayload<{select: typeof surfaceDataSelect}>;

// Type for RENDER fields only
type RenderDataTypes = Prisma.RENDERGetPayload<{select: typeof renderDataSelect}>;

// Type for the joined result (flat structure from raw SQL)
export type SurfaceDataWithRender = SurfaceDataTypes & RenderDataTypes;
