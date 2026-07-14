const https = require('https');

const url = 'https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22744346/2023/4/12/35c44f8a-4d4b-4402-8a9d-9a99c9c8e1e71681289564619TimexWomenSilver-TonedAnalogueWatchTWEL99SMU091.jpg';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
};

https.get(url, options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Headers:', JSON.stringify(res.headers, null, 2));
    if (res.statusCode === 200) {
        console.log('Success: Image can be fetched without referer.');
    } else {
        console.log('Failed: Image blocked even without referer.');
    }
}).on('error', (err) => {
    console.error('Error:', err.message);
});
