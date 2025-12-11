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

{let e=document,t=window;function l(){return t.pageYOffset||t.scrollY||e.documentElement.scrollTop||e.body.scrollTop||0}e.addEventListener("DOMContentLoaded",function(){let n=document.querySelectorAll('a[href^="#"]');n.forEach(n=>{n.rel=n.href,n.addEventListener("click",function(){!function n(i){let o=e.getElementById(i.hash.slice(1)).offsetTop,r=e.documentElement.scrollHeight,c=t.innerHeight||e.documentElement.clientHeight;r-c<o&&(o=r-c);let a=l(),s=o<a;!function e(l,n,i){setTimeout(()=>{i&&l>=n?(l=l-(l-n)/20-1,t.scrollTo(0,l),e(l,n,i)):!i&&l<=n?(l=l+(n-l)/20+1,t.scrollTo(0,l),e(l,n,i)):scrollTo(0,n)},10)}(a,o,s)}(this)})});

//個人的に追加した分---------------------------------------------------------------
//smoothScrolOrig.js

// 上に戻る矢印の動作
// https://blog-mi.com/js-smooth-scroll/ を参考にさせていただきました。

// 上に戻る矢印の表示・非表示調整topbutton.js
// 外部リンク用　aタグチェッカー
// nowマーク用JavaScript
let i=location.hostname,o=e.querySelectorAll('a[target="_blank"]'),r=t.location.href.split("/").pop(),c=e.querySelectorAll(".option > .content > ul > li > a");c.forEach(e=>{if(r==e.getAttribute("href")){e.parentElement.classList.add("now_location");let t=e.innerHTML;e.parentElement.innerHTML=t}});let a=e.querySelectorAll("nav.droplinetabs a");a.forEach(e=>{r!=e.getAttribute("href")||(e.classList.add("now_tab"),e.parentNode.classList.contains("here")||(e.innerHTML=e.innerHTML+" &#x2714;"))}),o.forEach(e=>{let t=e.href,l=t&&new URL(t).hostname!==i,n=1===e.children.length&&"IMG"===e.children[0].tagName;l&&!n&&e.classList.add("external-link")})});let n=e.getElementById("top_arrow");n.addEventListener("click",()=>{let e=l(),n;function i(l){void 0===n&&(n=l);let o=l-n;t.scrollTo(0,-e*(-Math.pow(2,-10*o/800)+1)*1024/1023+e),o<800?requestAnimationFrame(i):t.scrollTo(0,0)}requestAnimationFrame(i)});let i=n.style;i.visibility="hidden",i.opacity=0,i.transition="opacity 0.4s",t.addEventListener("scroll",()=>{let e=l();e>80?(i.visibility="visible",i.opacity=1):(i.visibility="hidden",i.opacity=0)})}