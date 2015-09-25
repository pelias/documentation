/**
 * To run do as follows:
 *
 * $ npm install request
 * $ node locmux.js 'text i want to search for'
 *
 * If you'd like more locations to be searched just add them to the list below.
 *
 */

var request = require('request');
var colors = require('text-hex');
var async = require('async');

var locations = [
  {
    name: 'London',
    lat: 51.507222,
    lon: -0.1275
  },
  {
    name: 'New York',
    lat: 37.783333,
    lon: -122.416667
  }
];

var text = process.argv[2];
var geojsonio = true; //process.argv[2] === 'geojson';

var geojson = {
  type: 'FeatureCollection',
  features: []
};

async.forEach(locations, function (loc, cb) {
    request.get('http://pelias.bigdev.mapzen.com/v1/search?text=' + text +
      '&focus.point.lat=' + loc.lat + '&focus.point.lon=' + loc.lon, function (err, res) {
      var results = JSON.parse(res.body);

      if (!geojsonio) {
        console.log('\n\n\nSearching for "' + text + '" near ' + loc.name);
        console.log('> result count:', results.features.length);
      }

      results.features.forEach(function (feature) {
        feature.properties['marker-color'] = colors(loc.name);
        feature.properties.query = loc.name;

        geojson.features.push(feature);

        if (!geojsonio) {
          console.log(feature.properties.label);
        }
      });
      cb();
    });
  },
  function () {
    if (geojsonio) {
      console.log(JSON.stringify(geojson));
    }
  });