import { Injectable } from '@nestjs/common';
import {AnglzoneService} from "../anglzone/anglzone.service";
import {DescriptorValuesService} from "../descriptor-values/descriptor-values.service";

@Injectable()
export class ArticleCollectorService {

    constructor(
        private readonly anglZoneService: AnglzoneService,
        private readonly descriptorValuesService: DescriptorValuesService
    ) {}

    async articlesCollector(articleNames: string | string[]) {
        // Convert to array if string is passed
        const initialArticles = Array.isArray(articleNames) ? articleNames : [articleNames];
        const visitedArticles = new Set<string>();
        const visitedArticleDescriptors = new Set<string>();
        const resolvedDescriptors = new Set<string>();
        const articleQueue = [...initialArticles]; // Start with all articles

        while (articleQueue.length > 0) {
            const currentArticle = articleQueue.shift()!;

            if (visitedArticles.has(currentArticle)) {
                continue;
            }

            visitedArticles.add(currentArticle);

            // Fetch angle zone data
            const angZone = await this.anglZoneService.findByName(currentArticle);

            // Collect articles and descriptors
            angZone.forEach((az) => {
                const { DIVDIR, DIVIDER } = az;

                if (DIVDIR === 'A') {
                    if (DIVIDER?.startsWith('#')) {
                        visitedArticleDescriptors.add(DIVIDER.substring(1));
                    } else if (DIVIDER) {
                        articleQueue.push(DIVIDER);
                    }
                }
            });

            // Resolve new descriptors in batch
            const newDescriptors = Array.from(visitedArticleDescriptors).filter(
                desc => !resolvedDescriptors.has(desc)
            );

            if (newDescriptors.length > 0) {
                // Mark all as resolving
                newDescriptors.forEach(desc => resolvedDescriptors.add(desc));

                // Fetch all descriptor values in parallel
                const allDescriptorValues = await Promise.all(
                    newDescriptors.map(desc =>
                        this.descriptorValuesService.findByDescriptorName(desc)
                    )
                );

                // Extract all article names
                const newArticles = allDescriptorValues
                    .flat()
                    .map(value => value.LINDIV)
                    .filter(article => article && !visitedArticles.has(article));

                // Add to queue
                articleQueue.push(...newArticles);
            }
        }

        return {
            articleList: Array.from(visitedArticles),
            articleDescriptorList: Array.from(visitedArticleDescriptors),
        };
    }
}
