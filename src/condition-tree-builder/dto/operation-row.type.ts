import { Prisma } from '@prisma/client';

export const operationSelect = Prisma.validator<Prisma.CONDITIONSOPERATIONSSelect>()({
  CONDITIONID: true,
  PARENTTERMNUM: true,
  TERMNUM: true,
  OPERATIONTYPE: true, // numeric 0..3 in DB
});

export type OperationRow = Prisma.CONDITIONSOPERATIONSGetPayload<{
  select: typeof operationSelect;
}>;
