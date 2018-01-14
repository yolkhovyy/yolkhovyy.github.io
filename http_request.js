
function http_request()
{
	var http_req = null;

	if (window.XMLHttpRequest)
		http_req = new XMLHttpRequest();							// mozilla
	else
	{
		try
		{
			http_req = new ActiveXObject('Msxml2.XMLHTTP');			// msie
		}
		catch(err)
		{
			try
			{
				http_req = new ActiveXObject("Microsoft.XMLHTTP");	// msie
			}
			catch(err)
			{
//				alert(SUPPORT_ERROR);
			}
		}
	}

	return http_req;
}

function http_response(http_req)
{
    var xml_obj = null;

    // loaded
    if (http_req.readyState == 4)
    {
        // check status
        if (http_req.status != 200)
        {
//            alert(LINK_ERROR);
		}
        else
        {
            //alert(http_req.getAllResponseHeaders());
            //alert(http_req.responseText);
            if (window.ActiveXObject)
            {
                // msie
                xml_obj = new ActiveXObject("Microsoft.XMLDOM");
                xml_obj.loadXML(http_req.responseText);
                if (xml_obj.parseError.errorCode != 0)
                    alert(ERROR+xml_obj.parseError.line+"\n"+xml_obj.parseError.errorCode+"\n"+xml_obj.parseError.reason);
            }
            else
                // mozilla
                xml_obj = http_req.responseXML;
        }
    }
    
    return xml_obj;
}
