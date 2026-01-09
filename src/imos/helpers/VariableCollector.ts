import {extractVars} from "../../general-helper/GenralHelper";

interface DataObject {
    [key: string]: any;
}

export function collectVarsFromData(tables: DataObject[][]): string[] {
    const values = new Set<string>();

    // Iterate through each table
    tables.forEach((table) => {
        if (!Array.isArray(table)) return;

        // Iterate through each row in the table
        table.forEach((row) => {
            if (!row || typeof row !== 'object') return;

            // Get all field values from the row
            Object.values(row).forEach((value) => {
                    const vars = extractVars(JSON.stringify(value));
                    vars.forEach(v => values.add(v));
            });
        });
    });

    return Array.from(values);
}