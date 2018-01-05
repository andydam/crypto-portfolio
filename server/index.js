const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getCoinListHandler = require('./requestHandlers/getCoinList');
const getOrderListHandler = require('./requestHandlers/getOrderList');
const addBuyHandler = require('./requestHandlers/addBuy');

app.use('/server/addBuyOrder', bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.path}`);
  if (req.body) {
    console.log(`data: ${JSON.stringify(req.body, 2)}`);
  }
  next();
});

app.use(express.static(__dirname + '/../client/dist'));

app.get('/server/getCoinList', getCoinListHandler);

app.get('/server/getOrderList', getOrderListHandler);

app.post('/server/addBuyOrder', addBuyHandler);

app.listen(process.env.PORT || 3000, console.log(`crypto-portfolio listening on port ${process.env.PORT || 3000}`));