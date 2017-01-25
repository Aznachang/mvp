var mongoose = require('mongoose');

var stockFollowSchema = mongoose.Schema({
  symbol:{
    type: String,
    required: true,
    unique: true
  },

  create_date:{
    type: Date,
    default: Date.now
  }
});

var stocksfollows = module.exports = mongoose.model('stocksfollows', stockFollowSchema);

//Get Stock
module.exports.getStocks = function (callback, limit) {
  stocksfollows.find(callback).limit(limit);
}

// //Get Stock
// module.exports.getStockBySymbol = function (symbol, callback) {
//   stocksFollow.findById(symbol, callback);
// }

//Add Stock
module.exports.addStock = function(stock, callback) {
  stocksfollows.create(stock, callback);
}