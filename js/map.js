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
        m.addListener('click', function() {
            getAjaxInfo(m.title);
});
        // m.addListener('click', toggleBounce);
        // function toggleBounce() {
        //     if (m.getAnimation() !== null) {
        //         m.setAnimation(null);
        //     } else {
        //         m.setAnimation(google.maps.Animation.BOUNCE);
        //     }
        // }
    });
}

function getAjaxInfo(title) {
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + title + '&format=json&callback=wikiCallback';

    // AJAX
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response) {
            var info = response[2][0];
            info = info.replace(/\([^\)]*\)/g, ""); // info format

            // marker infowindow
            var infowindow = new google.maps.InfoWindow({
                content: info
            });
            var i = markers.findIndex(function(m) {
                return m.title == title;
            });
            var m = markers[i];
            infowindow.open(map, m);
        }
    }).fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

function mapErrorHandler() {
    $("#map").text("Something went wrong with google map API.");
}
