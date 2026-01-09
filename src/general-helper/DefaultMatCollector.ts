import {ImosTypes} from "../imos/dto/imos.types";
import {KmsTypes} from "../kms/dto/kms.types";

export function MatSurfFromKmsCollector(kmsData: Array<KmsTypes>){
    const matNames = new Set<string>();
    const surfNames = new Set<string>();

    // Collect from kmsData
    for (const kms of kmsData) {
        // Add materials
        if (kms.MATERIAL && !kms.MATERIAL.includes('$')) {
            matNames.add(kms.MATERIAL);
        }

        // Add surfaces
        if (kms.SURF0 && !kms.SURF0.includes('$')) {
            surfNames.add(kms.SURF0);
        }
        if (kms.SURF1 && !kms.SURF1.includes('$')) {
            surfNames.add(kms.SURF1);
        }
    }

    return {
        kmsMatNames: Array.from(matNames),
        kmsSurfNames: Array.from(surfNames)
    }
}

export function MatSurfFromVariablesCollector(variables: Array<ImosTypes>){
    const matNames = new Set<string>();
    const surfNames = new Set<string>();
    // Collect from variables
    for (const variable of variables) {
        if (variable.WERT.startsWith('$')) continue;

        if (variable.TYP === 4) {
            matNames.add(variable.WERT);
        } else if (variable.TYP === 3) {
            surfNames.add(variable.WERT);
        }
    }

    return {
        varMatNames: Array.from(matNames),
        varSurfNames: Array.from(surfNames)
    }
}