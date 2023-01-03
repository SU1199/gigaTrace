function submitReq(){
    url = `output.html?type=qs`
    num = document.getElementById('numField').value
    url += `&number=${num}`
    
    window.open(url, "_blank");
}