import express from 'express';
import {Client} from 'coinbase';
import fetch from 'node-fetch';
import kraken from 'kraken-api';
require('dotenv').config();
// import app from './app';
// server.use('/hello', app);

const app = express();
const coinbaseClient = new Client({
  'apiKey': process.env.COINBASE_API_KEY,
  'apiSecret': process.env.COINBASE_API_SECRET,
  'version': '2017-09-23'
});
const krakenClient = new kraken(process.env.KRAKEN_API_KEY, process.env.KRAKEN_API_SECRET);


const port = process.env.PORT || 4000;

app.get('/coinbase', (req, res) => {
  client.getBuyPrice({
    'currencyPair': 'BTC-USD'
  }, (err, obj) => {
    res.json({'amount': obj.data.amount});
  });
})

app.get('/gemini', (req, res) => {
  const url = "https://api.gemini.com/v1/pubticker/btcusd";
  fetch(url)
    .then(response => {
      response.json().then(json => {
        res.json({'amount': json.last});
      });
    })
    .catch(error => {
      console.log(error);
    });
})

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
  console.log(process.env.API_KEY);
});

export default app;