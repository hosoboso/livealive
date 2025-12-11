//リメイク版　経験値算出
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
	enemyLvValue = escapeHtml(d.getElementById('num2').value),	// フォーム2の敵パーティレベル[仮](string)

	// 正規表現で1～99の整数かどうか判定 
	re = /^[1-9][0-9]?$/;
	
	let expText = `取得経験値：5`;

	if ( !(re.test(allyLvValue)) || !(re.test(enemyLvValue)) ) {
		expText = "1～99の整数の値を入力してください。";	// 整数値判定
	} else if ( 36 <= Number(enemyLvValue) ) {
		expText = "敵パーティレベル[仮]の最大値は35です。入力し直してください。";
	} else {
		const
		// レベル値(string)を数値(number)変換
		aLvN = Number(allyLvValue),
		eLvN = Number(enemyLvValue),
		// 敵パーティレベル[仮] - 味方キャラレベル
		lvSub = eLvN - aLvN;
		if ( 2 <= lvSub) {
			const calc1 = lvSub * 16 + 8;
			const str = calc1 >= 100 ? "100<br>※取得経験値の上限は100" : calc1;
			expText = `( ${eLvN} - ${aLvN} ) * 16 + 8 = ${calc1}<br>取得経験値：${str}`;
		} else if ( ( -2 <= lvSub ) && ( lvSub <= 1 ) ) {
			const calc2 = Math.floor(36 / (3 - lvSub));
			// 割り切れない時のイコール切り替え
			const eSign = (36 % (3 - lvSub)) === 0 ? `=` : `&#x2252`;
			expText = `36 / ( 3 - ( ${eLvN} - ${aLvN} )) ${eSign} ${calc2}<br>取得経験値：${calc2}`;
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