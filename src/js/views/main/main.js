var Ractive   = require('ractive')
  , lMap      = require('components/map/map')
  , pieChart  = require('components/charts/PieChart')
  , main
;

main = Ractive.extend({
  el: '#js-app',
  template: require('./template.html'),//temp,//'<div>{{message}}</div>',
  data: {
    initialData: 'world_innvandring.json'
  },

  components: {
    Map: lMap,
    PieChart: pieChart
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