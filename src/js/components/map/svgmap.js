var Ractive = require('ractive')
  , clientUrl = require('../../utils/clientUrl')
  , d3 = require('d3')
  , Datamap = require('datamaps')
  , mapComponent
;

mapComponent = Ractive.extend({
  template: require('./mapTemplate.html'),

  data: function () {
    return {};
  },

  onrender: function () {
    d3.json('data/' + this.get('initialData'), this.renderData.bind(this));
  },


  /**
   * Initial render function, based on the data received from the onrender function
   * @param  {Json} result - json data
   */
  renderData: function (result) {

    this.map = new Datamap({
      element: this.nodes.map,

      done: function(datamap) {


        // NB, used on resize!
        d3.selectAll(".datamaps-bubble").remove(); // supposed to fix a possible memory leak...

        datamap.bubbles(result, {
          countryId: 'geocode',
          radius: function(data){
            var extent = d3.extent(result.map(function (item) { return (item['2016M04']); }));
            var scale = d3.scale.sqrt().domain(extent).range([19, 70]);
            var r = scale(data['2016M04']);
            return r;
          },
          popupTemplate: function(geography, data) {
            var thousands = d3.format("0,000");
            return '<div class="hoverinfo">' +
            '<strong>Asylum appplicants registered<br> in ' + data.country + ' in 2016:</strong>' +
           '<ul>' +
              '<li>Jan ' + thousands(data['2016M01']) + '</li>' +
              '<li>Feb ' + thousands(data['2016M02']) + '</li>' +
              '<li>Mar ' + thousands(data['2016M03']) + '</li>' +
              '<li>Apr ' + thousands(data['2016M04']) + '</li>' +
              '<li>Mai ' + thousands(data['2016M05']) + '</li>' +
              '<li>Jun ' + thousands(data['2016M06']) + '</li>' +
              '</ul>' +
            '</div>';
          },

        });

        datamap.bubbleLabels(result, {
          countryId: 'geocode',
          labelKey: '2016M04'
        });

      },
      responsive: true,
      fills: {
        'ASY': 'rgba(250, 132, 0, 1)',
        defaultFill: '#F5F4F2'
      },
      geographyConfig: {
        borderColor: '#ddd',
        dataUrl: 'data/world-topo.json',         // Source: https://gist.github.com/alexwebgr/10249781
        countryId: 'properties.countryCode',     // Svale: Map topjson data country code to alpha 3
      },
      bubblesConfig: {
        borderOpacity: 0.5,
        fillOpacity: 0.5,
        highlightFillColor: 'rgba(250, 132, 0, 1)',
        highlightBorderColor: '#fff',
        highlightFillOpacity: 0.9,
    },
      scope: 'countries',

      setProjection: function(element, options) {
            var projection, path;


            projection = d3.geo.mercator()
              .center([-10, 70])
              .scale(element.offsetWidth / 2.5);
             // .translate([element.offsetWidth / 2, (element.offsetHeight / 0.75)]);

            path = d3.geo.path()
                .projection( projection );


            return {path: path, projection: projection};
        }
    });

    this.map.addPlugin('bubbleLabels', this.handleBubbleLabels);



  },

  handleBubbleLabels: function (layer, data, options ) {
    var self = this
      , svg = this.svg
      , bubbles = self.svg.selectAll('.bubbles').selectAll('.datamaps-bubble');

    bubbles
      .append("text")
        .attr('class', 'bubble-label')
        .attr('x', function ( d ) {return self.getXY(d)[0]; })
        .attr('y', function ( d ) {return self.getXY(d)[1]; })
        .attr('dy', '0.5em')
        .attr('text-anchor', 'middle')
        .style("font-size", (options.fontSize || 16) + 'px')
        .style("font-family", options.fontFamily || "Verdana")
        .style("fill", options.labelColor || "#fff")
        .text(function(d) {
            var thousands = d3.format("0,000");
          return thousands(d[options.labelKey]);
        });
  },

  oncomplete: function(){
    var that = this
      , throttled = false
      , delay = 1000;

    window.addEventListener('resize', function() {
      if (!throttled) {
        that.map.resize();
        throttled = true;
        setTimeout(function() {
          throttled = false;
        }, delay);
      }
    });
  }

});

module.exports = mapComponent;