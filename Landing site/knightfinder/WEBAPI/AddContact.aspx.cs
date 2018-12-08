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

public partial class WISAAPI_AddContact : System.Web.UI.Page
{
	public struct AddContactRequest
	{
		public string userId;
		public string firstName, lastName, phone, email;
	}

	public struct AddContactResponse
	{
		public int contactId;
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		AddContactRequest req;
		AddContactResponse res = new AddContactResponse();
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

			string sql = String.Format("INSERT INTO ContactUser.Contacts(FirstName, LastName, Phone, Email, CreatedBy) Values ('{0}', '{1}', '{2}', '{3}', {4})", req.firstName, req.lastName, req.phone, req.email, req.userId);
			SqlCommand command = new SqlCommand( sql, connection );
			command.ExecuteNonQuery();
			
			sql = String.Format("SELECT TOP 1 ContactID FROM ContactUser.Contacts WHERE FirstName = '{0}' AND LastName = '{1}' AND Phone = '{2}' AND Email = '{3}' AND CreatedBy = {4} ORDER BY ContactID desc", req.firstName, req.lastName, req.phone, req.email, req.userId);
			
			command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			
			if(reader.HasRows)
				if(reader.Read())
					res.contactId = Convert.ToInt32(reader["ContactID"]);
			
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
	
	AddContactRequest GetRequestInfo()
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
		AddContactRequest req = JsonConvert.DeserializeObject<AddContactRequest>(strJson);

		return (req);
	}
	
	void SendResultInfoAsJson(AddContactResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}
