import {Prisma} from "@prisma/client";

export const anglelemSelect = {
    NAME : true,
    TREEID : true,
    PARTTYPE:true,
    INORDER : true,
    CPNAME : true,
    STARTTRIM : true,
    ENDTRIM : true,
    TOPTRIM : true,
    BOTTRIM : true,
    MANINFO : true,
    STARTOFFS : true,
    ENDOFFS : true,
    TOPOFFS : true,
    BOTOFFS : true,
    INSET:true,
    INSETFOR:true
} satisfies Prisma.anglelemSelect;

export type AnglelemTypes = Prisma.anglelemGetPayload<{select: typeof anglelemSelect}>;
