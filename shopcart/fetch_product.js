const https = require('https');

const urls = [
    'https://amzn.in/d/0fDREBQx',
    'https://amzn.in/d/06Yph0Fk',
    'https://amzn.in/d/0fqeVKoR',
    'https://amzn.in/d/0jekLDr8',
    'https://amzn.in/d/026K3eep',
    'https://amzn.in/d/0guffYqU',
    'https://amzn.in/d/08brzXs5',
    'https://amzn.in/d/073C7553',
    'https://amzn.in/d/0aqwCDxW',
    'https://amzn.in/d/0iIEVDta'
];

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0'
    }
};

async function fetchProduct(url) {
    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            // Handle redirect
            if (res.statusCode === 301 || res.statusCode === 302) {
                return resolve(fetchProduct(res.headers.location));
            }
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const titleMatch = data.match(/<span id="productTitle"[^>]*>([\s\S]*?)<\/span>/);
                const priceMatch = data.match(/<span class="a-price-whole">([\s\S]*?)<\/span>/);
                const imageMatch = data.match(/data-old-hires="([^"]+)"/);
                const imageMatch2 = data.match(/"large":"([^"]+)"/);

                resolve({
                    url,
                    title: titleMatch ? titleMatch[1].trim() : 'Unknown Title',
                    price: priceMatch ? '₹' + priceMatch[1].trim() : 'N/A',
                    image: imageMatch ? imageMatch[1].trim() : (imageMatch2 ? imageMatch2[1].trim() : null)
                });
            });
        }).on('error', (err) => {
            resolve({ url, error: err.message });
        });
    });
}

async function main() {
    const results = await Promise.all(urls.map(fetchProduct));
    console.log(JSON.stringify(results, null, 2));
}

main();
