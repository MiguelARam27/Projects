
let url = "https://randomuser.me/api/";

let btn = document.querySelector("#btn");
let email =document.querySelector("#email");
let city =document.querySelector("#city");
let img = document.querySelector("#avatar");
let name =document.querySelector("#fullname");
let username = document.querySelector("#username");

btn.addEventListener("click", function(){
  fetch(url)
  .then(handleErrors)
  .then(parseJSON)
  .then(updateprofile)
  .catch(displayErrors)
});

function handleErrors(res){
    if(!res.ok){
        throw Error(res.status);
    }
    return res;
}
function parseJSON(res){
    return res.json().then(function(parseddata){
        return parseddata.results[0];
    })
};

function updateprofile(data){
    var names = data.name.first + " " + data.name.last;
    name.innerText = names;
    img.src = data.picture.medium;
    username.innerText= data.login.username;
    city.innerText = data.location.city;
    email.innerText = data.email;
};
 function displayErrors(err){
    console.log(err);
 }