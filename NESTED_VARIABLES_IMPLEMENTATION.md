# Nested Variables Implementation Guide

## Overview

This document outlines strategies for creating nested variables from the IMOS table, where variables can reference other variables through the `$` prefix notation.

## IMOS Table Structure

Based on `prisma/schema.prisma:481-501`, the IMOS table has:

```typescript
model IMOS {
  TYP             Int                // Type of variable
  NAME            String             // Variable name
  OPTNR           Int                // Option number
  WERT            String             // Value (can be "100", "testValue", or "$VAR_NAME")
  OPTINFO         String             // Option info
  POS             Int                // Position
  LENGTH          Int                // Length
  ORDERID         String             // Order ID
  CATALOG_ID      Int
  WORKPLAN_ID     Int
  CATEGORY        String
  FAMILY          String
  DATE_LASTCHANGE DateTime?
  SOURCE          String
  PRODUCER        String
  SYS             Boolean
  FROMSPEC        Int

  @@unique([TYP, NAME, OPTNR, ORDERID])
}
```

## Nested Variable Structure

Target output format:

```json
{
  "name": "VAR_CHAIN_1",
  "type": 100,
  "value": {
    "name": "VAR_M1",
    "type": 100,
    "value": {
      "name": "VAR_S1",
      "type": 100,
      "value": "1000"
    }
  }
}
```

## Implementation Strategies

### Strategy 1: Recursive Resolution with Memoization

**Pros:**
- Clean separation of concerns
- Handles circular references
- Efficient with caching
- Easy to test

**Cons:**
- Requires careful circular dependency detection
- More complex to implement initially

**Implementation Approach:**

```typescript
// In variables.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { ImosService } from '../imos/imos.service';

@Injectable()
export class VariablesService {
  constructor(private readonly imosService: ImosService) {}

  async getNestedVariable(
    typ: number,
    name: string,
    optnr: number,
    orderid: string
  ) {
    const visited = new Set<string>();
    const cache = new Map<string, any>();

    return this.resolveVariable(typ, name, optnr, orderid, visited, cache);
  }

  private async resolveVariable(
    typ: number,
    name: string,
    optnr: number,
    orderid: string,
    visited: Set<string>,
    cache: Map<string, any>
  ): Promise<any> {
    const key = `${typ}-${name}-${optnr}-${orderid}`;

    // Check cache first
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Detect circular references
    if (visited.has(key)) {
      throw new BadRequestException(
        `Circular reference detected for variable: ${name}`
      );
    }

    visited.add(key);

    // Fetch variable from IMOS table
    const variable = await this.imosService.findOne(typ, name, optnr, orderid);

    if (!variable) {
      throw new BadRequestException(`Variable not found: ${name}`);
    }

    const result: any = {
      name: variable.NAME,
      type: variable.TYP,
    };

    // Check if WERT is a reference to another variable
    if (this.isVariableReference(variable.WERT, variable.TYP)) {
      const referencedVarName = variable.WERT.substring(1); // Remove '$'
      result.value = await this.resolveVariable(
        variable.TYP,
        referencedVarName,
        optnr,
        orderid,
        new Set(visited), // Create new Set to allow reuse in parallel branches
        cache
      );
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

  private parseValue(wert: string, typ: number): any {
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
```

### Strategy 2: Iterative Breadth-First Resolution

**Pros:**
- Avoids stack overflow with deep nesting
- Easier to understand flow
- Better performance for wide dependency trees

**Cons:**
- More code
- Harder to implement correctly

**Implementation Approach:**

```typescript
async getNestedVariableBFS(
  typ: number,
  name: string,
  optnr: number,
  orderid: string
) {
  const queue = [{ typ, name, optnr, orderid, path: [] }];
  const resolved = new Map<string, any>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = `${current.typ}-${current.name}-${current.optnr}-${current.orderid}`;

    if (resolved.has(key)) continue;

    const variable = await this.imosService.findOne(
      current.typ,
      current.name,
      current.optnr,
      current.orderid
    );

    if (!variable) {
      throw new BadRequestException(`Variable not found: ${current.name}`);
    }

    if (this.isVariableReference(variable.WERT, variable.TYP)) {
      const refName = variable.WERT.substring(1);
      const refKey = `${variable.TYP}-${refName}-${current.optnr}-${current.orderid}`;

      // Check if circular reference
      if (current.path.includes(refKey)) {
        throw new BadRequestException('Circular reference detected');
      }

      queue.push({
        typ: variable.TYP,
        name: refName,
        optnr: current.optnr,
        orderid: current.orderid,
        path: [...current.path, key]
      });
    } else {
      resolved.set(key, {
        name: variable.NAME,
        type: variable.TYP,
        value: this.parseValue(variable.WERT, variable.TYP)
      });
    }
  }

  // Reconstruct nested structure from resolved map
  return this.buildNestedStructure(
    `${typ}-${name}-${optnr}-${orderid}`,
    resolved
  );
}
```

### Strategy 3: Bulk Fetch with Graph Resolution

**Pros:**
- Minimizes database queries
- Best performance for complex trees
- Scalable

**Cons:**
- Most complex to implement
- Requires loading many variables upfront

**Implementation Approach:**

```typescript
async getNestedVariableBulk(
  typ: number,
  name: string,
  optnr: number,
  orderid: string
) {
  // Fetch all variables for this orderid at once
  const allVariables = await this.imosService.findAllByOrder(orderid);

  // Build a lookup map
  const varMap = new Map(
    allVariables.map(v => [
      `${v.TYP}-${v.NAME}-${v.OPTNR}`,
      v
    ])
  );

  // Resolve using the map
  return this.resolveFromMap(
    typ,
    name,
    optnr,
    varMap,
    new Set()
  );
}
```

## Recommended Approach

**Use Strategy 1 (Recursive Resolution with Memoization)** because:

1. Clean and maintainable code
2. Handles circular references gracefully
3. Efficient with caching
4. Works well for most use cases
5. Easy to extend with additional features

## Controller Endpoint Design

```typescript
// In variables.controller.ts

@Get('nested/:orderid/:name')
async getNestedVariable(
  @Param('orderid') orderid: string,
  @Param('name') name: string,
  @Query('typ') typ?: number,
  @Query('optnr') optnr?: number,
) {
  return this.variablesService.getNestedVariable(
    typ || 100, // Default type
    name,
    optnr || 0, // Default option number
    orderid
  );
}

// Bulk resolution for multiple variables
@Post('nested/bulk')
async getNestedVariablesBulk(
  @Body() dto: {
    orderid: string;
    variables: Array<{
      name: string;
      typ?: number;
      optnr?: number;
    }>;
  }
) {
  return Promise.all(
    dto.variables.map(v =>
      this.variablesService.getNestedVariable(
        v.typ || 100,
        v.name,
        v.optnr || 0,
        dto.orderid
      )
    )
  );
}
```

## Module Updates

```typescript
// In variables.module.ts
import { Module } from '@nestjs/common';
import { VariablesService } from './variables.service';
import { VariablesController } from './variables.controller';
import { ImosModule } from '../imos/imos.module';

@Module({
  imports: [ImosModule], // Import ImosModule to use ImosService
  controllers: [VariablesController],
  providers: [VariablesService],
  exports: [VariablesService], // Export if needed by other modules
})
export class VariablesModule {}
```

```typescript
// In imos.module.ts (ensure this is set up)
import { Module } from '@nestjs/common';
import { ImosService } from './imos.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ImosService],
  exports: [ImosService], // Must export for use in VariablesModule
})
export class ImosModule {}
```

## Error Handling

Key error scenarios to handle:

1. **Variable Not Found**: Return 404 with clear message
2. **Circular Reference**: Return 400 with cycle path
3. **Invalid Type**: Return 400 with validation error
4. **Database Errors**: Return 500 with generic message (log details)

```typescript
// Custom exception filter
export class VariableResolutionException extends BadRequestException {
  constructor(message: string, public readonly variableName: string) {
    super(message);
  }
}
```

## Testing Strategy

1. **Unit Tests**:
   - Test single variable resolution
   - Test nested variable resolution (2-3 levels)
   - Test circular reference detection
   - Test cache effectiveness

2. **Integration Tests**:
   - Test with real database
   - Test performance with deep nesting
   - Test concurrent requests

3. **Test Data Examples**:

```typescript
// Test case 1: Simple chain
// IMOS records:
// { TYP: 100, NAME: 'VAR_S1', WERT: '1000', ... }
// { TYP: 100, NAME: 'VAR_M1', WERT: '$VAR_S1', ... }
// { TYP: 100, NAME: 'VAR_CHAIN_1', WERT: '$VAR_M1', ... }

// Test case 2: Circular reference (should fail)
// { TYP: 100, NAME: 'VAR_A', WERT: '$VAR_B', ... }
// { TYP: 100, NAME: 'VAR_B', WERT: '$VAR_A', ... }

// Test case 3: Terminal value
// { TYP: 100, NAME: 'VAR_DIRECT', WERT: '500', ... }

// Test case 4: Text type (should not resolve even with $)
// { TYP: 120, NAME: 'VAR_TEXT', WERT: '$notAVariable', ... }
```

## Performance Considerations

1. **Caching**: Implement Redis cache for frequently accessed variables
2. **Database Indexing**: Ensure unique index on `[TYP, NAME, OPTNR, ORDERID]` (already exists)
3. **Query Optimization**: Consider adding method to ImosService for bulk fetching
4. **Depth Limiting**: Add max depth parameter to prevent excessive recursion

```typescript
async getNestedVariable(
  typ: number,
  name: string,
  optnr: number,
  orderid: string,
  maxDepth: number = 10 // Add depth limit
) {
  // ...implementation
}
```

## Additional Features to Consider

1. **Variable Metadata**: Include additional IMOS fields in response
2. **Partial Resolution**: Option to return unresolved variables
3. **Variable Trees**: Return all variables in a hierarchy
4. **Change Tracking**: Track when variables were last modified
5. **Variable Validation**: Validate variable chains on write

## Next Steps

1. Implement `ImosModule` exports if not already done
2. Add `findAllByOrder` method to `ImosService` for bulk operations
3. Implement Strategy 1 in `VariablesService`
4. Add controller endpoints
5. Write unit tests
6. Write integration tests
7. Add API documentation (Swagger)
8. Implement caching layer (optional but recommended)
