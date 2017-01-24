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

var stocksFollow = module.exports = mongoose.model('stocksFollow', stockFollowSchema);

//Get Stock
module.exports.getStocks = function (callback, limit) {
  stocksFollow.find(callback).limit(limit);
}

//Get Stock
module.exports.getStockBySymbol = function (symbol, callback) {
  stocksFollow.findById(symbol, callback);
}

//Add Stock
module.exports.addStock = function(stock, callback) {
  stocksFollow.create(stock, callback);
}