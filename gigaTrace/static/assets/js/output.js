var search = window.location.search

const params = new URLSearchParams(window.location.search)

document.getElementById("query").innerText=search
document.getElementById("category").innerText=params.get("type")
var b64

var data

if (params.get("type")=="location"){
    fetch("http://localhost:8080/api/location" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        locs = []
        data = JSON.parse(atob(data))
        for(var i=0;i<data.length;i++){
            locs.push(data[i].LAT_LANG)
        }
        initMapMarker(locs)
        One.onLoad(class {
            static initDataTables() {
                jQuery(".js-dataTable-buttons").DataTable({
                    data: data,
                    columns: [
                        { data: 'FROM_NO', title: 'from_no' },
                        { data: 'TO_NO', title: 'To No' },
                        { data: 'TS', title: 'Timestamp' },
                        { data: 'DURATION', title: 'Duration (s)' },
                        { data: 'C1_ID', title: 'CELL1_ID' },
                        { data: 'C2_ID', title: 'CELL2_ID' },
                        { data: 'TYPE', title: 'Type' },
                        { data: 'IMEI', title: 'IMEI' },
                        { data: 'IMSI', title: 'IMSI' },
                        { data: 'ROAMING', title: 'Roaming' },
                        { data: 'TOWER_ID', title: 'Tower ID' },
                        { data: 'LAT_LANG', title: 'Lat-Long' },
                        { data: 'LOCATION', title: 'Location' },
                    ],
                    pageLength: 10,
                    lengthMenu: [
                        [5, 10, 15, 20],
                        [5, 10, 15, 20]
                    ],
                    autoWidth: !1,
                    buttons: ["copy", "csv", "excel", "pdf", "print"],
                    dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
                })
            }
            static init() {
                this.initDataTables()
            }
        }.init());
    })
    .catch(error => console.log(error))
}

if (params.get("type")=="number"){
    fetch("http://localhost:8080/api/number" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        locs = []
        data = JSON.parse(atob(data))
        for(var i=0;i<data.length;i++){
            locs.push(data[i].LAT_LANG)
        }
        initMapTrace(locs)
        One.onLoad(class {
            static initDataTables() {
                jQuery(".js-dataTable-buttons").DataTable({
                    data: data,
                    columns: [
                        { data: 'FROM_NO', title: 'from_no' },
                        { data: 'TO_NO', title: 'To No' },
                        { data: 'TS', title: 'Timestamp' },
                        { data: 'DURATION', title: 'Duration (s)' },
                        { data: 'C1_ID', title: 'CELL1_ID' },
                        { data: 'C2_ID', title: 'CELL2_ID' },
                        { data: 'TYPE', title: 'Type' },
                        { data: 'IMEI', title: 'IMEI' },
                        { data: 'IMSI', title: 'IMSI' },
                        { data: 'ROAMING', title: 'Roaming' },
                        { data: 'TOWER_ID', title: 'Tower ID' },
                        { data: 'LAT_LANG', title: 'Lat-Long' },
                        { data: 'LOCATION', title: 'Location' },
                    ],
                    pageLength: 10,
                    lengthMenu: [
                        [5, 10, 15, 20],
                        [5, 10, 15, 20]
                    ],
                    autoWidth: !1,
                    buttons: ["copy", "csv", "excel", "pdf", "print"],
                    dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
                })
            }
            static init() {
                this.initDataTables()
            }
        }.init());
    })
    .catch(error => console.log(error))
}

if (params.get("type")=="imei"){
    fetch("http://localhost:8080/api/imei" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        locs = []
        data = JSON.parse(atob(data))
        for(var i=0;i<data.length;i++){
            locs.push(data[i].LAT_LANG)
        }
        console.log(data)
        initMapTrace(locs)
        One.onLoad(class {
            static initDataTables() {
                jQuery(".js-dataTable-buttons").DataTable({
                    data: data,
                    columns: [
                        { data: 'FROM_NO', title: 'from_no' },
                        { data: 'TO_NO', title: 'To No' },
                        { data: 'TS', title: 'Timestamp' },
                        { data: 'DURATION', title: 'Duration (s)' },
                        { data: 'C1_ID', title: 'CELL1_ID' },
                        { data: 'C2_ID', title: 'CELL2_ID' },
                        { data: 'TYPE', title: 'Type' },
                        { data: 'IMEI', title: 'IMEI' },
                        { data: 'IMSI', title: 'IMSI' },
                        { data: 'ROAMING', title: 'Roaming' },
                        { data: 'TOWER_ID', title: 'Tower ID' },
                        { data: 'LAT_LANG', title: 'Lat-Long' },
                        { data: 'LOCATION', title: 'Location' },
                    ],
                    pageLength: 10,
                    lengthMenu: [
                        [5, 10, 15, 20],
                        [5, 10, 15, 20]
                    ],
                    autoWidth: !1,
                    buttons: ["copy", "csv", "excel", "pdf", "print"],
                    dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
                })
            }
            static init() {
                this.initDataTables()
            }
        }.init());
    })
    .catch(error => console.log(error))
}

if (params.get("type")=="mcontacted"){
    fetch("http://localhost:8080/api/mc" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        data = JSON.parse(atob(data))
        One.onLoad(class {
            static initDataTables() {
                jQuery(".js-dataTable-buttons").DataTable({
                    data: data,
                    columns: [
                        { data: 'FROM_NO', title: 'from_no' },
                        { data: 'TO_NO', title: 'To No' },
                        { data: 'TS', title: 'Timestamp' },
                        { data: 'DURATION', title: 'Duration (s)' },
                        { data: 'C1_ID', title: 'CELL1_ID' },
                        { data: 'C2_ID', title: 'CELL2_ID' },
                        { data: 'TYPE', title: 'Frequency' },
                        { data: 'IMEI', title: 'IMEI' },
                        { data: 'IMSI', title: 'IMSI' },
                        { data: 'ROAMING', title: 'Roaming' },
                        { data: 'TOWER_ID', title: 'Tower ID' },
                        { data: 'LAT_LANG', title: 'Lat-Long' },
                        { data: 'LOCATION', title: 'Location' },
                    ],
                    pageLength: 10,
                    lengthMenu: [
                        [5, 10, 15, 20],
                        [5, 10, 15, 20]
                    ],
                    autoWidth: !1,
                    buttons: ["copy", "csv", "excel", "pdf", "print"],
                    dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
                })
            }
            static init() {
                this.initDataTables()
            }
        }.init());
    })
    .catch(error => console.log(error))
}

if (params.get("type")=="ccontacted"){
    fetch("http://localhost:8080/api/cc" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        data = JSON.parse(atob(data))
        One.onLoad(class {
            static initDataTables() {
                jQuery(".js-dataTable-buttons").DataTable({
                    data: data,
                    columns: [
                        { data: 'FROM_NO', title: 'from_no' },
                        { data: 'TO_NO', title: 'To No' },
                        { data: 'TS', title: 'Timestamp' },
                        { data: 'DURATION', title: 'Duration (s)' },
                        { data: 'C1_ID', title: 'CELL1_ID' },
                        { data: 'C2_ID', title: 'CELL2_ID' },
                        { data: 'TYPE', title: 'Type' },
                        { data: 'IMEI', title: 'IMEI' },
                        { data: 'IMSI', title: 'IMSI' },
                        { data: 'ROAMING', title: 'Roaming' },
                        { data: 'TOWER_ID', title: 'Tower ID' },
                        { data: 'LAT_LANG', title: 'Lat-Long' },
                        { data: 'LOCATION', title: 'Location' },
                    ],
                    pageLength: 10,
                    lengthMenu: [
                        [5, 10, 15, 20],
                        [5, 10, 15, 20]
                    ],
                    autoWidth: !1,
                    buttons: ["copy", "csv", "excel", "pdf", "print"],
                    dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
                })
            }
            static init() {
                this.initDataTables()
            }
        }.init());
    })
    .catch(error => console.log(error))
}

if (params.get("type")=="number"){
    fetch("http://localhost:8080/api/number" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        data = JSON.parse(atob(data))
        One.onLoad(class {
            static initDataTables() {
                jQuery(".js-dataTable-buttons").DataTable({
                    data: data,
                    columns: [
                        { data: 'FROM_NO', title: 'from_no' },
                        { data: 'TO_NO', title: 'To No' },
                        { data: 'TS', title: 'Timestamp' },
                        { data: 'DURATION', title: 'Duration (s)' },
                        { data: 'C1_ID', title: 'CELL1_ID' },
                        { data: 'C2_ID', title: 'CELL2_ID' },
                        { data: 'TYPE', title: 'Type' },
                        { data: 'IMEI', title: 'IMEI' },
                        { data: 'IMSI', title: 'IMSI' },
                        { data: 'ROAMING', title: 'Roaming' },
                        { data: 'TOWER_ID', title: 'Tower ID' },
                        { data: 'LAT_LANG', title: 'Lat-Long' },
                        { data: 'LOCATION', title: 'Location' },
                    ],
                    pageLength: 10,
                    lengthMenu: [
                        [5, 10, 15, 20],
                        [5, 10, 15, 20]
                    ],
                    autoWidth: !1,
                    buttons: ["copy", "csv", "excel", "pdf", "print"],
                    dom: "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>><'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
                })
            }
            static init() {
                this.initDataTables()
            }
        }.init());
    })
    .catch(error => console.log(error))
}

if (params.get("type")=="graph"){
    fetch("http://localhost:8080/api/graph" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        // data = JSON.parse(data)
        // console.log(data)
        document.getElementById("graph").innerText=data["out"]
    })
    .catch(error => console.log(error))
}

if (params.get("type")=="qs"){
    fetch("http://localhost:8080/api/qs" + search)
    .then (async response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
    })
    .then(data => {
        document.getElementById("qs").textContent=data["out"]
    })
    .catch(error => console.log(error))
}


// console.log(JSON.parse(atob(b64)))

