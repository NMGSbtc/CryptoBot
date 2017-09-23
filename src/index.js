import express from 'express';
import {Client} from 'coinbase';
require('dotenv').config();
// import app from './app';
// server.use('/hello', app);

const app = express();
const client = new Client({
  'apiKey': process.env.API_KEY,
  'apiSecret': process.env.API_SECRET,
  'version':'2017-09-23'
});
const port = process.env.PORT || 4000;

app.get('/', (req,res) => {
  client.getBuyPrice({'currencyPair': 'BTC-USD'}, (err, obj) => {
    res.send('total amount: ' + obj.data.amount);
  });
})

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
  console.log(process.env.API_KEY);
});

export default app;
