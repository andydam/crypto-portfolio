const db = require('../db');

module.exports = (req, res) => {
  console.log('POST request to add buy order');
  console.log(`POSTING order of ${req.body.amount} ${req.body.coin} bought for ${req.body.price}`);
  req.body['id'] = Date.now();
  return db.orders.post(req.body)
    .then(buy => res.status(200).send(JSON.stringify(buy)))
    .catch(err => res.status(500).send(JSON.stringify(err)));
};