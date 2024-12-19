{
const c = [
	`<div class="flexitem"><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:130px;margin:0px;padding:5px 0;text-align:center;overflow:hidden;"><a href="`,
	`"></a><p style="font-size:12px;line-height:1.4em;text-align:left;margin:0px;padding:2px 6px;word-wrap:break-word"><a href="`,
	`?&linkCode=ll1&tag=gyakutensai0d-22&language=ja_JP" target="_blank">`,
	`https://www.amazon.co.jp/dp/`,
	`<img src="https://images-na.ssl-images-amazon.com/images/I`,
	`jpg" border="0" style="margin:2px" alt="`,
	`円（税込）</p></div></div>`,
],

GL = 
	`${c[0]}${c[3]}475758542X${c[2]}${c[4]}/91-Muy2X2QL._SL160_.${c[5]}LIVE A LIVE ORIGINAL+HD-2D Illustrations${c[1]}${c[3]}475758542X${c[2]}LIVE A LIVE ORIGINAL+HD-2D Illustrations</a><br>価格：2,970${c[6]}
	${c[0]}${c[3]}B0B1HZPT2M${c[2]}${c[4]}/71DI0mRABVL._SL160_.${c[5]}　LIVE A LIVE HD-2D Remake Original Soundtrack${c[1]}${c[3]}B0B1HZPT2M${c[2]}LIVE A LIVE HD-2D Remake Original Soundtrack</a><br>価格：2,616${c[6]}
	${c[0]}${c[3]}B0BZVFNJX9${c[2]}${c[4]}/818xnPhGhyL._SL160_.${c[5]}超級!! ライブアライブ近未来編${c[1]}${c[3]}B0BZVFNJX9${c[2]}超級!! ライブアライブ近未来編</a><br>価格：1,100${c[6]}`,

PT = document.title;

let resulttext = '<div style="justify-content: center; display: flex; flex-wrap: wrap;">';

if ( PT.match(/（リメイク版）/) ) {
	resulttext += GL;
} else if (PT.match(/（SFC版）/)) {
	resulttext += `${c[0]}${c[3]}B007BRSNLS${c[2]}${c[4]}/41Rs6JSdnfL._SL160_.${c[5]}ライブ・ア・ライブ オリジナル・サウンドトラック${c[1]}${c[3]}B007BRSNLS${c[2]}ライブ・ア・ライブ オリジナル・サウンドトラック</a><br>価格：1,744${c[6]}
	${c[0]}${c[3]}B09RX85NJW${c[2]}${c[4]}/81enFh3aroL._SL160_.${c[5]}LIVE A LIVE(ライブアライブ) -Switch${c[1]}${c[3]}B09RX85NJW${c[2]}LIVE A LIVE(ライブアライブ) -Switch</a><br>価格：4,000${c[6]}${GL}`;
}

if (
	( PT.match(/ＳＦ編/) ) ||
	( PT == "ライブアライブ（リメイク版） 攻略メモ帳" ) ||
	( PT == "ライブ・ア・ライブ（SFC版） 攻略メモ帳" )
) {
	resulttext += `${c[0]}${c[3]}B0CFPGMW58${c[2]}${c[4]}/71I3a75d1CL._SL160_.${c[5]}LIVE A LIVE ぬいぐるみ キューブ${c[1]}${c[3]}B0CFPGMW58${c[2]}LIVE A LIVE ぬいぐるみ キューブ</a><br>価格：5,250${c[6]}`;
}

document.getElementById('goodsposition').insertAdjacentHTML('beforeend', resulttext + '</div>');
}