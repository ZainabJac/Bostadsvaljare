

(function () {
    window.googlemaps = {
        displayingDirections: false,
        directionsDisplay: null,
        request: {
            origin: null,
            destination: null,
            travelMode: '',
        },

        toggleBounce: function () {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        },

        initAutocomplete: function (lat, lng) {
            var destination = new google.maps.LatLng({ lat: lat, lng: lng });
            var image = 'IMG/icons/pngwave.png';
            googlemaps.request.travelMode = google.maps.TravelMode.DRIVING;

            var map = new google.maps.Map(document.getElementById('map'), {
                center: destination,
                zoom: 13,
                mapTypeId: 'roadmap',
            });

            var beachMarker = new google.maps.Marker({
                position: { lat: -33.890, lng: 151.274 },
                map: map,
                icon: image,
                animation: google.maps.Animation.DROP,
                position: destination,
            });

            // Create the search box and link it to the UI element.
            var input = document.getElementById('searchBar');
            var searchBox = new google.maps.places.SearchBox(input);
            var input2 = document.getElementById('searchBar2');
            var searchBox2 = new google.maps.places.SearchBox(input2);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
                searchBox2.setBounds(map.getBounds());
            });


            var markers = [];
            var markers2 = [];
            googlemaps.directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                suppressBicyclingLayer: true,
            });// also, constructor can get "DirectionsRendererOptions" object
            googlemaps.directionsDisplay.setMap(map); // map should be already initialized.
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.

            searchBox2.addListener('places_changed', function () {
                var places = searchBox2.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers2.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers2 = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers2.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location,
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }

                 

                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix({
                        origins: [place.geometry.location],
                        destinations: [destination],
                        travelMode: googlemaps.request.travelMode
                    }, callback);

                    function callback(response, status) {
                        if (status == 'OK') {
                            var origins = response.originAddresses;
                            var destinations = response.destinationAddresses;

                            for (var i = 0; i < origins.length; i++) {
                                var results = response.rows[i].elements;
                                for (var j = 0; j < results.length; j++) {
                                    var element = results[j];
                                }
                            }
                        }
                    }
                });
                map.fitBounds(bounds);
            });

            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    markers.push(new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location,
                    }));

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }

                    googlemaps.request.origin = place.geometry.location;
                    googlemaps.request.destination = destination;
                    googlemaps.setRoute();

                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix({
                        origins: [place.geometry.location],
                        destinations: [destination],
                        travelMode: googlemaps.request.travelMode
                    }, callback);

                    function callback(response, status) {
                        if (status == 'OK') {
                            var origins = response.originAddresses;
                            var destinations = response.destinationAddresses;

                            for (var i = 0; i < origins.length; i++) {
                                var results = response.rows[i].elements;
                                for (var j = 0; j < results.length; j++) {
                                    var element = results[j];
                                }
                            }
                        }
                    }
                });
                map.fitBounds(bounds);
            });
        },

        setRoute: function () {
            var directionsService = new google.maps.DirectionsService();

            directionsService.route(googlemaps.request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    googlemaps.directionsDisplay.set('directions', null); // Remove previous directions
                    googlemaps.directionsDisplay.setDirections(response);
                    googlemaps.displayingDirections = true;

                    // Show travel data
                    var routeLeg = response.routes[0].legs[0];
                    var travelDistance = document.getElementById('travel-distance');
                    travelDistance.innerHTML = routeLeg.distance.text;
                    var travelTime = document.getElementById('travel-time');
                    travelTime.innerHTML =  routeLeg.duration.text;
                    var divEle = document.getElementById('travel-data')
                    divEle.classList.add('results')
                    var clockid = document.getElementById('clock')
                    clockid.classList.add('fas')
                    clockid.classList.add('fa-clock')       
                    var routeid = document.getElementById('route')
                    routeid.classList.add('fas')
                    routeid.classList.add('fa-route')
                    
                }
            });
        },

        setTravelMode: function (value) {
            switch (value) {
                case 'car':
                    googlemaps.request.travelMode = google.maps.TravelMode.DRIVING;
                    break;
                case 'bike':
                    googlemaps.request.travelMode = google.maps.TravelMode.BICYCLING;
                    break;
                case 'public':
                    googlemaps.request.travelMode = google.maps.TravelMode.TRANSIT;
                    break;
                case 'walk':
                    googlemaps.request.travelMode = google.maps.TravelMode.WALKING;
                    break;
            }
            if (googlemaps.displayingDirections)
                googlemaps.setRoute();
        },
    };
})();
