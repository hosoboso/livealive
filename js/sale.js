{
//セール＆ティッカー表示用JavaScript　セール中はtableタグで表を表示する

const
//それぞれのハードのセール終了日を記述

SwitchSaleYear = 2025,
SwitchSaleMonth = 2,
SwitchSaleDay = 26,

PSSaleYear = 2025,
PSSaleMonth = 2,
PSSaleDay = 26,

SteamSaleYear = 2025,
SteamSaleMonth = 3,
SteamSaleDay = 25;

//日付テンプレここまで----------------------

//セール価格salePrice　変更あったら書き直す　カンマありOK

const pr = [
	`2,992`,	//Switch版セール価格
	`2,992`,	//PS4版セール価格
	`2,992`,	//Steam版セール価格
];

//セール価格ここまで----------------------

const hardSale = [ 
	[SwitchSaleYear,SwitchSaleMonth,SwitchSaleDay,],
	[PSSaleYear,PSSaleMonth,PSSaleDay],
	[SteamSaleYear,SteamSaleMonth,SteamSaleDay],
],

nD = new Date(),

D = document,

count = [];

//new DateでgetTime用の時刻設定　現在の日付とセール終了日
//セール終了日から現在のgetTimeを引き算、セール終了日も表示するので１日分の時間「24*60*60*1000」を足す（ミリ秒）、この値が0以上の時はセール中と表示する Steamだけサマータイム計算なので足さない

for (let i = 0; i < hardSale.length; i++) {
	count[i] = (new Date(hardSale[i][0], hardSale[i][1]-1, hardSale[i][2])).getTime() - nD.getTime();
	count[i] += i != 2 ? 24*60*60*1000 : "";
}

//ここからセール用テキストsaleText作成
let saleText;

//セールなし判定
//countがすべて0未満ならセールなし Array.every((currentValue) => currentValue < 0)で、配列内すべてが0未満だとTrue
//nD.getTimezoneOffset()の値が-540ならUTC+0900（日本）
//端末が日本かどうかの簡易判定をする（時差処理及び、日本以外ではセールのタイミングが異なる場合もあるので）
if ( count.every((currentValue) => currentValue < 0) || (nD.getTimezoneOffset() != -540) ) {
	saleText = "";
	D.getElementById("ti").replaceChildren();
} else {
//ここから先はセールあり処理

	//ティッカー内部にスペース入れて高さを確保
	D.getElementById('news').insertAdjacentHTML('afterbegin', "　");

	//セール用テーブルタグのスタイルシートをヘッダに挿入する
	const styleTag = D.createElement('style'),
	W=[`.saleinfo`,`padding:`,`box-shadow:initial;`,`background-color:`,`border:1px solid`,];
	D.head.appendChild(styleTag);
	styleTag.textContent = `
#news {width:100%;opacity:0;transition:opacity 0.8s;margin:.2em;}
#ticker {margin:.4em;width:98%;border:#93a1a1 1px solid;border-radius:.4em;background-color:#fff;}
${W[0]}{position:relative;${W[1]}1em .2em 0 .2em;border:3px solid #052468;display:inline-block;}
${W[0]}box{position:absolute;top:-3px;left:-3px;height:24px;${W[1]}0 1em;color:#fff;background:#052468;}
${W[0]} table{margin:1em 0 .2em 0;${W[2]}border-collapse:collapse;}
${W[0]} th{${W[4]} #062D82;${W[3]}#AEC0E8;${W[1]}.2em;text-align:center;${W[2]}}
${W[0]} tr{${W[3]}#fafafa;${W[4]} #062D82;${W[2]}}
${W[0]} table tr:nth-child(even){${W[3]}#f0f2f7;}
${W[0]} td{${W[4]} #062D82;${W[1]}.5em;${W[2]}}
`;
	//スタイルシート挿入ここまで

	//セール価格から割引率計算してテキストを作る replaceは価格中のカンマ削除処理（\Dで数字以外） Math.roundで四捨五入
	let salePrice = [];
	for (let i = 0; i < pr.length; i++) {
		salePrice[i] = `${pr[i]}円<br>（${Math.round( 100 * (1 - Number(pr[i].replace(/\D/, "")) / 7480) )}％オフ）`;
	}
	
	//各ハードリンク先
	const urlText = [
		`-jp.nintendo.com/item/software/D70010000048915" target="_blank">Nintendo Switch版`,
		`.playstation.com/ja-jp/product/JP0082-PPSA08176_00-PS5JP00LIVEALIVE" target="_blank">PS4＆PS5版`,
		`.steampowered.com/app/2014380/_/" target="_blank">Steam版`,
	];
	
	//Tableタグ用テキスト　SFC版ページだけ「リメイク版」入れる
	let tableTitleText = "";
	if ( D.title.match(/SFC版/) ) {
		tableTitleText = "リメイク版";
	}
	
	const salepositionTag = D.querySelector("#saleposition");
	
	//最初のdiv
	const saleinfoDivTag = D.createElement("div");
	saleinfoDivTag.className = "saleinfo";
	salepositionTag.appendChild(saleinfoDivTag);
	
	//タイトルのspan
	const saleinfoboxSpanTag = D.createElement("span");
	saleinfoboxSpanTag.className = "saleinfobox";
	saleinfoboxSpanTag.textContent = tableTitleText + "「ライブアライブ」セール情報";
	saleinfoDivTag.appendChild(saleinfoboxSpanTag);

	// tableタグ作る
	const tableTag = D.createElement("table");
	const theadTag = D.createElement("thead");
	const theadtrTag = D.createElement("tr");
	
	// ヘッダ列
	const theadList = [
		"ハード",
		"セール価格<br>（税込）",
		"通常価格<br>（税込）",
		"セール終了日",
	];
	
	// theadListからthタグをforEachで作ってappendChildでtr以下に設置
	theadList.forEach((n, index) => {
		const thTag = D.createElement("th");
		thTag.innerHTML = n;
		theadtrTag.appendChild(thTag);
	});
	
	// thタグをthead・tableタグに設置
	theadTag.appendChild(theadtrTag);
	tableTag.appendChild(theadTag);
	
	// tbody内を作る
	const tbodyTag = D.createElement("tbody");

	// tbodyListを作る
	let
	tbodyList = [[],[],[],],
	//セール終了時間　Steamのみあとでサマータイム判定あり
	endTime = `23時59分`,
	//セール年　年またぎ判定に使用する空配列
	Year = [];
	
	//ティッカー用配列リスト
	let newsArray=[];

	for (let i = 0; i < hardSale.length; i++) {
		if (count[i] >= 0) {
			//年またぎ判定 セール終了日が年越し後の場合のみ年を入れる
			Year[i] = hardSale[i][0] != nD.getFullYear() ? `${hardSale[i][0]}年` : "";
			if (i == 2) {
				//Steamのみの終了時間設定　サマータイム判定用関数SummerTime()は一番下
				endTime = SummerTime(SteamSaleYear,SteamSaleMonth,SteamSaleDay) ? `午前2時00分` : `午前3時00分`;
			}
			tbodyList[i].push(`<a href="https://store${urlText[i]}</a>`);
			tbodyList[i].push(`${salePrice[i]}`);
			tbodyList[i].push(`7,480円`);
			tbodyList[i].push(`${Year[i]}${hardSale[i][1]}月${hardSale[i][2]}日${weekCalc(hardSale[i][0], hardSale[i][1], hardSale[i][2])}${endTime}`);
			
			//ティッカーリストにpushで後ろに追加
			newsArray.push(`<a class="external-link" href="https://store${urlText[i]}</a>セール中 ${Year[i]}${hardSale[i][1]}月${hardSale[i][2]}日${weekCalc(hardSale[i][0], hardSale[i][1], hardSale[i][2])}${endTime}まで`);
		}
	}

	// tbodyListからtrタグを作る
	tbodyList.forEach((n, index) => {
		// trタグ生成
		const tbodytrTag = D.createElement("tr");
		// tbodyList内のArrayからtdタグをひとつずつ作る
		n.forEach((m, index) => {
			const tdTag = D.createElement("td");
			tdTag.innerHTML = m;
			// tdタグをtrに設置
			tbodytrTag.appendChild(tdTag);
		});
		// trタグをtbodyに設置
		tbodyTag.appendChild(tbodytrTag);
	});
	// tbodyタグをtableに設置
	tableTag.appendChild(tbodyTag);
	
	// tableタグをdivのsaleinfoに設置して完成
	saleinfoDivTag.appendChild(tableTag);
	
	//ティッカー表示
	//ティッカーリストの長さが1の時だけ、リストの頭にunshiftで追加
	if (newsArray.length === 1) {
		newsArray.unshift("ライブアライブ セール情報");
	}
	const nID = D.getElementById("news");
	//ティッカー用関数upTck()　初期の透過度を0、setTimeoutで800ms待ってから透過度1に変更
	//※CSSのtransition:opacity 0.8sに合わせている
	//リスト番号n = 0から表示開始
	let n = 0;
	function upTck(){
		nID.style.opacity = 0;
		setTimeout( () => {
			nID.innerHTML = newsArray[n];
			nID.style.opacity = 1;
			n = (n + 1) % newsArray.length;	//ここでリスト番号nを足していく　MAXまできたら戻る
		}, 800)
	}
	setInterval(upTck, 5000), upTck();	//1回目だけupTck()で実行。その後は1項目をsetIntervalで5000msで繰り返し
}

//サマータイム判定用関数---------------------------
//アメリカ現地時間で3月第2日曜日午前2時～11月第1日曜日午前2時の間はSteamセールの終了時間が日本時間午前２時、その他の時期は午前３時
//trueならサマータイム
function SummerTime(Y, M, D) {
	//3月判定用（第2日曜日の日付を求める）
	const 
	Mar = new Date(Y, 3-1, 1).getDay(),
	MarSecSun = Mar == 0 ? 8 : 15 - Mar,
	//11月判定用（第1日曜日の日付を求める）
	Nov = new Date(Y, 11-1, 1).getDay(),
	NovfirSun = Nov == 0 ? 1 : 8 - Nov;
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
//曜日変換--------------------------------------
function weekCalc(Y, M, D) {
	const weekJP = ['日','月','火','水','木','金','土',];
	return '(' + weekJP[new Date(Y, M-1, D).getDay()] + ')';
}
//---------------------------------------------
}