function submitReq(){
    url = `output.html?type=graph`
    num = document.getElementById('numField').value
    depth = document.getElementById('depthField').value
    url+= `&number=${num}`
    url += `&depth=${depth}`
    
    window.open(url, "_blank");
}