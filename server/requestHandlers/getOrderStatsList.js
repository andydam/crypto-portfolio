const db = require('../db');
const cc = require('../api/cryptocompare');

module.exports = (req, res) => {
  console.log('GET request for orders stats list');
  return db.orders.get()
    .then(list => Promise.all(list.map(order => cc.getCoinData(order.coin)
      .then(stats => ({
        id: order['id'],
        coin: stats['FROMSYMBOL'],
        currentValue: (stats['PRICE'] * order['amount']).toFixed(2),
        percentChange: ((stats['PRICE'] * order['amount'] / order['price']) * 100).toFixed(2),
        percentChangeToday: (stats['CHANGEPCT24HOUR']).toFixed(2)
      })))))
    .then(list => res.status(200).send(JSON.stringify(list)))
    .catch(err => res.status(500).send(JSON.stringify(err)));
};