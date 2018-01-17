/*var desW = 750;//按照设计稿宽750制作 
var winW = document.documentElement.clientWidth; 
document.documentElement.style.fontSize = winW / desW * 100 + "px"; */
(function(doc,win,desW){
    var docEle=doc.documentElement,
        resizeEvt='orientationchange' in window ?'orientationchange':'resize',
        recalc=function(){
            var winW=docEle.clientWidth;
            if(!winW) return;
            docEle.style.fontSize=winW/desW*100+'px';
        }

    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
})(document,window,750);