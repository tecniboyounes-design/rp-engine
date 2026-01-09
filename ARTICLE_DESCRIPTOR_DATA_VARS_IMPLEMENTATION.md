# Article-Descriptor-Data-Vars Endpoint Implementation

## Objective

Create a new endpoint `/article-descriptor-data-vars/:name` that:
1. Collects data from article tables (anglzone, anglelem, anglprim, anglclie, anglgrtx)
2. Extracts variable names from those tables
3. Searches IMOS table for matching variable records
4. Returns article data + IMOS records for found variables (no resolution/evaluation)

---

## Endpoint Specification

### Endpoint
```
GET /article-descriptor-data-vars/:name
GET /article-descriptor-data-vars/names/:names (bulk)
```

### Response Structure
```json
{
  "articleData": {
    "anglzone": [...],
    "anglelem": [...],
    "anglprim": [...],
    "anglclie": [...],
    "anglgrtx": [...]
  },
  "extractedVariables": [
    "VAR_S1",
    "BASE_HEIGHT",
    "MARGIN"
  ],
  "imosData": [
    {
      "TYP": 100,
      "NAME": "VAR_S1",
      "OPTNR": 0,
      "WERT": "100",
      "ORDERID": "",
      ...
    },
    {
      "TYP": 100,
      "NAME": "BASE_HEIGHT",
      "OPTNR": 0,
      "WERT": "$VAR_S1",
      "ORDERID": "",
      ...
    }
  ],
  "summary": {
    "totalVariablesExtracted": 3,
    "totalImosRecordsFound": 2,
    "variablesNotFoundInImos": ["MARGIN"]
  }
}
```

---

## Implementation Plan

### Step 1: Create New Module

```bash
# Create directory and files
mkdir -p src/article-descriptor-data-vars
mkdir -p src/article-descriptor-data-vars/dto
```

**File Structure:**
```
src/article-descriptor-data-vars/
├── article-descriptor-data-vars.module.ts
├── article-descriptor-data-vars.service.ts
├── article-descriptor-data-vars.controller.ts
└── dto/
    └── article-vars-response.dto.ts
```

---

### Step 2: Create DTOs

**File:** `src/article-descriptor-data-vars/dto/article-vars-response.dto.ts`

```typescript
export class ArticleVarsResponseDto {
  articleData: {
    anglzone: any[];
    anglelem: any[];
    anglprim: any[];
    anglclie: any[];
    anglgrtx: any[];
  };
  extractedVariables: string[];
  imosData: any[];
  summary: {
    totalVariablesExtracted: number;
    totalImosRecordsFound: number;
    variablesNotFoundInImos: string[];
  };
}
```

---

### Step 3: Implement Service

**File:** `src/article-descriptor-data-vars/article-descriptor-data-vars.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { ArticleDataService } from '../article-data/article-data.service';
import { ImosService } from '../imos/imos.service';
import { ArticleVarsResponseDto } from './dto/article-vars-response.dto';

@Injectable()
export class ArticleDescriptorDataVarsService {
  constructor(
    private readonly articleDataService: ArticleDataService,
    private readonly imosService: ImosService,
  ) {}

  async findByName(name: string): Promise<ArticleVarsResponseDto> {
    return this.findByNameList([name]);
  }

  async findByNameList(names: string[]): Promise<ArticleVarsResponseDto> {
    // 1. Get article data
    const articleData = await this.articleDataService.findByNameList(names);

    // 2. Extract variable names from article data
    const extractedVariables = this.extractVariableNames(articleData);

    // 3. Search IMOS for those variables
    const imosData = await this.searchImosForVariables(extractedVariables);

    // 4. Build summary
    const summary = this.buildSummary(extractedVariables, imosData);

    return {
      articleData,
      extractedVariables,
      imosData,
      summary,
    };
  }

  /**
   * Extract all variable names (without $) from article data tables
   */
  private extractVariableNames(articleData: any): string[] {
    const variableNames = new Set<string>();

    // Extract from anglclie (TAGVALUE field)
    articleData.anglclie?.forEach((row) => {
      if (row.TAGVALUE && typeof row.TAGVALUE === 'string') {
        const vars = this.extractVarsFromString(row.TAGVALUE);
        vars.forEach((v) => variableNames.add(v));
      }
    });

    // Extract from anglzone (formula fields)
    articleData.anglzone?.forEach((row) => {
      const formulaFields = [
        'LINDIV1',
        'LINDIV2',
        'LINDIVZ',
        'LFORMULA_TOP',
        'LFORMULA_BOT',
        'LFORMULA_DIV',
        'LFORMULA_DIVFRA',
      ];

      formulaFields.forEach((field) => {
        if (row[field]) {
          const vars = this.extractVarsFromString(row[field]);
          vars.forEach((v) => variableNames.add(v));
        }
      });

      // Also check dimension fields
      const dimFields = ['ZOOMFACT', 'ZOOMOFFX', 'ZOOMOFFY', 'ZOOMOFFZ'];
      dimFields.forEach((field) => {
        if (row[field]) {
          const vars = this.extractVarsFromString(row[field]);
          vars.forEach((v) => variableNames.add(v));
        }
      });
    });

    // Extract from anglprim (dimension and formula fields)
    articleData.anglprim?.forEach((row) => {
      const dimensionFields = ['SIZEX', 'SIZEY', 'SIZEZ'];
      const formulaFields = [
        'DIMCALCFX',
        'DIMCALCFY',
        'DIMCALCFZ',
        'BAFIXHFOR',
      ];
      const constraintFields = [
        'WIDTH_MIN',
        'WIDTH_MAX',
        'DEPTH_MIN',
        'DEPTH_MAX',
        'HEIGHT_MIN',
        'HEIGHT_MAX',
      ];

      [...dimensionFields, ...formulaFields, ...constraintFields].forEach(
        (field) => {
          if (row[field]) {
            const vars = this.extractVarsFromString(row[field]);
            vars.forEach((v) => variableNames.add(v));
          }
        },
      );
    });

    return Array.from(variableNames);
  }

  /**
   * Extract variable names from a string (removes $ prefix)
   * Handles: $VAR_NAME, ${VAR_NAME}, formulas like "100+$VAR1-$VAR2"
   */
  private extractVarsFromString(text: string): string[] {
    if (!text || typeof text !== 'string') {
      return [];
    }

    // Match pattern: $VARIABLE_NAME or ${VARIABLE_NAME}
    const regex = /\$\{?([A-Z_][A-Z0-9_]*)\}?/gi;
    const matches = text.match(regex);

    if (!matches) {
      return [];
    }

    // Remove $ and {} from matches
    return matches.map((match) => match.replace(/\$\{?|\}?/g, ''));
  }

  /**
   * Search IMOS table for variable names
   */
  private async searchImosForVariables(variableNames: string[]): Promise<any[]> {
    if (variableNames.length === 0) {
      return [];
    }

    // Get all IMOS records
    const allImos = await this.imosService.findAll();

    // Filter to only records where NAME matches our variable names
    const matchingRecords = allImos.filter((imos) =>
      variableNames.includes(imos.NAME),
    );

    return matchingRecords;
  }

  /**
   * Build summary statistics
   */
  private buildSummary(
    extractedVariables: string[],
    imosData: any[],
  ): {
    totalVariablesExtracted: number;
    totalImosRecordsFound: number;
    variablesNotFoundInImos: string[];
  } {
    const imosVariableNames = new Set(imosData.map((imos) => imos.NAME));
    const variablesNotFound = extractedVariables.filter(
      (varName) => !imosVariableNames.has(varName),
    );

    return {
      totalVariablesExtracted: extractedVariables.length,
      totalImosRecordsFound: imosData.length,
      variablesNotFoundInImos: variablesNotFound,
    };
  }
}
```

---

### Step 4: Implement Controller

**File:** `src/article-descriptor-data-vars/article-descriptor-data-vars.controller.ts`

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { ArticleDescriptorDataVarsService } from './article-descriptor-data-vars.service';
import { ArticleVarsResponseDto } from './dto/article-vars-response.dto';

@Controller('article-descriptor-data-vars')
export class ArticleDescriptorDataVarsController {
  constructor(
    private readonly articleDescriptorDataVarsService: ArticleDescriptorDataVarsService,
  ) {}

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<ArticleVarsResponseDto> {
    return this.articleDescriptorDataVarsService.findByName(name);
  }

  @Get('names/:names')
  async findByNameList(@Param('names') names: string): Promise<ArticleVarsResponseDto> {
    const namesArray = names.split(',').map((name) => name.trim());
    return this.articleDescriptorDataVarsService.findByNameList(namesArray);
  }
}
```

---

### Step 5: Create Module

**File:** `src/article-descriptor-data-vars/article-descriptor-data-vars.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ArticleDescriptorDataVarsService } from './article-descriptor-data-vars.service';
import { ArticleDescriptorDataVarsController } from './article-descriptor-data-vars.controller';
import { ArticleDataModule } from '../article-data/article-data.module';
import { ImosModule } from '../imos/imos.module';

@Module({
  imports: [
    ArticleDataModule,
    ImosModule,
  ],
  controllers: [ArticleDescriptorDataVarsController],
  providers: [ArticleDescriptorDataVarsService],
  exports: [ArticleDescriptorDataVarsService],
})
export class ArticleDescriptorDataVarsModule {}
```

---

### Step 6: Register Module in App

**File:** `src/app.module.ts`

```typescript
import { ArticleDescriptorDataVarsModule } from './article-descriptor-data-vars/article-descriptor-data-vars.module';

@Module({
  imports: [
    // ... existing modules
    ArticleDescriptorDataVarsModule,  // Add this
  ],
  // ...
})
export class AppModule {}
```

---

## Usage Examples

### Single NAME Query

**Request:**
```bash
GET /article-descriptor-data-vars/ANGLE_CORNER_001
```

**Response:**
```json
{
  "articleData": {
    "anglzone": [
      {
        "NAME": "ANGLE_CORNER_001",
        "TREEID": "ZONE_01",
        "LINDIV1": "100+$MARGIN",
        "LFORMULA_TOP": "$BASE_HEIGHT+50",
        ...
      }
    ],
    "anglelem": [...],
    "anglprim": [
      {
        "NAME": "ANGLE_CORNER_001",
        "SIZEX": "$WIDTH",
        "SIZEY": "$DEPTH",
        ...
      }
    ],
    "anglclie": [
      {
        "NAME": "ANGLE_CORNER_001",
        "TAGNAME": "SHELF_HEIGHT",
        "TAGVALUE": "$BASE_HEIGHT",
        ...
      }
    ],
    "anglgrtx": [...]
  },
  "extractedVariables": [
    "MARGIN",
    "BASE_HEIGHT",
    "WIDTH",
    "DEPTH"
  ],
  "imosData": [
    {
      "TYP": 100,
      "NAME": "MARGIN",
      "OPTNR": 0,
      "WERT": "20",
      "ORDERID": "",
      "CATALOG_ID": 1,
      "WORKPLAN_ID": 1
    },
    {
      "TYP": 100,
      "NAME": "BASE_HEIGHT",
      "OPTNR": 0,
      "WERT": "$VAR_S1",
      "ORDERID": "",
      "CATALOG_ID": 1,
      "WORKPLAN_ID": 1
    },
    {
      "TYP": 100,
      "NAME": "WIDTH",
      "OPTNR": 0,
      "WERT": "600",
      "ORDERID": "",
      "CATALOG_ID": 1,
      "WORKPLAN_ID": 1
    }
  ],
  "summary": {
    "totalVariablesExtracted": 4,
    "totalImosRecordsFound": 3,
    "variablesNotFoundInImos": ["DEPTH"]
  }
}
```

### Multiple NAMEs Query

**Request:**
```bash
GET /article-descriptor-data-vars/names/ANGLE_CORNER_001,ANGLE_CORNER_002
```

**Response:**
Same structure but includes data from both articles.

---

## Frontend Integration

### Example 1: Display Article Data with Variable Info

```typescript
// Fetch data
const response = await fetch('/article-descriptor-data-vars/ANGLE_CORNER_001');
const data = await response.json();

// Display article data
displayArticleData(data.articleData);

// Show which variables are used
console.log('Variables found:', data.extractedVariables);

// Show IMOS records for those variables
data.imosData.forEach(imos => {
  console.log(`${imos.NAME} = ${imos.WERT} (Type: ${imos.TYP})`);
});

// Warn about missing variables
if (data.summary.variablesNotFoundInImos.length > 0) {
  console.warn('Variables not found in IMOS:',
    data.summary.variablesNotFoundInImos);
}
```

### Example 2: Variable Lookup Table

```typescript
// Build a lookup map for quick access
const variableLookup = new Map(
  data.imosData.map(imos => [imos.NAME, imos.WERT])
);

// Use in UI
function displayValue(fieldValue: string) {
  if (fieldValue.startsWith('$')) {
    const varName = fieldValue.substring(1);
    const imosValue = variableLookup.get(varName);
    return imosValue ? `${fieldValue} (=${imosValue})` : fieldValue;
  }
  return fieldValue;
}

// Example: "$BASE_HEIGHT" becomes "$BASE_HEIGHT (=$VAR_S1)"
```

### Example 3: Variable Substitution Display

```typescript
function renderFieldWithVariables(field: string, value: string) {
  if (!value.includes('$')) {
    return value; // No variables
  }

  // Find all variable references
  const varRefs = value.match(/\$\{?([A-Z_][A-Z0-9_]*)\}?/g) || [];

  let displayValue = value;
  varRefs.forEach(ref => {
    const varName = ref.replace(/\$\{?|\}?/g, '');
    const imosRecord = data.imosData.find(i => i.NAME === varName);

    if (imosRecord) {
      // Show tooltip or inline replacement
      displayValue = displayValue.replace(
        ref,
        `<span class="variable" title="${varName}=${imosRecord.WERT}">${ref}</span>`
      );
    }
  });

  return displayValue;
}
```

---

## Advanced Features (Optional Enhancements)

### Enhancement 1: Filter IMOS by ORDERID

If you want to filter IMOS records by specific ORDERID (e.g., from article data):

```typescript
// In service
private async searchImosForVariables(
  variableNames: string[],
  orderIds?: string[]
): Promise<any[]> {
  const allImos = await this.imosService.findAll();

  let matchingRecords = allImos.filter((imos) =>
    variableNames.includes(imos.NAME)
  );

  // Optional: filter by ORDERID
  if (orderIds && orderIds.length > 0) {
    matchingRecords = matchingRecords.filter((imos) =>
      orderIds.includes(imos.ORDERID)
    );
  }

  return matchingRecords;
}
```

### Enhancement 2: Include Variable Source Location

Track where each variable was found:

```typescript
// Enhanced DTO
export class VariableSourceDto {
  variableName: string;
  sources: Array<{
    table: string;
    field: string;
    rowIndex: number;
  }>;
}

// In response
{
  // ... existing fields
  variableSources: [
    {
      variableName: "BASE_HEIGHT",
      sources: [
        { table: "anglclie", field: "TAGVALUE", rowIndex: 0 },
        { table: "anglzone", field: "LFORMULA_TOP", rowIndex: 0 }
      ]
    }
  ]
}
```

### Enhancement 3: Include Descriptor Tables

If you also want to extract from DESCRIPTOR and DESCRIPTORVALUES:

```typescript
// In module, add imports
import { DescriptorModule } from '../descriptor/descriptor.module';
import { DescriptorValuesModule } from '../descriptor-values/descriptor-values.module';

@Module({
  imports: [
    ArticleDataModule,
    ImosModule,
    DescriptorModule,        // Add
    DescriptorValuesModule,  // Add
  ],
  // ...
})

// In service constructor
constructor(
  private readonly articleDataService: ArticleDataService,
  private readonly imosService: ImosService,
  private readonly descriptorService: DescriptorService,
  private readonly descriptorValuesService: DescriptorValuesService,
) {}

// In findByNameList method
async findByNameList(names: string[]): Promise<ArticleVarsResponseDto> {
  // Get article data
  const articleData = await this.articleDataService.findByNameList(names);

  // Get descriptor data
  const descriptorData = await this.descriptorService.findAll();
  const descriptorValuesData = await this.descriptorValuesService.findAll();

  const filteredDescriptors = descriptorData.filter(d => names.includes(d.NAME));
  const filteredDescriptorValues = descriptorValuesData.filter(dv => names.includes(dv.NAME));

  // Extract variables from all sources
  const extractedVariables = [
    ...this.extractVariableNames(articleData),
    ...this.extractFromDescriptors(filteredDescriptors),
    ...this.extractFromDescriptorValues(filteredDescriptorValues),
  ];

  // Remove duplicates
  const uniqueVariables = Array.from(new Set(extractedVariables));

  // ... rest of the logic
}

// Add extraction methods
private extractFromDescriptors(descriptors: any[]): string[] {
  const vars = new Set<string>();
  descriptors.forEach(desc => {
    if (desc.SAMPDIM) {
      const extracted = this.extractVarsFromString(desc.SAMPDIM);
      extracted.forEach(v => vars.add(v));
    }
  });
  return Array.from(vars);
}

private extractFromDescriptorValues(descriptorValues: any[]): string[] {
  const vars = new Set<string>();
  descriptorValues.forEach(dv => {
    if (dv.LINDIV) {
      const extracted = this.extractVarsFromString(dv.LINDIV);
      extracted.forEach(v => vars.add(v));
    }
  });
  return Array.from(vars);
}
```

---

## Performance Considerations

### Optimization 1: Parallel Fetching

Already implemented - article data and IMOS are fetched in sequence, but you could optimize IMOS search:

```typescript
async findByNameList(names: string[]): Promise<ArticleVarsResponseDto> {
  // Fetch article data and all IMOS in parallel
  const [articleData, allImos] = await Promise.all([
    this.articleDataService.findByNameList(names),
    this.imosService.findAll(),
  ]);

  // Extract variables
  const extractedVariables = this.extractVariableNames(articleData);

  // Filter IMOS (in-memory, fast)
  const imosData = allImos.filter((imos) =>
    extractedVariables.includes(imos.NAME)
  );

  // Build summary
  const summary = this.buildSummary(extractedVariables, imosData);

  return { articleData, extractedVariables, imosData, summary };
}
```

### Optimization 2: Caching

Add caching for frequently accessed article data:

```typescript
import { Injectable, CacheInterceptor } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ArticleDescriptorDataVarsService {
  private cache = new Map<string, ArticleVarsResponseDto>();

  async findByName(name: string): Promise<ArticleVarsResponseDto> {
    // Check cache first
    const cached = this.cache.get(name);
    if (cached) {
      return cached;
    }

    // Fetch and cache
    const result = await this.findByNameList([name]);
    this.cache.set(name, result);

    // Auto-expire after 5 minutes
    setTimeout(() => this.cache.delete(name), 5 * 60 * 1000);

    return result;
  }
}
```

### Optimization 3: Selective Field Loading

If IMOS table is large, only select needed fields:

```typescript
// In ImosService, add method
async findByNames(names: string[]): Promise<any[]> {
  return this.prisma.IMOS.findMany({
    where: { NAME: { in: names } },
    select: {
      TYP: true,
      NAME: true,
      OPTNR: true,
      WERT: true,
      ORDERID: true,
      CATALOG_ID: true,
      WORKPLAN_ID: true,
      // Exclude large fields
    },
  });
}

// Use in service
const imosData = await this.imosService.findByNames(extractedVariables);
```

---

## Testing Strategy

### Unit Tests

```typescript
// article-descriptor-data-vars.service.spec.ts
describe('ArticleDescriptorDataVarsService', () => {
  it('should extract variables from anglclie TAGVALUE', () => {
    const articleData = {
      anglclie: [
        { TAGVALUE: '$VAR_S1' },
        { TAGVALUE: '100+$BASE_HEIGHT-$MARGIN' },
      ],
      // ... other tables empty
    };

    const extracted = service['extractVariableNames'](articleData);
    expect(extracted).toContain('VAR_S1');
    expect(extracted).toContain('BASE_HEIGHT');
    expect(extracted).toContain('MARGIN');
  });

  it('should extract variables from anglzone formulas', () => {
    const articleData = {
      anglzone: [
        { LINDIV1: '${WIDTH}+100', LFORMULA_TOP: '$HEIGHT' },
      ],
      // ... other tables empty
    };

    const extracted = service['extractVariableNames'](articleData);
    expect(extracted).toContain('WIDTH');
    expect(extracted).toContain('HEIGHT');
  });
});
```

### Integration Tests

```typescript
describe('ArticleDescriptorDataVarsController (e2e)', () => {
  it('/article-descriptor-data-vars/:name (GET)', () => {
    return request(app.getHttpServer())
      .get('/article-descriptor-data-vars/TEST_ARTICLE')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('articleData');
        expect(res.body).toHaveProperty('extractedVariables');
        expect(res.body).toHaveProperty('imosData');
        expect(res.body).toHaveProperty('summary');
      });
  });
});
```

---

## Implementation Checklist

- [ ] Create module directory and files
- [ ] Implement DTOs
- [ ] Implement service with variable extraction logic
- [ ] Implement controller with GET endpoints
- [ ] Create and register module
- [ ] Register module in app.module.ts
- [ ] Write unit tests for extraction logic
- [ ] Write integration tests for endpoints
- [ ] Test with real data
- [ ] Update API documentation
- [ ] Deploy and monitor

---

## API Documentation Example (Swagger)

```typescript
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('article-descriptor-data-vars')
@Controller('article-descriptor-data-vars')
export class ArticleDescriptorDataVarsController {
  @Get(':name')
  @ApiOperation({
    summary: 'Get article data with extracted variables and IMOS records',
    description: 'Fetches article data from multiple tables, extracts variable references, and returns matching IMOS records'
  })
  @ApiParam({
    name: 'name',
    description: 'Article NAME to search for',
    example: 'ANGLE_CORNER_001'
  })
  @ApiResponse({
    status: 200,
    description: 'Article data with variables and IMOS records',
    type: ArticleVarsResponseDto
  })
  async findByName(@Param('name') name: string): Promise<ArticleVarsResponseDto> {
    return this.articleDescriptorDataVarsService.findByName(name);
  }
}
```

---

## Summary

This implementation provides:
- ✅ New endpoint that collects article data
- ✅ Automatic variable extraction from all relevant fields
- ✅ IMOS record lookup for extracted variables
- ✅ Summary statistics (found/not found)
- ✅ Support for single and bulk queries
- ✅ No variable resolution (just raw IMOS records)
- ✅ Clean separation of concerns
- ✅ Reusable service pattern
- ✅ Easy to extend with descriptors if needed

The frontend receives everything it needs in one request:
1. Original article data
2. List of variables found
3. IMOS records for those variables
4. Summary of what was/wasn't found
