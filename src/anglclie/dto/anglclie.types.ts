import {Prisma} from "@prisma/client";

export const anglclieSelect = {
    NAME: true,
    INORDER: true,
    DATATYPE: true,
    TREEID: true,
    TAGNAME: true,
    TAGVALUE:true
} satisfies Prisma.anglclieSelect;

export type AnglclieTypes = Prisma.anglclieGetPayload<{select: typeof anglclieSelect}>;