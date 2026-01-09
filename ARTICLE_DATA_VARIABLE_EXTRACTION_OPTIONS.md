# Article Data Variable Extraction & Resolution Options

## Context

The `/article-data/:name` endpoint aggregates data from 5 tables:
- **anglzone** - Zone configurations with formula fields
- **anglelem** - Element configurations
- **anglprim** - Primitive configurations with dimensions
- **anglclie** - Client/custom data with tag-value pairs
- **anglgrtx** - Graphics text data

These tables contain variables that may reference entries in the **IMOS** table. This document outlines different options for extracting variables from article-data responses and resolving them using the existing IMOS resources.

---

## Current Response Structure

```json
{
  "anglzone": [...],
  "anglelem": [...],
  "anglprim": [...],
  "anglclie": [...],
  "anglgrtx": [...]
}
```

### Fields Containing Variables

| Table | Fields with Variables |
|-------|----------------------|
| **anglclie** | `TAGVALUE` (e.g., `"$VAR_NAME"`, `"100"`) |
| **anglzone** | `LINDIV1`, `LINDIV2`, `LINDIVZ`, `LFORMULA_TOP`, `LFORMULA_BOT`, `LFORMULA_DIV`, `LFORMULA_DIVFRA` |
| **anglprim** | `SIZEX`, `SIZEY`, `SIZEZ`, `DIMCALCFX`, `DIMCALCFY`, `DIMCALCFZ`, `BAFIXHFOR` |

---

## Option 1: Frontend-Based Extraction & Resolution (Client-Side)

### Description
Let the frontend extract variables from article-data response and make separate calls to resolve them.

### Implementation

**Frontend Flow:**
```typescript
// 1. Fetch article data
const articleData = await fetch('/article-data/ANGLE_CORNER_001').then(r => r.json());

// 2. Extract variable references locally
const variables = extractVariablesFromArticleData(articleData);
// Returns: ['$VAR_S1', '$BASE_HEIGHT', '$MARGIN']

// 3. Resolve variables using existing endpoint
const resolvedVars = await fetch('/variables/nested/bulk', {
  method: 'POST',
  body: JSON.stringify({
    variables: variables.map(v => ({ name: v.replace('$', '') }))
  })
}).then(r => r.json());

// 4. Replace variables in article data
const enrichedData = replaceVariablesInData(articleData, resolvedVars);
```

**Frontend Helper Function:**
```typescript
function extractVariablesFromArticleData(data: any): string[] {
  const variables = new Set<string>();

  // Extract from anglclie
  data.anglclie?.forEach(row => {
    if (row.TAGVALUE?.startsWith('$')) {
      variables.add(row.TAGVALUE.replace(/\$\{?(\w+)\}?/, '$1'));
    }
  });

  // Extract from anglzone formulas
  data.anglzone?.forEach(row => {
    const formulaFields = ['LINDIV1', 'LINDIV2', 'LINDIVZ',
                           'LFORMULA_TOP', 'LFORMULA_BOT', 'LFORMULA_DIV'];
    formulaFields.forEach(field => {
      const matches = row[field]?.match(/\$\{?(\w+)\}?/g) || [];
      matches.forEach(m => variables.add(m.replace(/\$\{?(\w+)\}?/, '$1')));
    });
  });

  // Similar for anglprim...

  return Array.from(variables);
}
```

### Pros
- ✅ No backend changes required
- ✅ Flexibility for frontend to decide when/what to resolve
- ✅ Can implement caching on frontend
- ✅ Reduced backend complexity

### Cons
- ❌ Multiple network requests (1 for article data + 1 for resolution)
- ❌ Duplication of extraction logic if used in multiple places
- ❌ Frontend must handle variable parsing complexity
- ❌ Slower initial load time

### When to Use
- Quick prototyping
- Frontend has strong state management
- Need flexibility in variable resolution timing
- Limited backend development resources

---

## Option 2: Enhanced Article Data Endpoint (Single Enhanced Response)

### Description
Extend the existing `/article-data/:name` endpoint to optionally include resolved variables in the response.

### Implementation

**Enhanced Controller:**
```typescript
// src/article-data/article-data.controller.ts
@Get(':name')
async findByName(
  @Param('name') name: string,
  @Query('resolveVariables') resolveVariables?: boolean,
) {
  const data = await this.articleDataService.findByName(name);

  if (resolveVariables) {
    return this.articleDataService.enrichWithResolvedVariables(data);
  }

  return data;
}
```

**Enhanced Service:**
```typescript
// src/article-data/article-data.service.ts
import { VariablesService } from '../variables/variables.service';

@Injectable()
export class ArticleDataService {
  constructor(
    // ... existing services
    private readonly variablesService: VariablesService,
  ) {}

  async enrichWithResolvedVariables(data: any) {
    // Extract all variable references
    const variableNames = this.extractVariableReferences(data);

    // Resolve all variables in parallel
    const resolved = await Promise.all(
      variableNames.map(name =>
        this.variablesService.getNestedVariable(name)
          .catch(() => null) // Handle missing variables gracefully
      )
    );

    const variableMap = Object.fromEntries(
      variableNames.map((name, i) => [name, resolved[i]])
    );

    return {
      ...data,
      _resolvedVariables: variableMap, // Add resolved variables to response
    };
  }

  private extractVariableReferences(data: any): string[] {
    const variables = new Set<string>();

    // Extract from anglclie
    data.anglclie?.forEach(row => {
      if (row.TAGVALUE?.includes('$')) {
        const matches = row.TAGVALUE.match(/\$\{?(\w+)\}?/g) || [];
        matches.forEach(m => variables.add(m.replace(/\$\{?|\}?/g, '')));
      }
    });

    // Extract from anglzone
    data.anglzone?.forEach(row => {
      const formulaFields = ['LINDIV1', 'LINDIV2', 'LINDIVZ',
                             'LFORMULA_TOP', 'LFORMULA_BOT', 'LFORMULA_DIV'];
      formulaFields.forEach(field => {
        const matches = row[field]?.match(/\$\{?(\w+)\}?/g) || [];
        matches.forEach(m => variables.add(m.replace(/\$\{?|\}?/g, '')));
      });
    });

    // Extract from anglprim
    data.anglprim?.forEach(row => {
      const fields = ['SIZEX', 'SIZEY', 'SIZEZ', 'DIMCALCFX', 'DIMCALCFY', 'DIMCALCFZ'];
      fields.forEach(field => {
        const matches = row[field]?.match(/\$\{?(\w+)\}?/g) || [];
        matches.forEach(m => variables.add(m.replace(/\$\{?|\}?/g, '')));
      });
    });

    return Array.from(variables);
  }
}
```

**Enhanced Response:**
```json
{
  "anglzone": [...],
  "anglelem": [...],
  "anglprim": [...],
  "anglclie": [...],
  "anglgrtx": [...],
  "_resolvedVariables": {
    "VAR_S1": { "value": 100, "type": "numeric" },
    "BASE_HEIGHT": { "value": 450, "type": "numeric" },
    "MARGIN": { "value": 20, "type": "numeric" }
  }
}
```

**Usage:**
```bash
# Without resolution (original behavior)
GET /article-data/ANGLE_CORNER_001

# With resolution
GET /article-data/ANGLE_CORNER_001?resolveVariables=true
```

### Pros
- ✅ Single network request
- ✅ Backward compatible (opt-in via query param)
- ✅ Centralized variable extraction logic
- ✅ Faster frontend implementation
- ✅ Can leverage backend caching

### Cons
- ❌ Modifies existing endpoint (requires testing)
- ❌ Slower response time when resolution is enabled
- ❌ Mixing data concerns (raw data + resolved variables)

### When to Use
- Want minimal frontend changes
- Need single-request solution
- Backend has good caching infrastructure
- Most use cases need resolved variables

---

## Option 3: New Dedicated Endpoint (Separate Enriched Endpoint)

### Description
Create a new endpoint specifically for getting article data with resolved variables, keeping the original endpoint unchanged.

### Implementation

**New Endpoint:**
```typescript
// src/article-data/article-data.controller.ts
@Get(':name/enriched')
async findByNameEnriched(@Param('name') name: string) {
  return this.articleDataService.findByNameEnriched(name);
}

@Get('names/:names/enriched')
async findByNameListEnriched(@Param('names') names: string) {
  const namesArray = names.split(',').map(name => name.trim());
  return this.articleDataService.findByNameListEnriched(namesArray);
}
```

**Service Method:**
```typescript
async findByNameEnriched(NAME: string) {
  const data = await this.findByName(NAME);
  return this.enrichWithResolvedVariables(data);
}

async findByNameListEnriched(names: string[]) {
  const data = await this.findByNameList(names);
  return this.enrichWithResolvedVariables(data);
}
```

**Usage:**
```bash
# Original endpoint (unchanged)
GET /article-data/ANGLE_CORNER_001

# New enriched endpoint
GET /article-data/ANGLE_CORNER_001/enriched
```

### Pros
- ✅ Zero risk to existing functionality
- ✅ Clean separation of concerns
- ✅ Easy to test independently
- ✅ Clear API semantics
- ✅ Can have different response structure if needed

### Cons
- ❌ API surface area increases
- ❌ Potential code duplication
- ❌ May confuse users about which endpoint to use

### When to Use
- Want to avoid modifying existing endpoints
- Need to maintain strict backward compatibility
- Planning to add more enrichment features later
- Different caching strategies for each endpoint

---

## Option 4: Dedicated Variable Resolution Service

### Description
Create a reusable service that can extract and resolve variables from any article data structure, used by various endpoints.

### Implementation

**New Service:**
```typescript
// src/article-data/article-data-variable-resolver.service.ts
import { Injectable } from '@nestjs/common';
import { VariablesService } from '../variables/variables.service';

export interface VariableExtractionResult {
  variables: string[];
  locations: Array<{
    table: string;
    rowIndex: number;
    field: string;
    variableName: string;
  }>;
}

@Injectable()
export class ArticleDataVariableResolverService {
  constructor(private readonly variablesService: VariablesService) {}

  /**
   * Extract all variable references from article data
   */
  extractVariables(data: any): VariableExtractionResult {
    const variables = new Set<string>();
    const locations: VariableExtractionResult['locations'] = [];

    // Extract from anglclie
    data.anglclie?.forEach((row, index) => {
      if (row.TAGVALUE?.includes('$')) {
        const matches = this.extractVariableNames(row.TAGVALUE);
        matches.forEach(varName => {
          variables.add(varName);
          locations.push({
            table: 'anglclie',
            rowIndex: index,
            field: 'TAGVALUE',
            variableName: varName,
          });
        });
      }
    });

    // Extract from anglzone
    data.anglzone?.forEach((row, index) => {
      const formulaFields = [
        'LINDIV1', 'LINDIV2', 'LINDIVZ',
        'LFORMULA_TOP', 'LFORMULA_BOT', 'LFORMULA_DIV', 'LFORMULA_DIVFRA'
      ];

      formulaFields.forEach(field => {
        if (row[field]) {
          const matches = this.extractVariableNames(row[field]);
          matches.forEach(varName => {
            variables.add(varName);
            locations.push({
              table: 'anglzone',
              rowIndex: index,
              field,
              variableName: varName,
            });
          });
        }
      });
    });

    // Extract from anglprim
    data.anglprim?.forEach((row, index) => {
      const fields = [
        'SIZEX', 'SIZEY', 'SIZEZ',
        'DIMCALCFX', 'DIMCALCFY', 'DIMCALCFZ', 'BAFIXHFOR'
      ];

      fields.forEach(field => {
        if (row[field]) {
          const matches = this.extractVariableNames(row[field]);
          matches.forEach(varName => {
            variables.add(varName);
            locations.push({
              table: 'anglprim',
              rowIndex: index,
              field,
              variableName: varName,
            });
          });
        }
      });
    });

    return {
      variables: Array.from(variables),
      locations,
    };
  }

  /**
   * Resolve all variables found in article data
   */
  async resolveVariables(variableNames: string[]): Promise<Record<string, any>> {
    const results = await Promise.allSettled(
      variableNames.map(name => this.variablesService.getNestedVariable(name))
    );

    const resolved: Record<string, any> = {};
    variableNames.forEach((name, index) => {
      const result = results[index];
      resolved[name] = result.status === 'fulfilled' ? result.value : null;
    });

    return resolved;
  }

  /**
   * Extract and resolve in one step
   */
  async extractAndResolve(data: any) {
    const extraction = this.extractVariables(data);
    const resolved = await this.resolveVariables(extraction.variables);

    return {
      data,
      variables: {
        extracted: extraction.variables,
        locations: extraction.locations,
        resolved,
      },
    };
  }

  private extractVariableNames(text: string): string[] {
    const matches = text.match(/\$\{?([A-Z_][A-Z0-9_]*)\}?/gi) || [];
    return matches.map(m => m.replace(/\$\{?|\}?/g, ''));
  }
}
```

**Integration Example:**
```typescript
// In ArticleDataService or Controller
async findByNameWithVariables(name: string) {
  const data = await this.findByName(name);
  return this.variableResolverService.extractAndResolve(data);
}
```

**Response Structure:**
```json
{
  "data": {
    "anglzone": [...],
    "anglelem": [...],
    "anglprim": [...],
    "anglclie": [...],
    "anglgrtx": [...]
  },
  "variables": {
    "extracted": ["VAR_S1", "BASE_HEIGHT", "MARGIN"],
    "locations": [
      {
        "table": "anglclie",
        "rowIndex": 0,
        "field": "TAGVALUE",
        "variableName": "VAR_S1"
      }
    ],
    "resolved": {
      "VAR_S1": { "value": 100, "type": "numeric" },
      "BASE_HEIGHT": { "value": 450, "type": "numeric" },
      "MARGIN": { "value": 20, "type": "numeric" }
    }
  }
}
```

### Pros
- ✅ Highly reusable across multiple endpoints
- ✅ Detailed information about where variables are used
- ✅ Clean separation of concerns
- ✅ Easy to unit test
- ✅ Can be used by other services
- ✅ Provides variable location tracking

### Cons
- ❌ More complex initial implementation
- ❌ Requires additional service and module setup
- ❌ May be over-engineering for simple use cases

### When to Use
- Need variable resolution in multiple places
- Want detailed tracking of variable locations
- Planning to add variable analysis features
- Need reusable variable extraction logic

---

## Option 5: Hybrid Approach (Combine Variable Collector + Resolution)

### Description
Leverage the existing `variable-collector` service (just created) to extract variables, then add resolution capability.

### Implementation

**Extend ArticleDataService:**
```typescript
// src/article-data/article-data.service.ts
import { VariableCollectorService } from '../variable-collector/variable-collector.service';
import { VariablesService } from '../variables/variables.service';

@Injectable()
export class ArticleDataService {
  constructor(
    // ... existing services
    private readonly variableCollectorService: VariableCollectorService,
    private readonly variablesService: VariablesService,
  ) {}

  async findByNameWithResolvedVariables(NAME: string) {
    // 1. Get article data
    const articleData = await this.findByName(NAME);

    // 2. Use variable-collector to extract variables
    const collectedVars = await this.variableCollectorService.collectByName(NAME);

    // 3. Resolve variables using Variables service
    const resolved = await Promise.allSettled(
      collectedVars.variables
        .filter(v => v.isReference) // Only resolve references
        .map(v => this.variablesService.getNestedVariable(
          v.rawValue.replace('$', '')
        ))
    );

    const variableMap = {};
    collectedVars.variables
      .filter(v => v.isReference)
      .forEach((v, index) => {
        const result = resolved[index];
        variableMap[v.variableName] =
          result.status === 'fulfilled' ? result.value : null;
      });

    return {
      articleData,
      collectedVariables: collectedVars,
      resolvedVariables: variableMap,
    };
  }
}
```

**New Controller Endpoint:**
```typescript
@Get(':name/with-variables')
async findByNameWithVariables(@Param('name') name: string) {
  return this.articleDataService.findByNameWithResolvedVariables(name);
}
```

**Response:**
```json
{
  "articleData": {
    "anglzone": [...],
    "anglelem": [...],
    "anglprim": [...],
    "anglclie": [...],
    "anglgrtx": [...]
  },
  "collectedVariables": {
    "variables": [
      {
        "variableName": "SHELF_HEIGHT",
        "rawValue": "$BASE_HEIGHT",
        "sourceTable": "anglclie",
        "sourceField": "TAGVALUE",
        "isReference": true
      }
    ],
    "summary": { "total": 1, "bySource": { "anglclie": 1 } }
  },
  "resolvedVariables": {
    "SHELF_HEIGHT": { "value": 450, "type": "numeric" }
  }
}
```

### Pros
- ✅ Reuses existing variable-collector infrastructure
- ✅ Comprehensive variable metadata included
- ✅ Leverages all existing services
- ✅ Clear separation of data vs variables
- ✅ Most feature-complete option

### Cons
- ❌ Large response payload
- ❌ Potentially redundant data (article data + collected variables)
- ❌ May be more data than needed

### When to Use
- Need comprehensive variable information
- Already using variable-collector elsewhere
- Want to leverage existing infrastructure
- Building admin/debugging tools

---

## Comparison Matrix

| Criteria | Option 1<br>Frontend | Option 2<br>Enhanced | Option 3<br>Separate | Option 4<br>Service | Option 5<br>Hybrid |
|----------|:-------------------:|:-------------------:|:-------------------:|:------------------:|:------------------:|
| **Backend Changes** | None | Moderate | Moderate | High | Moderate |
| **Frontend Complexity** | High | Low | Low | Low | Low |
| **Network Requests** | 2+ | 1 | 1 | 1 | 1 |
| **Response Size** | Small | Medium | Medium | Medium | Large |
| **Reusability** | Low | Medium | Medium | High | High |
| **Backward Compatible** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Variable Metadata** | ❌ | Limited | Limited | ✅ | ✅ |
| **Performance** | Slower | Medium | Medium | Medium | Slower |
| **Maintenance** | Medium | Low | Low | Low | Low |
| **Testing Complexity** | High | Medium | Low | Low | Medium |

---

## Recommendations

### For Quick Implementation (Next 1-2 days)
**Choose Option 2: Enhanced Article Data Endpoint**
- Minimal backend changes
- Query parameter for opt-in resolution
- Single request for frontend
- Good balance of features vs complexity

### For Production-Grade Solution (Next 1-2 weeks)
**Choose Option 4: Dedicated Variable Resolution Service**
- Most flexible and reusable
- Clean architecture
- Can be used across multiple endpoints
- Provides detailed variable tracking

### For Leveraging Existing Infrastructure
**Choose Option 5: Hybrid Approach**
- Reuses variable-collector service
- Most comprehensive data
- Good for admin/debugging interfaces

### For Prototyping/MVP
**Choose Option 1: Frontend-Based**
- Zero backend changes
- Quick to implement
- Can migrate to backend solution later

---

## Implementation Priority Recommendation

**Phase 1 (Immediate):**
1. Implement Option 2 (Enhanced Endpoint) for quick wins
2. Add `?resolveVariables=true` query parameter support
3. Test with existing frontend

**Phase 2 (Near-term):**
1. Extract variable resolution logic into dedicated service (Option 4)
2. Add variable location tracking
3. Implement caching

**Phase 3 (Long-term):**
1. Add GraphQL support for flexible variable resolution
2. Implement streaming responses for large datasets
3. Add variable dependency graph visualization

---

## Code Examples by Use Case

### Use Case 1: Frontend needs article data with all variables resolved immediately

**Best Option:** Option 2 or 3

```typescript
// Frontend
const response = await fetch('/article-data/ANGLE_CORNER_001?resolveVariables=true');
const { anglzone, anglclie, _resolvedVariables } = await response.json();

// Variables are already resolved, no additional parsing needed
console.log(_resolvedVariables['BASE_HEIGHT']); // { value: 450, type: 'numeric' }
```

### Use Case 2: Frontend only needs specific variables resolved

**Best Option:** Option 1

```typescript
// Frontend
const articleData = await fetch('/article-data/ANGLE_CORNER_001').then(r => r.json());
const specificVars = ['BASE_HEIGHT', 'MARGIN']; // User-selected variables

const resolved = await fetch('/variables/nested/bulk', {
  method: 'POST',
  body: JSON.stringify({
    variables: specificVars.map(name => ({ name }))
  })
}).then(r => r.json());
```

### Use Case 3: Backend needs to process article data with variables in a queue/worker

**Best Option:** Option 4

```typescript
// In a background worker
const articleData = await articleDataService.findByName('ANGLE_CORNER_001');
const enriched = await variableResolverService.extractAndResolve(articleData);

// Process with full variable context
processArticleData(enriched.data, enriched.variables.resolved);
```

### Use Case 4: Building an admin panel showing variable usage

**Best Option:** Option 5

```typescript
// Admin API
const fullData = await articleDataService.findByNameWithResolvedVariables('ANGLE_CORNER_001');

// Show where variables are used
fullData.collectedVariables.variables.forEach(v => {
  console.log(`${v.variableName} used in ${v.sourceTable}.${v.sourceField}`);
  console.log(`Resolved value:`, fullData.resolvedVariables[v.variableName]);
});
```

---

## Next Steps

1. **Decide on primary use case** (frontend-driven vs backend-driven)
2. **Choose implementation option** based on recommendations
3. **Create feature branch** for implementation
4. **Implement with tests** (unit + integration)
5. **Update API documentation**
6. **Deploy and monitor performance**

---

## Additional Considerations

### Performance Optimization
- Add Redis caching for resolved variables (TTL: 5-10 minutes)
- Implement batch resolution to reduce IMOS queries
- Consider database indexes on IMOS.NAME field

### Error Handling
- Handle missing variables gracefully (return null, don't throw)
- Log unresolved variables for debugging
- Add retry logic for transient failures

### Monitoring
- Track resolution time metrics
- Monitor cache hit rates
- Alert on high failure rates

### Security
- Validate variable names to prevent injection
- Rate limit variable resolution endpoints
- Sanitize user input for NAME parameters
