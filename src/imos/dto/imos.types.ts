import {Prisma} from "@prisma/client";

export const imosSelect = {
    NAME: true,
    TYP: true,
    WERT: true,
}satisfies Prisma.IMOSSelect

export type ImosTypes = Prisma.IMOSGetPayload<{select:typeof imosSelect}>