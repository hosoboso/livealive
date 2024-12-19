function formSwitch() {
	// ラジオボタン
	let numbtn = ['0',document.getElementById("num1"),document.getElementById("num2"),document.getElementById("num3"),document.getElementById("num4")];
	// フォーム
	let subformnum = ['0',document.getElementById("sub-form1"),document.getElementById("sub-form2"),document.getElementById("sub-form3"),document.getElementById("sub-form4")];
	//ラジオボタンに応じてフォーム数を変更する
	if (numbtn[4].checked) {
		subformnum[2].style.visibility=subformnum[3].style.visibility=subformnum[4].style.visibility="visible";
	} else if (numbtn[3].checked) {
		subformnum[2].style.visibility=subformnum[3].style.visibility="visible";
		subformnum[4].style.visibility="hidden";
	} else if (numbtn[2].checked) {
		subformnum[2].style.visibility="visible";
		subformnum[3].style.visibility=subformnum[4].style.visibility="hidden";
	} else {
		subformnum[2].style.visibility=subformnum[3].style.visibility=subformnum[4].style.visibility="hidden";
	}
document.getElementById("view1").innerHTML = '<span style="color: #777;">「計算する」をクリックで<br>ここに計算値が表示されます。</span>';
}

function rankcalculation() {
	// フォームの味方キャラレベル
	memberlv = ['0',Number( document.getElementById('lev1').value ),Number( document.getElementById('lev2').value ),Number( document.getElementById('lev3').value ),Number( document.getElementById('lev4').value )];

	// ラジオボタン
	let numbtn = ['0',document.getElementById("num1"),document.getElementById("num2"),document.getElementById("num3"),document.getElementById("num4")];

	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	let pnumbers;
	pnumbers = numbtn[1].checked ? 1 : numbtn[2].checked ? 2 : numbtn[3].checked ? 3 : 4;

	//パーティ人数に応じてレベル合計値lvtotal計算
	lvtotal= 0;
	for (let i = 1; i < pnumbers + 1; i++) {
			lvtotal = lvtotal + memberlv[i];
	}


	//ランク計算（ノーマル）
	if (lvtotal <= 11) {
	normalrank = 1;
	} else if ((12 <= lvtotal) && (lvtotal <= 23)) {
	normalrank = 2;
	} else if ((24 <= lvtotal) && (lvtotal <= 127)) {
	normalrank = Math.floor(lvtotal / 8);
	} else {
	normalrank = 16;
	}

	//ランク計算（魔王山）
	lvtotalmaou = lvtotal + 4;
	if (lvtotalmaou <= 11) {
	maouzanrank = 1;
	} else if ((12 <= lvtotalmaou) && (lvtotalmaou <= 23)) {
	maouzanrank = 2;
	} else if ((24 <= lvtotalmaou) && (lvtotalmaou <= 127)) {
	maouzanrank = Math.floor(lvtotalmaou / 8);
	} else {
	maouzanrank = 16;
	}

	//ランク計算（ダンジョン）
	lvtotaldng = lvtotal + 8;
	if (lvtotaldng <= 11) {
	dangeonrank = 1;
	} else if ((12 <= lvtotaldng) && (lvtotaldng <= 23)) {
	dangeonrank = 2;
	} else if ((24 <= lvtotaldng) && (lvtotaldng <= 127)) {
	dangeonrank = Math.floor(lvtotaldng / 8);
	} else {
	dangeonrank = 16;
	}

	// ボタン数に応じた整数値判定
	// 正規表現で1～99の整数かどうか判定
	re = /^[1-9][0-9]?$/;

	if ((numbtn[4].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) || !(re.test(memberlv[4])) )){
			resulttext = "全ての項目に1～99の整数の値を入力してください。";	// 4人パーティで4つ整数値かどうか
	} else if ((numbtn[3].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) )) {
			resulttext = "全ての項目に1～99の整数の値を入力してください。";	// 3人パーティで3つ整数値かどうか
	} else if ((numbtn[2].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) )) {
			resulttext = "全ての項目に1～99の整数の値を入力してください。";	// 2人パーティで2つ整数値かどうか
	} else if ((numbtn[1].checked) && ( !(re.test(memberlv[1])) )) {
			resulttext = "1～99の整数の値を入力してください。";	// 1人パーティで1つ整数値かどうか
	} else{
		resulttext = `<p>パーティのレベル合計値：${lvtotal}</p>敵パーティ編成ランク<br><ul><li>通常：${normalrank}</li><li>魔王山：${maouzanrank}</li><li>力・本能・心・鍵のダンジョン：${dangeonrank}</li></ul>`;
	}
document.getElementById("view1").innerHTML = resulttext;	//結果表示
}