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

public partial class WISAAPI_Login : System.Web.UI.Page
{

	public struct LoginRequest
	{
		public string login, password;
	}

	public struct LoginResponse
	{
		public int id;
		public string firstName, lastName;
		public string error;
	}

	protected void Page_Load(object sender, EventArgs e)
	{
		LoginRequest req;
		LoginResponse res = new LoginResponse();
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

			string sql = String.Format("select UserID,UserName,Password from ContactUser.Users where UserName='{0}' and Password='{1}'", req.login, req.password);
			SqlCommand command = new SqlCommand( sql, connection );
			SqlDataReader reader = command.ExecuteReader();
			if(reader.Read())
			{
				res.id = Convert.ToInt32( reader["UserID"] );
				res.firstName = Convert.ToString( reader["UserName"] );
				res.lastName = Convert.ToString( reader["Password"] );
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
	
	LoginRequest GetRequestInfo()
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
		LoginRequest req = JsonConvert.DeserializeObject<LoginRequest>(strJson);

		return (req);
	}
	
	void SendResultInfoAsJson(LoginResponse res)
	{
		string strJson = JsonConvert.SerializeObject(res);
		Response.ContentType = "application/json; charset=utf-8";
		Response.Write(strJson);
		Response.End();
	}

}
