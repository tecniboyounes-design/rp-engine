import {Injectable} from '@nestjs/common';
import {AnglzoneService} from "../anglzone/anglzone.service";
import {AnglelemService} from "../anglelem/anglelem.service";
import {ArticleCollectorService} from "../article-collector/article-collector.service";

@Injectable()
export class DescriptorCollectorService {
    constructor(
        private readonly articleCollectorService: ArticleCollectorService,
        private readonly anglzoneService: AnglzoneService,
        private readonly anglelemService: AnglelemService,
    ) {}

    async collectDescriptorsNamesFromArticles(articleNames: string | string[]) {
        const inputArticles = Array.isArray(articleNames) ? articleNames : [articleNames];

        const articleListResult = await this.articleCollectorService.articlesCollector(inputArticles);
        const articleNameList = articleListResult.articleList;

        if (articleNameList.length === 0) {
            return {
                descriptorNames: [],
                expandedArticleList: [],
            };
        }

        const descriptorNamesSet = new Set<string>();

        const [anglzoneData, anglelemData] = await Promise.all([
            this.anglzoneService.findByNames(articleNameList),
            this.anglelemService.findByNames(articleNameList),
        ]);

        // Helper function to extract descriptor names
        const extractDescriptors = (str?: string) => {
            if (str?.startsWith('#')) {
                descriptorNamesSet.add(str.substring(1));
            }
        };

        // Process data
        anglzoneData.forEach((az) => {
            extractDescriptors(az.DIVIDER);
            extractDescriptors(az.TOPSHELF);
            extractDescriptors(az.BOTSHELF);
        });

        anglelemData.forEach((ale) => {
            extractDescriptors(ale.CPNAME);
        });

        return {
            descriptorNames: Array.from(descriptorNamesSet), // Convert to array
            expandedArticleList: articleNameList,
        };
    }
}