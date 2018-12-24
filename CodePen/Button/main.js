// let item = document.querySelectorAll("button");
let background = document.getElementsByTagName("body");
let buttons = document.querySelectorAll("button");
let theme0btn = document.getElementById("theme0");
let theme1btn = document.getElementById("theme1");
let theme2btn = document.getElementById("theme2");
let theme3btn = document.getElementById("theme3");
let theme4btn = document.getElementById("theme4");
let theme5btn = document.getElementById("theme5");

// Salt.addEventListener("click",function(){
//   item.innerHTML = "hidden";
// });

function theme(a){
  for(let i=0;i<buttons.length;i++){
    // buttons[i].style.backgroundColor="var(--theme"+a+"--)";
    // buttons[i].style.boxShadow="0 6px var(--theme"+a+"shadow--)";
    buttons[i].className="button"+a;
  }
  background[0].style.backgroundColor="var(--them"+a+"background--)";
}

theme0btn.addEventListener("click",function(){
    theme(0);
});

theme1btn.addEventListener("click",function(){
theme(1);
});

theme2btn.addEventListener("click",function(){
    theme(2);
});

theme3btn.addEventListener("click",function(){
    theme(3);
});

theme4btn.addEventListener("click",function(){
    theme(4);
});

theme5btn.addEventListener("click",function(){
    theme(5);
});






// buttons[0].addEventListener("click",function(){

//      buttons[0].style.backgroundColor= "var(--theme1--)";
//  });


