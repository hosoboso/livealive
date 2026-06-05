//SFC版　敵パーティ表の末尾に経験値算出結果を追加
{
const D = document;
// 表の敵パーティレベルをすべて取得
const enemyPartyLVList = D.querySelectorAll('#eplv');

// 敵パーティレベルをforEachで処理
enemyPartyLVList.forEach((LVrow) => {
	// 計算した経験値を入れるtdタグを作る
	const levelCalc = document.createElement("td");
	const levelCalc2 = document.createElement("td");
	// 作ったtdタグを親のtrタグの末尾に追加する
	LVrow.parentNode.appendChild(levelCalc);
	LVrow.parentNode.appendChild(levelCalc2);
	// 味方キャラレベルを取得（初期動作）
	const aLV = D.getElementById("epltablecalcnum").value;
	// 取得経験値計算用の関数expCalcで挿入したtdタグ内に経験値を入れる（初期動作）
	levelCalc.textContent=expCalc(aLV,LVrow.textContent)[0];
	levelCalc2.textContent=expCalc(aLV,LVrow.textContent)[1];
	// ボタンクリック時の動作
	D.getElementById("epltablecalc").addEventListener('click', () => {
		// 味方キャラレベルを取得
		const aLV = D.getElementById("epltablecalcnum").value;
		// 取得経験値計算用の関数expCalcで挿入したtdタグ内に経験値を入れる
		levelCalc.textContent=expCalc(aLV,LVrow.textContent)[0];
		levelCalc2.textContent=expCalc(aLV,LVrow.textContent)[1];
	});

});

//取得経験値計算用の関数expCalc
function expCalc(aLV,eLV){
	//行動あり/なしのリスト
	let expArray = ["","",];
	const eLVN = Number(eLV);
	if ( eLVN === 0 ) {
		expArray[0] = "0";
		expArray[1] = "0";
	} else if ( !(/^[1-9][0-9]?$/.test(aLV)) ) {
		// 整数値判定
		expArray[0] = "-";
		expArray[1] = "-";
	} else {
		// レベル値(string)を数値(number)変換
		const aLvN = Number(aLV);
		// 経験値計算式
		const lvSub = eLVN - aLvN;	// 敵パーティレベル - 味方キャラレベル
		let calc1 = Math.min((lvSub * 16 + 8),100);	//敵パーティレベル＞味方キャラレベル かつ 経験値が増える行動
			let temp = Math.floor(eLVN/2) + Math.floor(16/aLvN);
		let calc2 = Math.max(temp,1);	//敵パーティレベル≦味方キャラレベル or 敵パーティレベル＞味方キャラレベル かつ 経験値が増えない行動
			expArray[1] = calc2;
		//レベル差の値で分岐
		if ( 0 < lvSub) {
			expArray[0] = calc1;
		} else {
			expArray[0] = calc2;
		}
	}
	return expArray;
}

}