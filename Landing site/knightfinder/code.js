
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

	var login = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;

	//alert(login);
	//alert(password);

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	//alert(jsonPayload);
	//alert(url);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{	alert("about to send the payload");
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );
		//alert("the json object that is being passed is : "+jsonObject);
		userId = jsonObject.id;
		//alert("The userId is : " + userId);

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = " User/Password combination incorrect";
			return;
		}
		else{
			document.getElementById("loginResult").innerHTML = " IT WORKED";
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		//alert("first name: "+firstName+"\n"+"lastname: "+lastName);
		
		location.href = "contacts.html"
		//document.getElementById("userName").innerHTML = firstName + " " + lastName;

		//document.getElementById("inputEmail").value = "";
		//document.getElementById("inputPassword").value = "";
		
	}
	catch(err)
	{	alert("The error is " + err);
		document.getElementById("loginResult").innerHTML = err.message;
	}

	return false;
}

