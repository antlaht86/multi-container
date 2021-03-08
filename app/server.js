'use strict';

const express = require('express');
const redisClient = require('./redis-client');

// Constants
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/store/:key', async (req, res) => {
    const { key } = req.params;
    const value = req.query;
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Success');
});

app.get('/:key', async (req, res) => {
    const { key } = req.params;
    console.log("key", key)

    const rawData = await redisClient.getAsync(key);
    console.log(rawData)
    return res.json(JSON.parse(rawData));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
