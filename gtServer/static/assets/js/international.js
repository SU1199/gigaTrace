function submitReq(){
    url = `output.html?type=international`
    num = document.getElementById('country').value
    from_ts = document.getElementById('from_ts').value
    to_ts = document.getElementById('to_ts').value
    url += `&number=${num}`
    url += `&ts_from=${from_ts}`
    url += `&ts_to=${to_ts}`

    
    window.open(url, "_blank");
}