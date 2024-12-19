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
 
// 元ファイル：
// https://blog.webcreativepark.net/2007/07/12-143406.html
// https://blog.webcreativepark.net/sample/js/53/smoothScroll.js
// 素晴らしいライブラリに感謝します。
// 以下は、IE用設定＆noSmooth用設定をカットして少し書き直し、Minifyしたバージョン

new function(){let e=document,t=window;function l(l){let n=e.getElementById(l.rel.replace(/.*\#/,"")).offsetTop,o=e.documentElement.scrollHeight,c=t.innerHeight||e.documentElement.clientHeight;o-c<n&&(n=o-c);let r=t.pageYOffset||e.documentElement.scrollTop||e.body.scrollTop||0,i=n<r?"up":"down";!function e(l,n,o){setTimeout(()=>{"up"==o&&l>=n?(l=l-(l-n)/20-1,t.scrollTo(0,l),e(l,n,o)):"down"==o&&l<=n?(l=l+(n-l)/20+1,t.scrollTo(0,l),e(l,n,o)):scrollTo(0,n)},10)}(r,n,i)}t.addEventListener("load",()=>{let t=e.getElementsByTagName("a");for(let n=0;n<t.length;n++)t[n].href.replace(/\#[a-zA-Z0-9_]+/,"")==location.href.replace(/\#[a-zA-Z0-9_]+/,"")&&(t[n].rel=t[n].href,t[n].href="javascript:void(0)",t[n].onclick=function(){l(this)})})};