var geocoderProvider = 'google';
var geocoder = require('node-geocoder')(geocoderProvider);
var fs = require('fs');

fs.readFile('scrape-results/results2.json', function(err, data) {
  if (!err) {
    var jsonData = JSON.parse(data);
    for (var i = 0; i < jsonData.length; i++) {
      console.log('event name: ' + jsonData[i].name);
      console.log('event venue: ' + jsonData[i].venue);
      console.log('address: ' + jsonData[i].details.address);
      console.log();
    }
  }
})


// Using callback
// geocoder.geocode('1731 SE 10th Avenue portland', function(err, res) {
//     console.log(res);
// });
