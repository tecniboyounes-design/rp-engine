import {Prisma} from "@prisma/client";

export const renderSelect = {
    NAME:true,
    RENDER_MAT:true
} satisfies Prisma.RENDERSelect;

export type MatSelect = Prisma.RENDERGetPayload<{select: typeof renderSelect}>;