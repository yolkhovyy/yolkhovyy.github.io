var http_req;
var num_images = -1;
var work_path;
var main_image;



function image_loaded()
{
	setTimeout("document.getElementById('wheel').style.visibility = 'hidden';", 1500);
}


function get_main_image(image,gnm)
{
	document.getElementById("wheel").style.visibility = 'visible';
	document.getElementById('main_image').onLoad = image_loaded();
	document.getElementById("main_image").src = image;

	document.getElementById("scroll_left").href = "javascript:get_next_image('" + image + "',-1)";
	document.getElementById("scroll_right").href = "javascript:get_next_image('" + image + "',1)";
	var pathname = image.substring(0, image.lastIndexOf('/') + 1);
	
	if(gnm)
		get_num_images(pathname);
}


function get_num_images(pathname)
{
	work_path = pathname;
	num_images = -1;
	http_req = http_request();
	if(http_req != null)
	{
		http_req.onreadystatechange = http_resp;
		http_req.open("GET", pathname + "p.xml", true);
		http_req.send(null);
	}
}


function http_resp()
{
	try
	{
		var xml_obj = http_response(http_req);

		if(xml_obj != null)
			num_images = Number(xml_obj.getElementsByTagName("num_images")[0].firstChild.nodeValue);

		if(num_images >= 1)
		{
			var tmp = "";
			var scroll_steps = document.getElementById('scroll_steps');
			for(i = 1; i <= num_images; i++)
				tmp += '<a href="javascript:get_main_image(\'' + work_path + i + '.jpg\',false)" onclick="set_step_selected(Number(this.firstChild.nodeValue))">' + i + '</a>';

			scroll_steps.innerHTML = tmp;
			set_step_selected(1);
		}
	}
	catch(e)
	{
	}
}


function get_next_image(image,inc_dec)
{
	document.getElementById("wheel").style.visibility = 'visible';
	
	var pathname = image.substring(0, image.lastIndexOf('/') + 1);
	var filenum = Number(image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf('.'))) + inc_dec;
	
	if(num_images != -1)
	{
		if(filenum > num_images)
			filenum = 1;
		else if(filenum < 1)
			filenum = num_images;

		set_step_selected(filenum);
	}

	image = pathname + String(filenum) + ".jpg";
	document.getElementById('main_image').onLoad = image_loaded();
	document.getElementById("main_image").src = image;

	document.getElementById("scroll_left").href = "javascript:get_next_image('" + image + "',-1)";
	document.getElementById("scroll_right").href = "javascript:get_next_image('" + image + "',1)";
}


function set_step_selected(s)
{
	var scroll_steps = document.getElementById('scroll_steps').childNodes;
	var scroll_step;
	var n = scroll_steps.length;
	for(i = 0; i < n; i++)
	{
		scroll_step = scroll_steps[i];
		scroll_step.className = null;
		if(s == Number(scroll_step.firstChild.nodeValue))
			scroll_step.className = "selected";
	}
}


function clear_works_selected(t)
{
	var works = document.getElementById('thumbnails').getElementsByTagName("div");
	var n = works.length;
	for(i = 0; i < n; i++)
		works[i].getElementsByTagName("a")[0].className = null;
		
	t.className = 'selected';
}