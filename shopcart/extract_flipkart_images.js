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
        'Cache-Control': 'no-cache'
    }
};

async function fetchWithRedirect(url) {
    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            if (res.headers.location) {
                const newUrl = res.headers.location.startsWith('http') ? res.headers.location : 'https://www.flipkart.com' + res.headers.location;
                console.error(`Redirecting to: ${newUrl}`);
                return resolve(fetchWithRedirect(newUrl));
            }
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const results = {
                    url,
                    title: null,
                    price: null,
                    image: null
                };

                // Try to find image in meta tags or script
                const ogImage = data.match(/property="og:image" content="([^"]+)"/);
                if (ogImage) results.image = ogImage[1];

                // Alternative: look for large image URLs in script tags or body
                if (!results.image) {
                    const imgMatch = data.match(/https:\/\/rukminim[12]\.flixcart\.com\/image\/\d+\/\d+\/[^"]+?\.jpeg/);
                    if (imgMatch) results.image = imgMatch[0];
                }

                // Try to find title
                const ogTitle = data.match(/property="og:title" content="([^"]+)"/);
                if (ogTitle) results.title = ogTitle[1];

                // Try to find price
                const priceMatch = data.match(/"price":(\d+)/) || data.match(/₹(\d{1,3}(,\d{3})*)/);
                if (priceMatch) results.price = priceMatch[1] || priceMatch[0];

                resolve(results);
            });
        }).on('error', (err) => {
            resolve({ url, error: err.message });
        });
    });
}

async function main() {
    const results = await Promise.all(urls.map(fetchWithRedirect));
    console.log(JSON.stringify(results, null, 2));
}

main();
