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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0'
    }
};

async function fetchProduct(url) {
    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return resolve(fetchProduct(res.headers.location));
            }
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                // Flipkart selectors often change, but common patterns:
                // Title: <span class="VU-ZEz"> or <h1 class="yhB1nd">
                // Price: <div class="Nx9bqj C-L9_y">
                // Image: look for <img class="DByo9Z"> or within <div class="_68.">

                const titleMatch = data.match(/<span class="VU-ZEz">([\s\S]*?)<\/span>/) || data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
                const priceMatch = data.match(/<div class="Nx9bqj[^>]*>([\s\S]*?)<\/div>/);

                // Images are tricky, let's look for large jpg/webp URLs
                const imageMatches = data.match(/https:\/\/rukminim2\.flixcart\.com\/image\/\d+\/\d+\/[^"]+?\.jpeg/g) || [];
                // Filter for larger images if possible
                const bestImage = imageMatches.find(img => img.includes('/image/')) || null;

                resolve({
                    url,
                    title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&').trim() : 'Unknown Product',
                    price: priceMatch ? priceMatch[1].trim() : 'N/A',
                    image: bestImage
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
