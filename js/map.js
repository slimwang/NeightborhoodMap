var map;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.084287,
            lng: 117.201238
        },
        zoom: 11
    });
    // add markers list
    universities.forEach(function(university) {
        var marker = new google.maps.Marker({
            position: university.position,
            map: map,
            title: university.title
        });
        markers.push(marker);
    });
    // markers animate
    markers.forEach(function(m) {
        m.addListener('click', toggleBounce);

        function toggleBounce() {
            if (m.getAnimation() !== null) {
                m.setAnimation(null);
            } else {
                m.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    });
}

function mapErrorHandler() {
    $("#map").text("Something went wrong with google map API.");
}
