// filter-schema.js
const fs = require('fs');

const schemaPath = './prisma/schema.prisma';
const keepTables = ['CABBACK','CABIN','CONDITIONS','CONDITIONSCOMPARISONS','CONDITIONSOPERATIONS','CONDITIONSPRINCIPLE','COSTCENTER','CSIDE','DESCRIPTOR','DESCRIPTORVALUES','DOOR','DOORSING','DRAWERSING','DRAWERZONE','DR_FRONT','IMOS','KMS','MAT','SURF','WORKPLAN','WORKPLANDEF','WORKSTEP','anglelem','anglprim','anglzone','articles','anglclie','anglgrtx']; // Tables to keep

const schema = fs.readFileSync(schemaPath, 'utf8');
const models = schema.split('model ');

const filtered = [models[0]]; // Keep header (datasource, generator)

models.slice(1).forEach(model => {
    const modelName = model.split(' ')[0];
    if (keepTables.includes(modelName)) {
        filtered.push('model ' + model);
    }
});

fs.writeFileSync(schemaPath, filtered.join(''));
console.log('Schema filtered successfully!');

