var Ractive     = require('ractive')
  , d3          = require('d3')
  , _           = require('underscore')
  , clientUrl   = require('utils/clientUrl')
	, barGraph    = require('lib/d3by5-horisontal-bar-graph')
	, HorisontalBarGraph
;

HorisontalBarGraph = Ractive.extend({
  template: require('./horisontalBarGraphTemplate.html'),
  pie: null,

  data: function () {
    return {
      bar: {
        height: 300,
        width: 400,
        data: [10, 20, 30, 40,10, 20, 60],
        fillColor: 'cyan'
      }
    };
  },

  onrender: function () {
    d3.json('data/' + this.get('initialBarData'), _.bind(this.renderData, this));

  },
  /**
   * Initial render function, based on the data received from the onrender function
   * @param  {Json} result - json data (label, values, color)
   */
  renderData: function (result) {
    var boundMethod = _.bind(this.resetData, this)
      , data
      , color = d3.scale.linear()
                .domain([1,result.data.length])
                .interpolate(d3.interpolateHcl)
                .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]); // make this in line with the color we came from
      // apply a color to all the datanodes
      data = _.map(result.data, function (d, i) {
        d.color = d.color || color(i);
        return d;
      });

    this.bar =  barGraph()
                    .height(300)
                    .width(300)
                    .padding(20)
                    .fillColor('coral')
                    .data(data)
                    .on('click', boundMethod);

                    console.log('drawing bar');

    d3.select('.js-horisontal-bar-graph')
      .call(this.bar);

  },

  resetData: function (d) {
    var fileName = this.getFileName(d.data.label)
      , data
      , color
      , that = this
    ;

    // load the data
    d3.json('data/' + fileName, function (result) {
      //Create a color scale
      color = d3.scale.linear()
                .domain([1,result.data.length])
                .interpolate(d3.interpolateHcl)
                .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]); // make this in line with the color we came from
      // apply a color to all the datanodes
      data = _.map(result.data, function (d, i) {
        d.color = d.color || color(i);
        return d;
      });
      // set the new data
      that.pie.data(data);
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

module.exports = HorisontalBarGraph;