const db = require('../db');
const cc = require('../api/cryptocompare');

module.exports = (req, res) => {
  console.log('GET request for total stats');
  return db.orders.get()
    .then(list => Promise.all(list.map(order => cc.getCoinData(order.coin)
      .then(stats => ({
        startingValue: Number(order['price']),
        currentValue: Number(stats['PRICE'] * order['amount']),
      })))))
    .then(stats => stats.reduce((prev, curr) => ({
      startingValue: Number((prev.startingValue + curr.startingValue).toFixed(2)),
      currentValue: Number((prev.currentValue + curr.currentValue).toFixed(2))
    })))
    .then(stats => ({
      startingValue: stats.startingValue,
      currentValue: stats.currentValue,
      percentChange: (((Number(stats.currentValue) - Number(stats.startingValue)) / Number(stats.startingValue)) * 100).toFixed(2)
    }))
    .then(stats => res.status(200).send(JSON.stringify(stats)))
    .catch(err => res.status(500).send(JSON.stringify(err.message)));
};