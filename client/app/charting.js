function getStockData(stockSymbol) {

// Get stock data
var json = $.getJSON( 'https://www.quandl.com/api/v3/datasets/WIKI/' + stockSymbol + '.json?api_key=mBRUJbZRMrpWDm3MDrQ2', function() {
  console.log("success");
  })

  .fail(function() {
    $(".error").show();
  })

  .success(function() {
    $(".error").hide();
  });

  $(".loading").show();

  var price = [];

  var stockData, organization;

json.complete(function() {
  $(".loading").hide();
  console.log( "Stock price data complete." );

  stockData = json.responseJSON.data;

  organization = json.responseJSON.name;
  organization = organization.split("(");
  organizationName = organization[0].replace(/ /g, "%20"); // eg. Apple Inc.
  organizationCode = organization[1].replace(")", ""); // eg. AAPL

  console.log( stockData );
  console.log( organizationName );
  console.log( organizationCode );

  // Push closing price and date to price array
  for (var i = 0; i < stockData.length; i++) {
    price[i] = [];
    price[i].push(Date.parse(stockData[i][0]));
    price[i].push(stockData[i][4]);
  }

  // Reverse order to make information digestible by Highcharts
  price.reverse();

      // Create the chart
      $('#container').highcharts('StockChart', {
        chart: {
          events: {
            // On click function in chart
            click: function(event) {
              // Get x-axis date from click
              var articleDate = Highcharts.dateFormat('%Y-%m-%d', event.xAxis[0].value);

              // Make date digestible by Highcharts
              articleDate = articleDate.replace(/-/g, "");

              // Get articles with date
              getArticles(articleDate);
            }
          }
        },
        rangeSelector : {
          selected : 1,
          inputEnabled: $('#container').width() > 480
        },

        title : {
          text :  organization[0] + ' Stock Price'
        },

        series : [{
          name : organizationCode,
          data : price,
          tooltip: {
            valueDecimals: 2
          }
        }]
      });

  // Get today's date
  var d = new Date();

  var month = d.getMonth()+1;
  var day = d.getDate();

  var todaysDate = d.getFullYear() +
      ((''+month).length<2 ? '0' : '') + month +
      ((''+day).length<2 ? '0' : '') + day;

  // Get all articles with today's date
  getArticles(todaysDate);

});

};

getStockData("AAPL");


/**************************************************
 * Grid-light theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
   href: 'http://fonts.googleapis.com/css?family=Dosis:400,600',
   rel: 'stylesheet',
   type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
   colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: null,
      style: {
         fontFamily: "Open Sans"
      }
   },
   title: {
      style: {
         fontSize: '16px',
         fontWeight: 'bold',
         textTransform: 'uppercase'
      }
   },
   tooltip: {
      borderWidth: 0,
      backgroundColor: 'rgba(219,219,216,0.8)',
      shadow: false
   },
   legend: {
      itemStyle: {
         fontWeight: 'bold',
         fontSize: '13px'
      }
   },
   xAxis: {
      gridLineWidth: 1,
      labels: {
         style: {
            fontSize: '12px'
         }
      }
   },
   yAxis: {
      minorTickInterval: 'auto',
      title: {
         style: {
            textTransform: 'uppercase'
         }
      },
      labels: {
         style: {
            fontSize: '12px'
         }
      }
   },
   plotOptions: {
      candlestick: {
         lineColor: '#404048'
      }
   },


   // General
   background2: '#F0F0EA'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);