var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

// connect to mongo database named "shortly"
mongoose.connect('mongodb://localhost/stocks');
var db = mongoose.connection;

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.post('/api/stocksFollow', function (req, res)  {
  var stocksFollow = req.body;

  stocksFollow.addStock(stocksFollow, function (err, stocksFollow)  {
    if(err){
      throw err;
    }
    res.json(stocksFollow);

    var stock = 'goog';

    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + stock + '-c.json&callback=?', function (data) {
      // Create the chart
      Highcharts.stockChart('container', {
          rangeSelector: {
              selected: 1
          },

          title: {
              text: 'Stock Price'
          },

          series: [{
              name: stock,
              data: data,
              tooltip: {
                  valueDecimals: 2
              }
          }]
      });
    });
  });
});

// start listening to requests on port 8000
app.listen(8000);

// export our app for testing and flexibility, required by index.js
module.exports = app;