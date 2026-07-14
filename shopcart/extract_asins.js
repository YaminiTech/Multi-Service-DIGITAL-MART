const https = require('https');

const asins = [
    'B0CD4F32PS', // Sunset Lamp
];

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
};

async function fetchAmazon(asin) {
    const url = `https://www.amazon.in/dp/${asin}`;
    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const imageMatch = data.match(/data-old-hires="([^"]+)"/) || data.match(/"large":"([^"]+)"/);
                resolve({ asin, image: imageMatch ? imageMatch[1] : null });
            });
        }).on('error', (err) => resolve({ asin, error: err.message }));
    });
}

async function main() {
    const results = await Promise.all(asins.map(fetchAmazon));
    console.log(JSON.stringify(results, null, 2));
}

main();
