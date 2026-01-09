import {Prisma} from "@prisma/client";

export const anglgrtxSelect = {
    NAME :true,
    TREEID :true,
    NUM :true,
    TEXT:true,
} satisfies Prisma.anglgrtxSelect;

export type AnglgrtxTypes = Prisma.anglgrtxGetPayload<{select: typeof anglgrtxSelect}>;
