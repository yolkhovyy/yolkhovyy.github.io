window.onerror = function err() {return false;}

var req = new Array();

function vote(a,b,c) {	
	if (window.XMLHttpRequest) {
		req[a] = new XMLHttpRequest();
		req[a].onreadystatechange = (function() { processReqChange(a) });
		req[a].open("GET", "/forum/index.php?act=ST&f=" + b + "&t=" + a + "&CODE=00&ajax=1&rating=" + c, true);
		req[a].setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req[a].send(null);		
	} else if (window.ActiveXObject) {
		req[a] = new ActiveXObject("Microsoft.XMLHTTP");
		if (req[a]) {
			req[a].onreadystatechange = (function() { processReqChange(a) });
			req[a].open("GET", "/forum/index.php?act=ST&f=" + b + "&t=" + a + "&CODE=00&ajax=1&rating=" + c, true);
			req[a].setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			req[a].send();
		}		
	} else return true;	
	return false;
}

function processReqChange(a) {	
	if (req[a].readyState == 4) {
		if (req[a].status == 200) {			
			abc = req[a].responseText.split("_");
			document.getElementById(abc[0]).innerHTML = abc[1];
		}
	}
	else if (req[a].readyState == 3 || req[a].readyState == 1) { 
  document.getElementById("q"+a).innerHTML = "загружаем ответ..."; 
 } 
}


var reqc = new Array();

function votec(a,b,c,d) {	
	if (window.XMLHttpRequest) {
		reqc[a] = new XMLHttpRequest();
		reqc[a].onreadystatechange = (function() { processReqChangec(a) });
		reqc[a].open("GET", "/forum/index.php?act=ST&f=" + b + "&t=" + d + "&c=" + a + "&CODE=02&ajax=1&rating=" + c, true);
		reqc[a].setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		reqc[a].send(null);		
	} else if (window.ActiveXObject) {
		reqc[a] = new ActiveXObject("Microsoft.XMLHTTP");
		if (reqc[a]) {
			reqc[a].onreadystatechange = (function() { processReqChangec(a) });
			reqc[a].open("GET", "/forum/index.php?act=ST&f=" + b + "&t=" + d + "&c=" + a + "&CODE=02&ajax=1&rating=" + c, true);
			reqc[a].setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			reqc[a].send();
		}		
	} else return true;	
	return false;
}

function processReqChangec(a) {	
	if (reqc[a].readyState == 4) {
		if (reqc[a].status == 200) {			
			abc = reqc[a].responseText.split("_");
			document.getElementById(abc[0]).innerHTML = abc[1];
		}
	}
	else if (reqc[a].readyState == 3 || reqc[a].readyState == 1) { 
  document.getElementById("p"+a).innerHTML = "загружаем ответ..."; 
 } 
}