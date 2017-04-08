var universities = [
    // HEBUT
    {
        position: {
            lat: 39.178595,
            lng: 117.173422
        },
        title: "Hebei University Of Technology"
    },
    // TJU
    {
        position: {
            lat: 39.111124,
            lng: 117.174833
        },
        title: "Tianjin University"
    },
    // NKU
    {
        position: {
            lat: 39.103953,
            lng: 117.174105
        },
        title: "Nankai University"
    },
    // TMU
    {
        position: {
            lat: 39.105455,
            lng: 117.184585
        },
        title: "Tianjin Medical University"
    },
    // TUFE
    {
        position: {
            lat: 39.063160,
            lng: 117.273124
        },
        title: "Tianjin University Of Finance & Economics"
    },
    // TNU
    {
        position: {
            lat: 39.061351,
            lng: 117.127229
        },
        title: "Tianjin Normal University"
    }
];

var University = function(data) {
    this.position = data.position;
    this.title = data.title;
    this.show = ko.observable(true);
};

var ViewModel = function() {
    var self = this;
    // init universityList
    self.universityList = ko.observableArray([]);
    universities.forEach(function(u) {
        self.universityList.push(new University(u));
    });
    // list filter
    self.currentFilter = ko.observable();
    self.filterUniversities = ko.computed(function() {
        if (!self.currentFilter()) {
            return self.universityList();
        } else {
            return ko.utils.arrayFilter(self.universityList(), function(u) {
                return u.title == self.currentFilter();
            });
        }
    });
    self.filter = function(title) {
        var iptVal = $('#inputFilter').val();
        self.currentFilter(iptVal);
    };
    self.toggleVisibility = function() {
        var iptVal = $('#inputFilter').val();
        // set show
        for (var i = 0; i < self.universityList.length; i++) {
            var title = self.universityList[i].title.toLowerCase();
            title.indexOf(iptVal) == -1 ? self.universityList[i].show(false) : self.universityList[i].show(true);
        }
        ko.onError = function(error) {
            alert("An error occured with knockout.js");
        };
    };
    // auto Complete
    self.autoComplete = function(data) {
        $('#inputFilter').val(data.title);
        self.markerAnimate(data);
        self.getInfo(data);
    };
    // marker filter
    self.markerFilter = function(data) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].title != $('#inputFilter').val()) {
                markers[i].setMap(null);
            } else {
                markers[i].setMap(map);
            }
        }
    };
    // marker animate
    self.markerAnimate = function(data) {
        var i = markers.findIndex(function(m) {
            return m.title == data.title;
        });
        var m = markers[i];
        m.setAnimation(google.maps.Animation.BOUNCE);
    };
    // get ajax info and show it
    self.getInfo = function(data) {
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + data.title + '&format=json&callback=wikiCallback';

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
                    return m.title == data.title;
                });
                var m = markers[i];
                m.addListener('click', function() {
                    infowindow.open(map, m);
                });
                infowindow.open(map, m);
            }
        }).fail(function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });

    };



};

ko.applyBindings(new ViewModel());
