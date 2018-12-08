var urlBase='http://knightfinder.com/WEBAPI';
var extension ="aspx";
var userId = 0;

$(document).ready(function(){
	userId = localStorage.getItem("userId");
	if(userId < 1)
	{
		location.href = "/";
		return;
	}
	getContacts();

	$("#myInput").on("keyup", function() {

		var value = $(this).val().toLowerCase();

		$("#ourTable tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});


	$("#makeChanges").click(function()
	{
		var checker ='';
		var a,b,c,d;
		a=$('#firstName').val();
		b=$('#lastName').val();
		c=$('#phoneNumber').val();
		d=$('#Email').val();

		if(a == '' || b == '' || c == '' || d == '')
		{
			alert("Error: You are missing some information for your new contact");
		}
		else
		{
			addContact();
			$('#firstName,#lastName,#phoneNumber,#Email').val('');
		}
	});
})

function addContact()
{
	var url = urlBase + '/AddContact.' + extension;
	var firstName= document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phone = document.getElementById("phoneNumber").value;
	var email = document.getElementById("Email").value;

	var jsonPayload= '{"userId":' + userId + ', firstName:"'+ firstName+'", lastName:"'+lastName+'", phone:"' +phone+'", email:"'+email+'"}';

	$.post(url, jsonPayload)
		.done(function(data){
			if(data.contactId > 0)
			{
				var table = document.getElementById("ourTable");
				var row = table.insertRow(table.rows.length);
				var curCell = row.insertCell(0);
				var curItem = document.createElement('text');
				curItem.innerHTML = data.contactId;
				curCell.appendChild(curItem);

				curCell = row.insertCell(1);
				curItem = document.createElement('text');
				curItem.innerHTML = firstName;
				curCell.appendChild(curItem);

				curCell = row.insertCell(2);
				curItem = document.createElement('text');
				curItem.innerHTML = lastName;
				curCell.appendChild(curItem);

				curCell = row.insertCell(3);
				curItem = document.createElement('text');
				curItem.innerHTML = phone;
				curCell.appendChild(curItem);

				curCell = row.insertCell(4);
				curItem = document.createElement('text');
				curItem.innerHTML = email;
				curCell.appendChild(curItem);

				curCell = row.insertCell(5);
				var btn = document.createElement('button');
				btn.innerHTML = "Delete"
				btn.onclick = (function(){
					deleteFriend(this);

				});
				curCell.appendChild(btn);
				
				var value = $("#myInput").val().toLowerCase();
				$("#ourTable tr").filter(function() {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			}
		});
}


function deleteFriend(btn)
{
	var row = btn.parentNode.parentNode;
	var contactId = row.cells[0].innerText;
	var url = urlBase + "/DeleteContact." + extension;
	var jsonPayload = "{userId:" + userId + ", contactId:" + contactId + "}";

	$.post(url, jsonPayload);
	row.parentNode.removeChild(row);
}

function getContacts()
{
	var url = urlBase + "/GetContacts." + extension;
	var table = document.getElementById("ourTable");
	$.post(url, "{userId:" + userId + "}")
		.done(function(data){
			var contacts = data.contacts;

			for(var i = 0; i < contacts.length; i++)
			{
				var row = table.insertRow(table.rows.length);
				var curCell = row.insertCell(0);
				var curItem = document.createElement('text');
				curItem.innerHTML = contacts[i].ContactID;
				curCell.appendChild(curItem);

				curCell = row.insertCell(1);
				curItem = document.createElement('text');
				curItem.innerHTML = contacts[i].firstName;
				curCell.appendChild(curItem);

				curCell = row.insertCell(2);
				curItem = document.createElement('text');
				curItem.innerHTML = contacts[i].lastName;
				curCell.appendChild(curItem);

				curCell = row.insertCell(3);
				curItem = document.createElement('text');
				curItem.innerHTML = contacts[i].phone;
				curCell.appendChild(curItem);

				curCell = row.insertCell(4);
				curItem = document.createElement('text');
				curItem.innerHTML = contacts[i].email;
				curCell.appendChild(curItem);

				curCell = row.insertCell(5);
				var btn = document.createElement('button');
				btn.innerHTML = "Delete"
				btn.onclick = (function(){
					deleteFriend(this);
				});
				curCell.appendChild(btn);
			}
		})
		.fail(function(data)
		{
			alert("Error contacting API");
		});
}