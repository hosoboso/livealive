{
//セール表示用Javascript　セール中はtableタグで表を表示する

const
//それぞれのハードのセール終了日を記述

SwitchSaleYear = 2024,
SwitchSaleMonth = 11,
SwitchSaleDay = 22,

PSSaleYear = 2024,
PSSaleMonth = 11,
PSSaleDay = 22,

SteamSaleYear = 2024,
SteamSaleMonth = 12,
SteamSaleDay = 20,

//日付テンプレここまで----------------------

//セール価格salePrice　変更あったら書き直す

salePrice = [
	`2,992円<br>（60％オフ）`,	//Switch版価格
	`2,992円<br>（60％オフ）`,	//PS4版価格
	`2,992円<br>（60％オフ）`,	//Steam版価格
],

//セール価格ここまで----------------------

hardSale = [ 
	[SwitchSaleYear,SwitchSaleMonth,SwitchSaleDay],
	[PSSaleYear,PSSaleMonth,PSSaleDay],
	[SteamSaleYear,SteamSaleMonth,SteamSaleDay],
],

nD = new Date(),

count = [];

//new DateでgetTime用の時刻設定　現在の日付とセール終了日
//セール終了日から現在のgetTimeを引き算、セール終了日も表示するので１日分の時間「24*60*60*1000」を足す（ミリ秒）、この値が0以上の時はセール中と表示する Steamだけサマータイム計算なので足さない

for (let i = 0; i < hardSale.length; i++) {
	count[i] = (new Date(hardSale[i][0], hardSale[i][1]-1, hardSale[i][2])).getTime() - nD.getTime();
	if (i != 2) {
		count[i] += 24*60*60*1000;
	} 
}

let Saletext;

//セールなし count[i]がすべて0未満ならセールなし処理
//nD.getTimezoneOffset()の値が-540ならUTC+0900（日本）
//端末が日本かどうかの簡易判定をする（時差処理及び、日本以外ではセールのタイミングが異なる場合もあるので）
if (
	( (count[0] < 0)&&(count[1] < 0)&&(count[2] < 0) ) || (nD.getTimezoneOffset() != -540) 
	) {
	Saletext = "";
} else {
//ここから先はセールあり処理
	const
	urlText = [
		`-jp.nintendo.com/item/software/D70010000048915" target="_blank">Nintendo Switch版`,
		`.playstation.com/ja-jp/product/JP0082-PPSA08176_00-PS5JP00LIVEALIVE" target="_blank">PS4＆PS5版`,
		`.steampowered.com/app/2014380/_/" target="_blank">Steam版`,
	];
	
	let
	endTime = `23時59分`,
	Year = ["","",""],
	result = "";

	//count[i]が0以上のときだけハード毎にTableタグの1行分のHTMLを作成してresultに足していく処理
	for (let i = 0; i < hardSale.length; i++) {
		if (count[i] >= 0) {
			if ( hardSale[i][0] != nD.getFullYear() ) {
				Year[i] = `${hardSale[i][0]}年`;	//年またぎ判定 セール終了日が年越し後の場合のみ入れる
			}
			if (i == 2) {
				if ( SummerTime(SteamSaleYear,SteamSaleMonth,SteamSaleDay) ) {
				endTime = `午前2時00分`;	//終了時間設定　Steamサマータイム サマータイム判定用関数SummerTime()は一番下
				} else {
				endTime = `午前3時00分`;	//終了時間設定　Steamサマータイム以外
				}
			}
			result += `<tr><td><a href="https://store${urlText[i]} <img alt="new window" src="icon/mark_new.svg" width="14px"></a></td><td>${salePrice[i]}</td><td>7,480円</td><td>${Year[i]}${hardSale[i][1]}月${hardSale[i][2]}日${endTime}</td></tr>`;
		}
	}

	Saletext = `<div class="saleinfo"><span class="saleinfobox">「ライブアライブ」セール情報</span><table><thead><tr><th>ハード</th><th>セール価格<br>（税込）</th><th>通常価格<br>（税込）</th><th>セール終了日</th></tr></thead><tbody>${result}</tbody></table></div>`;
}
document.getElementById('saleposition').insertAdjacentHTML('beforeend', Saletext);

//サマータイム判定用関数-----------------------------------------------------------
//アメリカ現地時間で3月第2日曜日午前2時～11月第1日曜日午前2時の間はSteamセールの終了時間が日本時間午前２時、その他の時期は午前３時
//trueならサマータイム
function SummerTime(Y, M, D) {
	//3月判定用（第2日曜日の日付を求める）
	const Mar = new Date(Y, 3-1, 1).getDay();
	let MarSecSun = 15 - Mar;
	if (Mar == 0) {
		MarSecSun = 8;
	}
	//11月判定用（第1日曜日の日付を求める）
	const Nov = new Date(Y, 11-1, 1).getDay();
	let NovfirSun = 8 - Nov;
	if (Nov == 0) {
		NovfirSun = 1;
	}
	//サマータイム判定
	let STresult = false;
	if ( 
	( (4 <= M) && (M <= 10) ) || 
	( (M == 3) && (MarSecSun <= D) ) || 
	( (M == 11) && (D <= NovfirSun) )
	) {
		STresult = true;
	}
	return STresult;
}
//------------------------------------------------------------------------------
}