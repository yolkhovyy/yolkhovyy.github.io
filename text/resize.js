function getposOffset(overlay, offsettype)
{
	var totaloffset=(offsettype=="left")? overlay.offsetLeft : overlay.offsetTop
	var parentEl=overlay.offsetParent
	while (parentEl!=null)
	{
		totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop
		parentEl=parentEl.offsetParent
	}
	return totaloffset
}

function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement &&
      ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;	
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}

var els=document.getElementsByTagName('textarea')
if(els){var div=document.createElement('span')
 div.innerHTML="<img src='/forum/html/resize.gif'>"
 div.style.cssText='position:relative;top:4px;left:-10px;cursor:nw-resize';
 div.title='Изменить размер поля ввода'
 el=els[0]
 el.parentNode.insertBefore(div,els[0].nextSibling)
 el.parentNode.style.whiteSpace="nowrap"
 div.onmousedown=function(){
    document.onmousemove=function(ev){resize_textar(el,ev);return false}
    document.onmouseup=function(){document.onmousemove=null;document.onmouseup=null}
    return false}
}

function resize_textar(obj,e){
e=(e)?e:(window.event)?event:null,
ws=getScrollXY();
 var w=e.clientX-getposOffset(obj,'left'); //для изменения по ширине
 var h=e.clientY-getposOffset(obj,'top')+ws[1];
 if(w>50)obj.style.width=w+'px'; //для изменения по ширине
// obj.style.width='95%';
 if(h>50)obj.style.height=h+'px';
}