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

var ViewModel = function() {

    // universities.forEach(function(university) {
    //     // console.log(university.title);
    //
    //     var marker = new google.maps.Marker({
    //         position: university.position,
    //         map: map,
    //         title: university.title
    //     });
    // });

};

ko.applyBindings(new ViewModel());
