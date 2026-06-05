//敵パーティデータ

//00	敵パーティレベル
//01	味方・敵の状態（下で解説）
//02	味方1 向き/初期座標
//03	味方2 向き/初期座標
//04	味方3 向き/初期座標
//05	味方4 向き/初期座標
//06	上位8ビット：アイテム入手率補正
//下位8ビット：敵の総数
//07	敵ID(0)
//08	向き/初期座標(0)
//各シナリオのラストボス戦のみ、最後の1バイトに、シナリオIDが書き込まれる

//敵パーティID
function ePartyIDFunc() {
	let array=[];
	for (let i = 0; i < enemyPartyData.length; i++) {
		array[i]=i.toString(16).padStart(2, '0').toUpperCase();
	}
	array.unshift("ID");
	return(array);
}

//敵パーティシナリオ
function ePartyScenarioFunc() {
	let array=new Array(enemyPartyData.length);
	for (let i = 0; i < enemyPartyData.length; i++) {
		for (let j = 0; j < scenarioID.length-1; j++) {
			if (scenarioEnemyP[j].includes(i)) {
				array[i]=scenarioID[j];
			}
		}
		//未使用枠?の処理
		//中世未使用
		const scenario_Chusei = [0x09,0x0A,0x0C,0x0D,0x0E,];
		for (let k = 0; k < scenario_Chusei.length; k++) {
			if (scenario_Chusei.includes(i)) {
				array[i]="中世(未)";
			}
		}
		//原始未使用
		if ((i==0x3F)||(i==0xD7)) {
			array[i]="原始(未)";
		}
		//仲間との戦闘共通
		if ((i==0xAB)) {
			array[i]="共通";
		}
		//西部未使用？
		if ((i==0xC0)) {
			array[i]="西部";
		}
	}
	array.unshift("編");
	return(array);
}

//00	敵パーティレベルと取得経験値
function ePartyLVFunc() {
	let array=[];
	for (let i = 0; i < enemyPartyData.length; i++) {
		//敵パーティレベル
		array[i] = enemyPartyData[i][0] + "</td><td>";
	
		// 味方キャラレベルを取得
		let aLVN = document.getElementById("epltablecalcnum").value || 0;

		//行動あり/なしのリスト
		let expArray = ["","",];
		const eLVN = enemyPartyData[i][0];
		if ( eLVN === 0 ) {
			array[i] += "0</td><td>0"
		} else {
			// 経験値計算式
			let lvSub = eLVN - aLVN;	// 敵パーティレベル - 味方キャラレベル
			let calc1 = Math.min((lvSub * 16 + 8),100);	//敵パーティレベル＞味方キャラレベル かつ 経験値が増える行動
				let temp = Math.floor(eLVN/2) + Math.floor(16/aLVN);
			let calc2 = Math.max(temp,1);	//敵パーティレベル≦味方キャラレベル or 敵パーティレベル＞味方キャラレベル かつ 経験値が増えない行動
				array[i] += calc2 + "</td><td>";
			//レベル差の値で分岐
			if ( 0 < lvSub) {
				array[i] += calc1;
			} else {
				array[i] += calc2;
			}
		}
	}
	array.unshift("敵PtLV</th><th>経験値<br>行動有</th><th>経験値<br>行動無");
	return(array);
}

//01	味方・敵の状態
//$00	味方 対 敵（通常）
//$01	敵 対 敵（ブリキ大王戦など）
//$10	原始編　ざき1戦目
//$20	幕末編　カラクリ丸戦（とらわれの男が居る場合）
//$40	味方1キャラ 対 味方1キャラ（功夫編修行など）
function ePartyJoutaiFunc() {
	let array=[];
	const joutai=["味方 対 敵(通常)","敵 対 敵","味方3 対 味方1","味方2 対 味方1","味方1 対 味方1",];
	const n=[0x00,0x01,0x10,0x20,0x40,];
	for (let i = 0; i < enemyPartyData.length; i++) {
		for (let j = 0; j < joutai.length; j++) {
			if (enemyPartyData[i][1] == n[j]) {
				array[i]=joutai[j];
			}
		}
	}
	array.unshift("味方・敵の状態");
	return(array);
}

//06	上位8ビット：アイテム入手率補正（/16が確率）
//下位8ビット：敵の総数
function ePartyDropitemFunc() {
	let array=[];
	for (let i = 0; i < enemyPartyData.length; i++) {
		array[i]=Math.trunc((enemyPartyData[i][6] & 0xF0) /16) + "/16";
	}
	array.unshift("アイテム<br>入手率補正");
	return(array);
}

//06	上位8ビット：アイテム入手率補正
//下位8ビット：敵の総数
//07	敵ID(0)
//08	向き/初期座標(0)
//敵パーティ編成
//（敵名）×（数）の形でリスト化して出します
function ePartyEnemysFunc() {
	let array=[];
	for (let i = 0; i < enemyPartyData.length; i++) {
		//敵総数
		const enemytotal = enemyPartyData[i][6] & 0x0F;
		//敵総数から、敵パーティデータ07以降の奇数を取り出して敵IDリストenemyIDを作る
		let enemyID = [];
		for (let j = 0; j < enemytotal; j++) {
			enemyID[j] = enemyPartyData[i][2*j+7];
		}
		array[i] = enemyID;
	}
	//敵IDリスト内の、同一IDの個数を変換する処理
	let enemyIDArray_temp=[];
	for (let x = 0; x < enemyPartyData.length; x++) {
		//配列からIDと個数に変換する
		// 個数をカウント
		let map = new Map();
		for (let num of array[x]) {
			map.set(num, (map.get(num) || 0) + 1);
		}
		// 配列化
		enemyIDArray_temp[x] = [...map];
	}
	//[敵ID,数]の形にしたので「敵名×数,……」に変換
	let enemyIDArray=[];
	for (let k = 0; k < enemyIDArray_temp.length; k++) {
		let temp="";
		for (let m = 0; m < enemyIDArray_temp[k].length; m++) {
			temp += enemyData_ID[enemyIDArray_temp[k][m][0]][0] + "×" + enemyIDArray_temp[k][m][1] + ", ";
		}
		//最後の「, 」はカットする
		temp.endsWith(", ")&&(temp=temp.slice(0,-2));
		enemyIDArray[k] = temp;
	}
	// 仲間との戦闘時用処理　敵パーティに内容記載がないのでゴリ押しで上書きします
	// AB	共通
	enemyIDArray[0xAB] = '※功夫編　修行以外の弟子との戦闘<br>※原始編　ざき2・3戦目<br>※中世編　ストレイボウ1・2戦目<br>※西部編　マッドドッグ1戦目<br>※幕末編　カラクリ丸戦（とらわれの男がパーティにいない場合）<br>※最終編　仲間にする時の戦闘<br>　オルステッド戦（NEVER END）';
	// AC	功夫
	enemyIDArray[0xAC] = '※功夫編　修行';
	// CB	西部
	enemyIDArray[0xCB] = '※西部編　マッドドッグ2戦目';
	// CC	幕末
	enemyIDArray[0xCC] = '※幕末編　カラクリ丸戦（とらわれの男がパーティにいる場合）';
	// CD	原始
	enemyIDArray[0xCD] = '※原始編　ざき1戦目';
	
	enemyIDArray.unshift("敵パーティ編成");
	return(enemyIDArray);
}

//----------------------------
//ここからマス目作成用処理
//----------------------------

//敵味方パーティ編成（フィールドマス数値を出力）
//味方・敵の順に、[座標から計算した平面番号（0～48）,キャラ横幅,キャラ縦幅,向き]を出力
function ePartyArray_temp() {
	let areaArray=[];
	for (let i = 0; i < enemyPartyData.length; i++) {
		areaArray[i]=[];
		let Zahyou=[];
		//味方1～4座標と向き　[座標X,Y,向き] 向き:%00	右下 / %01	左下 / %10	右上 / %11	左上
		for (let k = 0; k < 4; k++) {
			let tempX = Math.trunc((enemyPartyData[i][2+k] & 0b00111000)/8);	//X座標
			let tempY = (enemyPartyData[i][2+k] & 0b00000111);	//Y座標
			let tempArM = [
				(tempY*7 + tempX),	//平面番号（0～48）
				1,	//横幅
				1,	//縦幅
				Math.trunc((enemyPartyData[i][2+k] & 0b11000000)/64)+1,	//向き　＋1処理します
			];
			Zahyou.push(tempArM);
		}
		//敵総数
		const enemytotal = enemyPartyData[i][6] & 0x0F;
		//敵総数から、敵パーティデータ07～08以降の数を取り出して、敵のid、座標、向きリスト加算
		//Zahyou[4]以降を埋める
		for (let j = 0; j < enemytotal; j++) {
			let tempID = enemyPartyData[i][2*j+7];	//敵のid
			let tempXhaba = enemyData_ID[tempID][1];	//敵の横幅
			let tempYhaba = enemyData_ID[tempID][2];	//敵の縦幅
			let tempX = Math.trunc((enemyPartyData[i][2*j+8] & 0b00111000)/8);	//X座標
			let tempY = (enemyPartyData[i][2*j+8] & 0b00000111);	//Y座標
			let tempArE = [
				(tempY*7 + tempX),	//平面番号（0～48）
				tempXhaba,	//敵の横幅
				tempYhaba,	//敵の縦幅
				Math.trunc((enemyPartyData[i][2*j+8] & 0b11000000)/64)+1,	//向き　＋1処理します
			];
			Zahyou.push(tempArE);
		}
		areaArray[i]=Zahyou;
	}
		return(areaArray);
}

//敵パーティ編成を座標用テキストとして出力する
function ePartyEnemysTEXTFunc() {
	const leader = '<img src="../../icon/leaderflag.svg" class="flag" alt="LEADER">';
	let array=[];
	for (let i = 0; i < enemyPartyData.length; i++) {
		//敵総数
		const enemytotal = enemyPartyData[i][6] & 0x0F;
		//敵総数から、敵パーティデータ07以降の奇数を取り出して敵IDリストenemyIDを作る
		let enemyID = [];
		for (let j = 0; j < enemytotal; j++) {
			enemyID[j] = enemyPartyData[i][2*j+7];
		}
		array[i] = enemyID;
	}
	
	//1つの配列を処理して [[数字, "1,2..."]] に変換する関数を作る
	function convertArrayToGroupedIndices(subArray) {
		const indexMap = new Map();
		subArray.forEach((num, index) => {
		const oneBasedIndex = index + 1;	//敵開始位置を1からにする（その方がわかりやすいし……）
			if (!indexMap.has(num)) {
				indexMap.set(num, [oneBasedIndex]);
			} else {
				indexMap.get(num).push(oneBasedIndex);
			}
		});
		return Array.from(indexMap, ([num, indices]) => [num, indices.join(",")]);
	}
	//親配列の各要素（子配列）に上の関数を適用する
	const enemyIDArray_temp = array.map(subArray => convertArrayToGroupedIndices(subArray));

	//[敵ID,"0,1,2,3"][敵ID,"4,5,6"]の形にしたので「敵名：<span style="color:#FF0000;">n"1,2,3"</span><br>」に変換
	
	//敵IDから敵タイプ判別
	//LEADERなら敵名前にleaderフラッグつける
	//COLLAPSE・LEADER・BREAKDOWN・OBJECTでない時、敵の初期配置はランダム
	//敵データ15の下4ビットは	1	COLLAPSE、2	BREAKDOWN、	4	OBJECT、8	LEADER
	 
	let enemyIDArray=[];
	for (let k = 0; k < enemyIDArray_temp.length; k++) {
	//[[3,"0"],[6,"1,2"]],
		let enTypeRandom="";
		let temp="";
		let tempID="";
		let tempText="";
		for (let m = 0; m < enemyIDArray_temp[k].length; m++) {
			//[[3,"0"],
			tempID = enemyIDArray_temp[k][m][0];
			tempText = '<span style="color:#FF0000;">' + enemyIDArray_temp[k][m][1] + '</span>';
			
			//敵データ15の下4ビット判定
			let enType="";
			if (((enemyData[tempID][15] & 0x0F) == 8)) {
					enType='<img src="../../icon/leaderflag.svg" class="flag" alt="LEADER">';
			}
			if (((enemyData[tempID][15] & 0x0F) == 0)) {
				enTypeRandom="敵の初期配置はランダム";
			}
			temp += (enType + enemyData_ID[tempID][0] + "：" + tempText + ",<br>");
		}
		enemyIDArray[k] = temp + enTypeRandom;
	}
		// 仲間との戦闘時用処理　敵パーティに内容記載がないのでゴリ押しで上書きします
	// AB	共通
	enemyIDArray[0xAB] = '※功夫編　修行以外の弟子との戦闘<br>※原始編　ざき2・3戦目<br>※中世編　ストレイボウ1・2戦目<br>※西部編　マッドドッグ1戦目<br>※幕末編　カラクリ丸戦（とらわれの男がパーティにいない場合）<br>※最終編　仲間にする時の戦闘<br>　オルステッド戦（NEVER END）';
	// AC	功夫
	enemyIDArray[0xAC] = '※功夫編　修行';
	// CB	西部
	enemyIDArray[0xCB] = '※西部編　マッドドッグ2戦目';
	// CC	幕末
	enemyIDArray[0xCC] = '※幕末編　カラクリ丸戦（とらわれの男がパーティにいる場合）';
	// CD	原始
	enemyIDArray[0xCD] = '※原始編　ざき1戦目';
	
	return enemyIDArray;
}

//[座標から計算した平面番号（0～48）,キャラ横幅,キャラ縦幅,向き]から戦闘座標変換
function coordinateConversion(areaArray) {
	// 7×7 平面作成　(0,0)で埋める
	function createPlane() {
		return Array.from({ length: 49 }, () => [0, 0]);
	}
	//出力先
	let coordinatesPlaneArray = [];
	//配列areaArrayに処理
	areaArray.forEach((planeAreas, planeAreasIndex) => {
		// 平面作成
		let plane = createPlane();
		// 使用済みマス管理
		let used = Array(49).fill(false);
		// 各領域処理
		planeAreas.forEach((area, areaIndex) => {
			//[平面番号（0～48）,キャラ横幅,キャラ縦幅,向き]　の順
			const [start, width, height, variable] = area;
			//座標
			const startX = start % 7;
			const startY = Math.floor(start / 7);
			// 領域ID
			const id = areaIndex + 1;
			// （ないはずだけど）領域をはみ出さないかの確認用
			if (startX + width > 7 || startY + height > 7) {
				return;
			}
			// （ないはずだけど）領域同士が重ならないかの確認用
			let overlap = false;
			
			// 座標確認（幅を考慮して決める）
			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const index = (startY + y) * 7 + (startX + x);
					//usedがtrue（既に使用済み）
					if (used[index]) {
						overlap = true;
						break;
					}
				}
				if (overlap) break;
			}

			// 重なった場合は無効
			if (overlap) {
				return;
			}

			// 領域書き込み
			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const index = (startY + y) * 7 + (startX + x);
					//書き込み時に、使用済みに変更する
					used[index] = true;
				// 領域左上だけ [id, variable]
				if (x === 0 && y === 0) {
					plane[index] = [id, variable];
				} else {	// その他は [id,0]
					plane[index] = [id,0];
				}
				}
			}
		});
		//敵パーティ用テキスト
		let text =ePartyEnemysTEXTFunc()[planeAreasIndex];
		plane.push(text);
		
		coordinatesPlaneArray.push(plane);
	});
	return coordinatesPlaneArray;
}

let eParty = coordinateConversion(ePartyArray_temp());

//戦闘フィールド＆注意テキスト出力用関数
function battleTable(list){
	let enTable= [];
	for (let i = 0; i < list.length-1; i++) {
		enTable[i] = '<div';
		//文字色と背景色指定して<div>閉じる
		enTable[i] += list[i][0] == 0 ? "> "
			: 1 <= list[i][0]&&list[i][0] <= 4 ? ' style="color: #0000FF;background:#e3e3ff">'
			: list[i][0]%3 == 0 ? ' style="color: #FF0000;background:#ffd1d1">'
			: list[i][0]%3 == 1 ? ' style="color: #FF0000;background:#ffe0e0">'
			: ' style="color: #FF0000;background:#faebeb">';
		
		//文字いれるかどうか
		if (list[i][1] != 0){
			if (1 <= list[i][0]&&list[i][0] <= 4){
				enTable[i] += list[i][0];
			} else if (5 <= list[i][0]){	
				enTable[i] += list[i][0]-4;
			}
		} else {
			;
		}

		//矢印
		//向き:%00	右下 / %01	左下 / %10	右上 / %11	左上 この数値に+1してます
		//値が0なら矢印なし扱いです
		enTable[i] += 1 == list[i][1] ? "&#x2198;"	//右下
			: 2 == list[i][1] ? "&#x2199;"	//左下
			: 3 == list[i][1] ? "&#x2197;"	//右上
			: 4 == list[i][1] ? "&#x2196;"	//左上
			: "";
		enTable[i] += '</div>';
	}

	let resulttext="";
	for (let i = 0; i < enTable.length; i++) {
		resulttext += enTable[i];
	}
	return [resulttext,list[list.length-1]]
}

//----------------------------//
// ここから実行時サブルーチン
//----------------------------//

//チェックボタンを押す度に実行
const functionMap = {
	c0: ePartyIDFunc,	//ID
	c1: ePartyScenarioFunc,	//シナリオ
	c2: ePartyEnemysFunc,	//敵パーティ編成
	c3: ePartyDropitemFunc,	//アイテム入手率補正
	c4: ePartyJoutaiFunc,	//味方・敵の状態
	c5: ePartyLVFunc,	//敵パーティレベルと取得経験値
};

//地域別敵パーティID　10進数での判定用
const eParty_hantei=[
	//ルクレチアの森 / 魔王戦前
	[0, 1, 2, 3, 4, 5, 6, 7],
	//勇者の山 / 魔王戦前
	[16, 17, 18, 19, 20, 21],
	//魔王山・洞窟エリア / 魔王戦前
	[8, 25, 26, 11, 28, 29, 30, 15, 24, 27],
	//魔王山・廃墟エリア / 魔王戦前
	[16, 24, 25, 26, 27, 28, 29, 30, 15],
	//ルクレチアの森 / 魔王戦後
	[0, 1, 2, 3, 4, 5, 6, 7, 32, 34, 35, 36, 37, 38, 39],
	//勇者の山 / 魔王戦後
	[16, 23, 17, 18, 19, 20, 21, 22, 32, 34, 35, 36, 37, 38, 39],
	//魔王山・洞窟エリア / 魔王戦後
	[40, 41, 25, 43, 42, 44, 45, 46, 47],
	//魔王山・廃墟エリア / 魔王戦後
	[52, 40, 53, 45, 47, 41, 42, 43, 44, 46, 48, 49, 50, 51],
	//狩場(初回)
	[64, 55],
	//狩場(2回目以降)
	[64, 55, 56, 54, 68, 69, 58],
	//荒野
	[58, 59, 56, 33, 67, 68, 72, 69, 71, 75, 76],
	//洞窟下
	[56, 61, 60, 66, 62, 83, 73],
	//荒野の北側の細道
	[66, 72, 74, 57, 84, 77, 82, 78, 59, 70, 85],
];

//中世編と原始編の追加テキスト
let chuseiArray = [];
for (let ch = 0; ch < 8; ch++) {
	chuseiArray[ch] = scenarioEnemyP[0].slice(ch*16, ch*16+16).map(num => num.toString(16).toUpperCase().padStart(2, '0')).join(', ');
}
let tsuikaText = [];
for (let cht = 0; cht < 8; cht++) {
	tsuikaText[cht] = `<p>中世編はエリアと魔王戦の前後で敵パーティ編成が変動する。<br>このエリアでは以下の敵パーティIDが出現テーブルで、各IDが1/16の確率で選ばれる。<br>ID(16進数) : ${chuseiArray[cht]}</p>`;
}

let genshiArray = [];
for (let gh = 0; gh < 5; gh++) {
	genshiArray[gh] = scenarioEnemyP[1].slice(gh*16, gh*16+16).map(num => num.toString(16).toUpperCase().padStart(2, '0')).join(', ');
}
for (let ght = 0; ght < 5; ght++) {
	tsuikaText.push(`<p>原始編はエリアと進行度合いで見えない敵シンボルの敵パーティ編成が変動する。<br>エンカウントの度に以下出現テーブルから乱数で敵パーティが決まるため、一度逃げた後に同じシンボルに接触しても異なる敵パーティが出現することがある。<br>このエリアでは以下の敵パーティIDが出現テーブルで、各IDが1/16の確率で選ばれる。<br>ID(16進数) : ${genshiArray[ght]}</p>`);
}

//一覧表生成
const checklist = document.getElementById('checklist');
// テーブルを挿入する対象の要素を取得
const tableContainer = document.getElementById('enemyPartydata_table');

// テーブルを描画する処理を関数にまとめる
function updateTable() {
	// ラジオボタンの状態を取得
	const radios = document.querySelectorAll('input[name="slist"]');
	const checkedRadio = Array.from(radios).findIndex(radio => radio.checked);

	// 多次元配列を作成
	const resultMatrix = [];
	const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
	
	checkboxes.forEach(checkbox => {
		if (checkbox.checked && functionMap[checkbox.id]) {
			resultMatrix.push(functionMap[checkbox.id]());
		}
	});

	// チェックがすべて外れている場合はテーブルを消去して終了
	if (resultMatrix.length === 0) {
		tableContainer.innerHTML = '';
		return;
	}

	// テーブルHTMLの組み立て
	let tableHtml = '<table>';
	
	// --- <thead> の作成 ---
	tableHtml += '<thead><tr>';
	resultMatrix.forEach(columnData => {
			tableHtml += `<th>${columnData[0]}</th>`;
	});
	tableHtml += '</tr></thead>';
	
	// --- <tbody> の作成 ---
	tableHtml += '<tbody>';
	const maxRows = Math.max(...resultMatrix.map(col => col.length));
	
	for (let i = 1; i < maxRows; i++) {
	//シナリオIDチェック checkedRadioが0（すべて） または、checkedRadioが1～9ならcheckedRadioとシナリオIDが一致した時
	let scenarioIDChecker =
	(checkedRadio==0)
	||(((checkedRadio>0)&&(checkedRadio<10)) && (scenarioEnemyP[checkedRadio-1].includes(i-1)) )
	||((checkedRadio>9) && (eParty_hantei[checkedRadio-10].includes(i-1)) );
	
	//共通枠の味方1 対 味方1（ID$AB）の判定用
	let AB_Checker =
	(checkedRadio==0)	//全て
	||(checkedRadio==4)	//※功夫編　修行以外
	||(checkedRadio==2)	//※原始編　ざき2・3戦目
	||(checkedRadio==1)	//※中世編　ストレイボウ1・2戦目
	||(checkedRadio==5)	//※西部編　マッドドッグ1戦目
	||(checkedRadio==8)	//※幕末編　カラクリ丸戦（とらわれの男がパーティにいない場合）
	||(checkedRadio==9)	//※最終編　仲間にする時の戦闘/オルステッド戦（NEVER END）
	;

	//ラジオボタンでテーブル列を作るか1行ずつ判定
	if ( (scenarioIDChecker) || (AB_Checker && (i==(0xAB+1))) ) {
	
	tableHtml += `<tr id="${i}">`;
	resultMatrix.forEach(columnData => {
			const cellValue = columnData[i] !== undefined ? columnData[i] : '';
			tableHtml += `<td>${cellValue}</td>`;
	});
	tableHtml += '</tr>';
	
	}

	}
	tableHtml += '</tbody></table>';
	
	for (let n = 10; n < 23; n++) {
		if (checkedRadio==n) {
			tableHtml += tsuikaText[n-10];
		}
	}

	// 挿入
	tableContainer.innerHTML = tableHtml;

	// 行クリックイベントを付与
	addRowClickEvent();
}

function addRowClickEvent() {
	const tbody = document.querySelector('#enemyPartydata_table table tbody');
	if (!tbody) return;

	tbody.addEventListener('click', (e) => {
		const tr = e.target.closest('tr');
		if (!tr) return;

		// 既存の選択行を解除
		tbody.querySelectorAll('tr').forEach(row => {
			row.classList.remove('selected-row');
		});

		// クリックされた行を太字に
		tr.classList.add('selected-row');
	});

	const trList = document.querySelectorAll('#enemyPartydata_table tr');
	trList.forEach((row, index) => {
	row.addEventListener('click', () => {
		//<div>内削除
		document.getElementById("parent1").replaceChildren();
		document.getElementById("text1").replaceChildren();
		
		// trのidを取得して数値化し-1して、敵パーティリストのインデックスにする
		const enIndex = Number(row.id);
		
		//戦闘フィールド＆注意テキスト出力用関数で<div>内にテキストを出力
		document.getElementById("parent1").insertAdjacentHTML("afterbegin", battleTable(eParty[enIndex-1])[0]);
		document.getElementById("text1").insertAdjacentHTML("afterbegin", battleTable(eParty[enIndex-1])[1] + `<br><span style="color:#0000FF;">青数字</span>は味方キャラ<br>矢印は向き`);
	});
});

}

// ----------------------------------------------------
// 実行タイミングのコントロール
// ----------------------------------------------------

// 初回実行：画面（DOM）が読み込まれたら即座に実行
document.addEventListener('DOMContentLoaded', updateTable);

// 変更時実行：チェックボックスの状態が変わるたびに実行
checklist.addEventListener('change', (event) => {
	if (event.target.type === 'checkbox') {
			updateTable();
	}
});

//ラジオボタン変更
document.getElementById('scenariolist').addEventListener('change', (event) => {
	if (event.target.type === 'radio') {
		updateTable();
	}
});

//経験値計算ボタン変更
document.getElementById('epltablecalc').addEventListener('click', () => {
	updateTable();
});
