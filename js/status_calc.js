{

//リメイク版　キャラクターのステータス計算フォーム用

const d = document;

d.getElementById("calc").addEventListener("click", () =>{
	const l = [
		[["アキラ", 4], [112, 12, 24], [21, 0, 1], [14, 2, 4], [32, 4, 7], [28, 3, 4], [20, 1, 2], [14, 1, 1], [14, 1, 1]],
		[["無法松", 8], [320, 6, 11], [55, 0, 0], [47, 0, 0], [19, 0, 0], [16, 0, 0], [35, 0, 0], [20, 1, 1], [17, 1, 1]],
		[["おぼろ丸", 2], [120, 16, 20], [22, 2, 2], [12, 3, 3], [17, 4, 6], [13, 2, 5], [27, 3, 6], [12, 1, 1], [13, 1, 1]],
		[["とらわれの男", 9], [240, 3, 3], [34, 1, 1], [27, 0, 1], [52, 3, 4], [49, 3, 4], [42, 2, 2], [19, 1, 1], [19, 1, 1]],
		[["カラクリ丸", 2], [160, 4, 5], [80, 0, 2], [99, 0, 0], [1, 0, 1], [1, 0, 1], [82, 0, 2], [12, 1, 1], [12, 1, 1]],
		[["ユン・ジョウ", 1], [106, 6, 17], [12, 3, 6], [10, 2, 4], [25, 3, 6], [24, 2, 4], [15, 3, 6], [10, 1, 1], [12, 1, 1]],
		[["レイ・クウゴ", 3], [176, 9, 26], [23, 2, 6], [10, 1, 2], [12, 3, 5], [13, 3, 4], [38, 4, 6], [11, 1, 1], [10, 1, 1]],
		[["サモ・ハッカ", 5], [240, 12, 39], [28, 3, 6], [43, 2, 6], [7, 1, 3], [7, 1, 3], [5, 1, 3], [14, 1, 1], [13, 1, 1]],
		[["高原　日勝", 2], [320, 26, 38], [50, 5, 6], [36, 1, 2], [25, 0, 0], [25, 1, 4], [31, 4, 5], [12, 1, 1], [10, 1, 1]],
		[["ポゴ", 1], [144, 28, 39], [17, 3, 6], [17, 1, 5], [4, 2, 4], [5, 1, 3], [10, 1, 5], [11, 1, 1], [9, 1, 1]],
		[["ゴリ", 4], [240, 14, 30], [37, 1, 2], [46, 0, 3], [3, 0, 4], [3, 0, 3], [30, 0, 0], [14, 1, 1], [13, 1, 1]],
		[["べる", 1], [90, 10, 12], [7, 1, 1], [15, 0, 3], [30, 3, 4], [28, 2, 3], [26, 0, 1], [12, 1, 1], [10, 1, 1]],
		[["サンダウン", 9], [176, 3, 26], [27, 2, 4], [21, 2, 4], [34, 4, 7], [28, 3, 6], [42, 6, 9], [20, 1, 1], [19, 1, 1]],
		[["オルステッド", 1], [120, 26, 32], [0, 3, 4], [15, 2, 4], [2, 2, 5], [2, 2, 5], [12, 1, 3], [10, 1, 1], [10, 1, 1]],
		[["ストレイボウ", 1], [100, 22, 28], [5, 0, 1], [7, 1, 2], [40, 2, 4], [28, 2, 4], [20, 1, 1], [11, 1, 1], [10, 1, 1]],
		[["ウラヌス", 6], [224, 0, 0], [20, 0, 0], [24, 0, 0], [68, 0, 0], [72, 0, 0], [17, 0, 0], [15, 1, 1], [16, 1, 1]],
		[["ハッシュ", 10], [288, 0, 0], [54, 0, 0], [47, 0, 0], [36, 0, 0], [41, 0, 0], [40, 0, 0], [19, 1, 1], [18, 1, 1]],
	];

	//プルダウンメニュー番号を取得（キャラナンバー）
	//リスト合わせのために-1している
	const charanum = [d.getElementById("selectForm1").selectedIndex-1, d.getElementById("selectForm2").selectedIndex-1, d.getElementById("selectForm3").selectedIndex-1, d.getElementById("selectForm4").selectedIndex-1,];

	//レベル数値取得
	const memberlv = [Number(d.getElementById('lev1').value), Number(d.getElementById('lev2').value), Number(d.getElementById('lev3').value), Number(d.getElementById('lev4').value)];

	//キャラのレベル差分lvupを計算する　l[charanum[i]][0][1]は各キャラLV初期値
	//プルダウンメニューが「選択なし(番号0)」ならfalseを入れる（計算から除外）
	let lvup = [];
	for (let i = 0; i < charanum.length; i++) {
		if (charanum[i] != -1) {
			lvup[i] = memberlv[i] - l[charanum[i]][0][1];
		} else {
			lvup[i] = false;
		}
	}

	// 正規表現で1～99の整数かどうか判定
	//配列memberlvの中で、プルダウンメニュー番号が0以外の値（lvupの中のfalse以外の値）に、1～99の整数かどうか判定を行い、その結果を配列reTestとして出力
	let reTest = [];
	for (let i = 0; i < memberlv.length; i++) {
		if (lvup[i] !== false) {
			reTest[i] = (/^[1-9][0-9]?$/).test(memberlv[i]);
		}
	}
	//配列reTest内にfalseが1つ以上含まれるかどうかテストし、reTestResultとして出力
	//reTestResultの結果がtrueなら、1～99以外が含まれている
	const reTestResult = reTest.some((value) => value === false);

	//配列lvup内、負の数判定 lvup中のx番目のキャラが負の数
	const minus = (value) => value < 0;
	let x;
	if (lvup.some(minus)) {
		x = lvup.findIndex(minus) + 1;
	}

	//配列lvupの中身4個すべてがfalseかどうか。「=== false」を「== false」にすると、配列中の0をfalseと判定してしまうので注意
	const allFalse = (lvup.filter(Array => Array === false).length == 4);

	// ここから追加用データ
	// チェックボタンがチェックされているかどうかの配列
	const chkbtn = [d.getElementById("add0").checked, d.getElementById("add1").checked, d.getElementById("add2").checked, d.getElementById("add3").checked,];
	// チェックボタン4個すべてがfalseかどうか
	const chkFalse = (chkbtn.filter(Array => Array === false).length == 4);
	// 追加キャラデータ（1列分）
	const adddata = [
		`<tr><td>キューブ</td><td>7</td><td>240</td><td>26</td><td>96</td><td>99</td><td>99</td><td>18</td><td>22</td><td>22</td></tr>`,
		`<tr><td>タロイモ</td><td>5</td><td>240</td><td>48</td><td>64</td><td>22</td><td>26</td><td>32</td><td>14</td><td>14</td></tr>`,
		`<tr><td>心山拳老師</td><td>10</td><td>160</td><td>14</td><td>20</td><td>72</td><td>65</td><td>12</td><td>22</td><td>26</td></tr>`,
		`<tr><td>マッドドッグ</td><td>8</td><td>162</td><td>24</td><td>19</td><td>29</td><td>30</td><td>37</td><td>18</td><td>18</td></tr>`,
	];
	// 追加データaddtext
	let addtext = "";
	for (let i = 0; i < chkbtn.length; i++) {
		if (chkbtn[i]) {
			addtext += adddata[i];
		}
	}

	//ここからtable作るかどうか判定
	let result;

	if (allFalse && chkFalse) {
		//プルダウンメニューで誰も選ばれていない、かつ、チェックボタンに1つもチェック入っていない
		result = `<p class="r">キャラを1人以上選択してください。</p>`;
	} else if (reTestResult) {
		// 整数値判定
		result = `<p class="r">レベル入力欄には「各キャラの初期レベル値～99」の整数値を入力してください。</p>`;
	} else if (lvup.some(minus)) {
		//（レベル入力値-初期レベル値）が負の数判定
		result = `<p class="r">${x}番目のキャラのレベルが初期レベル未満の値です。レベル入力欄の数値を入力し直してください。</p>`;
	} else {
		//以下table作る判定　リスト計算用関数calc_st()でtableタグの１行分作ってfor文で足していく
		result = "<table><thead><tr><th>キャラ</th><th>レベル</th><th>HP</th><th>物攻</th><th>物防</th><th>特攻</th><th>特防</th><th>素早さ</th><th>命中</th><th>回避</tr></thead><tbody>";
		for (let i = 0; i < lvup.length; i++) {
			if (lvup[i] !== false) {
				result += calc_st(charanum[i], memberlv[i]);
			}else{
				result += "";
			}
		}
		result += `${addtext}</tbody></table><p>※各ステータスは「平均値(最小値～最大値)」で記載。ステータス上昇値にブレがない場合は「平均値」のみ、追加表示キャラは固定ステータスを表示<br>※命中と回避は必ず1ずつ上昇するため、レベルにより固定値<br>※平均値は小数第一位で四捨五入した値</p>`;
	}

	//エラーメッセージまたはtableタグを出力
	d.getElementById("view1").innerHTML = result;

	//リスト計算用関数calc_st()　キャラNo、キャラLVから取得
	//tableタグ１行分を出力する
	function calc_st(chara, lv){
		const lvdelta = lv - l[chara][0][1];
		let Xlist = [];
		let endText = "";
		for (let i = 0; i < 8; i++) {
			//最小
			let minX = l[chara][i+1][0] + l[chara][i+1][1] * lvdelta;
			//最大
			let maxX = l[chara][i+1][0] + l[chara][i+1][2] * lvdelta;
			//平均値
			let aveX = Math.round( l[chara][i+1][0] + (l[chara][i+1][1] + l[chara][i+1][2])/2 * lvdelta);
			//Math.minで上限値修正　上限はHPが999、それ以外が99
			let upValue;
			i == 0 ? upValue = 999 : upValue = 99;
			Xlist[i] = [Math.min(aveX, upValue), Math.min(minX, upValue), Math.min(maxX, upValue),];
			// 計算値を<td>で挟む処理
			if ( (i == 6) || (i == 7) || (l[chara][i+1][1] == l[chara][i+1][2]) ) {
				endText += `<td>${Xlist[i][0]}</td>`;	//上昇値にブレなしの場合及び、命中と回避は1ずつ上昇なのでブレ分は省く
			} else {
				endText += `<td>${Xlist[i][0]}<br>(${Xlist[i][1]}～${Xlist[i][2]})</td>`;
			}
		}
		endText = `<tr><td>${l[chara][0][0]}</td><td>${lv}</td>${endText}</tr>`;
		return endText
	}
	
});


}