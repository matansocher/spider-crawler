const _ = require('lodash');

let pagesToCrawl = [];
let pagesCrawled = [];

function getCrawlerPageFormat(url, ancestor, level) {
    return { url, ancestor, level }
}

function addPagesToCrawl(pages) {
    pagesToCrawl = _.concat(pagesToCrawl, pages);
}

function getPagesToCrawl() {
    return pagesToCrawl;
}

function addPagesCrawled(pageCrawled) {
    pagesCrawled = _.concat(pagesCrawled, pageCrawled);
}

function getPagesCrawled() {
    return pagesCrawled;
}

function getNextPageToCrawl() {
    return pagesToCrawl.shift();
}

module.exports = {
    getCrawlerPageFormat,
    addPagesToCrawl,
    getPagesToCrawl,
    addPagesCrawled,
    getPagesCrawled,
    getNextPageToCrawl,
};
