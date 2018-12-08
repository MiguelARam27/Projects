
var urlBase = 'http://knightfinder.com/WEBAPI';
var extension = "aspx";

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("userName").value;
	var password = sha1(document.getElementById("inputPassword").value);
	document.getElementById("loginResult").innerHTML = "";
	
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;
	
	$.post(url, jsonPayload)
		.done(function(data){
			userId = data.id;
			
			if(userId < 1)
			{
				document.getElementById("loginResult").innerHTML = " User/Password combination incorrect";
				return;
			}
			else
			{
				localStorage.setItem("userId", userId);
				location.href = "contacts.html";
			}
		})
		.fail(function(data){
			alert("Error contacting API");
		});

	return false;
}

function signUpPage(){
	//hide all elements not relevant to signing up
	document.getElementById("header2").style.visibility = 'hidden';
	document.getElementById("header3").style.display = "block";
	document.getElementById("loginButton").style.display = 'none';
	document.getElementById("signupButton").style.display = 'none';
	document.getElementById("signUpButton2").style.display = "block";
	document.getElementById("rememberMe").style.display = 'none';
	document.getElementById("fN").style.display = "block";
	document.getElementById("lS").style.display = "block";
	document.getElementById("inputEmail").style.display = "block";
}

function signUp(){
    var email = document.getElementById("inputEmail").value;
	var password = sha1(document.getElementById("inputPassword").value);
    var userName = document.getElementById("userName").value;
    var first = document.getElementById("fN").value;
	var last = document.getElementById("lS").value;
	var jsonPayload = '{"firstName" : "' + first + '", "lastName" : "' + last + '", "email" : "' + email + '", "login" : "' + userName + '", "password" : "' + password + '"}';
	var url = urlBase + '/Signup.' + extension;
    
	$.post(url, jsonPayload)
		.done(function(data){
			userId = data.id;
			
			if(userId < 1)
			{
				document.getElementById("loginResult").innerHTML = "Failed to create user";
				return false;
			}
			else
			{
				localStorage.setItem("userId", userId);
				location.href = "contacts.html";
			}
		})
		.fail(function(data){
			alert("Error contacting API");
		});
		
	return false;
}
