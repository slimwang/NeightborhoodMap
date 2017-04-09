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
    self.filtedUniversities = ko.computed(function() {
        if (!self.currentFilter()) {
            return self.universityList();
        } else {
            return ko.utils.arrayFilter(self.universityList(), function(u) {
                var title = u.title.toLowerCase();
                var currentFilter = self.currentFilter().toLowerCase();
                if(title.indexOf(currentFilter) != -1) { return true; }
                return false;
            });
        }
    });
    self.iptVal = ko.observable();
    self.filter = function(title) {
        var iptVal = self.iptVal();
        self.currentFilter(iptVal);
        self.markerFilter(iptVal);
    };
    // marker filter
    self.markerFilter = function(title) {
        if (!self.currentFilter()) {
            markers.forEach(function(m) {
                m.setMap(map);
            });
        } else {
            markers.forEach(function(m) {
                var mTitle = m.title.toLowerCase();
                if (mTitle.indexOf(title.toLowerCase()) == -1) {
                    m.setMap(null);
                } else {
                    m.setMap(map);
                }
            });
        }
    };
    // auto Complete
    self.autoCompleteAndGetInfo = function(data) {
        $('#inputFilter').val(data.title);
        getAjaxInfo(data.title);
        setBounce(data.title);
    };

};
ko.applyBindings(new ViewModel());
