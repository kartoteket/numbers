// modules
var d3 = require('d3');

module.exports = barChart;

function barChart () {


  //config options
  var width       = 500
    , height      = 300
    , padding     = 2
    , fillColor   = 'coral'
    , data        = []
  ;

  // generate chart
  function chart(selection) {     // ref: https://bost.ocks.org/mike/chart/#implementation

        selection.each(function () {

          var barSpacing = height / data.length;
          var barHeight = barSpacing - padding;
          var maxValue = d3.max(data);
          var widthScale = width / maxValue;

          var dom = d3.select(this);
          var svg = dom.append('svg')
              .attr('class', 'chart barchart')
              .attr('height', height)
              .attr('width', width)
              .style('fill', fillColor);

          var bars = svg.selectAll('rect.chart__bar')
              .data(data)
              .enter()
              .append('rect')
              .attr('class', 'chart__bar')
              .attr('y', function (d, i) { return i * barSpacing;  })
              .attr('height', barHeight)
              .attr('x', 0)
              .attr('width', function (d) { return d * widthScale; });

        });

  }

  // getter//setters
  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return chart;
  };

  chart.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return chart;
  };

  chart.fillColor = function(value) {
    if (!arguments.length) return fillColor;
    fillColor = value;
    return chart;
  };

  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  };

  return chart;

}