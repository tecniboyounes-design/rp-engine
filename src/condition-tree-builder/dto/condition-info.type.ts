import { Prisma } from '@prisma/client';

export const conditionSelect = Prisma.validator<Prisma.CONDITIONSSelect>()({
  CONDITIONID: true,
  ROOTTERMNUM: true,
  // add any other fields you want to expose here (e.g. NAME)
  // NAME: true,
});

export type ConditionInfo = Prisma.CONDITIONSGetPayload<{
  select: typeof conditionSelect;
}>;
