
// modules
var d3  = require('d3');
var barchart  = require('./charts/barchart.js');

// bootstrap charts
var chartOne =  barchart().data([10, 20, 30, 40,10, 20, 60]);
var chartTwo =  barchart()
                    .width(500)
                    .height(500)
                    .fillColor('cyan')
                    .data([20, 50, 10, 20,10, 50, 60]);


d3.select('.chart-one')
    .call(chartOne);

d3.select('.chart-two')
    .call(chartTwo);

