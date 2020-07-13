const RSSParser = require('rss-parser');
let parser = new RSSParser({
        customFields: {
                item: [
                        ['media:content', 'mediaContent'],
                ]
        }
});

export async function getNews(url) {
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        return await parser.parseURL(CORS_PROXY + url);
}
