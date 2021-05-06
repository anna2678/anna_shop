window.onload = function(){
    $.getJSON("http://spreadsheets.google.com/feeds/list/10H4WyiohNqiMSaw-94vAwDJeyjS05nXab_AfvUv38wg/od6/public/values?alt=json",
    function(data){
       data = data['feed']['entry']
       show(data)
       console.log(data);
    }
)
function show (data){
    var out = '';
    for(var i= 0; i < data.length; i++){
       out+=` <div class="product_field">`;
       out +=` <div class="card">`;
       out += `<h3 class="title">${data[i]['gsx$name']['$t']}</h3>`;
       out +=   `<img src="${data[i]['gsx$image']['$t']}">`;
       out += `  <p class="price">цена:${data[i]['gsx$price']['$t']}</p>`;
       out+=`</div>` ;
       out+=`</div>`;
    }
    document.querySelector('.product_field').innerHTML = out;
}
}