//SFC版　経験値算出
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

d.getElementById("expcal").addEventListener("click", () => {
	d.getElementById("view1").replaceChildren();	//div内削除
	
	const
	allyLvValue = escapeHtml(d.getElementById('num1').value),	// フォーム1の味方キャラレベル(string)
	enemyLvValue = escapeHtml(d.getElementById('num2').value),	// フォーム2の敵パーティレベル(string)

	// 正規表現で1～99の整数かどうか判定 
	re = /^[1-9][0-9]?$/;

	let expText = "";

	if ( /^0$/.test(enemyLvValue) || Number(enemyLvValue) === 0 ) {
		expText = `<p>敵パーティレベル0の時の取得経験値：0</p>`;
	} else if ( !(re.test(allyLvValue)) || !(re.test(enemyLvValue)) ) {
		expText = "味方キャラレベルは1～99、敵パーティレベルは0～45の整数の値を入力してください。";	// 整数値判定
	} else if ( 45 <= Number(enemyLvValue) ) {
		expText = "敵パーティレベルの最大値は45です。入力し直してください。";
	} else {
		const
		// レベル値(string)を数値(number)変換
		aLvN = Number(allyLvValue),
		eLvN = Number(enemyLvValue),
		// 経験値計算式
		calc1 = (eLvN - aLvN) * 16 + 8,
		calc2 = Math.floor(eLvN/2) + Math.floor(16/aLvN),
		// 割り切れない時のイコール切り替え
		eSign = ((eLvN % 2) != 0)||((16 % aLvN) != 0) ? "&#x2252;" : "＝";
		if (eLvN - aLvN > 0) {	//敵パーティレベル＞味方キャラレベル
			const str = calc1 >= 100 ? "100<br>※取得経験値の上限は100" : calc1;
			expText = 
			`<p>経験値が増える行動を取った場合：<br>(${eLvN} &#x2212; ${aLvN} ) × 16 ＋ 8 ＝ ${calc1}<br>取得経験値：${str}</p><p>経験値が増えない行動を取った場合：<br>${eLvN} ÷ 2 ＋ 16 ÷ ${aLvN} ${eSign} ${calc2}　※小数点以下切り捨て<br>取得経験値：${calc2}</p>`;
		//敵パーティレベル≦味方キャラレベル
		} else {
			expText = 
			`<p>${eLvN} ÷ 2 ＋ 16 ÷ ${aLvN} ${eSign} ${calc2}　※小数点以下切り捨て<br>取得経験値：${calc2}</p>`;
		}
	}
	d.getElementById("view1").insertAdjacentHTML("afterbegin", expText);
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