var request = require('request');  // A simple way to make http calls
var cheerio = require('cheerio');  // Provides jQuery manipulation on the backend
var fs = require('fs');            // Gives us access to our computer’s file system
var events = [];

request('http://www.calagator.org', function(err, res, body) {
  if (!err && res.statusCode === 200) {
    // Parses data to make it available for manipulation
    var $ = cheerio.load(body);

    // Good to provide jQuery some context (i.e. an id) so it doesn't have to search from root
    $('div.list_content', '#today').each(function() {
      var eventData = $(this);

      var info = {
        name: '',
        time: '',
        location: ''
      }

      info.name = eventData.children(':nth-child(1)').text();
      info.time = eventData.children(':nth-child(3)').find('time').text();
      info.location = eventData.children(':nth-child(3)').find('a').text();

      events.push(info);
    })

    // The fs library helps us to write a file to our sysstem
    fs.writeFile('output.json', JSON.stringify(events, null, 4), function(err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    });
  }
});
