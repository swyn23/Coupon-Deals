const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

// Coupon sources to scrape
const COUPON_SOURCES = [
    'https://www.example.com/amazon-coupons',
    'https://www.example.com/student-deals'
];

async function scrapeCoupons() {
    let coupons = [];
    
    for (const source of COUPON_SOURCES) {
        try {
            const response = await axios.get(source);
            const $ = cheerio.load(response.data);
            
            // Implement scraping logic based on the website structure
            $('.coupon-item').each((i, el) => {
                coupons.push({
                    store: $(el).find('.store-name').text(),
                    code: $(el).find('.coupon-code').text(),
                    discount: $(el).find('.discount').text(),
                    expiryDate: $(el).find('.expiry').text(),
                    rakutenLink: $(el).find('.affiliate-link').attr('href'),
                    lastVerified: new Date().toISOString()
                });
            });
        } catch (error) {
            console.error(`Error scraping ${source}:`, error);
        }
    }
    
    return coupons;
}

// API endpoint to get coupons
app.get('/api/coupons', async (req, res) => {
    try {
        const coupons = await scrapeCoupons();
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch coupons' });
    }
});

app.listen(3000, () => {
    console.log('Coupon API server running on port 3000');
});