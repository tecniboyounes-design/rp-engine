import { Prisma } from '@prisma/client';

export const comparisonSelect = Prisma.validator<Prisma.CONDITIONSCOMPARISONSSelect>()({
  CONDITIONID: true,
  PARENTTERMNUM: true,
  TERMNUM: true,
  LEFTVALUE: true,
  COMPARISONTYPE: true,
  RIGHTVALUE: true,
  DATATYPE: true, // keep if present in schema
});

export type ComparisonRow = Prisma.CONDITIONSCOMPARISONSGetPayload<{
  select: typeof comparisonSelect;
}>;
