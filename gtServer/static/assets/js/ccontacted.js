nums = []

function addToNums(){
    var num = document.getElementById('numField').value
    nums.push(num)
    var li = document.createElement(`div`)
    li.innerHTML = `<p>`+num+`</p>`
    document.getElementById("locList").appendChild(li);
}

function submitReq(){
    url = `output.html?type=ccontacted`
    for (var i=0;i<nums.length;i++) {
        var n = `&number=${nums[i]}`
        url+=n
    }
    from_ts = document.getElementById('from_ts').value
    to_ts = document.getElementById('to_ts').value

    url += `&ts_from=${from_ts}`
    url += `&ts_to=${to_ts}`

    
    window.open(url, "_blank");
}