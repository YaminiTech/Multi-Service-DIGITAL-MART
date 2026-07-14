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

async function resolve(url) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                resolve({ url, location: res.headers.location, statusCode: res.statusCode });
            } else {
                resolve({ url, location: null, statusCode: res.statusCode });
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
