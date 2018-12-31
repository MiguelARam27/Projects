let btn = document.querySelector("button");
let price =document.getElementById("price");



  
  // document.getElementById("demo").innerHTML= value + " " +text;



//listen for clicks
btn.addEventListener("click", function(){
  //make the request
  let XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200) {
    let data = JSON.parse(XHR.responseText);
       price.innerText= data.bpi[value].rate + " " +value;
    }
  }
  

let e = document.getElementById("option");
let value = e.options[e.selectedIndex].value;
var text = e.options[e.selectedIndex].text;

 let url="https://api.coindesk.com/v1/bpi/currentprice.json";
 XHR.open("GET",url);
 XHR.send();
 
});



