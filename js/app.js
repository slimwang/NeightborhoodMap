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
    self.universityList = [];
    universities.forEach(function(u) {
        self.universityList.push(new University(u));
    });
    // list filter
    self.toggleVisibility = function() {
        var iptVal = $('#inputFilter').val();
        // set show
        for (var i = 0; i < self.universityList.length; i++) {
            var title = self.universityList[i].title.toLowerCase();
            title.indexOf(iptVal) == -1 ? self.universityList[i].show(false) : self.universityList[i].show(true);
        }
    };
    // auto Complete when a li clicked
    self.autoComplete = function(data) {
        $('#inputFilter').val(data.title);
        self.markerAnimate(data);
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
        if (m.getAnimation() !== null) {
            m.setAnimation(null);
        } else {
            m.setAnimation(google.maps.Animation.BOUNCE);
        }
        console.log(i);
    };


};

ko.applyBindings(new ViewModel());
