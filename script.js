window.onload = function(){
var cart = {};
var goods = {};
    function showDate(){
        var str = '';
        var now = new Date();
        str = now.toLocaleTimeString();
        document.querySelector('.date').innerHTML = str;
    }
    setInterval(showDate, 1000);
    $.getJSON("http://spreadsheets.google.com/feeds/list/10H4WyiohNqiMSaw-94vAwDJeyjS05nXab_AfvUv38wg/od6/public/values?alt=json",
    function(data){
       data = data['feed']['entry']
       show(data)
       console.log(data);
        goods = arrayHelper(data)
        console.log(goods)
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
       out+=`<button name="add_to_cart" data =" ${data[i]['gsx$article']['$t']}">купить</button>` ;
       out+=`</div>`;
    }
    document.querySelector('.product_field').innerHTML = out;
}
document.onclick = function(e){
    console.log(e.target.attributes.name.nodeValue,e.target.attributes.data.nodeValue);
    if (e.target.attributes.name.nodeValue  == 'add_to_cart'){
        addToCart(e.target.attributes.data.nodeValue);
    }
}
 function addToCart(elem){
        if (cart[elem] !== undefined){
            cart[elem]++;
        }
    else{
        cart[elem] = 1;
    }
    console.log(cart);
 }
 function arrayHelper(arr){
     var out = {};
     for(var i = 0; i < arr.length; i++){
         var temp = {};
         temp['article'] = arr[i]['gsx$article']['$t'];
         temp['name'] = arr[i]['gsx$name']['$t'];
         temp['count'] = arr[i]['gsx$count']['$t'];
         temp['image'] = arr[i]['gsx$image']['$t'];
         temp['price'] = arr[i]['gsx$price']['$t'];
         out[arr[i]['gsx$article']['$t']] = temp;
     }
     return out ;
 }
}