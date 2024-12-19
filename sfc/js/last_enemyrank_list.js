{const d = document;

d.getElementById("radiobtn").addEventListener("change", () => {
	// ラジオボタン
	const numbtn = ['0',d.getElementById("num1"),d.getElementById("num2"),d.getElementById("num3"),d.getElementById("num4")];
	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	const pnumbers = numbtn[1].checked ? 1 : numbtn[2].checked ? 2 : numbtn[3].checked ? 3 : 4;
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
d.getElementById("view1").innerHTML = '';
});

d.getElementById("rankcal").addEventListener("click", () => {
	//敵パーティリスト
	const enemP = ['0','ザビエール×1','オイディプス×1, ダイダロス×1, ポリディクティス×1','クイーンテイル×3','ポウンバード×1','ルビータイラント×1, ケルベロ×4','ヌーベルルミエル×1','ソウルイーター×2, ホラーバルブ×2','ファントム×1, 亡拳士×2','クロノレギオン×3','ベアナックル×1','ねこまた×4','強腕戦車×2, メカサタケ９８×1','ブラキオペルタ×1, エントモパイラム×2','ヌーベルルミエル×1, バーバリアン×6','大顔面×3, マスタードラゴン×1','イシュタール×1','グラシャラボラス×2','ツナヨシ×1, おイヌ様×14','グラングラス×2','マスタードラゴン×1, ピスタチオ×2','ティタンブラッド×1','ティタンブラッド×1, ピスタチオ×14','次元　源左衛門×3','ころころムシ×1','ホラーシップ×1','リンバースキュラ×4','バロクレスト×2','岩×5, マスタードラゴン×4, ピスタチオ×6','ポワッシー×1','岩×4, ころころムシ×8, ピスタチオ×2, マスタードラゴン×1','ヘリオスハウント×2','ワールダーク×1'],
	//敵パーティレベルリスト
	enemPlv = ['0','4','1','1','10','6','4','5','10','6','6','8','14','9','11','10','45','10','10','12','6','0','4','17','4','4','24','0','0','0','0','18','32'],
	
	// ファイル名取得
	filenameHTML = window.location.href.split('/').pop(),

	// フォームの味方キャラレベル
	memberlv = ['0',Number( d.getElementById('lev1').value ),Number( d.getElementById('lev2').value ),Number( d.getElementById('lev3').value ),Number( d.getElementById('lev4').value )],

	// ラジオボタン
	numbtn = ['0',d.getElementById("num1"),d.getElementById("num2"),d.getElementById("num3"),d.getElementById("num4")],

	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	pnumbers = numbtn[1].checked ? 1 : numbtn[2].checked ? 2 : numbtn[3].checked ? 3 : 4;

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
	// 配列tablelist[0]がその他ダンジョン、配列tablelist[1]が魔王山、配列tablelist[2]が力のダンジョン
	for (let j = 0; j < 3; j++) {
	tabletext = '<table><thead><tr><th>ランク</th><th>敵パーティ</th><th>敵パーティ<br>レベル</th></tr></thead><tbody>';
		for (let i = 0; i < 4; i++) {
		tabletext += '<tr><td>' + (rank[j+1]+i) + '</td><td>' + enemyP[j+1][i] + '</td><td>' + enemPlv[rank[j+1] + i] + '</td></tr>';
		}
		tablelist[j] = tabletext;
	}

	const tex = ["全ての項目に1～99の整数の値を入力してください。","<p>パーティのレベル合計値：","敵パーティ編成ランク：","</tbody></table>"];
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
		resulttext = tex[0];

	//結果
	// 鍵のダンジョン
	} else if ( filenameHTML == "dungeon01.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>鍵のダンジョン ${tex[2]}${rank[1]}, ${rank[1] + 1}, ${rank[1] + 2}, ${rank[1] + 3}</p>${tablelist[0]}<tr><td>-</td><td>影×1</td><td>12</td></tr>${tex[3]}`;
	// 心のダンジョン
	} else if ( filenameHTML == "dungeon02.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>心のダンジョン ${tex[2]}${rank[1]}, ${rank[1] + 1}, ${rank[1] + 2}, ${rank[1] + 3}</p>${tablelist[0]}${tex[3]}`;
	// 本能のダンジョン
	} else if ( filenameHTML == "dungeon03.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>本能のダンジョン ${tex[2]}${rank[1]}, ${rank[1] + 1}, ${rank[1] + 2}, ${rank[1] + 3}</p>${tablelist[0]}${tex[3]}`;
	// 力のダンジョン
	} else if ( filenameHTML == "dungeon05.html" ) {
		resulttext = `${tex[1]}${lvtotal}<br>力のダンジョン ${tex[2]}${rank[3]}, ${rank[3] + 1}, ${rank[3] + 2}, ${rank[3] + 3}</p>${tablelist[2]}</tbody></table>
		<p>※入り口エリアまで戻ってから再度奥に進む時はランク${rank[2]}, ${rank[2] + 1}, ${rank[2] + 2}, ${rank[2] + 3}</p>${tablelist[1]}${tex[3]}`;
	// 魔王山
	} else {
		resulttext = `${tex[1]}${lvtotal}<br>魔王山 ${tex[2]}${rank[2]}, ${rank[2] + 1}, ${rank[2] + 2}, ${rank[2] + 3}</p>${tablelist[1]}${tex[3]}`;
	}
d.getElementById("view1").innerHTML = resulttext;	//結果表示
});
}
