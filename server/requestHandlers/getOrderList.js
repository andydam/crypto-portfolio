const db = require('../db');

module.exports = (req, res) => {
  console.log('GET request for orders list');
  return db.orders.get()
    .then(list => res.status(200).send(JSON.stringify(list)))
    .catch(err => res.status(500).send(JSON.stringify(err)));
};