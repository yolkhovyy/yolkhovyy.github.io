var B_open = 0;
var I_open = 0;
var U_open = 0;
var QUOTE_open = 0;
var CODE_open = 0;
var MOD_open = 0;
var EX_open = 0; 
var SQL_open = 0;
var HTML_open = 0;

//-- mod_bbcode begin
//-- bbcode_open begin
var ALIGN_open=0;
var SUB_open=0;
var SUP_open=0;
var BLUR_open=0;
var FV_open=0;
var FH_open=0;
var INV_open=0;
var YOUTUBE_open=0;
var SPOILER_open=0;
var C_open=0;
var SEARCH_open=0;
var GOOGLE_open=0;
var MP3_open=0;
var RIGHT_open=0;
var LEFT_open=0;
var MORE_open=0;
//-- bbcode_open end
//-- mod_bbcode end

var bbtags   = new Array();

var myAgent   = navigator.userAgent.toLowerCase();
var myVersion = parseInt(navigator.appVersion);

var is_ie   = ((myAgent.indexOf("msie") != -1)  && (myAgent.indexOf("opera") == -1));
var is_nav  = ((myAgent.indexOf('mozilla')!=-1) && (myAgent.indexOf('spoofer')==-1)
                && (myAgent.indexOf('compatible') == -1) && (myAgent.indexOf('opera')==-1)
                && (myAgent.indexOf('webtv') ==-1)       && (myAgent.indexOf('hotjava')==-1));

var is_win   =  ((myAgent.indexOf("win")!=-1) || (myAgent.indexOf("16bit")!=-1));
var is_mac    = (myAgent.indexOf("mac")!=-1);
var is_opera = (myAgent.indexOf("opera") != -1);
if (is_opera) {
    var myVersion = parseFloat(myAgent.substr(myAgent.indexOf('opera') + 6, 4) );
}

var allcookies = document.cookie;
var pos = allcookies.indexOf("bbmode=");

prep_mode();

function prep_mode()
{
	if (pos != 1) {
		var cstart = pos + 7;
		var cend   = allcookies.indexOf(";", cstart);
		if (cend == -1) { cend = allcookies.length; }
		cvalue = allcookies.substring(cstart, cend);
		
		if (cvalue == 'ezmode') {
			document.REPLIER.bbmode[0].checked = true;
		} else {
			document.REPLIER.bbmode[1].checked = true;
		}
	} 
	else {
		// default to normal mode.
		document.REPLIER.bbmode[1].checked = true;
	}
}

  function storeCaret(el) { 
    if (el.createTextRange) {
      el.caretPos = document.selection.createRange().duplicate();
    }
  }

 function getText() {
    if (is_ie) {
    	var form = document.forms["REPLIER"]; 
      return ((form["Post"].createTextRange && form["Post"].caretPos) ? form["Post"].caretPos.text : '');
    } else { return ''; }
  }

  function isUrl(text) {
    return ((text.indexOf('.') > 7) &&
            ((text.substring(0,7) == 'http://') ||
            (text.substring(0,6) == 'ftp://')));
  } 

function setmode(mVal)
{
	document.cookie = "bbmode="+mVal+"; path=/; expires=Wed, 1 Jan 2020 00:00:00 GMT;";
}

function get_easy_mode_state()
{	
	if (document.REPLIER.bbmode[0].checked) {
		return true;
	}
	else {
		return false;
	}
}

function hello(){}


function hstat(msg)
{
	document.REPLIER.helpbox.value = eval( "help_" + msg );
}

function cstat()
{
	var c = stacksize(bbtags);
	if ( (c < 1) || (c == null) ) {
		c = 0;
	}
	if ( ! bbtags[0] ) {
		c = 0;
	}
	document.REPLIER.tagcount.value = c;
}

function stacksize(thearray)
{
	for (i = 0 ; i < thearray.length; i++ ) {
		if ( (thearray[i] == "") || (thearray[i] == null) || (thearray == 'undefined') ) {
			return i;
		}
	}
	return thearray.length;
}

function pushstack(thearray, newval)
{
	arraysize = stacksize(thearray);
	thearray[arraysize] = newval;
}

function popstack(thearray)
{
	arraysize = stacksize(thearray);
	theval = thearray[arraysize - 1];
	delete thearray[arraysize - 1];
	return theval;
}

function closeall()
{
 	var st = document.REPLIER.Post.scrollTop;
	if (bbtags[0]) {
		while (bbtags[0]) {
			tagRemove = popstack(bbtags)
			document.REPLIER.Post.value += "[/" + tagRemove + "]";
			            if ( (tagRemove != 'FONT') && (tagRemove != 'SIZE') && (tagRemove != 'COLOR') )
            {
                if (tagRemove == 'CODE')
                    eval("document.REPLIER." + tagRemove + "_.value = document.REPLIER." + tagRemove + "_.value.replace(/\\*$/,'');");
                else {
                    if (document.getElementsByName(tagRemove)[0])
                        eval("document.REPLIER." + tagRemove + ".value = document.REPLIER." + tagRemove + ".value.replace(/\\*$/,'');");
                    else if (document.getElementsByName("sel" + tagRemove)[0])
                        eval("document.REPLIER.sel" + tagRemove + ".value = document.REPLIER.sel" + tagRemove + ".value.replace(/\\*$/,'');");
                }
				eval(tagRemove + "_open = 0");
		}
	}
}
	document.REPLIER.Post.scrollTop = st;
	document.REPLIER.tagcount.value = 0;
	bbtags = new Array();
	document.REPLIER.Post.focus();
}

function emoticon(theSmilie)
{
	doInsert(" " + theSmilie + " ", "", false);
}

function psicon(theSmilie)
{
        doInsert(" " + theSmilie + " ", "", false);
} 

function add_code(NewCode)
{
    document.REPLIER.Post.value += NewCode;
    document.REPLIER.Post.focus();
}

function alterfont(theval, thetag)
{
    if (theval == 0)
    	return;
	if(doInsert("[" + thetag + "=" + theval + "]", "[/" + thetag + "]", true))
		pushstack(bbtags, thetag);
    document.REPLIER.ffont.selectedIndex  = 0;
    document.REPLIER.fsize.selectedIndex  = 0;
    document.REPLIER.fcolor.selectedIndex = 0;
    cstat();
}

function simpletag(thetag)
{
 var tagOpen = eval(thetag + "_open");
 if ( get_easy_mode_state() )
 {
	inserttext = prompt(prompt_start + "\n[" + thetag + "]xxx[/" + thetag + "]");
	if ( (inserttext != null) && (inserttext != "") )
	{
	 doInsert("[" + thetag + "]" + inserttext + "[/" + thetag + "] ", "", false);
	}
 }
 else {
	if (tagOpen == 0)
	{
	 if(doInsert("[" + thetag + "]", "[/" + thetag + "]", true))
		{
		 eval(thetag + "_open = 1");
			if (thetag == 'CODE')
       eval("document.REPLIER." + thetag + "_.value += '*'");
      else
			 eval("document.REPLIER." + thetag + ".value += '*'");
		 	 pushstack(bbtags, thetag);
			 cstat();
			 hstat('click_close');
		}
	} else {
	 lastindex = 0;
		for (i = 0 ; i < bbtags.length; i++ )
		{
		 if ( bbtags[i] == thetag )
		 {
			lastIndex = i;
		 }
		}
		while (bbtags[lastindex])
		{
		 tagRemove = popstack(bbtags);
		 doInsert("[/" + tagRemove + "]", "", false)
       if ( (tagRemove != 'FONT') && (tagRemove != 'SIZE') && (tagRemove != 'COLOR') )
       {
				if (tagRemove == 'CODE')
         eval("document.REPLIER." + tagRemove + "_.value = document.REPLIER." + tagRemove + "_.value.replace(/\\*$/,'');");
        else {
         if (document.getElementsByName(tagRemove)[0])
          eval("document.REPLIER." + tagRemove + ".value = document.REPLIER." + tagRemove + ".value.replace(/\\*$/,'');");
         else if (document.getElementsByName("sel" + tagRemove)[0])
          eval("document.REPLIER.sel" + tagRemove + ".value = document.REPLIER.sel" + tagRemove + ".value.replace(/\\*$/,'');");
        }
        eval(tagRemove + "_open = 0");
			 }
			 }
		cstat();
		}
	}
}

function tag_list()
{
 var listvalue = "init";
 var thelist = "";
 while ( (listvalue != "") && (listvalue != null) )
 {
	listvalue = prompt(list_prompt, "");
	if ( (listvalue != "") && (listvalue != null) )
	{
	 thelist = thelist+"[*]"+listvalue+"\n";
	}
 }
 if ( thelist != "" )
 {
	doInsert( "[LIST]\n" + thelist + "[/LIST]\n", "", false);
 }
}

function tag_url()
{
 var FoundErrors = '';
 var url = 'http://'; var desc = '';    
 var text = getText();
 if (text) {
  if (isUrl(text)) 
   { 
    var enterURL = text;
    var enterTITLE = prompt(text_enter_url_name, desc) || url; 
   }
   else 
   { 
    var enterTITLE = text; 
    var enterURL = prompt(text_enter_url, url) || '';
   }    		
  }
  else
  {
   var enterURL = prompt(text_enter_url, url) || '';
   var enterTITLE = prompt(text_enter_url_name, desc) || url;    		
  }
  if (!enterURL) {
   FoundErrors += " " + error_no_url;
  }
   if (!enterTITLE) {
    FoundErrors += " " + error_no_title;
   }
   if (FoundErrors) {
    alert("Error!"+FoundErrors);
    return;
   }
 doInsert("[URL="+enterURL+"]"+enterTITLE+"[/URL]", "", false);
}

function tag_self(tag) {
 doInsert("[" + tag + "/]", "", false);
}

function tag_one(tag) {
 eval("info = " + tag + "_info;");
 eval("preset = " + tag + "_preset;");
 eval("error = " + tag + "_error;");
 var param   = prompt(info, preset);
  if (!param) {
   alert(error);
   return;
  }
 doInsert("[" + tag + "]" + param + "[/" + tag + "]", "", false);
}

function tag_multiple(tag, params)
{
 var parameters = "";
 var params_array = new Array(params.length);
 for (i = 1; i <= params.length; i++) {
  eval("info = " + tag + "_info" + i + ";");
  eval("preset = " + tag + "_preset" + i + ";");
  eval("error = " + tag + "_error" + i + ";");
  param = prompt(info, preset);
   if (!param) {
    alert(error);
    return;
   }
  params_array[params[i-1] - 1] = param;
  }
 parameters = params_array.slice(0,params_array.length-1).join(",");
 doInsert("[" + tag + "=" + parameters + "]" + params_array[params_array.length-1] + "[/" + tag + "]", "", false);
}

function tag_select(theval, thetag) {
 if (theval == 0)
  return;
 if(doInsert("[" + thetag + "=" + theval + "]", "[/" + thetag + "]", true))
  pushstack(bbtags, thetag);
  eval("document.REPLIER.sel" + thetag + ".selectedIndex  = 0;");
  cstat();
}

function tag_newlist(tag, params)
{
 if (params == "2") {
 eval("info1 = " + tag + "_info1;");
 eval("preset1 = " + tag + "_preset1;");
 eval("info2 = " + tag + "_info2;");
 eval("preset2 = " + tag + "_preset2;");
 }
else{
 eval("info2 = " + tag + "_info1;");
 eval("preset2 = " + tag + "_preset1;");
}
var option = "start";
var option_list = "";
if (params == "2") {
 param = prompt(info1, preset1);
}
while ( (option != "") && (option != null) )
{
 Option = prompt(info2, preset2);
 if ( (option != "") && (option != null) )
 {
  option_list = option_list + "[*]" + option + "\n";
 }
}
if ( option_list != "" ) {
 if (params == "2") 
  doInsert( "[" + tag + "=" + param + "]\n" + option_list + "[/" + tag + "]\n", "", false);
 else
  doInsert( "[" + tag + "]\n" + option_list + "[/" + tag + "]\n", "", false);
 }
}

function simple_BBCode(text){
 if (text == "") return;
 var obj_ta = document.REPLIER.Post;
 text = text.replace(/\{cr\}/g,"\n");
 if( (myVersion >= 4) && is_ie && is_win){
 if(obj_ta.isTextEdit) {
  obj_ta.focus();
  var sel = document.selection;
  var rng = sel.createRange();
  rng.colapse;
  if((sel.type == "Text" || sel.type == "None") && rng != null){
   rng.text = text;
  }
 }
 else{
  obj_ta.value += text;
 }
 }
 else{
  if( (myVersion >= 4) && is_win && (!is_opera || (is_opera && myVersion >= 8))){
  var length = obj_ta.textLength;
  var start = obj_ta.selectionStart;
  var end = obj_ta.selectionEnd;
  var head = obj_ta.value.substring(0,start);
  var rng = obj_ta.value.substring(start, end);
  var tail = obj_ta.value.substring(end, length);
  if( start != end ){
   rng = text;
   obj_ta.value = head + rng + tail;
   start = start + rng.length;
  }
  else{
   obj_ta.value = head + text + tail;
   start = start + text.length;
  }
  obj_ta.selectionStart = start;
  obj_ta.selectionEnd = start;
 }
 else{
  obj_ta.value += text;
 }
 }
 obj_ta.focus();
 return;
}
<!-- bbcode_function -->

function tag_image()
{
 var FoundErrors = '';
 var enterURL   = prompt(text_enter_image, "http://");
 if(!enterURL){
  FoundErrors += " " + error_no_url;
 }
 if(FoundErrors){
  alert("Error!"+FoundErrors);
  return;
 }
 doInsert("[IMG]"+enterURL+"[/IMG]", "", false);
}

function tag_email()
{
 var emailAddress = prompt(text_enter_email, "");
 if(!emailAddress){ 
	alert(error_no_email); 
	return; 
 }
 doInsert("[EMAIL]"+emailAddress+"[/EMAIL]", "", false);
}

function tag_flash()
{
 var FoundErrors = '';
 var enterURL   = prompt(text_enter_flash, "http://");
 var enterWIDTH = prompt(text_flash_width, "");
 var enterHEIGHT = prompt(text_flash_height, "");
 if (!enterURL){
  FoundErrors += " " + error_no_url;
 }
 if(!enterWIDTH){
  FoundErrors += " " + error_no_width;
 }
 if(!enterHEIGHT){
  FoundErrors += " " + error_no_height;
 }
 if(FoundErrors){
  alert("Error!"+FoundErrors);
  return;
 }
 doInsert("[FLASH="+enterWIDTH+","+enterHEIGHT+"]"+enterURL+"[/FLASH]", "", false);
} 

function insert_attach_to_textarea(aid)
{
 doInsert( "[attachmentid="+aid+"]", "", false);
}

function doInsert(ibTag, ibClsTag, isSingle)
{
 var isClose = false;
 var obj_ta = document.REPLIER.Post;
 var st = obj_ta.scrollTop;
 if ( (myVersion >= 4) && is_ie && is_win)
 {
  if(obj_ta.isTextEdit){
   obj_ta.focus();
   var sel = document.selection;
   var rng = sel.createRange();
   rng.colapse;
   if((sel.type == "Text" || sel.type == "None") && rng != null){
   if(ibClsTag != "" && rng.text.length > 0)
    ibTag += rng.text + ibClsTag;
   else if(isSingle)
    isClose = true;
   rng.text = ibTag;
   }
  }
  else{
  if(isSingle)
   isClose = true;
   obj_ta.value += ibTag;
  }
 }
 else
 {
 if ( (myVersion >= 4) && is_win && (!is_opera || (is_opera && myVersion >= 8))) {
 var length = obj_ta.textLength;
 var start = obj_ta.selectionStart;
 var end = obj_ta.selectionEnd;
 var head = obj_ta.value.substring(0,start);
 var rng = obj_ta.value.substring(start, end);
 var tail = obj_ta.value.substring(end, length);
 if( start != end ){
  if (ibClsTag != "" && length > 0)
   ibTag += rng + ibClsTag;
  else if (isSingle)
   isClose = true;
   rng = ibTag;
   obj_ta.value = head + rng + tail;
   obj_ta.selectionStart = start;
   obj_ta.selectionEnd = start + rng.length;
  }
  else{
  if(isSingle)
   isClose = true;
   obj_ta.value = head + ibTag + tail;
   start = start + ibTag.length;
   obj_ta.selectionStart = start;
   obj_ta.selectionEnd = start;
  }
  obj_ta.scrollTop = st;
 }
 else {
 if(isSingle)
  isClose = true;
  obj_ta.value += ibTag;
 }
 }
 obj_ta.focus();
 return isClose;
}