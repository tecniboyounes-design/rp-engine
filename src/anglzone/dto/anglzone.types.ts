import {Prisma} from "@prisma/client";

export const anglzoneSelect = {
    NAME : true,
    TREEID : true,
    DIVDIR : true,
    LINDIV1 : true,
    LINDIV2 : true,
    DIVELEM1 : true,
    TOPSHELF : true,
    BOTSHELF : true,
    DIVIDER : true,
    DIVTYPE : true,
    HORDEFTYPE : true
} satisfies Prisma.anglzoneSelect;

export type AnglzoneTypes = Prisma.anglzoneGetPayload<{select: typeof anglzoneSelect}>;