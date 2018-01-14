window.onerror = function err() {return false;}

var req = new Array();

function favorites(a,b,c,d) {	
	if (window.XMLHttpRequest) {
		req[a] = new XMLHttpRequest();
		req[a].onreadystatechange = (function() { processReqChangeF(a) });
		req[a].open("GET", "/forum/index.php?act=favorites&do=" + b + "&ajax=1&fav=" + a + "&folder=" + c + "&hidden=" + d, true);
		req[a].setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req[a].send(null);		
	} else if (window.ActiveXObject) {
		req[a] = new ActiveXObject("Microsoft.XMLHTTP");
		if (req[a]) {
			req[a].onreadystatechange = (function() { processReqChangeF(a) });
			req[a].open("GET", "/forum/index.php?act=favorites&do=" + b + "&ajax=1&fav=" + a + "&folder=" + c + "&hidden=" + d, true);
			req[a].setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			req[a].send();
		}		
	} else return true;	
	return false;
}

function processReqChangeF(a) {	
	if (req[a].readyState == 4) {
		if (req[a].status == 200) {			
			abc = req[a].responseText.split("=");
			document.getElementById(abc[0]).innerHTML = " <b>" + abc[1] + "<b> ";
		}
	}
	else if (req[a].readyState == 3 || req[a].readyState == 1) { 
  document.getElementById("f"+a).innerHTML = " загружаю ответ... "; 
 } 
}