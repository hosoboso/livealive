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
const enemP = ['0','ザビエール×1','オイディプス×1, ダイダロス×1, ポリディクティス×1','クイーンテイル×3','ポウンバード×1','ルビータイラント×1, ケルベロ×4','ヌーベルルミエル×1','ソウルイーター×2, ホラーバルブ×2','ファントム×1, 亡拳士×2','クロノレギオン×3','ベアナックル×1','ねこまた×4','強腕戦車×2, メカサタケ９８×1','ブラキオペルタ×1, エントモパイラム×2','ヌーベルルミエル×1, バーバリアン×6','大顔面×3, マスタードラゴン×1','イシュタール×1','グラシャラボラス×2','ツナヨシ×1, おイヌ様×14','グラングラス×2','マスタードラゴン×1, ピスタチオ×2','ティタンブラッド×1','ティタンブラッド×1, ピスタチオ×14','次元　源左衛門×3','ころころムシ×1','ホラーシップ×1','リンバースキュラ×4','バロクレスト×2','岩×5, マスタードラゴン×4, ピスタチオ×6','ポワッシー×1','岩×4, ころころムシ×8, ピスタチオ×2, マスタードラゴン×1','ヘリオスハウント×2','ワールダーク×1'],

//敵パーティレベルリスト
enemPlv = [0,4,1,1,10,6,4,5,10,6,6,8,14,9,11,10,45,10,10,12,6,0,4,17,4,4,24,0,0,0,0,18,32];

//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
function pnum() {
	return d.getElementById("num1").checked ? 1 : d.getElementById("num2").checked ? 2 : d.getElementById("num3").checked ? 3 : 4;
}

//取得経験値計算用の関数expCalc
function expCalc(aLV,eLvN){
	let expN_MAX;
	let expN_MIN;
	const
	// レベル値(string)を数値(number)変換
	aLvN = Number(aLV);
	// 経験値計算式
	if (eLvN == 0) {	//敵パーティレベル0
		expN_MAX = expN_MIN = 0;
	} else {
		// 敵パーティレベル＞味方キャラレベル 行動有
		if (eLvN - aLvN > 0) {
			expN_MAX = Math.min(((eLvN - aLvN) * 16 + 8),100);
		} else {
		// それ以外
			expN_MAX = Math.floor(eLvN/2) + Math.floor(16/aLvN);
		}
		expN_MIN = Math.floor(eLvN/2) + Math.floor(16/aLvN);
	}
	return `${expN_MAX} / ${expN_MIN}`;
}

//ラジオボタンチェック時の動作
d.getElementById("radiobtn").addEventListener("change", () => {
	d.getElementById("view1").replaceChildren();	//表示リセット(div内削除)
	// ラジオボタン
	const numbtn = ['0',d.getElementById("num1"),d.getElementById("num2"),d.getElementById("num3"),d.getElementById("num4")];
	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	const pnumbers = pnum();
	// フォーム
	const subfn = ['0',d.getElementById("sub-form1").style,d.getElementById("sub-form2").style,d.getElementById("sub-form3").style,d.getElementById("sub-form4").style];
	//ラジオボタンに応じてフォーム数変更
	for (let i = 0; i < 5; i++) {
		if (pnumbers < i) {
			subfn[i].visibility = "hidden";
		} else {
			subfn[i].visibility = "visible";
		}
	}
	d.getElementById("view1").insertAdjacentHTML("afterbegin", `<div style="color:#777;border:1px solid gray;padding:0.5em;margin:1em 0.2em;display:inline-block;">上ボタンをクリックで<br>ここに結果が表示されます。</div>`);	//結果表示
});

//ボタンクリック時の操作
d.getElementById("rankcal").addEventListener("click", () => {
	d.getElementById("view1").replaceChildren();	//表示リセット(div内削除)
		
	// ファイル名取得
	const filenameHTML = window.location.href.split('/').pop(),

	// ラジオボタン
	numbtn = ['0',d.getElementById("num1"),d.getElementById("num2"),d.getElementById("num3"),d.getElementById("num4")],

	// フォームの味方キャラレベル
	memberlv = ['0',
	Number( escapeHtml(d.getElementById('lev1').value) ),
	Number( escapeHtml(d.getElementById('lev2').value) ),
	Number( escapeHtml(d.getElementById('lev3').value) ),
	Number( escapeHtml(d.getElementById('lev4').value) ),
	],

	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	pnumbers = pnum(),
	
	//経験値用テキスト
	keiken = `※取得経験値の数値は「行動有 / 行動無」で表記`;

	//表ヘッダTheader 取得経験値チェックが入っているかどうかで分ける
	let thnum = "";
	for (let i = 0; i < pnumbers; i++) {
		thnum += `<th>${i+1}</th>`;
	}
	let eText = "";	//ついでに取得経験値チェックの有無で表の最後に付け足すテキストも作っておく
	let Theader = "<tr><th>ランク</th><th>敵パーティ</th><th>敵パーティ<br>レベル</th></tr>";
	if (d.getElementById("expcal").checked) {
		Theader = `<tr><th rowspan="2">ランク</th><th rowspan="2">敵パーティ</th><th rowspan="2">敵パーティ<br>レベル</th><th colspan="${pnumbers}">取得経験値</th></tr><tr>${thnum}</tr>`;
		eText = `${keiken}`;
	}

	//パーティ人数に応じてレベル合計値lvtotal計算
	let lvtotal = 0;
	for (let i = 1; i < pnumbers + 1; i++) {
		lvtotal = lvtotal + memberlv[i];
	}

	//rank[0]・enemyP[0]がノーマルランク、rank[1]・enemyP[1]がその他ダンジョン、rank[2]・enemyP[2]が魔王山、rank[3]・enemyP[3]が力のダンジョン
	let rank = [],
	enemyP = [];
	//ランク計算
	for (let i = 0; i < 4; i++) {
		if (lvtotal >= 112) {
			rank[i] = 29;	//ランク計算 レベル合計値が112以上は29固定
			enemyP[i] = [enemP[29], enemP[30], enemP[31], enemP[32]];
		} else {
			rank[i] = Math.ceil( (lvtotal + 1)/4 ) + i*2;	//合計値112未満のランク計算
			enemyP[i] = enemP.slice(rank[i], rank[i] + 4);	//配列4つ分切り出し
		}
	}

	let tabletext = "",
	tablelist = [];
	// 配列tablelist[0]ノーマル、tablelist[1]がその他ダンジョン、配列tablelist[2]が魔王山、配列tablelist[3]が力のダンジョン
	for (let j = 0; j < 4; j++) {
	tabletext = `<table><thead><tr>${Theader}</tr></thead><tbody>`;
		for (let i = 0; i < 4; i++) {
			let exTD="";	// 取得経験値チェックが入っているかどうかで分ける
			if (d.getElementById("expcal").checked) {
				for (let x = 1; x < (pnumbers + 1); x++) {
					exTD += "<td>" + expCalc(memberlv[x],enemPlv[rank[j] + i]) + "</td>";
				}
			}	// 取得経験値計算＋カラム　ここまで
			tabletext += `<tr><td>${rank[j]+i}</td><td>${enemyP[j][i]}</td><td>${enemPlv[rank[j] + i]}</td>${exTD}</tr>`;
		}
		tablelist[j] = tabletext;
	}

	const tex = [
	`<div style="border:1px solid gray;padding:0.5em;margin:1em 0.2em;display:inline-block;">全ての項目に1～99の整数の値を入力してください。</div>`,
	`<p>パーティのレベル合計値：`,
	`敵パーティ編成ランク：`,
	`</tbody></table><p>${eText}</p>`	//テーブルタグの後に、取得経験値チェックが入っていた時のテキストeText追加
	];
	let resulttext;

	// ボタン数に応じた整数値判定
	// 正規表現で1～99の整数かどうか判定
	const re = /^[1-9][0-9]?$/;

	if (
	((numbtn[4].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) || !(re.test(memberlv[4])) ))||
	((numbtn[3].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) ))||
	((numbtn[2].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) ))||
	((numbtn[1].checked) && ( !(re.test(memberlv[1])) ))
	) {
		resulttext = tex[0];	//整数値判断

	//結果
	// 鍵のダンジョン
	} else if ( filenameHTML == "dungeon01.html" ) {
		let kagi="";	//鍵のダンジョンの影の経験値計算分
		if (d.getElementById("expcal").checked) {
			for (let x = 1; x < (pnumbers + 1); x++) {
				kagi += "<td>" + expCalc(memberlv[x],12) + "</td>";
			}
		}
		resulttext = `${tex[1]}${lvtotal}<br>鍵のダンジョン ${tex[2]}${rank[1]}, ${rank[1] + 1}, ${rank[1] + 2}, ${rank[1] + 3}</p>${tablelist[1]}<tr><td>-</td><td>影×1</td><td>12</td>${kagi}</tr>${tex[3]}`;
	// 心のダンジョン
	} else if ( filenameHTML == "dungeon02.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>心のダンジョン ${tex[2]}${rank[1]}, ${rank[1] + 1}, ${rank[1] + 2}, ${rank[1] + 3}</p>${tablelist[1]}${tex[3]}`;
	// 本能のダンジョン
	} else if ( filenameHTML == "dungeon03.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>本能のダンジョン ${tex[2]}${rank[1]}, ${rank[1] + 1}, ${rank[1] + 2}, ${rank[1] + 3}</p>${tablelist[1]}${tex[3]}`;
	// 力のダンジョン
	} else if ( filenameHTML == "dungeon05.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>力のダンジョン ${tex[2]}${rank[3]}, ${rank[3] + 1}, ${rank[3] + 2}, ${rank[3] + 3}</p>${tablelist[3]}<p>※入り口エリアまで戻ってから再度奥に進む時はランク${rank[2]}, ${rank[2] + 1}, ${rank[2] + 2}, ${rank[2] + 3}</p>${tablelist[2]}${tex[3]}`;
	// 魔王山
	} else if ( filenameHTML == "maou.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>魔王山 ${tex[2]}${rank[2]}, ${rank[2] + 1}, ${rank[2] + 2}, ${rank[2] + 3}</p>${tablelist[2]}${tex[3]}`;
	// それ以外　全表示
	} else {
		// ノーマル
		let ext = "";
		d.getElementById("expcal").checked && (ext = `<br>${keiken}`);
		resulttext = `<p>${tex[1]}${lvtotal}${ext}</p><h5>ダンジョン以外（ルクレチア城・ルクレチアの森・勇者の山）</h5><p> ${tex[2]}${rank[0]}, ${rank[0] + 1}, ${rank[0] + 2}, ${rank[0] + 3}</p>${tablelist[0]}</tbody></table>`
		// 心・本能・力・鍵のダンジョン
		+ `<h5>心・本能・鍵のダンジョン</h5><p>${tex[2]}${rank[1]}, ${rank[1] + 1}, ${rank[1] + 2}, ${rank[1] + 3}${tablelist[1]}</tbody></table></p>※鍵のダンジョンのみ「影×1」も出現する</p>`
		// 力のダンジョン
		+ `<h5>力のダンジョン</h5><p>${tex[2]}${rank[3]}, ${rank[3] + 1}, ${rank[3] + 2}, ${rank[3] + 3}</p>${tablelist[3]}</tbody></table><p>※入り口エリアまで戻ってから再度奥に進む時はランク${rank[2]}, ${rank[2] + 1}, ${rank[2] + 2}, ${rank[2] + 3}<br>（下の魔王山エンカウントテーブルと同一）</p>`
		// 魔王山
		+ `<h5>魔王山</h5><p>${tex[2]}${rank[2]}, ${rank[2] + 1}, ${rank[2] + 2}, ${rank[2] + 3}</p>${tablelist[2]}</tbody></table>`;
	}
	d.getElementById("view1").insertAdjacentHTML("afterbegin", resulttext);	//結果表示
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
