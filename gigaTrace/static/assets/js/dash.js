function initMap() {
    const myLatLngs = [{
        lat: 29.876482751437933,
        lng: 77.86231306839662

    }, {
        lat: 29.88919921244669,
        lng: 77.87291683782392


    }, {
        lat: 29.86783998999902,
        lng: 77.86613621346662


    }, {
        lat: 29.866475226878435,
        lng: 77.90653927159256


    }, {
        lat: 29.864294869505365,
        lng: 77.88821231357691


    }, {
        lat: 29.847212843835475,
        lng: 77.8823276072428


    }, {
        lat: 29.875242010802225,
        lng: 77.87609725845691

    }, {
        lat: 29.85372315096311,
        lng: 77.91307403707428

    }, {
        lat: 29.885425046975623,
        lng: 77.8647752290825

    }, {
        lat: 29.856546304881743,
        lng: 77.87205252548942


    }];
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: myLatLngs[0],
    });
    for (var i = 0; i < myLatLngs.length; i++) {
        new google.maps.Marker({
            position: myLatLngs[i],
            map,
            title: i.toString(),
        });
    }

}

window.initMap = initMap;
