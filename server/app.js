var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static('/Users/albertchang/Desktop/hrsf53-mvp/client/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Refer to the --> stocksfollows 'collection' table
Stock = require('./stocks.js');

// connect to mongo database named "stocks"
mongoose.connect('mongodb://localhost/stocks');
var db = mongoose.connection;

//home page should just serve base index.html from 'client' folder
// app.get('/', function(req,res) {
//   //res.send('Please use /api/stocksFollow!');
//   //res.sendFile('/Users/albertchang/Desktop/hrsf53-mvp/client/index.html');
// });

app.get('/api/stocksfollows', function (req, res) {
  Stock.getStocks(function (err, stock) {
    if(err){
      throw err;
    }
    res.json(stock);
  });
});

app.post('/api/stocksfollows', function (req, res)  {
  //always have a var. accessing req.body
  var stocksFollow = req.body;

  Stock.addStock(stocksFollow, function (err, stocksFollow)  {
    if(err){
      throw err;
    }
    res.json(stocksFollow);
  });
});

// app.post('/api/stocksfollows', function (req, res)  {
//   var stocksFollow = req.body;

//   stocksFollow.addStock(stocksFollow, function (err, stocksFollow)  {
//     if(err){
//       throw err;
//     }
//     res.json(stocksFollow);
//   });
// });

// start listening to requests on port 8000
app.listen(8000);
console.log('starting...');

module.exports = app;