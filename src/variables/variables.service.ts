// In variables.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ImosService } from '../imos/imos.service';

export interface VariableResult {
    name: string;
    type: number;
    value: string | number | VariableResult;
}

@Injectable()
export class VariablesService {
    constructor(private readonly imosService: ImosService) {}

    async getNestedVariable(name: string): Promise<VariableResult> {
        const visited = new Set<string>();
        const cache = new Map<string, VariableResult>();

        return this.resolveVariable(name, visited, cache);
    }

    private async resolveVariable(name: string, visited: Set<string>, cache: Map<string, VariableResult>): Promise<VariableResult> {
        const key = name;

        // Check cache first
        if (cache.has(key)) {
            return cache.get(key)!;
        }

        // Detect circular references
        if (visited.has(key)) {
            throw new BadRequestException(
                `Circular reference detected for variable: ${name}`
            );
        }

        visited.add(key);

        // Fetch variable from IMOS table
        const variable = await this.imosService.findByName(name);

        if (!variable) {
            throw new BadRequestException(`Variable not found: ${name}`);
        }

        const result: VariableResult = {
            name: variable.NAME,
            type: variable.TYP,
            value: '', // Will be set below
        };

        // Check if WERT is a reference to another variable
        if (this.isVariableReference(variable.WERT, variable.TYP)) {
            const referencedVarName = variable.WERT.substring(1); // Remove '$'
            result.value = await this.resolveVariable(referencedVarName, new Set(visited), cache);
        } else {
            // Terminal value - parse if needed
            result.value = this.parseValue(variable.WERT, variable.TYP);
        }

        cache.set(key, result);
        visited.delete(key);

        return result;
    }

    private isVariableReference(wert: string, typ: number): boolean {
        // Variable reference starts with '$' and TYP is not TEXT(120)
        return wert.startsWith('$') && typ !== 120;
    }

    private parseValue(wert: string, typ: number): string | number {
        // Parse value based on type
        // This is a placeholder - adjust based on actual type definitions
        switch (typ) {
            case 100: // Numeric type
                return isNaN(Number(wert)) ? wert : Number(wert);
            case 120: // Text type
                return wert;
            default:
                return wert;
        }
    }
}