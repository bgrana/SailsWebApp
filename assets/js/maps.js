var Maps = (function () {
    "use strict";

    function Maps (mapContainer, searchContainer) {
        this.mapContainer = mapContainer;
        this.searchContainer = searchContainer;
    }

    Maps.prototype.create = function () {
        this.markers = [];
        
        var mapOptions = {
            zoom: 10
        };

        this.map = new google.maps.Map(document.getElementById(mapContainer),
        mapOptions);

        var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.4143946,-3.8444746),
        new google.maps.LatLng(40.405714, -3.835782));
        this.map.fitBounds(defaultBounds);

        // Create the search box and link it to the UI element.
        var input = (document.getElementById(this.searchContainer));
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        this.searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

        // [START region_getplaces]
        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching places for that item.
        google.maps.event.addListener(this.searchBox, 'places_changed', function() {
            var places = this.searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            for (var i = 0, marker; marker = this.markers[i]; i++) {
                marker.setMap(null);
            }

            // For each place, get the icon, place name, and location.
            this.markers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                var marker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location,
                    draggable: true
                });

                google.maps.event.addListener(marker, 'dragend', function() {
                    console.log(marker.getPosition());
                });

                this.markers.push(marker);
                bounds.extend(place.geometry.location);
            }

            this.map.fitBounds(bounds);
        });

        google.maps.event.addListener(map, 'bounds_changed', function() {
            var bounds = this.map.getBounds();
            this.this.searchBox.setBounds(bounds);
        });

        return this;

    }

    Maps.prototype.getCoords = function () {
        this.markers[0].position;
    }

    return Maps;
})();