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

// ラジオボタン
const numbtn = ['0',d.getElementById("num1"),d.getElementById("num2"),d.getElementById("num3"),d.getElementById("num4")];
	
d.getElementById("radiobtn").addEventListener("change", () => {
	d.getElementById("view1").replaceChildren();	//div内削除
	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	const pnumbers = numbtn[1].checked ? 1 : numbtn[2].checked ? 2 : numbtn[3].checked ? 3 : 4;
	// フォーム
	const subfn = ['0',d.getElementById("sub-form1").style,d.getElementById("sub-form2").style,d.getElementById("sub-form3").style,d.getElementById("sub-form4").style];
	//ラジオボタンに応じてフォーム数変更
	for (let i = 0; i < 5; i++) {
		subfn[i].visibility = pnumbers < i ? "hidden" : "visible";
	}
	d.getElementById("view1").insertAdjacentHTML("afterbegin", '<span style="color: #777;">「計算する」をクリックで<br>ここに計算値が表示されます。</span>');
});

d.getElementById("rankcal").addEventListener("click", () => {
	d.getElementById("view1").replaceChildren();	//div内削除
	// フォームの味方キャラレベル
	const memberlv = ['0',
	Number( escapeHtml(d.getElementById('lev1').value) ),
	Number( escapeHtml(d.getElementById('lev2').value) ),
	Number( escapeHtml(d.getElementById('lev3').value) ),
	Number( escapeHtml(d.getElementById('lev4').value) ),
	];

	//チェックされているラジオボタン番号によってメンバー人数「pnumbers」を設定しておく
	const pnumbers = numbtn[1].checked ? 1 : numbtn[2].checked ? 2 : numbtn[3].checked ? 3 : 4;

	//パーティ人数に応じてレベル合計値lvtotal計算
	lvtotal= 0;
	for (let i = 1; i < pnumbers + 1; i++) {
		lvtotal = lvtotal + memberlv[i];
	}

	//ランク計算 レベル合計値が112以上は29固定
	const normalrank = lvtotal >= 112 ? 29 : Math.ceil( (lvtotal + 1)/4 );
	//力のダンジョン
	const chikararank = lvtotal >= 112 ? 29 : normalrank + 6;
	//魔王山
	const maourank = lvtotal >= 112 ? 29 : normalrank + 4;
	//その他ダンジョン
	const dungeonrank = lvtotal >= 112 ? 29 : normalrank + 2;

	// ボタン数に応じた整数値判定
	// 正規表現で1～99の整数かどうか判定
	const re = /^[1-9][0-9]?$/;

	let resulttext = `<p>パーティのレベル合計値：${lvtotal}</p>敵パーティ編成ランク：<br><ul><li>通常：ランク${normalrank}, ${normalrank + 1}, ${normalrank + 2}, ${normalrank + 3}</li><li>力のダンジョン：ランク${chikararank}, ${chikararank + 1}, ${chikararank + 2}, ${chikararank + 3}<br>※入り口エリアまで戻ってから再度奥に進む時はランク${maourank}, ${maourank + 1}, ${maourank + 2}, ${maourank + 3}</li><li>魔王山：ランク${maourank}, ${maourank + 1}, ${maourank + 2}, ${maourank + 3}</li><li>力・本能・心・鍵のダンジョン：ランク${dungeonrank}, ${dungeonrank + 1}, ${dungeonrank + 2}, ${dungeonrank + 3}</li></ul>`;

	if (
	((numbtn[4].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) || !(re.test(memberlv[4])) ))||
	((numbtn[3].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) || !(re.test(memberlv[3])) ))||
	((numbtn[2].checked) && ( !(re.test(memberlv[1])) || !(re.test(memberlv[2])) ))||
	((numbtn[1].checked) && ( !(re.test(memberlv[1])) ))
	) {
		resulttext = "全ての項目に1～99の整数の値を入力してください。";
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