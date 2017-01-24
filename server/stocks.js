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

//Get Book
module.exports.getStock = function (callback, limit) {
  stocksFollow.find(callback).limit(limit);
}

//Get Book
module.exports.getStockBySymbol = function (symbol, callback) {
  stocksFollow.findById(symbol, callback);
}

//Add Book
module.exports.addStock = function(stock, callback) {
  stocksFollow.create(stock, callback);
}