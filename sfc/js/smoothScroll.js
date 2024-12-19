/*--------------------------------------------------------------------------*
 *  
 *  SmoothScroll JavaScript Library V2
 *  
 *  MIT-style license. 
 *  
 *  2007-2011 Kazuma Nishihata 
 *  http://www.to-r.net
 *  
 *--------------------------------------------------------------------------*/
 
//IE用設定＆noSmooth用設定をカットしてMinifyしたバージョン
 
new function(){let e=document;function t(t){let l=e.getElementById(t.rel.replace(/.*\#/,"")).offsetTop,n=e.documentElement.scrollHeight,o=window.innerHeight||e.documentElement.clientHeight;n-o<l&&(l=n-o);let c=window.pageYOffset||e.documentElement.scrollTop||e.body.scrollTop||0,r=l<c?"up":"down";!function e(t,l,n){setTimeout(()=>{"up"==n&&t>=l?(t=t-(t-l)/20-1,window.scrollTo(0,t),e(t,l,n)):"down"==n&&t<=l?(t=t+(l-t)/20+1,window.scrollTo(0,t),e(t,l,n)):scrollTo(0,l)},10)}(c,l,r)}window.addEventListener("load",()=>{let l=e.getElementsByTagName("a");for(let n=0;n<l.length;n++)l[n].href.replace(/\#[a-zA-Z0-9_]+/,"")==location.href.replace(/\#[a-zA-Z0-9_]+/,"")&&(l[n].rel=l[n].href,l[n].href="javascript:void(0)",l[n].onclick=function(){t(this)})})};