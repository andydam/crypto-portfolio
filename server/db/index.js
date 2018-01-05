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

let Orders = mongoose.model('Orders', new mongoose.Schema({
  id: {type: Number, unique: true},
  coin: String,
  amount: Number,
  price: Number
}));

module.exports = {
  symbols: {
    post(coin) {
      return new Promise((resolve, reject) => Symbols.create(coin, (err, doc) => err ? reject(err) : resolve(doc)));
    },
    get() {
      return Symbols.find({}).exec();
    },
    clear() {
      return Symbols.find().remove().exec();
    },
    updatedAt: 0
  },
  orders: {
    post(order) {
      return new Promise((resolve, reject) => Orders.create(order, (err, doc) => err ? reject(err) : resolve(doc)));
    },
    get() {
      return Orders.find({}).exec();
    },
    clear() {
      return Orders.find().remove().exec();
    },
    remove(order) {
      return Orders.find({'id': order.id}).remove().exec();
    }
  }
};