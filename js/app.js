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
}

var ViewModel = function() {
    var self = this;
    self.universityList = [];
    universities.forEach(function(u) {
        self.universityList.push(new University(u));
    });
    self.toggleVisibility = function() {
        var iptVal = $('#inputFilter').val();
        // set show
        for (var i = 0; i < self.universityList.length; i++) {
            var title = self.universityList[i].title.toLowerCase();
            title.indexOf(iptVal) == -1 ? self.universityList[i].show(false) : self.universityList[i].show(true);
        }
    };
};

ko.applyBindings(new ViewModel());