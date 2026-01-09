import {AnglelemTypes} from "../../anglelem/dto/anglelem.types";
import {AnglzoneTypes} from "../../anglzone/dto/anglzone.types";

export function getDescriptorFromElement(
    anglelemData: Array<AnglelemTypes>,
    anglzoneData: Array<AnglzoneTypes>
): string[] {
    const descriptorNamesSet = new Set<string>();

    const extractDescriptors = (str?: string | null) => {
        if (str?.startsWith('#')) {
            descriptorNamesSet.add(str.substring(1));
        }
    };

    // Extract from anglzone fields
    anglzoneData.forEach((az) => {
        extractDescriptors(az.DIVIDER);
        extractDescriptors(az.LINDIV1);
        extractDescriptors(az.TOPSHELF);
        extractDescriptors(az.BOTSHELF);
    });

    // Extract from anglelem CPNAME
    anglelemData.forEach((ale) => {
        extractDescriptors(ale.CPNAME);
    });

    return Array.from(descriptorNamesSet);
}