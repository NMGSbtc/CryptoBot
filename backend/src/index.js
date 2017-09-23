import express from 'express';
import coinbase from 'coinbase';
// import app from './app';
// server.use('/hello', app);

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req,res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});

export default app;
