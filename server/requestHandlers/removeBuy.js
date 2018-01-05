const db = require('../db');

module.exports = (req, res) => {
  console.log('POST request to remove buy order');
  console.log(`removing order id ${req.body.id}`);
  return db.orders.remove(req.body)
    .then(status => res.status(200).send(JSON.stringify(status)))
    .catch(err => res.status(500).send(JSON.stringify(err.message)));
};