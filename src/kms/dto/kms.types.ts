import {Prisma} from "@prisma/client";

export const kmsSelect = {
    NAME: true,
    THK: true,
    MATERIAL: true,
    SURF0: true,
    SURF1: true,
}satisfies Prisma.KMSSelect

export type KmsTypes = Prisma.KMSGetPayload<{select: typeof kmsSelect}>