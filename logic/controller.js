const config = require('../config');
const service = require('./service');
const cacheService = require('../services/cache.service');

async function startFlow(initialUrl) {
    try {
        const currentPage = cacheService.getCrawlerPageFormat(initialUrl, null, 0)
        cacheService.addPagesToCrawl(currentPage);
        //
        while (true) {
            const nextPageToCrawl = cacheService.getNextPageToCrawl();
            if (!nextPageToCrawl) {
                console.log('DONE - no pages to crawl anymore');
                break;
            }
            if (nextPageToCrawl.level > config.MAX_LEVEL_DEEP) {
                console.log('DONE - max level of pages reached');
                break;
            }
            await crawlNextPage(nextPageToCrawl);
        }
        const analyzedResults = service.analyzeResults();
        return analyzedResults;
    } catch (err) {
        throw err;
    }
}

async function crawlNextPage(nextPageToCrawl) {
    const pageHtml = await service.getPageHtml(nextPageToCrawl.url);
    const pageLinks = service.getPageLinks(pageHtml);
    const pagesToCrawl = pageLinks.map(pageLink => cacheService.getCrawlerPageFormat(pageLink, nextPageToCrawl.url, nextPageToCrawl.level + 1));
    cacheService.addPagesToCrawl(pagesToCrawl);
    //
    cacheService.addPagesCrawled(nextPageToCrawl);
    console.log(`crawled page ${nextPageToCrawl.url}, found ${pagesToCrawl.length} more pages to crawl, level: ${nextPageToCrawl.level}`);
}

module.exports = {
    startFlow,
};
