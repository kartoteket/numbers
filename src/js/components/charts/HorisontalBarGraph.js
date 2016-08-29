var Ractive     = require('ractive')
  , d3          = require('d3')
  , _           = require('underscore')
  , clientUrl   = require('utils/clientUrl')
	, barGraph    = require('d3by5-bar-graph')
	, HorisontalBarGraph
;

HorisontalBarGraph = Ractive.extend({
  template: require('./horisontalBarGraphTemplate.html'),
  bar: null,

  data: function () {
    return {};
  },

  onrender: function () {
    d3.json('data/' + this.get('initialBarData'), _.bind(this.renderData, this));
  },

  /**
   * Initial render function, based on the data received from the onrender function
   * @param  {Json} result - json data (label, values, color)
   */
  renderData: function (result) {
    var boundMethod = _.bind(this.barClickHandle, this)
      , data
    ;

    // Todo ad to bar options: sortBy and sortDirection (ASC, DESC)
    result.data = _.sortBy(result.data, function(o) { return (o.values * -1); });

    this.bar =  barGraph()
                    .anchor('left')
                    .labelPosition('outside')
                    .labelAlign('left')
                    .labelColor('#fff')
                    .valuesPosition('inside')
                    .valuesAlign('right')
                    .valuesColor('#fff')
                    .margin(0, 0, 0, 100)
                    .height(200)
                    .width(300)
                    .padding(20)
                    .fillColor('fa8400')
                    .data(result.data)
                    .on('click', boundMethod);  // todo...

    var caller = _.bind(this.bar.init, this.bar);
    d3.select('.js-horisontal-bar-graph')
      .call(caller);
  },

  barClickHandle: function (d) {
    console.log('Bar is clicked!', d);
  },


});

module.exports = HorisontalBarGraph;