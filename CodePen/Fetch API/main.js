
let url = "https://randomuser.me/api/";

let btn = document.querySelector("#btn");
let email =document.querySelector("#email");
let city =document.querySelector("#city");
let img = document.querySelector("#avatar");
let name =document.querySelector("#fullname");


btn.addEventListener("click", function(){
  alert("hello");
  fetch(url)
  .then(parseJSON)
  .then(updateprofile)
  .catch(function(err){
    console.log(err);
  })
});

function parseJSON(res){
    return res.json().then(function(parseddata){
        return parseddata.results[0];
    })
};

function updateprofile(data){
    var names = data.name.first + " " + data.name.last;
    name.innerText = names;
    img.src = data.picture.medium;
};
