[script.js]

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function initAutocomplete(lat, lng) {
    var destination = new google.maps.LatLng({ lat: lat, lng: lng });
    var image = 'IMG/icons/pngwave.png';

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
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    var directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });// also, constructor can get "DirectionsRendererOptions" object
        directionsDisplay.setMap(map); // map should be already initialized.
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
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

            var directionsService = new google.maps.DirectionsService();
            var request = {
                origin: destination,
                destination: place.geometry.location,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.set('directions', null); // Remove previous directions
                    directionsDisplay.setDirections(response);
                }
            });

            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [destination],
                destinations: [place.geometry.location],
                travelMode: google.maps.TravelMode.DRIVING
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
}
