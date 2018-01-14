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
	 message = "Сообщение: Максимально допустимая длина " + MessageMax + " символов.";
	} else {
	 message = "";
	}
	alert(message + "      Вами использовано " + MessageLength + " символов.");
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
			errors = "Необходимо ввести заголовок письма";
		}
	}
	if (MessageLength < 2) {
		errors = "Вы должны ввести текст сообщения!";
	}
	if (MessageMax !=0) {
		if (MessageLength > MessageMax) {
			errors = "Максимально допустимая длина " + MessageMax + " символов. Текущие символы: " + MessageLength;
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
var text_enter_url = "Введите полный URL ссылки";
var text_enter_url_name = "Введите название сайта";
var text_enter_image = "Введите полный URL изображения";
var text_enter_email = "Введите e-mail адрес";
var text_enter_flash = "Введите полный URL для Flash.";
var text_flash_width = "Введите ширину Flash в пикселях. Максимальная ширина=800";
var text_flash_height = "Введите высоту Flash. Максимальная высота=600";
var text_code = "Использование: [CODE] Здесь Ваш код.. [/CODE]";
var text_quote = "Использование: [QUOTE] Здесь Ваша Цитата.. [/QUOTE]";
var error_no_url = "Вы должны ввести URL";
var error_no_title = "Вы должны ввести название";
var error_no_email = "Вы должны ввести e-mail адрес";
var error_no_width = "Вы должны ввести ширину";
var error_no_height = "Вы должны ввести высоту";
var prompt_start = "Введите текст для форматирования";	
var help_bold = "Жирный текст (alt + b)";
var help_italic = "Наклонный текст (alt + i)";
var help_under = "Подчёркнутый текст (alt + u)";
var help_font = "Выбор типа шрифта";
var help_size = "Выбор размера шрифта";
var help_color = "Выбор цвета шрифта";
var help_close = "Закрытие все открытых тэгов";
var help_url = "Ввод гиперссылки (alt+ h)";
var help_img = "Изображение (alt + g) [img]http://www.dom.com/img.gif[/img]";
var help_email = "Ввод E-mail адреса (alt + e)";
var help_quote = "Ввод Цитаты (alt + q)";
var help_list = "Создать список (alt + l)";
var help_flash = "Вставка Flash (alt + f)";
var help_code = "Ввод кода (alt + p)";
var help_mod = "Уведомление пользователя";
var help_ex = "Предупреждение пользователя";
var help_click_close = "Нажмите на кнопку для закрытия";
var list_prompt = "Введите пункт списка. Для завершения списка, нажмите 'отмена' или оставьте очередное поле пустым";
var help_transit = "Перевести текст, набранный транслитом, на русский (alt + t)";
var help_typo = "Обработать текст в соответствии с правилами типографики";

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
/([А-Я])~/g, /([А-Я])'/g, /([^уёеаоэяиюУЁЕАОЭЯИЮ])Y/g, /~/g, /'/g, /([^уёеаоэяиюУЁЕАОЭЯИЮ])y/g, 
/([уеаоэяию])y/g, /([УЁЕАОЭЯИЮ])Y([А-Я])/g, /([УЁЕАОЭЯИЮ])Y([а-я])/g, /([УЁЕАОЭЯИЮ])y/g,
/([А-Я])4([А-Я])/g, /([а-я])4([а-я])/g, /4([А-Я])/g, /4([а-я])/g);

var RusS = new Array(
"Ж", "Ч", "Щ",  "Щ", "Ш", "Ю", "Я", "ж", "ч", "щ",  "щ", "ш", "ю", "я", "Ё", "ё",
"Эт", "ЭТ", "ЭТ", " эт", "эт", "$1 эт", "Э", "э",
"А", "Б", "В", "Г", "Д", "Е", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц",
"а", "б", "в", "г", "д", "е", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц",
"$1Ъ", "$1Ь", "$1Ы", "ъ", "ь", "$1ы", "$1й", "$1Й$2", "$1й$2", "$1й", "$1Ч$2", "$1ч$2", "Ч$1", "ч$1");

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
/([.,;!?а-яА-Я])\(/g,
/\(\s/g, /\s\)/g,
/\s([:,;.!?])\s/g,
/\s([!?.,])/g,
/[Тт]\.\sд\./g, /[тТ]\.\sп\./g, /[тТ]\.\sк\./g, /[тТ]\.\sе\./g
);

var Good = new Array(
" — ",
"«", " «$1", " «", ": «",
"$1»",
"$1—$2",
"$1 $2",
")$1",
"$1.",
"$1 (",
"(", ")",
"$1 ",
"$1",
"т.д.","т.п.","т.к.","т.е."
);

var SmallL=new Array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ы','э','ю','я');
var BigL = new Array ('А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ы','Э','Ю','Я');

function Typo(){
var textar = document.REPLIER.Post.value;
if (textar){
for (var i=0; i<Bad.length; i++) { textar = textar.replace(Bad[i], Good[i])}
for (var i=0; i<SmallL.length; i++) { textar = textar.replace( RegExp("([.!?]) "+SmallL[i],"g"), "$1 "+BigL[i]);
textar = textar.replace( RegExp("(т.(е|к|).) "+BigL[i],"g"), "$1 "+SmallL[i]); 
textar = textar.replace( RegExp("\^"+SmallL[i],"g"), BigL[i])}
document.REPLIER.Post.value = textar;
}
}