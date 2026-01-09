import {Prisma} from "@prisma/client";

export const anglprimSelect = {
    NAME :true,
    CONTOUR :true,
    SIZEX :true,
    SIZEY :true,
    SIZEZ :true,
    DIMCALCFX :true,
    DIMCALCFY:true,
    DIMCALCFZ:true
} satisfies Prisma.anglprimSelect;

export type AnglprimTypes = Prisma.anglprimGetPayload<{select: typeof anglprimSelect}>;