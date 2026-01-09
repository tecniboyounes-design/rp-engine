import {AnglelemTypes} from "../anglelem/dto/anglelem.types";
import {hasDescriptor, hasVars} from "./GenralHelper";
import {elemPartType} from "../anglelem/dto/constants";
import {AnglzoneTypes} from "../anglzone/dto/anglzone.types";

export function CpCollector(anglelemData: Array<AnglelemTypes>, anglZoneData:Array<AnglzoneTypes>) {
    const sidePanels = new Set<string>()
    const shelves = new Set<string>()
    anglelemData
        .filter(anglelem =>
            anglelem.CPNAME &&
            !hasVars(anglelem.CPNAME) &&
            !hasDescriptor(anglelem.CPNAME) &&
            anglelem.PARTTYPE === elemPartType.sidePanel
        )
        .forEach(anglelem => sidePanels.add(anglelem.CPNAME));

    anglZoneData.forEach((anglZone)=>{
        [anglZone.TOPSHELF, anglZone.BOTSHELF, anglZone.DIVIDER]
            .filter(shelf => shelf !== '' && !hasVars(shelf) && !hasDescriptor(shelf))
            .forEach(shelf => shelves.add(shelf));
    })
    return {
        sides : Array.from(sidePanels),
        shelves : Array.from(shelves)
    }
}
