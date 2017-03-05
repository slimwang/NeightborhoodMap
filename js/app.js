var ViewModel = function() {
    this.universities = [
        // HEBUT
        {
            positon: {
                lat: 39.178595,
                lng: 117.173422
            },
            title: "Hebei University Of Technology"
        },
        // TJU
        {
            position: {
                lat: 39.111124,
                lnt: 117.174833
            },
            title: "Tianjin University"
        },
        // NKU
        {
            position: {
                lat: 39.103953,
                lnt: 117.174105
            },
            title: "Nankai University"
        },
        // TMU
        {
            position: {
                lat: 39.105455,
                lnt: 117.184585
            },
            title: "Tianjin Medical University"
        },
        // TUFE
        {
            position: {
                lat: 39.063160,
                lnt: 117.273124
            },
            title: "Tianjin University Of Finance & Economics"
        },
        // TNU
        {
            positon: {
                lat: 39.061351,
                lnt: 117.127229
            },
            title: "Tianjin Normal University"
        }
    ]
}

ko.applyBindings(new ViewModel());
