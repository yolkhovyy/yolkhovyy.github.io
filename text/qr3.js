var MessageMax  = "102400";
var skip_check  = 0;
var Override    = "";
MessageMax      = parseInt(MessageMax);
if ( MessageMax < 0 )
{
	MessageMax = 0;
}

var emowindow = '';
function emo_pop()
{
  emowindow = window.open('index.php?act=legends&CODE=emoticons&s=','Legends','width=250,height=500,resizable=yes,scrollbars=yes'); 
}
function psicons_pop()
{
window.open('index.php?act=legends&CODE=psicons&s=','Legends','width=250,height=500,resizable=yes,scrollbars=yes'); 
}
function bbc_pop()
{
  window.open('index.php?act=legends&CODE=bbcode&s=','Legends','width=700,height=500,resizable=yes,scrollbars=yes'); 
}	
function CheckLength() {
 MessageLength  = document.REPLIER.Post.value.length;
 message  = "";
	if (MessageMax > 0) {
	 message = "���������: ����������� ���������� ����� " + MessageMax + " ��������.";
	} else {
	 message = "";
	}
	alert(message + "      ���� ������������ " + MessageLength + " ��������.");
}

function paste(text, flag){
	if (document.REPLIER) {
		if ((document.selection)&&(flag)) {
			document.REPLIER.Post.focus();
			document.REPLIER.document.selection.createRange().text = text;
		} else document.REPLIER.Post.value += text;
	}
 }
	
function ValidateForm(isMsg) {
	MessageLength  = document.REPLIER.Post.value.length;
	errors = "";
	if (skip_check != 0) {
		document.REPLIER.submit.disabled = true;
		return true;
	}	
	if (isMsg == 1)
	{
		if (document.REPLIER.msg_title.value.length < 2)
		{
			errors = "���������� ������ ��������� ������";
		}
	}
	if (MessageLength < 2) {
		errors = "�� ������ ������ ����� ���������!";
	}
	if (MessageMax !=0) {
		if (MessageLength > MessageMax) {
			errors = "����������� ���������� ����� " + MessageMax + " ��������. ������� �������: " + MessageLength;
		}
	}
	if (errors != "" && Override == "") {
		alert(errors);
		return false;
	} else {
		document.REPLIER.submit.disabled = true;
		return true;
	}
}

function removeattach(id){
 if ( id != "" ){
	var Override = 1;
	document.REPLIER.removeattachid.value = id;
 }
}
	
// IBC Code stuff
var text_enter_url = "������� ������ URL ������";
var text_enter_url_name = "������� �������� �����";
var text_enter_image = "������� ������ URL �����������";
var text_enter_email = "������� e-mail �����";
var text_enter_flash = "������� ������ URL ��� Flash.";
var text_flash_width = "������� ������ Flash � ��������. ������������ ������=800";
var text_flash_height = "������� ������ Flash. ������������ ������=600";
var text_code = "�������������: [CODE] ����� ��� ���.. [/CODE]";
var text_quote = "�������������: [QUOTE] ����� ���� ������.. [/QUOTE]";
var error_no_url = "�� ������ ������ URL";
var error_no_title = "�� ������ ������ ��������";
var error_no_email = "�� ������ ������ e-mail �����";
var error_no_width = "�� ������ ������ ������";
var error_no_height = "�� ������ ������ ������";
var prompt_start = "������� ����� ��� ��������������";	
var help_bold = "������ ����� (alt + b)";
var help_italic = "��������� ����� (alt + i)";
var help_under = "������������ ����� (alt + u)";
var help_font = "����� ���� ������";
var help_size = "����� ������� ������";
var help_color = "����� ����� ������";
var help_close = "�������� ��� �������� �����";
var help_url = "���� ����������� (alt+ h)";
var help_img = "����������� (alt + g) [img]http://www.dom.com/img.gif[/img]";
var help_email = "���� E-mail ������ (alt + e)";
var help_quote = "���� ������ (alt + q)";
var help_list = "������� ������ (alt + l)";
var help_flash = "������� Flash (alt + f)";
var help_code = "���� ���� (alt + p)";
var help_mod = "����������� ������������";
var help_ex = "�������������� ������������";
var help_click_close = "������� �� ������ ��� ��������";
var list_prompt = "������� ����� ������. ��� ���������� ������, ������� '������' ��� �������� ��������� ���� ������";
var help_transit = "��������� �����, ��������� ����������, �� ������� (alt + t)";
var help_typo = "���������� ����� � ������������ � ��������� �����������";

var sel = "";

document.onkeydown=function(e){
if (e) event=e
if ((event.keyCode==13)&&(event.ctrlKey)){
    try{
        document.REPLIER.submit.click();
    }catch(e){};
}}

function salut(theSalut)
{
	doInsert(theSalut, "", false);
}

function copysel()
{
	if (document.selection)
	{
		sel = document.selection.createRange().text;
	}	
	else if (document.getSelection)
	{
		sel = document.getSelection();
	}
}

function insertsel(qname) 
{
	doInsert("[quote=" + qname + "]" + sel + "[/quote]", "", false);
	sel = "";
}

var EngS = new Array(
/Z[Hh]/g, /C[Hh]/g, /S[Hh]'/g, /W/g, /S[Hh]/g, /[JY][Uu]/g, /[JY][Aa]/g, /zh/g, /ch/g, /sh'/g, /w/g, /sh/g, /[jy]u/g, /[jy]a/g, /[JY][Oo]/g, /[jy]o/g, 
/Et/g, /[^\D]ET/g, /^ET/g, /\set/g, /^et/g, /([,.;!?:])et/g, /E'/g, /e'/g,
/A/g, /B/g, /V/g, /G/g, /D/g, /E/g, /Z/g, /I/g, /J/g, /K/g, /L/g, /M/g, /N/g, /O/g, /P/g, /R/g, /S/g, /T/g, /U/g, /F/g, /H/g, /C/g, 
/a/g, /b/g, /v/g, /g/g, /d/g, /e/g, /z/g, /i/g, /j/g, /k/g, /l/g, /m/g, /n/g, /o/g, /p/g, /r/g, /s/g, /t/g, /u/g, /f/g, /h/g, /c/g, 
/([�-�])~/g, /([�-�])'/g, /([^��������Ө�������])Y/g, /~/g, /'/g, /([^��������Ө�������])y/g, 
/([��������])y/g, /([Ө�������])Y([�-�])/g, /([Ө�������])Y([�-�])/g, /([Ө�������])y/g,
/([�-�])4([�-�])/g, /([�-�])4([�-�])/g, /4([�-�])/g, /4([�-�])/g);

var RusS = new Array(
"�", "�", "�",  "�", "�", "�", "�", "�", "�", "�",  "�", "�", "�", "�", "�", "�",
"��", "��", "��", " ��", "��", "$1 ��", "�", "�",
"�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�",
"�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�", "�",
"$1�", "$1�", "$1�", "�", "�", "$1�", "$1�", "$1�$2", "$1�$2", "$1�", "$1�$2", "$1�$2", "�$1", "�$1");

function rusLang(){
var textar = document.REPLIER.Post.value;
if (textar){
for (var i=0; i<EngS.length; i++) { textar = textar.replace(EngS[i], RusS[i])}
document.REPLIER.Post.value = textar;}
}


var Bad = new Array(/\s/g);
var Good=new Array("_");

var Bad = new Array(
/\s\-\s/g,
/^\"/g, /\s\"(\D?!\.)/g, /\s\"/g, /\:\"/g,
/(\D|\d)\"/g,
/(\d)\-(\d)/g,
/([.,;!?)])([^ \s\.\,\;\!\?\;)\)\:D\:)\:(\:P\a-z\A-Z\0-9])/g,
/\)\s([.,;!?])/g,
/([^\.\s\!\?\,\f\n\r\:\;\]\:)\:D\:P\:(\)])$/g,
/([.,;!?�-��-�])\(/g,
/\(\s/g, /\s\)/g,
/\s([:,;.!?])\s/g,
/\s([!?.,])/g,
/[��]\.\s�\./g, /[��]\.\s�\./g, /[��]\.\s�\./g, /[��]\.\s�\./g
);

var Good = new Array(
" � ",
"�", " �$1", " �", ": �",
"$1�",
"$1�$2",
"$1 $2",
")$1",
"$1.",
"$1 (",
"(", ")",
"$1 ",
"$1",
"�.�.","�.�.","�.�.","�.�."
);

var SmallL=new Array('�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�');
var BigL = new Array ('�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�');

function Typo(){
var textar = document.REPLIER.Post.value;
if (textar){
for (var i=0; i<Bad.length; i++) { textar = textar.replace(Bad[i], Good[i])}
for (var i=0; i<SmallL.length; i++) { textar = textar.replace( RegExp("([.!?]) "+SmallL[i],"g"), "$1 "+BigL[i]);
textar = textar.replace( RegExp("(�.(�|�|).) "+BigL[i],"g"), "$1 "+SmallL[i]); 
textar = textar.replace( RegExp("\^"+SmallL[i],"g"), BigL[i])}
document.REPLIER.Post.value = textar;
}
}