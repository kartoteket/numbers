var Ractive = require('ractive')
  , lMap = require('../../components/map/map')
  , main
;

main = Ractive.extend({
  el: '#js-app',
  template: require('./template.html'),//temp,//'<div>{{message}}</div>',

  components: {
    map: lMap
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