function initMapMarker(markers) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {lat:29.872682955003015, lng:77.88160792459699},
    });
    for (var i=0;i<markers.length;i++){
        var lat=parseFloat(markers[i].split(", ")[0])
        var lng=parseFloat(markers[i].split(", ")[1])
        var myLatlng = new google.maps.LatLng(lat,lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            title:String(i+1)
        });
        marker.setMap(map);
    }

}

function initMapTrace(markers) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {lat:29.872682955003015, lng:77.88160792459699},
    });
    locs = []
    for (var i=0;i<markers.length;i++){
        var lat=parseFloat(markers[i].split(", ")[0])
        var lng=parseFloat(markers[i].split(", ")[1])
        var myLatlng = new google.maps.LatLng(lat,lng);
        locs.push(myLatlng)
    }
    var polyline = new google.maps.Polyline({
        path: locs,
        strokeColor: "red",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        geodesic: true,
        icons: [{
            icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW},
            offset: '100%',
            repeat: '20px'
        }]
    });
    polyline.setMap(map);
}

