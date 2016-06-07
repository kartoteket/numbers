var Ractive     = require('ractive')
  , d3          = require('d3')
  , _           = require('underscore')
  , clientUrl   = require('utils/clientUrl')
	, piechart    = require('d3by5-pie-chart')
	, PieChartComponent
;

PieChartComponent = Ractive.extend({
  template: require('./piechartTemplate.html'),
  pie: null,

  data: function () {
    return {
      chart: {
        height: 300,
        width: 400,
        data: [10, 20, 30, 40,10, 20, 60],
        fillColor: 'cyan'
      }
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
    var boundMethod = _.bind(this.resetData, this);
    this.pie =  piechart()
                    .height(300)
                    .width(300)
                    .padding(20)
                    .transitionSpeed(500)
                    .data(result.data)
                    .on('click', boundMethod)
                    .on('mouseover', function (d) {
                      console.log(d);
                    });

                    console.log('drawing pie');
  var caller = _.bind(this.pie.init, this.pie);

    d3.select('.js-pie-chart')
      .call(caller);


    console.log('rendering chart', this.get('chart.fillColor'));
  },

  resetData: function (d) {
    var fileName = this.getFileName(d.data.label)
      , data
      , color
      , that = this
    ;

    // load the data
    d3.json('data/' + fileName, function (result) {
      // set the new data
      that.pie
          .apply({data: result.data, transition:'fromSelection', target: d});
    });
    console.log(d);
  },

  getFileName: function (label) {
       // simple swithh here to get the file
    switch (label) {
    case 'Europa':
      return 'europa_innvandring.json';
    case 'Afrika':
      return 'afrika_innvandring.json';
    case 'Nord-Amerika':
      return 'nordamerika_innvandring.json';
    case 'Sør-Amerika':
      return 'soramerika_innvandring.json';
    case 'Asia':
      return 'asia_innvandring.json';
    default:
      return this.get('initialData');
    }
  }
});

module.exports = PieChartComponent;