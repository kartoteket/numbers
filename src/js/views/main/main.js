var Ractive   = require('ractive')
  , lMap      = require('components/map/map')
  , pieChart  = require('components/charts/PieChart')
  , barGraph  = require('components/charts/HorisontalBarGraph')
  , lineChart  = require('components/charts/lineChart')
  , main
;

main = Ractive.extend({
  el: '#js-app',
  template: require('./template.html'),//temp,//'<div>{{message}}</div>',
  data: {
    initialData: 'world_innvandring.json',
    initialBarData: 'asylsoknader_uke_21.json'
    initialLineData: 'line-chart-test-data.json'
  },

  components: {
    Map: lMap,
    PieChart: pieChart,
    BarGraph: barGraph
   LineChart: lineChart
  },

  oninit: function () {
    console.log('initted');
  },

  onrender: function () {
    var that = this;
    console.log(this);

  }
});

module.exports = main;