var Ractive     = require('ractive')
  , d3          = require('d3')
  , _           = require('underscore')
  , clientUrl   = require('utils/clientUrl')
  , linechart   = require('d3by5-line-chart')
  , LineChartComponent
;

LineChartComponent = Ractive.extend({
  template: require('./linechartTemplate.html'),
  chart : null,

  data: function () {
    return {
    };
  },

  onrender: function () {
    d3.json('data/' + this.get('initialData'), _.bind(this.renderData, this));
  },
  /**
   * Initial render function, based on the data received from the onrender function
   * @param  {Json} result - json data (label, values, color)
   */
  renderData: function (result) {


    var data = [
      {
        label: "Enslige mindreårige asylsøkere",
        columns : [
          {
            "label"  : "Måned 2015",
            "type"   : "date",
            "format" : "%m-%Y",
          },
          {
            "label"  : "Antall Enslige mindreårige asylsøkere",
          }
        ],
        values : result
      }
    ];

    this.chart = linechart()
                .width(300)
                .height(150)
                .margin(30,10,10,10)
                .xAxis(false)
                .yAxis(false)
                .fillColor('fa8400')
                .lineWidth(4)
                .data(data);

    console.log('drawing line chart');

    // call on elm
    d3.select('.js-line-chart').call(_.bind(this.chart.init, this.chart));

  }


});

module.exports = LineChartComponent;