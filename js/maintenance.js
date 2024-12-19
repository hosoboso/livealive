{
const mainteYear = 2024,
mainteMonth = 12,
mainteDay = 6
maintetime = 15;

let mainteText = "";

if ( ((new Date(mainteYear, mainteMonth-1, mainteDay)).getTime() - new Date().getTime() + maintetime*60*60*1000 ) >= 0){
	mainteText = 
	`<div style="position: relative;margin: 3em 0 1em 0;padding: 0 0 0 0.5em;border: solid 3px #43494a;">
	 <span style="position: absolute;display: inline-block;top: -27px;left: -3px;padding: 0 9px;height: 25px;line-height: 25px;background: #43494a;color: #ffffff;font-weight: bold;border-radius: 5px 5px 0 0;">お知らせ</span>
	<p>2024年12月6日（金）午前11時00分頃 ～ 午後1時00分頃、システムメンテナンスのため、当ウェブサイトへのアクセスができなくなる場合があります。<br>
	詳細は以下をご参照ください。</p>
	<p><a href="https://www.star.ne.jp/support/information_detail.php?view_id=3663" target="_blank">障害・メンテナンス情報詳細 | レンタルサーバー【スターサーバー】 <img alt="new window" src="icon/mark_new.svg" width="14px"></a></p>
</div>`;
}
document.getElementById('mainteposition').insertAdjacentHTML('beforeend', mainteText);
}