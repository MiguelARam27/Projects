using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;

public partial class WISAAPI_Test : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{
		HttpContext.Current.Response.Write("<SCRIPT LANGUAGE=\"JavaScript\">alert(\"Contact Manager API Test\")</SCRIPT>");
	}
}
