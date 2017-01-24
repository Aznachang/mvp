// Set the dimensions of the graph
var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%d").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var    yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate("
            + margin.left
            + "," + margin.top + ")");

var stock = document.getElementById('stock').value;
var start = document.getElementById('start').value;
var end = document.getElementById('end').value;
var date;
var close;
var historical = [];
//var d.high;
//var d.date;

var inputURL = 'https://www.quandl.com/api/v3/datasets/WIKI/yhoo.json?api_key=mBRUJbZRMrpWDm3MDrQ2';

    // Get the data
    d3.json(inputURL, function(error, data){

     var histData = data.dataset.data;
       for (var i = 0; i < histData.length; i++) {
         date = histData[i][0];
         close = histData[i][4];
       }

    // data.query.results.quote.forEach(function(d) {
    //     d.date = parseDate(d.Date);
    //     d.high = +d.High;
    //     d.low = +d.Low;
    // });

    // Scale the range of the data
    // x.domain(d3.extent(data.query.results.quote, function(d) {
    //     return d.date; }));
    // y.domain([
    //     d3.min(data.query.results.quote, function(d) { return d.low; }),
    //     d3.max(data.query.results.quote, function(d) { return d.high; })
    // ]);

    svg.append("path")        // Add the valueline path.
        .attr("class", "line")
        .attr("d", valueline(data.query.results.quote));

    svg.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")            // Add the Y Axis
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")          // Add the label
        .attr("class", "label")
        .attr("transform", "translate(" + (width+3) + ","
            + y(data.query.results.quote[0].high) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "steelblue")
        .text("high");

    svg.append("text")          // Add the title shadow
        .attr("x", (width / 2))
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .attr("class", "shadow")
        .style("font-size", "16px")
        .text(stock);

    svg.append("text")          // Add the title
        .attr("class", "stock")
        .attr("x", (width / 2))
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(stock);
});

// ** Update data section (Called from the onclick)
function updateData() {

var stock = document.getElementById('stock').value;
var start = document.getElementById('start').value;
var end = document.getElementById('end').value;

var inputURL = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock + '.json?api_key=mBRUJbZRMrpWDm3MDrQ2';
console.log(inputURL);
    // Get the data again
    d3.json(inputURL, function(error, data){
      var histData = data.dataset.data;
        for (var i = 0; i < histData.length; i++) {
          console.log(histData[i][0]);
        }
        // data.query.results.quote.forEach(function(d) {
        //     d.date = parseDate(d.Date);
        //     d.high = +d.High;
        //     d.low = +d.Low;
       // });

        // Scale the range of the data
        x.domain(d3.extent(data.query.results.quote, function(d) {
            return d.date; }));
        y.domain([
            d3.min(data.query.results.quote, function(d) {
                return d.low; }),
            d3.max(data.query.results.quote, function(d) {
                return d.high; })
        ]);

        // Select the section we want to apply our changes to
        var svg = d3.select("body").transition();

        // Make the changes
        svg.select(".line")    // change the line
            .duration(750)
            .attr("d", valueline(data.query.results.quote));

        svg.select(".label")   // change the label text
            .duration(750)
            .attr("transform", "translate(" + (width+3) + ","
            + y(data.query.results.quote[0].high) + ")");

        svg.select(".shadow") // change the title shadow
            .duration(750)
            .text(stock);

        svg.select(".stock")   // change the title
            .duration(750)
            .text(stock);

        svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

    });
}