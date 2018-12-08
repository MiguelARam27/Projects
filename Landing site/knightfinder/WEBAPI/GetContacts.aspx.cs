using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;

public partial class WISAAPI_GetContacts : System.Web.UI.Page
{
	public struct GetContactRequest
	{
		public string userId;
	}
	
	public struct Contact
	{
		public int ContactID;
		public string firstName, lastName, phone, email;
	}

	public struct GetContactResponse
	{
		public List<Contact> contacts;
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		GetContactRequest req;
		GetContactResponse res = new GetContactResponse();
		res.error = String.Empty;
		
		// 1. Deserialize the incoming Json.
		try
		{
			req = GetRequestInfo();
		}
		catch(Exception ex)
		{
			res.error = ex.Message.ToString();

			// Return the results as Json.
			SendResultInfoAsJson(res);
			return;
		}

		SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
		try
		{
			connection.Open();

			string sql = String.Format("SELECT ContactID, FirstName, LastName, Phone, Email FROM ContactUser.Contacts WHERE CreatedBy = {0}", req.userId);
			SqlCommand command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			
			res.contacts = new List<Contact>();
			if(reader.HasRows)
			{
				while(reader.Read())
				{
					Contact c = new Contact();
					c.ContactID = Convert.ToInt32(reader["ContactID"]);
					c.firstName = Convert.ToString(reader["FirstName"]);
					c.lastName = Convert.ToString(reader["LastName"]);
					c.phone = Convert.ToString(reader["Phone"]);
					c.email = Convert.ToString(reader["Email"]);
					
					res.contacts.Add(c);
				}
			}
			reader.Close();
		}
		catch(Exception ex)
		{
			res.error = ex.Message.ToString();
		}
		finally
		{
			if( connection.State == ConnectionState.Open )
			{
				connection.Close();
			}
		}
		
		// Return the results as Json.
		SendResultInfoAsJson(res);
	}
	
	GetContactRequest GetRequestInfo()
	{
		// Get the Json from the POST.
		string strJson = String.Empty;
		HttpContext context = HttpContext.Current;
		context.Request.InputStream.Position = 0;
		using (StreamReader inputStream = new StreamReader(context.Request.InputStream))
		{
			strJson = inputStream.ReadToEnd();
		}

		// Deserialize the Json.
		GetContactRequest req = JsonConvert.DeserializeObject<GetContactRequest>(strJson);

		return (req);
	}
	
	void SendResultInfoAsJson(GetContactResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}
