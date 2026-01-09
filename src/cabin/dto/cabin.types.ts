import {Prisma} from "@prisma/client";

export const cabinSelect = {
    NAME:true,
    KMS:true,
} satisfies Prisma.CABINSelect

export type CabinTypes = Prisma.CSIDEGetPayload<{select : typeof cabinSelect}>