location_=[]

locations = []

function initialize() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var place = autocomplete.getPlace();
          location_ = [place.name,place.geometry.location.lat(),place.geometry.location.lng()]
      });
}

function addToLoc(){
    locations.push(location_)
    var li = document.createElement(`div`)
    li.innerHTML = `<p>`+location_[0]+`</p>`
    document.getElementById("locList").appendChild(li);
}

function submitReq(){
    url = `output.html?type=location`
    for (var i=0;i<locations.length;i++) {
        var n = `&location=${locations[i][1]+', '+locations[i][2]}`
        url+=n
    }
    from_ts = document.getElementById('from_ts').value
    to_ts = document.getElementById('to_ts').value

    url += `&ts_from=${from_ts}`
    url += `&ts_to=${to_ts}`

    
    window.open(url, "_blank");
}

google.maps.event.addDomListener(window, 'load', initialize);