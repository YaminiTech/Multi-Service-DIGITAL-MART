const https = require('https');

const urls = [
    'https://dl.flipkart.com/s/bTQXF6NNNN',
    'https://dl.flipkart.com/s/b!hOcRNNNN',
    'https://dl.flipkart.com/s/bTyW74NNNN',
    'https://dl.flipkart.com/s/s!57souuuN',
    'https://dl.flipkart.com/s/s!VFPsuuuN',
    'https://dl.flipkart.com/s/sTi6vKuuuN',
    'https://dl.flipkart.com/s/sO5rxQuuuN',
    'https://dl.flipkart.com/s/b!PqbRNNNN'
];

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand)";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
    }
};

async function resolve(url) {
    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            if (res.headers.location) {
                const loc = res.headers.location;
                // Extract price from ctx if present
                const priceMatch = loc.match(/"displayPrice":"([^"]+)"/);
                const price = priceMatch ? priceMatch[1] : null;

                // Extract title from slug
                const slugMatch = loc.match(/\/dl\/([^\/]+)\/p\//);
                let title = slugMatch ? slugMatch[1].split('-').join(' ') : 'Unknown Product';
                // Capitalize
                title = title.replace(/\b\w/g, l => l.toUpperCase());

                resolve({ url, fullUrl: loc, title, price });
            } else {
                resolve({ url, error: 'No location header', status: res.statusCode });
            }
        }).on('error', (err) => {
            resolve({ url, error: err.message });
        });
    });
}

async function main() {
    const results = await Promise.all(urls.map(resolve));
    console.log(JSON.stringify(results, null, 2));
}

main();
