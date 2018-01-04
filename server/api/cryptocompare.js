const fetch = require('node-fetch');
const db = require('../db');

module.exports = {
  fetchCoinList() {
    if (Date.now() - db.symbols.updatedAt > 3600000) {
      console.log('fetching list of cryptocurrencies from https://min-api.cryptocompare.com/data/all/coinlist');
      return fetch('https://min-api.cryptocompare.com/data/all/coinlist')
        .then(resp => resp.json())
        .then(data => {
          if (data['Response'] !== 'Success') {
            console.log(`error fetching list of symbols, ${data['Message']}`);
            return Promise.reject(data['Message']);
          }

          let tempSymbolArr = [];
          for (let coin in data['Data']) {
            tempSymbolArr.push({
              symbol: data['Data'][coin]['Symbol'],
              fullName: data['Data'][coin]['FullName'],
              id: Number(data['Data'][coin]['Id'])
            });
          }

          return db.symbols.clear()
            .then(() => Promise.all(tempSymbolArr.map(coin => db.symbols.post(coin))));
        })
        .then(symbolDocs => {
          db.symbols.updatedAt = Date.now();
          console.log(`${symbolDocs.length} symbols fetched, updated at ${Date(db.symbols.updatedAt)}`);
          return symbolDocs;
        });
    } else {
      console.log('list of cryptocurrencies recently stored, pulling from database');
      return db.symbols.get();
    }
  }
};