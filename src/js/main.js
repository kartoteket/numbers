var mainRactive = require('./views/main/main')
  , mainView = new mainRactive({el: '#js-app',
                                data: {message: 'Entry point here'}});

//  console.log('loaded')