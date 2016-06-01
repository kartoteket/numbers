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
    var data = [
                {label:'Nord-Amerika', values: 6985, color: '#ff0000'},
                {label:'Sør-Amerika', values: 20955, color: '#00ff00'},
                {label:'Afrika', values: 83820, color: '#0000ff'},
                {label:'Asia', values: 195580, color: '#ffff00'},
                {label:'Europa', values: 384175, color: '#00ffff'}
                ];
    var boundMethod = _.bind(this.resetData, this);
    this.pie =  piechart()
                    .height(300)
                    .width(300)
                    .padding(20)
                    .data(data)
                    .on('click', boundMethod);

                    console.log('drawing pie');

    d3.select('.js-pie-chart')
      .call(this.pie);


    console.log('rendering chart', this.get('chart.fillColor'));
  },

  resetData: function (d) {
    var label = d.data.label
      , fileName
      , data
      , colors
      , that = this
    ;

    // simple swithh here to get the file
    switch (label) {
    case 'Europa':
      fileName = 'europa_innvandring.json';
      break;
    case 'Afrika':
      fileName = 'afrika_innvandring.json';
      break;
    case 'Nord-Amerika':
      fileName = 'nordamerika_innvandring.json';
      break;
    case 'Sør-Amerika':
      fileName = 'soramerika_innvandring.json';
      break;
    case 'Asia':
      fileName = 'asia_innvandring.json';
      break;
    }

    d3.json('data/' + fileName, function (result) {
      color = d3.scale.linear()
                .domain([1,result.data.length])
                .interpolate(d3.interpolateHcl)
                .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]); // make this in line with the color we came from
      // apply a color to all the datanodes
      data = _.map(result.data, function (d, i) {
        d.color = color(i);
        return d;
      });
      that.pie.data(data);

    });
    console.log(d);
  }
});

module.exports = PieChartComponent;