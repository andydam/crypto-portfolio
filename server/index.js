const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getCoinListHandler = require('./requestHandlers/getCoinList');
const getOrderListHandler = require('./requestHandlers/getOrderList');
const getOrderStatsListHandler = require('./requestHandlers/getOrderStatsList');
const getTotalStatsHandler = require('./requestHandlers/getTotalStats');
const addBuyHandler = require('./requestHandlers/addBuy');
const removeBuyOrder = require('./requestHandlers/removeBuy');

app.use('/server/addBuyOrder', bodyParser.json());
app.use('/server/removeBuyOrder', bodyParser.json());

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

app.get('/server/getOrderStatsList', getOrderStatsListHandler);

app.get('/server/getTotalStats', getTotalStatsHandler);

app.post('/server/addBuyOrder', addBuyHandler);

app.post('/server/removeBuyOrder', removeBuyOrder);

app.listen(process.env.PORT || 3000, console.log(`crypto-portfolio listening on port ${process.env.PORT || 3000}`));