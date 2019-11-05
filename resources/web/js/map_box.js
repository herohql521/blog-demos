/**
 * blank
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	var com=require('./common');
  require('mapbox-gl.js')

  mapboxgl.accessToken = 'pk.eyJ1IjoiaGVxbCIsImEiOiJjam9yeGlra2EwZ2x6M3NtbDF5ZnZoZDliIn0.cbIPR1LU6kQCbPC1blYjLg';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v10',
		center: [-61, -16],
     zoom: 5
	});

	var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Foo"      
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -66.324462890625,
                    -16.024695711685304
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Bar"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -61.2158203125,
                    -15.97189158092897
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Baz"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -63.29223632812499,
                    -18.28151823530889
                ]
            }
        }
    ]
};

// // add markers to map
// geojson.features.forEach(function(marker) {
//     // create a DOM element for the marker
//     var el = document.createElement('div');
//     el.className = 'marker';
//     el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)';
//     el.style.width = marker.properties.iconSize[0] + 'px';
//     el.style.height = marker.properties.iconSize[1] + 'px';

//     var popup = new mapboxgl.Popup({ offset: 25 }).setText(marker.properties.message);

//     // add marker to map
//     new mapboxgl.Marker(el)
//       .setLngLat(marker.geometry.coordinates)
//       .addTo(map)
//       .setPopup(popup);

//    	$(el).on('click', function (e) {
//       map.flyTo({center: marker.geometry.coordinates, zoom:5, speed:0.5})

//   	});

// });
var popup;
map.on('load', function() {
	map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function(error, image) {
    if (error) throw error;
    	map.addImage('cat', image);

    	map.addLayer({
	    "id": "points",
	    "type": "symbol",
	    "source": "sourceid",
	    "layout": {
        "icon-image": "cat" ,
        "icon-size": 0.2,
        "icon-allow-overlap": true,
        "text-field": "{message}",
        "text-offset": [0, 1.3],
        "text-anchor": "top"
			}
		})


		});

		map.addSource('sourceid', {
		  type: 'geojson',
		  data: geojson
		});

		$('#set').click(function(event) {
			setdata();
			typeof popup == 'object' ? popup.remove() : false;
		});

})

 function setdata(){
 	map.getSource('sourceid').setData({
	  "type": "FeatureCollection",
	  "features": [{
	      "type": "Feature",
	      "properties": { "message": "cat" },
	      "geometry": {
	          "type": "Point",
	          "coordinates": [ -60, -15 ]
	      }
	  }]
	});
 };

map.on('click', 'points', function (e) {
	var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.message;
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  map.flyTo({center: coordinates, zoom:5, speed:0.2})

	popup = new mapboxgl.Popup()
  .setLngLat(coordinates)
  .setHTML(description)
  .addTo(map);


});

 // Change the cursor to a pointer when the mouse is over the points layer.
  map.on('mouseenter', 'points', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'points', function () {
    map.getCanvas().style.cursor = '';
  });

  // fly2china
  $('#fly2china').click(function(event) {
  	map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center:[116,39] ,
        zoom: 5,
        bearing:0, //旋转
        pitch:0, //	倾斜

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
            return t;
        }
    });
  });


  
});