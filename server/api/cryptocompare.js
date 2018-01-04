const fetch = require('node-fetch');

module.exports = {
  coinList: {
    list: [],
    updatedAt: new Date()
  },
  fetchCoinList() {
    console.log('fetching list of cryptocurrencies from https://min-api.cryptocompare.com/data/all/coinlist');
    return fetch('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(resp => resp.json())
      .then(data => {
        if (data['Response'] !== 'Success') {
          console.log(`error fetching list, ${data['Message']}`);
          return Promise.reject(data['Message']);
        }

        module.exports.coinList.list = [];
        for (let coin in data['Data']) {
          module.exports.coinList.list.push({[data['Data'][coin]['Symbol']]: data['Data'][coin]['FullName']});
        }
        module.exports.coinList.updatedAt = new Date();

        console.log(`${module.exports.coinList.list.length} symbols fetched, updated at ${module.exports.coinList.updatedAt}`);
        return module.exports.coinList;
      });
  }
};