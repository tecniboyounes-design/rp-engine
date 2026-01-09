import {Injectable} from '@nestjs/common';
import {AnglzoneService} from '../anglzone/anglzone.service';
import {AnglelemService} from '../anglelem/anglelem.service';
import {AnglclieService} from '../anglclie/anglclie.service';
import {AnglprimService} from '../anglprim/anglprim.service';
import {AnglgrtxService} from "../anglgrtx/anglgrtx.service";
import {ArticleCollectorService} from "../article-collector/article-collector.service";
import {DescriptorDataService} from "../descriptor-data/descriptor-data.service";
import {getDescriptorFromElement} from "../descriptor/helpers/DescriptorHelper";
import {ImosService} from "../imos/imos.service";
import {collectVarsFromData} from "../imos/helpers/VariableCollector";
import {CsideService} from "../cside/cside.service";
import {CpCollector} from "../general-helper/CpCollector";
import KmsCollector from "../general-helper/KmsCollector";
import {KmsService} from "../kms/kms.service";
import {CabinService} from "../cabin/cabin.service";
import {MatSurfFromKmsCollector, MatSurfFromVariablesCollector} from "../general-helper/DefaultMatCollector";
import {MaterialDataService} from "../material-data/material-data.service";
import {SurfaceDataService} from "../surface-data/surface-data.service";

@Injectable()
export class ArticleDataService {
    constructor(
        private readonly anglprimService: AnglprimService,
        private readonly anglzoneService: AnglzoneService,
        private readonly anglelemService: AnglelemService,
        private readonly anglclieService: AnglclieService,
        private readonly anglgrtxService: AnglgrtxService,
        private readonly articleCollectorService: ArticleCollectorService,
        private readonly descriptorData: DescriptorDataService,
        private readonly imosService: ImosService,
        private readonly cside:CsideService,
        private readonly kmsService:KmsService,
        private readonly cabinService:CabinService,
        private readonly materialDataService:MaterialDataService,
        private readonly surfaceDataService:SurfaceDataService
    ) {
    }

    async findByNames(NAME: string[]) {
        const articleListResult = await this.articleCollectorService.articlesCollector(NAME);
        const articleNameList = articleListResult.articleList

        const [anglprimData, anglzoneData, anglelemData, anglclieData, anglgrtxData] = await Promise.all([
            this.anglprimService.findByNames(articleNameList),
            this.anglzoneService.findByNames(articleNameList),
            this.anglelemService.findByNames(articleNameList),
            this.anglclieService.findByNames(articleNameList),
            this.anglgrtxService.findByNames(articleNameList),
        ]);

        const descriptorNames = getDescriptorFromElement(anglelemData, anglzoneData);
        const descriptorData = await this.descriptorData.findByNames(descriptorNames);

        const {sides, shelves} = CpCollector(anglelemData, anglzoneData)

        const csideData = await this.cside.findByNames(sides)
        const cabinData = await this.cabinService.findByNames(shelves)

        const kmsInCPs = KmsCollector(csideData, cabinData)
        const kmsData = await this.kmsService.findByNames(kmsInCPs)

        const {kmsMatNames, kmsSurfNames} = MatSurfFromKmsCollector(kmsData)
        const matFromKms = await this.materialDataService.findByNames(kmsMatNames)
        const surfFromKms = await this.surfaceDataService.findByNames(kmsSurfNames)

        const variableNames = collectVarsFromData([anglprimData, anglzoneData, anglelemData, anglclieData, anglgrtxData, descriptorData, csideData, kmsData, matFromKms, surfFromKms]);
        const variables = await this.imosService.findByNamesRecursive(variableNames)

        const {varMatNames, varSurfNames} = MatSurfFromVariablesCollector(variables)
        const defaultMat = await this.materialDataService.findByNames([...varMatNames, ...kmsMatNames])
        const defaultSurf = await this.surfaceDataService.findByNames([...varSurfNames, ...kmsSurfNames])

        return {
            anglzone: anglzoneData,
            anglelem: anglelemData,
            anglprim: anglprimData,
            anglclie: anglclieData,
            anglgrtx: anglgrtxData,
            descriptors : descriptorData,
            variables : variables,
            cside:csideData,
            kms:kmsData,
            cabin:cabinData,
            materials:defaultMat,
            surfaces:defaultSurf
        };
    }
}
