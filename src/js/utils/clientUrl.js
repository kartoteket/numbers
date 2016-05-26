    var urls = {

        leafletImagePath: function() {
          return 'node_modules/leaflet/dist/images/';
        },
      }


    // Helper for accessing the URL list.
    // --> http://pragmatic-backbone.com/models-collections-and-data
    , clientUrl = function(type) {
        return urls[type] ? urls[type].apply(this, [].slice.call(arguments, 1)) : undefined;
      };

module.exports = clientUrl;