{
const mainteYear = 2025,
mainteMonth = 3,
mainteDay = 19,
maintetime = 2,

mText = 
	`<div style="position: relative;margin: 3em 0 1em 0;padding: 0 0 0 0.5em;border: solid 3px #43494a;">
	 <span style="position: absolute;display: inline-block;top: -27px;left: -3px;padding: 0 9px;height: 25px;line-height: 25px;background: #43494a;color: #ffffff;font-weight: bold;border-radius: 5px 5px 0 0;">お知らせ</span>
	<p>2025年3月19日（水）午前2時00分頃 ～ 午前8時00分頃、システムメンテナンスのため、10分～20分程度、当ウェブサイトへのアクセスができなくなる場合があります。<br>
	詳細は以下をご参照ください。</p>
	<p><a href="https://www.star.ne.jp/support/information_detail.php?view_id=3663" target="_blank" id="external">障害・メンテナンス情報 | スターレンタルサーバー</a></p>
</div>`;

let mainteText = "";
((new Date(mainteYear, mainteMonth-1, mainteDay)).getTime() - new Date().getTime() + maintetime*60*60*1000 ) >= 0 && (mainteText = mText);
document.getElementById('mainteposition').insertAdjacentHTML('beforeend', mainteText);
}