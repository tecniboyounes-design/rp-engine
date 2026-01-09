import {Prisma} from "@prisma/client";

export const surfSelect = {
    NAME: true,
    TEXT:true,
    THK:true,
    SURFCAT:true,
    GRAIN:true,
    RENDER_PRZ:true
} satisfies Prisma.SURFSelect;

export type SurfTypes = Prisma.anglclieGetPayload<{select: typeof surfSelect}>;