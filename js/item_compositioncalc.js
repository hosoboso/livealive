//原始編　アイテム合成の素材個数計算 SFC・リメイク版共通
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


// 素材一覧
const s = ["木の棒","ホネ","ケモノのツノ","ケモノのキバ","ケガワ","かたい石","かたいカワ",];

// 合成アイテム一覧 合成パターン複数はその回数分追加
const gouseiItems = ["かわひも","つけムナゲ","つけムナゲ","つけムナゲ","ぼいんビーナス","メラメラこんぼう","ウホホマスク","ウホホマスク","カチンコケース","ガツングローブ","キバのネックレス","キバキバこんぼう","ギギガガのワッカ","ギギガガのワッカ","ケモノかぶり","ケモノかぶり","ツンツンヤリ","ツンツンヤリ","ドカドカオノ","ハナかざり","ハナかざり","ハナかざり","ビリビリまきびし","ブンブンナイフ","ブンブンホネ","ブスブスヤリ","ブスブスヤリ","ペシペシムチ","ボーラ","ポコポコドラム","ポコポコドラム","石器ナイフ","野性アーマー","野性ドレス","野性バッグ",];

// 合成アイテム合成手順
const itemStep = ["ケガワ + 石器ナイフ←ホネ + かたい石","ケモノのキバ + ケガワ","ケガワ + かたい石","ケガワ + かたいカワ","かたい石 + 石器ナイフ","木の棒 + ケガワ","ケモノのツノ + かたいカワ","ケモノのキバ + かたいカワ","ケモノのツノ + 石器ナイフ","かたい石 + かたいカワ","ケモノのキバ + かわひも","木の棒 + ケモノのキバ","ホネ + ケモノのツノ","ケモノのツノ + かたい石","ホネ + ケガワ","ケモノのツノ + ケガワ","木の棒 + ホネ","木の棒 + ケモノのツノ","木の棒 + かたい石","ホネ + ケモノのキバ","ケモノのツノ + ケモノのキバ","ケモノのキバ + かたい石","ケモノのキバ + 石器ナイフ","かわひも + 石器ナイフ","ホネ + かわひも","木の棒 + 石器ナイフ","ホネ + 石器ナイフ","木の棒 + かわひも","かたい石 + かわひも","木の棒 + かたいカワ","ホネ + かたいカワ","ホネ + かたい石","かたいカワ + 石器ナイフ","ケガワ + かわひも","かたいカワ + かわひも",];

// ボタンクリック時動作
d.getElementById("cal").addEventListener("click", () => {
	// 表示リセット(div内削除)
	d.getElementById("view0").replaceChildren();

	// 各フォームの値取得（string）、escapeHtml（一番下）で処理
	const itemId = [
		escapeHtml(d.getElementById("item0").value),
		escapeHtml(d.getElementById("item1_1").value),
		escapeHtml(d.getElementById("item1_2").value),
		escapeHtml(d.getElementById("item1_3").value),
		escapeHtml(d.getElementById("item2").value),
		escapeHtml(d.getElementById("item3").value),
		escapeHtml(d.getElementById("item4_1").value),
		escapeHtml(d.getElementById("item4_2").value),
		escapeHtml(d.getElementById("item5").value),
		escapeHtml(d.getElementById("item6").value),
		escapeHtml(d.getElementById("item7").value),
		escapeHtml(d.getElementById("item8").value),
		escapeHtml(d.getElementById("item9_1").value),
		escapeHtml(d.getElementById("item9_2").value),
		escapeHtml(d.getElementById("item10_1").value),
		escapeHtml(d.getElementById("item10_2").value),
		escapeHtml(d.getElementById("item11_1").value),
		escapeHtml(d.getElementById("item11_2").value),
		escapeHtml(d.getElementById("item12").value),
		escapeHtml(d.getElementById("item13_1").value),
		escapeHtml(d.getElementById("item13_2").value),
		escapeHtml(d.getElementById("item13_3").value),
		escapeHtml(d.getElementById("item14").value),
		escapeHtml(d.getElementById("item15").value),
		escapeHtml(d.getElementById("item16").value),
		escapeHtml(d.getElementById("item17_1").value),
		escapeHtml(d.getElementById("item17_2").value),
		escapeHtml(d.getElementById("item18").value),
		escapeHtml(d.getElementById("item19").value),
		escapeHtml(d.getElementById("item20_1").value),
		escapeHtml(d.getElementById("item20_2").value),
		escapeHtml(d.getElementById("item21").value),
		escapeHtml(d.getElementById("item22").value),
		escapeHtml(d.getElementById("item23").value),
		escapeHtml(d.getElementById("item24").value),
	];

	// 出力テキスト
	let resaltText;

	// 正規表現で0～99の整数かどうか判定
	// 正規表現で入力値がすべて0～99の時は計算を行う
	if ( itemId.every((currentValue) => /^[1-9][0-9]?$|^0$/.test(currentValue)) ) {
		// 合成したいアイテムの数値取得
		let itemN = [];
		for (let i = 0; i < itemId.length; i++) {
			itemN[i] = Number(itemId[i]);
		}
		
		// 素材アイテム計算用配列　初期値0埋め
		let sN = new Array(s.length).fill(0);

		// 石器ナイフ必要数
		let stoneKnifeN = 0;
		
		// かわひも必要数
		let leatherStringN = 0;

		// 素材アイテムの合計値計算　ここから
		
		// かわひも ケガワ + 石器ナイフ←ホネ + かたい石
		sN[4] += itemN[0]; sN[1] += itemN[0]; sN[5] += itemN[0];
		
		// つけムナゲ
		sN[3] += itemN[1]; sN[4] += itemN[1];	// ケモノのキバ + ケガワ
		sN[4] += itemN[2]; sN[5] += itemN[2];	//ケガワ + かたい石
		sN[4] += itemN[3]; sN[6] += itemN[3];	//ケガワ + かたいカワ
		
		// ぼいんビーナス かたい石 + 石器ナイフ←ホネ + かたい石
		sN[5] += 2*itemN[4]; sN[1] += itemN[4];
		stoneKnifeN += itemN[4];
		
		// メラメラこんぼう　木の棒 + ケガワ
		sN[0] += itemN[5]; sN[4] += itemN[5];
		
		// ウホホマスク
		sN[2] += itemN[6]; sN[6] += itemN[6];	// ケモノのツノ + かたいカワ
		sN[3] += itemN[7]; sN[6] += itemN[7];	//ケモノのキバ + かたいカワ
		
		// カチンコケース　ケモノのツノ + 石器ナイフ←ホネ + かたい石
		sN[2] += itemN[8]; sN[1] += itemN[8]; sN[5] += itemN[8];
		stoneKnifeN += itemN[8];
		
		// ガツングローブ　かたい石 + かたいカワ
		sN[5] += itemN[9]; sN[6] += itemN[9];
		
		// キバのネックレス　ケモノのキバ + かわひも←ケガワ + 石器ナイフ←ホネ + かたい石
		sN[3] += itemN[10]; sN[4] += itemN[10]; sN[1] += itemN[10]; sN[5] += itemN[10];
		stoneKnifeN += itemN[10];
		leatherStringN += itemN[10];
		
		// キバキバこんぼう　木の棒 + ケモノのキバ
		sN[0] += itemN[11]; sN[3] += itemN[11];
		
		// ギギガガのワッカ
		sN[1] += itemN[12]; sN[2] += itemN[12];	//ホネ + ケモノのツノ
		sN[2] += itemN[13]; sN[5] += itemN[13];	//ケモノのツノ + かたい石
		
		// ケモノかぶり
		sN[1] += itemN[14]; sN[4] += itemN[14];	// ホネ + ケガワ
		sN[2] += itemN[15]; sN[4] += itemN[15];	//ケモノのツノ + ケガワ
		
		// ツンツンヤリ
		sN[0] += itemN[16]; sN[1] += itemN[16];	// 木の棒 + ホネ
		sN[0] += itemN[17]; sN[2] += itemN[17];	//木の棒 + ケモノのツノ
		
		// ドカドカオノ　木の棒 + かたい石
		sN[0] += itemN[18]; sN[5] += itemN[18];

		// ハナかざり
		sN[1] += itemN[19]; sN[3] += itemN[19];	//ホネ + ケモノのキバ
		sN[2] += itemN[20]; sN[3] += itemN[20];	//ケモノのツノ + ケモノのキバ
		sN[3] += itemN[21]; sN[5] += itemN[21];	//ケモノのキバ + かたい石

		// ビリビリまきびし　ケモノのキバ + 石器ナイフ←ホネ + かたい石
		sN[3] += itemN[22]; sN[1] += itemN[22]; sN[5] += itemN[22];
		stoneKnifeN += itemN[22];
		
		// ブンブンナイフ　かわひも + 石器ナイフ
		sN[4] += itemN[23]; sN[1] += 2*itemN[23]; sN[5] += 2*itemN[23];
		stoneKnifeN += itemN[23];
		
		// ブンブンホネ　ホネ + かわひも←ケガワ + 石器ナイフ←ホネ + かたい石
		sN[1] += itemN[24]; sN[4] += itemN[24]; sN[1] += itemN[24]; sN[5] += itemN[24];
		stoneKnifeN += itemN[24];
		leatherStringN += itemN[24];
		
		// ブスブスヤリ.
		sN[0] += itemN[25]; sN[1] += itemN[25]; sN[5] += itemN[25];	//　木の棒 + 石器ナイフ←ホネ + かたい石
		sN[1] += 2*itemN[26]; sN[5] += itemN[26];	//ホネ + 石器ナイフ←ホネ + かたい石
		stoneKnifeN += itemN[25];
		stoneKnifeN += itemN[26];
		
		// ペシペシムチ　木の棒 + かわひも←ケガワ + 石器ナイフ←ホネ + かたい石
		sN[0] += itemN[27]; sN[4] += itemN[27]; sN[1] += itemN[27]; sN[5] += itemN[27];
		stoneKnifeN += itemN[27];
		leatherStringN += itemN[27];

		// ボーラ　かたい石 + かわひも←ケガワ + 石器ナイフ←ホネ + かたい石
		sN[5] += itemN[28]; sN[4] += itemN[28]; sN[1] += itemN[28]; sN[5] += itemN[28];
		stoneKnifeN += itemN[28];
		leatherStringN += itemN[28];

		// ポコポコドラム
		sN[0] += itemN[29]; sN[6] += itemN[29];	//木の棒 + かたいカワ
		sN[1] += itemN[30]; sN[6] += itemN[30];	//ホネ + かたいカワ

		// 石器ナイフ　ホネ + かたい石
		sN[1] += itemN[31]; sN[5] += itemN[31];

		// 野性アーマー　かたいカワ + 石器ナイフ←ホネ + かたい石
		sN[6] += itemN[32]; sN[1] += itemN[32]; sN[5] += itemN[32];
		stoneKnifeN += itemN[32];
		
		// 野性ドレス　ケガワ + かわひも←ケガワ + 石器ナイフ←ホネ + かたい石
		sN[4] += 2*itemN[33]; sN[1] += itemN[33]; sN[5] += itemN[33];
		stoneKnifeN += itemN[33];
		leatherStringN += itemN[33];

		// 野性バッグ　かたいカワ + かわひも←ケガワ + 石器ナイフ←ホネ + かたい石
		sN[6] += itemN[34]; sN[4] += itemN[34]; sN[1] += itemN[34]; sN[5] += itemN[34];
		stoneKnifeN += itemN[34];
		leatherStringN += itemN[34];

		// 素材アイテムの合計値計算　ここまで
		// 必要量をテキストにしてresaltText完成

		resaltText = `<h5>必要な材料アイテムの個数</h5><ul>`;
		for (i = 0; i < sN.length; i++) {
			resaltText += `<li>${s[i]} : ${sN[i]}</li>`;
		}
		resaltText += `</ul>`;
		
		// 合成手順テキスト
		let stepText = "";
		
		// 「合成手順も表示する」のチェックボックスONかつ合成アイテム1個以上なら合成手順テキストを追加する
		if ( d.getElementById("steps").checked && itemN.some((currentValue) => currentValue > 0) ) {
			stepText += `<h5>合成手順</h5><p>（チェックボックスは実際の合成時にご利用ください）</p>`;
			if ((stoneKnifeN > 0)||(leatherStringN > 0)) {
			stepText += `<p>最初に、合成素材になる「石器ナイフ」`
				if (leatherStringN > 0) {
					stepText += `「かわひも」`
				}
			stepText += `を作る</p><ul style="list-style-type:none;padding-left:0.2em;">`
			}
			// 石器ナイフ
			let stoneKnife = "";
			if (stoneKnifeN > 0) {
				stoneKnife = `<li><label><input type="checkbox"/>石器ナイフ←ホネ + かたい石 : ${stoneKnifeN}回合成</label></li>`;
				if (leatherStringN == 0) {
					stoneKnife += `</ul><p>以降、他アイテムを合成</p>`;
				}
			}
			// かわひも
			let leatherString = "";
			if (leatherStringN > 0) {
				leatherString = `<li><label><input type="checkbox"/>かわひも←ケガワ + 石器ナイフ : ${leatherStringN}回合成</label></li></ul><p>以降、他アイテムを合成</p>`;
			}
			
			stepText += stoneKnife + leatherString;
			stepText += `<ul style="list-style-type:none;padding-left:0.2em;">`;
			let extraText = false;
			let extraText1 = ``;
			let extraText2 = ``;
			for (let i = 0; i < gouseiItems.length; i++) {
				if (itemN[i] > 0){
					if ((i != 0)&&(i != 31)) {
					stepText += `<li><label><input type="checkbox"/>${gouseiItems[i]}←${itemStep[i]} : ${itemN[i]}回合成</label></li>`;
					}
					if (i == 31) {	//石器ナイフ※
					extraText1 += `<li><label><input type="checkbox"/>${gouseiItems[31]}※←${itemStep[31]} : ${itemN[31]}回合成</label></li>`;
					extraText = true;
					}
					if (i == 0) {	//かわひも※
					extraText2 += `<li><label><input type="checkbox"/>${gouseiItems[0]}※←${itemStep[0]} : ${itemN[0]}回合成</label></li>`;
					extraText = true;
					}
				}
			}
			stepText += `${extraText1}${extraText2}</ul>`;
			if (extraText) {
				stepText += `最後の※付きアイテムは他の合成アイテムの素材とは別カウントで計算した分`
			}
		}
	resaltText += stepText;
	// 入力フォームが正規表現に合わない時
	} else {
		resaltText = `入力フォームに空白か、<br>0～99以外の文字が含まれています。<br>全ての項目に0～99の整数の値を入力してから<br>再度ボタンをクリックしてください。`;
	}
	
	d.getElementById("view0").insertAdjacentHTML("afterbegin", resaltText);	//結果表示
});

//HTMLエスケープ
function escapeHtml(str) {
	const x = [/&/g,/</g,/>/g,/"/g,/'/g,],
	y = ['&amp;','&lt;','&gt;','&quot;','&#39;',];
	for (let i = 0; i < x.length; i++) {
		str = str.replace(x[i], y[i]);
	}
	return str;
}


}