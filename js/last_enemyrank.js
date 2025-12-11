{
const d = document;

// フォーム文字数を2文字までに制限
// すべての type="number" input 要素を取得
const numberInputs = d.querySelectorAll('input[type="number"]');
numberInputs.forEach(input => {
	input.addEventListener('input', function () {
		// 入力値を文字列として取得
		let value = input.value;
		// 2文字を超える場合は先頭2文字にカット
		if (value.length > 2) {
			input.value = value.slice(0, 2);
		}
	});
});

//敵パーティリスト
const leader = '<img src="../icon/leaderflag.svg" class="flag" alt="LEADER">';
const enemP = ['0',
'ザビエール×1',
`オイディプス×1, ダイダロス×1, ${leader}ポリディクティス×1`,
'クイーンテイル×3',
'ポウンバード×2',
`${leader}ルビータイラント×1, ケルベロ×4`,
'ヌーベルルミエル×1',
'ソウルイーター×2, ホラーバルブ×2',
'ファントム×1, 亡拳士×2',
'クロノレギオン×3',
'ベアナックル×1',
'猫又×4',
`強腕戦車×2, ${leader}メカサタケ９８×1`,
'ブラキオペルタ×1, エントモパイラム×2',
'クイーンテイル×8',
'亡拳士×3, 猫又×2',
'ファントム×2, 亡拳士×4, 岩×2',
'グラシャラボラス×2',
`${leader}メカサタケ９８×1, 強腕戦車×1, 大顔面×3`,
'エントモパイラム×2, ファントム×1',
'グラシャラボラス×1, ソウルイーター×4',
'ヌーベルルミエル×1, バーバリアン×6',
`大顔面×3, ${leader}マスタードラゴン×1`,
'イシュタール×1',
'ベアナックル×1, ヌーベルルミエル×3',
'グラングラス×1, 大顔面×2',
'グラングラス×1, ホラーバルブ×2',
`${leader}ツナヨシ×1, おイヌ様×14`,
'グラングラス×2',
'グラシャラボラス×2, ベアナックル×2',
'ピスタチオ×1, グラシャラボラス×4',
`${leader}ツナヨシ×1, ${leader}ルビータイラント×1, おイヌ様×9, ケルベロ×4`,
`${leader}マスタードラゴン×1, ピスタチオ×2`,
'グラングラス×1, バーバリアン×9',
`${leader}マスタードラゴン×2, ピスタチオ×5`,
'ティタンブラッド×1',
'次元　源左衛門×3',
'コロコロムシ×1',
'次元　源左衛門×1, クロノレギオン×1, バーバリアン×2, ファントム×1',
`${leader}ティタンブラッド×1, ピスタチオ×14`,
'ホラーシップ×1',
'バロクレスト×1, グラングラス×1',
'リンバースキュラ×4',
'バロクレスト×2',
'グラングラス×1, グラシャラボラス×1, 猫又×3',
`岩×5, ${leader}マスタードラゴン×4, ピスタチオ×6`,
'ポワッシー×1',
`岩×4, コロコロムシ×8, ピスタチオ×2, ${leader}マスタードラゴン×1`,
'ヘリオスハウント×2',
'次元　源左衛門×2, ソウルイーター×13',
'ホラーシップ×1, コロコロムシ×4',
'グラングラス×1, ベアナックル×1, ヌーベルルミエル×1, ケルベロ×12',
'ワールダーク×1',
'バロクレスト×1, 次元　源左衛門×1, 亡拳士×8',
'イシュタール×1, ティタンブラッド×1',
'ポワッシー×1, バロクレスト×1, リンバースキュラ×2, ブラキオペルタ×1',
'ワールダーク×1, イシュタール×1, ホラーシップ×1'];

//敵パーティランク 敵パーティリストから更に配列を作る
const enemRank = ['0',
[enemP[1],enemP[2],enemP[3],enemP[4],enemP[5],enemP[6],enemP[7]],
[enemP[3],enemP[4],enemP[5],enemP[6],enemP[7],enemP[8],enemP[9],enemP[14],enemP[15],enemP[12],enemP[10],enemP[16]],
[enemP[14],enemP[11],enemP[19],enemP[18],enemP[9],enemP[10],enemP[8],enemP[13]],
[enemP[11],enemP[19],enemP[12],enemP[20],enemP[17],enemP[10],enemP[9],enemP[18]],
[enemP[11],enemP[24],enemP[20],enemP[13],enemP[21],enemP[22],enemP[12],enemP[23]],
[enemP[13],enemP[26],enemP[25],enemP[24],enemP[21],enemP[17],enemP[22],enemP[23]],
[enemP[27],enemP[31],enemP[28],enemP[30],enemP[22],enemP[26],enemP[29],enemP[23]],
[enemP[33],enemP[27],enemP[31],enemP[29],enemP[30],enemP[28],enemP[32],enemP[34]],
[enemP[38],enemP[37],enemP[35],enemP[36],enemP[31],enemP[33],enemP[32],enemP[34]],
[enemP[38],enemP[37],enemP[41],enemP[33],enemP[35],enemP[39],enemP[36],enemP[40]],
[enemP[44],enemP[38],enemP[41],enemP[43],enemP[36],enemP[37],enemP[42],enemP[40]],
[enemP[49],enemP[41],enemP[44],enemP[42],enemP[45],enemP[43],enemP[40],enemP[46]],
[enemP[46],enemP[42],enemP[47],enemP[51],enemP[49],enemP[43],enemP[48],enemP[50]],
[enemP[48],enemP[51],enemP[47],enemP[53],enemP[50],enemP[45],enemP[46],enemP[52]],
[enemP[49],enemP[51],enemP[45],enemP[54],enemP[46],enemP[53],enemP[48],enemP[52]],
[enemP[53],enemP[48],enemP[49],enemP[54],enemP[51],enemP[55],enemP[52],enemP[56]]
];

//敵パーティレベルリスト
const enemPlv = [0,5,5,6,10,7,8,7,10,11,11,11,13,11,9,10,11,15,13,13,13,11,12,20,12,14,13,14,15,14,17,17,17,18,18,19,18,17,20,20,22,21,22,23,22,25,25,26,25,25,27,27,32,28,29,30,35,];

//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
function pnum() {
	return d.getElementById("num1").checked ? 1 : d.getElementById("num2").checked ? 2 : d.getElementById("num3").checked ? 3 : 4;
}

//取得経験値計算用の関数expCalc
function expCalc(aLV,eLV){
	let expN = 5;
	const
	// レベル値(string)を数値(number)変換
	aLvN = Number(aLV),
	// 敵パーティレベル[仮] - 味方キャラレベル
	lvSub = eLV - aLvN;
	if ( 2 <= lvSub) {
		expN = Math.min((lvSub * 16 + 8),100);
	} else if ( ( -2 <= lvSub ) && ( lvSub <= 1 ) ) {
		expN = Math.floor(36 / (3 - lvSub));
	}
	return expN;
}

// ラジオボタンクリックで実行
d.getElementById("radiobtn").addEventListener("change", () => {
	d.getElementById("view1").replaceChildren();	//ラジオボタンクリックで表示初期化（div内削除）
	const pnumbers = pnum();
	// フォーム
	const subfn = ['0',d.getElementById("sub-form1").style,d.getElementById("sub-form2").style,d.getElementById("sub-form3").style,d.getElementById("sub-form4").style];
	//ラジオボタンに応じてフォーム数変更
	for (let i = 0; i < 5; i++) {
		subfn[i].visibility = pnumbers < i ? "hidden" : "visible";
	}
	d.getElementById("view1").insertAdjacentHTML("afterbegin", `<div style="color:#777;border:1px solid gray;padding:0.5em;margin:1em 0.2em;display:inline-block;">上ボタンをクリックで<br>ここに結果が表示されます。</div>`);	//結果表示
});

// ボタン押して実行
d.getElementById("rankcal").addEventListener("click", () => {
	d.getElementById("view1").replaceChildren();	//div内削除
	
	// ファイル名取得 window.location.hrefでアドレス取得後「/」で配列に分割.splitし、.pop()で配列の最後だけを取得
	const filenameHTML = window.location.href.split('/').pop();

	// フォームの味方キャラレベル
	const memberlv = ['0',
	Number( escapeHtml(d.getElementById("lev1").value) ),
	Number( escapeHtml(d.getElementById("lev2").value) ),
	Number( escapeHtml(d.getElementById("lev3").value) ),
	Number( escapeHtml(d.getElementById("lev4").value) ),
	];

	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	const pnumbers = pnum();
	
	//表ヘッダTheader 取得経験値チェックが入っているかどうかで分ける
	let thnum = "";
	for (let i = 0; i < pnumbers; i++) {
		thnum += `<th>${i+1}</th>`;
	}
	let Theader = "<tr><th>敵パーティ</th><th>敵パーティ<br>レベル[仮]</th></tr>";
	if (d.getElementById("expcal").checked) {
		Theader = `<tr><th rowspan="2">敵パーティ</th><th rowspan="2">敵パーティ<br>レベル[仮]</th><th colspan="${pnumbers}">取得経験値</th></tr><tr>${thnum}</tr>`;
	}

	//パーティ人数に応じてレベル合計値nlvtotal計算
	let nlvtotal = 0;
	for (let i = 1; i < pnumbers + 1; i++) {
		nlvtotal = nlvtotal + memberlv[i];
	}

	//lvtotal[0]がノーマル、lvtotal[1]が魔王山、lvtotal[2]がダンジョン
	let lvtotal = [];
	for (let j = 0; j < 3; j++) {
		lvtotal[j] = nlvtotal + j*4;
	}

	//rank[0]がノーマルランク、rank[1]が魔王山ランク、rank[2]がダンジョンランク
	let rank= [];
	//ランク計算
	for (let i = 0; i < 3; i++) {
		if (lvtotal[i] <= 11) {
			rank[i] = 1;
		} else if ((12 <= lvtotal[i]) && (lvtotal[i] <= 23)) {
			rank[i] = 2;
		} else if ((24 <= lvtotal[i]) && (lvtotal[i] <= 127)) {
			rank[i] = Math.floor(lvtotal[i] / 8);
		} else {
			rank[i] = 16;	//レベル合計値が128以上は16固定
		}
	}

	//tabletext[0]がノーマル用表テキスト、tabletext[1]が魔王山用表テキスト、tabletext[2]がダンジョン用表テキスト
	//敵パーティリストの番号を「enemP.indexOf(enemRank[rank[n]][i])」で取って、敵パーティレベルリストの番号取得「enemPlv[enemP.indexOf(enemRank[rank[n]][i])]」
	//for文でテーブルリストを作成、繰り返しは「enemRank[rank[n]].length - 1」まで
	let tabletext = Array(3).fill(`<table><thead>${Theader}</thead><tbody>`); //初期テーブル値のリスト、tableのヘッダ部分
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < enemRank[rank[i]].length; j++) {
			let exTD="";	// 取得経験値チェックが入っているかどうかで分ける
			if (d.getElementById("expcal").checked) {
				for (let x = 1; x < (pnumbers + 1); x++) {
					exTD += "<td>" + expCalc(memberlv[x],enemPlv[enemP.indexOf(enemRank[rank[i]][j])]) + "</td>";
				}
			}
			tabletext[i] += `<tr><td>${enemRank[rank[i]][j]}</td><td>${enemPlv[enemP.indexOf(enemRank[rank[i]][j])]}</td>${exTD}</tr>`;
		}
	}

	// ボタン数に応じた整数値判定　正規表現で1～99の整数かどうか判定
	const re = /^[1-9][0-9]?$/;
	let resulttext;
	const commontext = ["<p>パーティのレベル合計値：","敵パーティ編成ランク：","</tbody></table>"];

	if (
	((d.getElementById("num4").checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) || !(re.test(memberlv[4])) ))||
	((d.getElementById("num3").checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) ))||
	((d.getElementById("num2").checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) ))||
	((d.getElementById("num1").checked) && ( !(re.test(memberlv[1])) ))
	){
	resulttext = `<div style="border:1px solid gray;padding:0.5em;margin:1em 0.2em;display:inline-block;">全ての項目に1～99の整数の値を入力してください。</div>`;
	//値判定と結果
	// 心・本能・力のダンジョン
	} else if ( (filenameHTML == "dungeon01.html") || (filenameHTML == "dungeon05.html") || (filenameHTML == "dungeon06.html") ) {
		resulttext = `${commontext[0]}${nlvtotal}<br>${commontext[1]}${rank[2]}</p>${tabletext[2]}${commontext[2]}`;
	// 鍵のダンジョン
	} else if ( filenameHTML == "dungeon03.html" ) {
		let kagi="";	//鍵のダンジョンの影の経験値計算分
		if (d.getElementById("expcal").checked) {
			for (let x = 1; x < (pnumbers + 1); x++) {
				kagi += "<td>" + expCalc(memberlv[x],10) + "</td>";
			}
		}
		resulttext = `${commontext[0]}${nlvtotal}<br>${commontext[1]}${rank[2]}</p>${tabletext[2]}<tr><td>影×1</td><td>10</td>${kagi}</tr>${commontext[2]}<p>※影が出現するのはパーティにおぼろ丸が居る時のみ</p>`;
	// 魔王山
	} else if ( filenameHTML == "maou.html" ) {
		resulttext = `${commontext[0]}${nlvtotal}<br>${commontext[1]}${rank[1]}</p>${tabletext[1]}${commontext[2]}`;
	// 全表示
	} else{
		// ノーマル
		resulttext = `${commontext[0]}${nlvtotal}</p><h5>廃墟の町（城）・静寂の森・雪山</h5><p>${commontext[1]}${rank[0]}</p>${tabletext[0]}${commontext[2]}`
		// 心・本能・力・鍵のダンジョン
		+ `<h5>心・本能・力・鍵のダンジョン</h5><p>${commontext[1]}${rank[2]}<br>※鍵のダンジョンでパーティにおぼろ丸が居る時のみ「影×1」も出現する</p>${tabletext[2]}${commontext[2]}`
		// 魔王山
		+ `<h5>魔王山</h5><p>${commontext[1]}${rank[1]}</p>${tabletext[1]}${commontext[2]}`;
	}
	d.getElementById("view1").insertAdjacentHTML("afterbegin", resulttext);
});

//HTMLエスケープ
function escapeHtml(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/'/g, '&#39;');
	return str;
}

}