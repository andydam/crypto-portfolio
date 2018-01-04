const cc = require('../api/cryptocompare');

module.exports = (req, res) => {
  console.log('GET request for cryptocurrency symbol list');
  return cc.fetchCoinList()
    .then(list => res.status(200).send(JSON.stringify(list)))
    .catch(err => res.status(500).send(JSON.stringify(err)));
};