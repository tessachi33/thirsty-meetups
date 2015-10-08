/**
 * JAVASCRIPT
 */

 var geocoder;
 var map;
 var panorama;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var portland = {lat: 45.5230622, lng: -122.6764816};

  // Set up the map.
  map = new google.maps.Map(document.getElementById('map'), {
    center: portland,
    zoom: 16,
  });

  var marker = new google.maps.Marker({
    map: map,
    position: portland
  });

  map.set('styles', [
    {
      "featureType": "landscape",
      "stylers": [
        { "hue": "#FFBB00" },
        { "saturation": 43.400000000000006 },
        { "lightness": 37.599999999999994 },
        { "gamma": 1 }
      ]
    },
    {
      "featureType": "road.highway",
      "stylers": [
        { "hue": "#FFC200" },
        { "saturation": -61.8 },
        { "lightness": 45.599999999999994 },
        { "gamma": 1 }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
        { "hue": "#FF0300" },
        { "saturation": -100 },
        { "lightness": 51.19999999999999 },
        { "gamma": 1 }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        { "hue": "#FF0300" },
        { "saturation": -100 },
        { "lightness": 52 },
        { "gamma": 1 }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        { "hue": "#0078FF" },
        { "saturation": -13.200000000000003 },
        { "lightness": 2.4000000000000057 },
        { "gamma": 1 }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        { "hue": "#00FF6A" },
        { "saturation": -1.0989010989011234 },
        { "lightness": 11.200000000000017 },
        { "gamma": 1 }
      ]
    }
  ]);
}


function codeAddress() {
  // Get address from form
  var address = $("input#new-location-name").val();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var location = results[0].geometry.location;
      map.setCenter(location);

      var formattedAddress = results[0].formatted_address;
      var placeId = results[0].place_id;

      var contentString = "<div id='content'><h4>" + formattedAddress + "</h4><img class='streetview' src='https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + formattedAddress + "&fov=120&heading=235&pitch=10&key=AIzaSyDyoP_3UjpK3YSJT8g6-ngD1WzFv1seqLY'></div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      // Add marker
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

      // Add eventlistner to zoom 8x on click
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    } else {
       alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
