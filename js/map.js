var map;
var markers = [];
var infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.084287,
            lng: 117.201238
        },
        zoom: 11
    });
    // infowindow
    infowindow = new google.maps.InfoWindow();
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
            setBounce(m.title);
        });
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
            var i = markers.findIndex(function(m) {
                return m.title == title;
            });
            var m = markers[i];
            infowindow.setContent(info);
            infowindow.open(map, m);
        },
        error: function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        }
    });
}
// marker animate
function setBounce(title) {
    var i = markers.findIndex(function(m) {
        return m.title == title;
    });
    var m = markers[i];
    m.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        m.setAnimation(null);
    }, 750);
}

function mapErrorHandler() {
    alert("Something went wrong with google map API.");
}
