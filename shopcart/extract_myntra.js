const https = require('https');

const urls = [
    'https://www.myntra.com/mailers/watches/timex/timex-women-bracelet-style-straps-analogue-watch-twel99smu09/22744346/buy',
    'https://www.myntra.com/mailers/bags/sangria/sangria-embellished-box-clutch/31698140/buy',
    'https://www.myntra.com/mailers/shoes/dressberry/dressberry-women-loafers/31589268/buy',
    'https://www.myntra.com/mailers/skin-care/dr.-sheths/dr.-sheths-glow-&-protect-ceramide-&-vitamin-c-sunscreen-&-oil-free-moisturizer-50g-each/30790076/buy',
    'https://www.myntra.com/mailers/hair/loreal-professionnel/loreal-professionnel-absolut-repair-shampoo-+-mask-+-hair-serum-set-with-protein-&-omega-9/17790532/buy',
    'https://www.myntra.com/mailers/appliances/vega/vega-men-vhth-32-9-in-1-pro-multi-grooming-trimmer---gunmetal-toned-&-black/23304952/buy',
    'https://www.myntra.com/mailers/appliances/dyson/dyson-supersonic-nural-hair-dryer-with-heat-control---vinca-blue/topaz/30806996/buy',
    'https://www.myntra.com/mailers/topwear/banana-club/banana-club-x--united-colors-of-benetton-regular-fit-casual-shirt-with-perfume-gift-box/39750052/buy',
    'https://www.myntra.com/mailers/home-furnishing/nestasia/nestasia-purple-&-cream-floral-embroidered-cotton-square-cushion-cover/27039812/buy',
    'https://www.myntra.com/mailers/home-decor/behoma/behoma-gold-toned-small-fluted-metal-planter-with-stand/31111502/buy'
];

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
};

async function fetchMyntra(url) {
    return new Promise((resolve) => {
        https.get(url, options, (res) => {
            if (res.headers.location) {
                const nextUrl = res.headers.location.startsWith('http') ? res.headers.location : 'https://www.myntra.com' + res.headers.location;
                console.error(`Redirecting ${url} to ${nextUrl}`);
                return resolve(fetchMyntra(nextUrl));
            }
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const title = data.match(/property="og:title" content="([^"]+)"/)?.[1];
                const image = data.match(/property="og:image" content="([^"]+)"/)?.[1];
                const price = data.match(/"price":(\d+)/)?.[1] || data.match(/"amount":(\d+)/)?.[1];
                resolve({
                    url,
                    title: title ? title.replace('| Myntra', '').trim() : null,
                    image,
                    price: price ? `₹${price}` : null
                });
            });
        }).on('error', (err) => resolve({ url, error: err.message }));
    });
}

async function main() {
    const results = await Promise.all(urls.map(fetchMyntra));
    console.log(JSON.stringify(results, null, 2));
}

main();
