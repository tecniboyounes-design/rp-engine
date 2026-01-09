import {CsideTypes} from "../cside/dto/cside.types";
import {CabinTypes} from "../cabin/dto/cabin.types";

export default function KmsCollector(anglelemData: Array<CsideTypes>, cabinData: Array<CabinTypes>){
    const kmsSet = new Set<string>();
    anglelemData.forEach(cside => {
        const currentKms = cside.KMS
        if (currentKms != ''){
            kmsSet.add(currentKms);
        }
    })

    cabinData.forEach((cabin)=>{
        const currentKms = cabin.KMS
        if (currentKms != ''){
            kmsSet.add(currentKms);
        }
    })

    return Array.from(kmsSet);
}