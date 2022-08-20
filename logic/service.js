const _ = require('lodash');
const got = require('got');
const cheerio = require('cheerio');
const validUrl = require('valid-url');
const URL = require('url');
const config = require('../config');
const cacheService = require('../services/cache.service');
const commonService = require('../services/common.service');

async function getPageHtml(pageUrl) {
    try {
        const res = await got(pageUrl);
        return res.body;
    } catch (err) {
        const errorMessage = commonService.getErrorMessage(err);
        console.error(`getPageHtml on page ${pageUrl}, err: ${errorMessage}`);
        return '';
    }
}

function getPageLinks(pageHtml) {
    const $ = cheerio.load(pageHtml);
    const aTags = $('a');
    //
    const urls = Object.values(aTags)
        .map(aTag => {
            const href = aTag?.attribs?.href || '';
            const shouldAddHref = isValidHref(href);
            return shouldAddHref ? href : null;
        }).filter(url => !_.isNil(url));
    //
    return urls;
}

function isValidHref(href) {
    if (!href) {
        return false;
    }
    //
    const startsWithHttps = href.startsWith('https');
    //
    const isValidUrl = validUrl.isUri(href);
    //
    const hrefBeginning = href.substr(0, config.NUM_OF_CHARS_FOR_SIMILAR_URL);
    const hasAlreadyCrawled = cacheService.getPagesCrawled().some(pageCrawled => {
        return pageCrawled.url.startsWith(hrefBeginning);
    });
    const aboutToBeCrawled = cacheService.getPagesToCrawl().some(pageToCrawl => {
        return pageToCrawl.url.startsWith(hrefBeginning);
    });
    //
    return startsWithHttps && isValidUrl && !hasAlreadyCrawled && !aboutToBeCrawled;
}

function analyzeResults() {
    const pagesCrawled = cacheService.getPagesCrawled();
    const groupedByDomain = groupByDomain(pagesCrawled);
    return groupedByDomain;
}

function groupByDomain(pagesCrawled) {
    const groupedByDomain = {};
    const groupedByDomainCount = {};
    //
    pagesCrawled.forEach(pageCrawled => {
        const pageCrawledDomain = URL.parse(pageCrawled.url).hostname
        if (groupedByDomain[pageCrawledDomain]) {
            groupedByDomain[pageCrawledDomain].push(pageCrawled);
        } else {
            groupedByDomain[pageCrawledDomain] = [pageCrawled]
        }
    });
    //
    Object.keys(groupedByDomain).forEach(domain => {
        groupedByDomainCount[domain] = groupedByDomain[domain].length;
    });
    //
    return {
        groupedByDomain,
        groupedByDomainCount,
    };
}

module.exports = {
    getPageHtml,
    getPageLinks,
    analyzeResults,
};
