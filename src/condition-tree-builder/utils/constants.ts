export type OperationType = 'AND' | 'NOT AND' | 'OR' | 'NOT OR';

export const constants: Record<number, OperationType> = {
  0: 'AND',
  1: 'NOT AND',
  2: 'OR',
  3: 'NOT OR',
};

export const comparisonMap = {
  '<': (a, b) => parseFloat(a) < parseFloat(b),
  '&lt;': (a, b) => parseFloat(a) < parseFloat(b),
  '<=': (a, b) => parseFloat(a) <= parseFloat(b),
  '&lt;=': (a, b) => parseFloat(a) <= parseFloat(b),
  '>': (a, b) => parseFloat(a) > parseFloat(b),
  '&gt;': (a, b) => parseFloat(a) > parseFloat(b),
  '>=': (a, b) => parseFloat(a) >= parseFloat(b),
  '&gt;=': (a, b) => parseFloat(a) >= parseFloat(b),
  '=': (a, b) => a === b,
  '!B': (a: string, b: string) => !a.startsWith(b),
  B: (a: string, b: string) => a.startsWith(b),
  '!E': (a: string, b: string) => !a.endsWith(b),
  E: (a: string, b: string) => a.endsWith(b),
  '!C': (a: string, b: string) => !a.includes(b),
  C: (a: string, b: string) => a.includes(b),
};

export const keyMapping = {
  'AD article width': 'width',
  'AD article calculation principle 1': 'calculation',
  'AD article designer version': 'designer_version',
  'AD article height': 'height',
  'AD article type': 'type',
};
