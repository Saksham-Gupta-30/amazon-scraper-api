const express = require('express');
const request = require('request-promise');

const generateScraperUrl = (api_key) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scrapper API.');
});

// GET PRODUCT DETAILS
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

// GET SEARCH RESULTS
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));