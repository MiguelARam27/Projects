let btn = document.querySelector("button");
let price =document.getElementById("price");



//listen for clicks
btn.addEventListener("click", function(){
  //make the request
  let XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200) {
    let data = JSON.parse(XHR.responseText);
       price.innerText= data.bpi.GBP.rate;
    }
  }
  
 let url="https://api.coindesk.com/v1/bpi/currentprice.json";
 XHR.open("GET",url);
 XHR.send();
 
});