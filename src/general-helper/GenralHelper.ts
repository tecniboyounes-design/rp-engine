export const hasVars = (str: string): boolean => str.match(/\$[A-Za-z_][A-Za-z0-9_]*/g) !== null;
export const extractVars = (str: string): string[] => [...new Set((str.match(/\$[A-Za-z_][A-Za-z0-9_]*/g) || [] as string[]).map(v => v.substring(1)))];
export const hasDescriptor = (str: string): boolean => str.match(/#[A-Za-z_][A-Za-z0-9_]*/g) !== null;
export const extractDescriptors = (str: string): string[] => [...new Set((str.match(/#[A-Za-z_][A-Za-z0-9_]*/g) || [] as string[]).map(d => d.substring(1)))];

