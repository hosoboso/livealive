//SFC版　経験値算出
{
const d = document;

d.getElementById("expcal").addEventListener("click", () => {
	const
	allylevel = Number( d.getElementById('num1').value ),	// フォーム1の味方キャラレベル
	enemylevel = Number( d.getElementById('num2').value ),	// フォーム2の敵パーティレベル

	// 正規表現で1～99の整数かどうか判定 
	re = /^[1-9][0-9]?$/;

	let expnumber = "";

	if ( !(re.test(allylevel)) || !(re.test(enemylevel)) ) {
		expnumber = "1～99の整数の値を入力してください。";	// 整数値判定
	} else if ( 45 <= enemylevel ) {
		expnumber = "敵パーティレベルの最大値は45です。入力し直してください。";
	} else {
		
		const
		calcresult1 = (enemylevel - allylevel) * 16 + 8,
		calcresult2 = Math.floor(enemylevel / 2) + Math.floor(16 / allylevel);

		// 割り切れない時のイコール切り替え
		let eSign = "＝";
		if ( ((enemylevel % 2) != 0)||((16 % allylevel) != 0) ) {
			eSign = "&#x2252;";
		}
		
		//敵パーティレベル＞味方キャラレベル
		if ( enemylevel - allylevel >= 0) {
			let resulttext = calcresult1;
			if ( calcresult1 >= 100 ) {
				resulttext = "100<br>※取得経験値の上限は100";
			}
			expnumber = 
			`<p>経験値が増える行動を取った場合：<br>(${enemylevel} &#x2212; ${allylevel} ) × 16 ＋ 8 ＝ ${calcresult1}<br>取得経験値：${resulttext}</p>
			<p>経験値が増えない行動を取った場合：<br>${enemylevel} ÷ 2 ＋ 16 ÷ ${allylevel} ${eSign} ${calcresult2}　※小数点以下切り捨て<br>取得経験値：${calcresult2}</p>`;
			
		//敵パーティレベル≦味方キャラレベル
		} else {
			expnumber = 
			`<p>${enemylevel} ÷ 2 ＋ 16 ÷ ${allylevel} ${eSign} ${calcresult2}　※小数点以下切り捨て<br>取得経験値：${calcresult2}</p>`;
		}
	}
	d.getElementById("view1").innerHTML = expnumber;
});
}