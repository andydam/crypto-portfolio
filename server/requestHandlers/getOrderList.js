const db = require('../db');
const cc = require('../api/cryptocompare');

module.exports = (req, res) => {
  console.log('GET request for orders list');
  return db.orders.get()
    .then(list => Promise.all(list.map(order => cc.getCoinData(order.coin)
      .then(data => [order, data]))))
    .then(list => res.status(200).send(JSON.stringify(list)))
    .catch(err => res.status(500).send(JSON.stringify(err)));
};