var Ractive = require('ractive')
  , main
;

main = Ractive.extend({
  el: '#js-app',
  template: require('./template.html'),//temp,//'<div>{{message}}</div>',

  oninit: function () {
    console.log('initted');
  },

  onrender: function () {
    var that = this;
    console.log(this);

  }
});

module.exports = main;