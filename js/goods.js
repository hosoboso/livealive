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

kinmirai = 
	`${c[0]}https://hb.afl.rakuten.co.jp/ichiba/2a8b8ee6.895057cf.2a8b8ee7.bb488f48/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Faibikshiroishihigashi%2Fmerchandise17%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank"><img src="https://hbb.afl.rakuten.co.jp/hgb/2a8b8ee6.895057cf.2a8b8ee7.bb488f48/?me_id=1354085&item_id=10000305&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Faibikshiroishihigashi%2Fcabinet%2F09016409%2Fimgrc0116406062.jpg%3F_ex%3D240x240&s=240x240&t=pict" border="0" style="margin:2px" alt="【数量限定】超7級セット${c[1]}https://hb.afl.rakuten.co.jp/ichiba/2a8b8ee6.895057cf.2a8b8ee7.bb488f48/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Faibikshiroishihigashi%2Fmerchandise17%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" class="external-link">【数量限定】超7級セット</a><br>超級!!近未来編R/超級!!中世編 前・後編/超級!!最終編1～4/クリアファイル/紙袋<br>価格：5,000${c[6]}`,

PT = document.title;

let resulttext = '<div style="justify-content: center; display: flex; flex-wrap: wrap;">';

if ( PT.match(/（リメイク版）/) ) {
	resulttext += GL;
} else if (PT.match(/（SFC版）/)) {
	resulttext += `${c[0]}${c[3]}B007BRSNLS${c[2]}${c[4]}/41Rs6JSdnfL._SL160_.${c[5]}ライブ・ア・ライブ オリジナル・サウンドトラック${c[1]}${c[3]}B007BRSNLS${c[2]}ライブ・ア・ライブ オリジナル・サウンドトラック</a><br>価格：1,834${c[6]}
	${c[0]}${c[3]}B09RX85NJW${c[2]}${c[4]}/81enFh3aroL._SL160_.${c[5]}LIVE A LIVE(ライブアライブ) -Switch${c[1]}${c[3]}B09RX85NJW${c[2]}LIVE A LIVE(ライブアライブ) -Switch</a><br>価格：3,800${c[6]}${GL}`;
}

if (
	( PT.match(/近未来編/) ) ||
	( PT == "ライブアライブ（リメイク版） 攻略メモ帳" ) ||
	( PT == "ライブ・ア・ライブ（SFC版） 攻略メモ帳" )
) {
	resulttext += kinmirai;
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