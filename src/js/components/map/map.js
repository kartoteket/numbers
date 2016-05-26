var Ractive = require('ractive')
  , clientUrl = require('../../utils/clientUrl')
	, L = require('leaflet')
	, mapComponent
;

mapComponent = Ractive.extend({
  template: require('./mapTemplate.html'),

  data: function () {
    return {
      center: {
        lat: 41.212,
        lng: 15.996
      },
      zoom: {
        base: 4,
        max: 10,
        min: 2,
        active: true
      },
      tile: {
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
      }
    };
  },

  onrender: function () {
    console.log('rendering map')
    L.Icon.Default.imagePath = clientUrl('leafletImagePath');
    this.map = L.map(this.nodes.map, {attributionControl: false}).setView([this.get('center.lat'),this.get('center.lng')],this.get('zoom.base'));

    if (!this.get('zoom.active')) {
      this.map.zoomControl.remove();
    }
    this.tileLayer = L.tileLayer(this.get('tile.url'), {
                                  subdomains: 'abcd',
                                  maxZoom: this.get('zoom.max'),
                                  minZoom: this.get('zoom.min'),
                                }).addTo(this.map);
  }
});

module.exports = mapComponent;