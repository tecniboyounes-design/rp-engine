import {Prisma} from "@prisma/client";

export const csideSelect = {
    NAME:true,
    KMS:true,
} satisfies Prisma.CSIDESelect

export type CsideTypes = Prisma.CSIDEGetPayload<{select : typeof csideSelect}>