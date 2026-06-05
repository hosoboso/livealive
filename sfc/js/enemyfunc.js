//敵キャラデータ

//敵ID
function enemyIDFunc() {
	let IDarray=[];
	for (let i = 0; i < enemyData_ID.length; i++) {
		IDarray[i]=i.toString(16).padStart(2, '0').toUpperCase();
	}
	IDarray.unshift("ID");
	return(IDarray);
}

//シナリオID=["中世","原始","ＳＦ","功夫","西部","現代","近未来","幕末","最終","-",];
//敵シナリオ
function enemyScenarioFunc() {
	let Scenarioarray=[];
	for (let i = 0; i < enemyData_ID.length; i++) {
		Scenarioarray[i]=scenarioID[enemyData_ID[i][3]];
	}
	Scenarioarray.unshift("編");
	return(Scenarioarray);
}

//敵名
function enemyNameFunc() {
	let namearray=[];
	for (let i = 0; i < enemyData_ID.length; i++) {
		namearray[i]=enemyData_ID[i][0];
	}
	namearray.unshift("名前");
	return(namearray);
}

//敵サイズ
function enemySizeFunc() {
	let Sizearray=[];
	for (let i = 0; i < enemyData_ID.length; i++) {
		Sizearray[i]=enemyData_ID[i][1]+"×"+enemyData_ID[i][2];
	}
	Sizearray.unshift("サイズ<br>(横×縦)");
	return(Sizearray);
}

//敵ステータス
function enemyStatusFunc() {
	let enemyStatusarray=[];
	for (let i = 0; i < enemyData_ID.length; i++) {
	//敵HP計算
	let HP=enemyData[i][04];
	if (enemyData[i][04] >= 0x80) {
		HP=(enemyData[i][04] & 0x7F) * 0x10;
	}
	//敵LV・HP・力速体知の順
	//09	上1ビット：使用技を敵技IDから取得するなら0、味方技IDから取得するなら1/下7ビット：レベル
	enemyStatusarray[i]=`${enemyData[i][09] & 0x7F}</td><td>${HP}</td><td>${enemyData[i][05]}</td><td>${enemyData[i][06]}</td><td>${enemyData[i][07]}</td><td>${enemyData[i][08]}`;
	}
	enemyStatusarray.unshift("LV</th><th>HP</th><th>力</th><th>速</th><th>体</th><th>知");
	return(enemyStatusarray);
}

//11	使用技1 技ID　敵データ09上1ビットが0なら敵技ID/1なら味方技ID、以下敵データ14まで同じ
//12	使用技2 技ID
//13	使用技3 技ID
//14	使用技4 技ID
//敵技
function enemywazaFunc() {
	let enemywazaarray=[];
	for (let i = 0; i < enemyData.length; i++) {
	let temp="";
	//09	上1ビット：使用技を敵技IDから取得するなら0、味方技IDから取得するなら1/下7ビット：レベル
	let enemyType=enemyData[i][09] & 0b10000000;
		for (let j = 0; j < 4; j++) {
			if (enemyType==0b10000000) {
				temp += wazaData_chara_ID[enemyData[i][11+j]]+"</td><td>";
			} else {
				temp += wazaData_enemy_ID[enemyData[i][11+j]]+"</td><td>";
			}
		}
		enemywazaarray[i]=temp;
		//最後の<td>カット
		enemywazaarray[i]=enemywazaarray[i].slice(0, -4);
	}
	enemywazaarray.unshift("技1</th><th>技2</th><th>技3</th><th>技4");
	return(enemywazaarray);
}

//敵無効状態異常
function enemymukouJoutaiFunc() {
	let enemymukouarray=[];
	const joutaiIjou = ["石","酔","眠","麻","毒","腕","足","首",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	for (let i = 0; i < enemyData.length; i++) {
		let temp="";
		//石化から順に1bitずつ判定
		for (let j = 0; j < joutaiIjou.length; j++) {
			if ((enemyData[i][10] & bit8[j]) == bit8[j]) {
				temp += joutaiIjou[j] + ",";
			}
		}
		//最後の「, 」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		enemymukouarray[i]=temp;
	}
	enemymukouarray.unshift("無効状態異常");
	return(enemymukouarray);
}

//敵向き補正
function enemymukiFunc() {
	//側面補正,背後補正の順
	let enemymukiarray=[];
	for (let i = 0; i < enemyData.length; i++) {
		enemymukiarray[i]=(enemyData[i][29] & 0x0F)+"</td><td>"+(Math.trunc((enemyData[i][29] & 0xF0) / 16));
	}
	enemymukiarray.unshift("側面<br>補正</th><th>背後<br>補正");
	return(enemymukiarray);
}

//敵回避属性
function enemykaihiZokuseiFunc() {
	//30	回避属性1（8ビット）
	//31	回避属性2（上7ビット）/下1ビットはダメージフィールド無効だと%1
	let kaihiarray=[];
	const zokusei1 = ["手","足","突","鋭","鈍","締","飛","背",];
	const zokusei2 = ["火","水","風","土","精","善","悪","無",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	for (let i = 0; i < enemyData.length; i++) {
		let temp="";
		let temp2="";
		//zokusei1 1bitずつ判定
		for (let j = 0; j < zokusei1.length; j++) {
			if ((enemyData[i][30] & bit8[j]) == bit8[j]) {
				temp += zokusei1[j] + ",";
			}
		}
		//zokusei2 1bitずつ判定 無属性判定はなし（zokusei2.length-1まで）
		for (let k = 0; k < zokusei2.length-1; k++) {
			if ((enemyData[i][31] & bit8[k]) == bit8[k]) {
				temp2 += zokusei2[k] + ",";
			}
		}
		temp=temp+temp2;
		//最後の「,」はカットする
		if (temp.endsWith(",")){
			temp=temp.slice(0, -1);
		}
		//文字数長かったら<br>入れて改行
		if (temp.length>15){
			temp = temp.slice(0,16) + "<br>" + temp.slice(16);
		}
		kaihiarray[i]=temp;
	}
	kaihiarray.unshift("回避属性");
	return(kaihiarray);
}

//敵フィールド吸収/無効
function enemyFieldFunc() {
	//01	上4ビット：フィールド吸収/下4ビット：移動頻度
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	let enemyFieldarray=[];
	for (let i = 0; i < enemyData.length; i++) {
		temp="";
		if ((enemyData[i][31] & bit8[3])==bit8[3]) {
			temp+="電,";
		}
		if ((enemyData[i][31] & bit8[2])==bit8[2]) {
			temp+="火,";
		}
		if ((enemyData[i][31] & bit8[1])==bit8[1]) {
			temp+="毒,";
		}
		if ((enemyData[i][31] & bit8[0])==bit8[0]) {
			temp+="水";
		}
		//31	回避属性2（上7ビット）/下1ビットはダメージフィールド無効だと%1
		const noField = enemyData[i][31] & 0b00000001;
		if (noField==1) {
			temp="無効";
		}
		//最後の「,」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		enemyFieldarray[i]=temp;
	}
	enemyFieldarray.unshift("地形吸収/無効");
	return(enemyFieldarray);
}

//敵タイプ・種族
//タイプ・種族は便宜上の分類名　世界の合言葉は森部様参照
function enemyTypeFunc() {
	let enemyTypearray=[];
	const bit8 = [0b00000001,0b00000010,0b00000100,0b00001000,0b00010000,0b00100000,0b01000000,0b10000000];
	//敵データ15
	const eType = ["COLLAPSE,","BREAKDOWN,","OBJECT,","LEADER,","NAME,"];
	//敵データ23
	const syuzoku = ["","超人","妖怪","悪魔","猛禽","虫","機械","植物","小型動物","","大型動物","宇宙人","軟体動物","物質","魔法生命","恐竜",];
	for (let i = 0; i < enemyData.length; i++) {
		let temp="";
		//敵データ15
		if ((enemyData[i][15] & 0xF0) != 0) {
			temp+=eType[4];
		}
		for (let j = 0; j < 4; j++) {
			if ((enemyData[i][15] & bit8[j])==bit8[j]) {
				temp+=eType[j];
			}
		}
		//敵データ23 下位4ビット 種族
		for (let k = 0; k < syuzoku.length; k++) {
			if ((enemyData[i][23] & 0x0F)==k) {
				temp+=syuzoku[k];
			}
		}
		//最後の「,」はカットする
		temp.endsWith(",")&&(temp=temp.slice(0,-1));
		enemyTypearray[i]=temp;
	}
	enemyTypearray.unshift("タイプ・種族");
	return(enemyTypearray);
}

//16	カウンター行動異常　手/足（行動異常IDがそれぞれ上4ビット・下4ビットに入る。以下No.23まで同じ）
//17	カウンター行動異常　突/鋭
//18	カウンター行動異常　鈍/締
//19	カウンター行動異常　飛/背
//20	カウンター行動異常　火/水
//21	カウンター行動異常　風/土
//22	カウンター行動異常　精/善
//23	カウンター行動異常　悪/無　※下1桁（4ビット）はそのまま種族の値。

//敵カウンター行動異常
function enemyKoudouFunc() {
	let enemyKoudouarray=[];
	for (let i = 0; i < enemyData.length; i++) {
		let temp="";
		for (let j = 0; j < 7; j++) {
			let ue4bit=(Math.trunc((enemyData[i][j+16] & 0xF0) /16)).toString(16).toUpperCase();0==ue4bit&&(ue4bit="");
			let sita4bit=(enemyData[i][j+16] & 0x0F).toString(16).toUpperCase();0==sita4bit&&(sita4bit="");
			temp += ue4bit + "</td><td>" + sita4bit + "</td><td>";
		}
		let ue4bit23=(Math.trunc((enemyData[i][23] & 0xF0) /16)).toString(16).toUpperCase();0==ue4bit23&&(ue4bit23="");
		temp+=ue4bit23;
		enemyKoudouarray[i]=temp;
	}
	enemyKoudouarray.unshift("手</th><th>足</th><th>突</th><th>鋭</th><th>鈍</th><th>締</th><th>飛</th><th>背</th><th>火</th><th>水</th><th>風</th><th>土</th><th>精</th><th>善</th><th>悪");
	return(enemyKoudouarray);
}

//24	ドロップアイテム1（アイテムID）
//25	ドロップアイテム2（アイテムID）
//26	ドロップアイテム3（アイテムID）

//敵ドロップアイテム
function enemyItemFunc() {
	let enemyItemarray=[];
	for (let i = 0; i < enemyData.length; i++) {
		enemyItemarray[i] = itemData_ID[enemyData[i][24]] + "</td><td>" + itemData_ID[enemyData[i][25]] + "</td><td>" + itemData_ID[enemyData[i][26]];
	}
	enemyItemarray.unshift("アイテム1</th><th>アイテム2</th><th>アイテム3");
	return(enemyItemarray);
}

//00	移動パターン
//01	上4ビット：フィールド吸収/下4ビット：移動頻度
//敵移動
function enemyIdouFunc() {
	let enemyIdouarray=[];
	for (let i = 0; i < enemyData.length; i++) {
		enemyIdouarray[i] = enemyData[i][0].toString(16).padStart(2, '0').toUpperCase() + "</td><td>" + (enemyData[i][1] & 0x0F).toString(16).toUpperCase();
	}
	enemyIdouarray.unshift("移動パターン</th><th>移動頻度");
	return(enemyIdouarray);
}

//----------------------------//
//ここから実行時サブルーチン
//----------------------------//

//チェックボタンを押す度に実行
const functionMap = {
	c0: enemyIDFunc,	//ID
	c1: enemyScenarioFunc,	//シナリオ
	c2: enemyNameFunc,	//敵名前
	c3: enemySizeFunc,	//敵サイズ
	c4: enemyStatusFunc,	//敵ステータス
	c5: enemywazaFunc,	//敵技
	c6: enemymukouJoutaiFunc,	//敵無効状態異常
	c7: enemymukiFunc,	//敵向き補正
	c8: enemykaihiZokuseiFunc,	//敵回避属性a
	c9: enemyFieldFunc,	//敵フィールド吸収/無効array
	c10: enemyTypeFunc,	//敵タイプ・種族
	c11: enemyKoudouFunc,	//敵カウンター行動異常
	c12: enemyItemFunc,	//敵ドロップアイテム
	c13: enemyIdouFunc,	//敵移動
};

const checklist = document.getElementById('checklist');
// テーブルを挿入する対象の要素を取得
const tableContainer = document.getElementById('charadata_table');

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
		//シナリオIDチェック checkedRadioが0（すべて） または、checkedRadioが1～9ならcheckedRadioと敵データのシナリオIDが一致した時
		let scenarioIDChecker = (checkedRadio==0)||((checkedRadio>0)&&(enemyData_ID[i-1][3]==checkedRadio-1));

		//ラジオボタンでテーブル列を作るか1行ずつ判定
		if (scenarioIDChecker) {
		
				tableHtml += '<tr>';
				resultMatrix.forEach(columnData => {
						const cellValue = columnData[i] !== undefined ? columnData[i] : '';
						tableHtml += `<td>${cellValue}</td>`;
				});
				tableHtml += '</tr>';

		}
				
		}
		tableHtml += '</tbody></table>';
		
		// 挿入
		tableContainer.innerHTML = tableHtml;
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

document.getElementById('scenariolist').addEventListener('change', (event) => {
		if (event.target.type === 'radio') {
				updateTable();
		}
});