import {Prisma} from "@prisma/client";

export const matSelect = {
    NAME: true,
    TEXT:true,
    THK:true,
    MATCAT:true,
    GRAIN:true,
    RENDER_PRZ:true
} satisfies Prisma.MATSelect;

export type MatTypes = Prisma.anglclieGetPayload<{select: typeof matSelect}>;