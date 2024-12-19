//リメイク版　経験値算出
{
const d = document;

d.getElementById("expcal").addEventListener("click", () => {
	const
	allyLv = Number( d.getElementById('num1').value ),	// フォーム1の味方キャラレベル
	enemyLv = Number( d.getElementById('num2').value ),	// フォーム2の敵パーティレベル[仮]

	// 正規表現で1～99の整数かどうか判定 
	re = /^[1-9][0-9]?$/,
	
	// 敵パーティレベル[仮] - 味方キャラレベル
	lvSub = enemyLv - allyLv;
	
	let expText = `取得経験値：5`;

	if ( !(re.test(allyLv)) || !(re.test(enemyLv)) ) {
		expText = "1～99の整数の値を入力してください。";	// 整数値判定
	} else if ( 36 <= enemyLv ) {
		expText = "敵パーティレベル[仮]の最大値は35です。入力し直してください。";
	} else if ( 2 <= lvSub) {
		const calcResult1 = lvSub * 16 + 8;
		let str = calcResult1;
		if ( calcResult1 >= 100 ) {
			str = "100<br>※取得経験値の上限は100";
		}
		expText = `( ${enemyLv} &#x2212; ${allyLv} ) × 16 ＋ 8 ＝ ${calcResult1}<br>取得経験値：${str}`;
	} else if ( ( -2 <= lvSub ) && ( lvSub <= 1 ) ) {
		const calcResult2 = Math.floor(36 / (3 - lvSub));
		// 割り切れない時のイコール切り替え
		let eSign = `＝`;
		if ( (36 % (3 - lvSub)) != 0 ) {
			eSign = `&#x2252`;
		}
		expText = `36 / ( 3 &minus; ( ${enemyLv} &#x2212; ${allyLv} )) ${eSign} ${calcResult2}<br>取得経験値：${calcResult2}`;
	}

	d.getElementById("view1").innerHTML = expText;
});

}