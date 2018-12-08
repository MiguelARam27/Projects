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

public partial class WISAAPI_Signup : System.Web.UI.Page
{
	public struct SignupRequest
	{
		public string firstName, lastName, email, login, password;
	}

	public struct SignupResponse
	{
		public int id;
		public string firstName, lastName;
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		SignupRequest req;
		SignupResponse res = new SignupResponse();
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
			string getUserInfo = String.Format("select UserID,FirstName,LastName from ContactUser.Users where UserName='{0}' and Password='{1}'", req.login, req.password);
			SqlCommand command = new SqlCommand( getUserInfo, connection );
			SqlDataReader reader = command.ExecuteReader();
			
			if(reader.HasRows)
			{
				res.error = "User Name already created";
				SendResultInfoAsJson(res);
				return;
			}
			reader.Close();
			
			string sql = String.Format("INSERT INTO ContactUser.Users (FirstName, LastName, Email, UserName, Password) Values('{0}', '{1}', '{2}', '{3}', '{4}')", req.firstName, req.lastName, req.email, req.login, req.password);
			command = new SqlCommand( sql, connection );
			command.ExecuteNonQuery();
			
			command = new SqlCommand( getUserInfo, connection );
			reader = command.ExecuteReader();
			
			if(reader.HasRows)
				if(reader.Read())
				{
					res.id = Convert.ToInt32( reader["UserID"] );
					res.firstName = Convert.ToString( reader["FirstName"] );
					res.lastName = Convert.ToString( reader["LastName"] );
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
	
	SignupRequest GetRequestInfo()
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
		SignupRequest req = JsonConvert.DeserializeObject<SignupRequest>(strJson);

		return (req);
	}
	
	void SendResultInfoAsJson(SignupResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}
