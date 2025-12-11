//リメイク版　敵パーティ表の末尾に経験値算出結果を追加
{
const D = document;
// 表の敵パーティレベルをすべて取得
const enemyPartyLVList = D.querySelectorAll('#eplv');

// 敵パーティレベルをforEachで処理
enemyPartyLVList.forEach((LVrow) => {
	// 計算した経験値を入れるtdタグを作る
	const levelCalc = document.createElement("td");
	// 作ったtdタグを親のtrタグの末尾に追加する
	LVrow.parentNode.appendChild(levelCalc);
	// 味方キャラレベルを取得（初期動作）
	const aLV = D.getElementById("epltablecalcnum").value;
	// 取得経験値計算用の関数expCalcで挿入したtdタグ内に経験値を入れる（初期動作）
	levelCalc.textContent=expCalc(aLV,LVrow.textContent);
	// ボタンクリック時の動作
	D.getElementById("epltablecalc").addEventListener('click', () => {
		// 味方キャラレベルを取得
		const aLV = D.getElementById("epltablecalcnum").value;
		// 取得経験値計算用の関数expCalcで挿入したtdタグ内に経験値を入れる
		levelCalc.textContent=expCalc(aLV,LVrow.textContent);
	});
});

//取得経験値計算用の関数expCalc
function expCalc(aLV,eLV){
	let expText = "";
	if ( eLV === "-" ) {
		expText = "-";
	} else if ( !(/^[1-9][0-9]?$/.test(aLV)) ) {
		expText = "-";	// 整数値判定
	} else {
		const
		// レベル値(string)を数値(number)変換
		aLvN = Number(aLV),
		// 敵パーティレベル[仮] - 味方キャラレベル
		lvSub = eLV - aLvN;
		//レベル差の値で分岐
		if ( 2 <= lvSub) {
			expText = Math.min((lvSub * 16 + 8),100);	//計算結果が100以上なら100に切り捨て処理
		} else if ( ( -2 <= lvSub ) && ( lvSub <= 1 ) ) {
			expText = Math.floor(36 / (3 - lvSub));
		} else {
			expText = 5;
		}
	}
	return expText;
}

}