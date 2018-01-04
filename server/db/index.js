const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/crypto-portfolio')
  .then(() => console.log(`connected to mongodb at ${process.env.MONGO_URL || 'mongodb://localhost/crypto-portfolio'}`))
  .catch(err => console.log(`mongodb ${err.message}`));

let Symbols = mongoose.model('Symbols', new mongoose.Schema({
  id: {type: Number, unique: true},
  symbol: {type: String, uppercase: true},
  fullName: String
}));

module.exports = {
  symbols: {
    post(coin) {
      return new Promise((resolve, reject) => Symbols.create(coin, (err, doc) => err ? reject(err) : resolve(doc)));
    },
    get() {
      return new Promise((resolve, reject) => Symbols.find({}).exec((err, data) => err ? reject(err) : resolve(data)));
    },
    clear() {
      return Symbols.find().remove().exec();
    },
    updatedAt: 0
  }
};