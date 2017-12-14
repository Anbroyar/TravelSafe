        var map;
        var infoWindow;
        var service;

        function initMap() {

            $('#map-result').css('visibility','hidden');
            map = new google.maps.Map(document.getElementById('map-result'), {
                center: { lat: -33.867, lng: 151.206 },
                zoom: 15
            });

            infoWindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
        }

        function updateMap(location) {

            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': location }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // create an easier to use reference to the latlong object
                    let loc = results[0].geometry.location;
                    let bounds = results[0].geometry.bounds;
                    // recenter and fit the map
                    map.setCenter(loc);
                    map.fitBounds(bounds);

                    $('#map-result').css('visibility','visible');
                    // show map
                    // $('#map').show();
                    // search for hospitals
                    var request = {
                        location: loc,
                        radius: '50000',
                        type: ['hospital']
                    };
                    service.nearbySearch(request, function(results, status) {
                        if (status !== google.maps.places.PlacesServiceStatus.OK) {
                            console.error(status);
                            return;
                        }
                        for (var i = 0, result; result = results[i]; i++) {
                            addMarker(result);
                        }
                    });
                    
                } else {
                    alert("Could not find location: " + location);
                }
            });
        }       

        function addMarker(place) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon: {
                    url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
                    anchor: new google.maps.Point(10, 10),
                    scaledSize: new google.maps.Size(10, 17)
                }
            });

            google.maps.event.addListener(marker, 'click', function () {
                service.getDetails(place, function (result, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                    }
                    infoWindow.setContent(result.name);
                    infoWindow.open(map, marker);
                });
            });
        }
