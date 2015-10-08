var Xray = require('x-ray');
var x = Xray();

x('http://www.calagator.org', '#whats_happening div.list_content', [{

  name: 'a.summary',
  venue: 'a.location',
  startTime: 'time.dtstart @datetime',
  endTime: 'time.dtend @datetime',
  link: 'a@href',
  details: x('a@href', {
    address: 'div.street-address',
    description: 'div.description'
  })

}]).write('scrape-results/results2.json')