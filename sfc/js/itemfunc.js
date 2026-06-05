//アイテムデータ


//アイテムID
function itemIDFunc() {
	let IDarray=[];
	for (let i = 0; i < itemData_ID.length; i++) {
		IDarray[i]=i.toString(16).padStart(2, '0').toUpperCase();
	}
	IDarray.unshift("ID");
	return(IDarray);
}

//アイテム名
function itemNameFunc() {
	let namearray=[];
	for (let i = 0; i < itemData_ID.length; i++) {
	 namearray[i]=itemData_ID[i];
	}
	namearray.unshift("名前");
	return(namearray);
}

//アイテム種類　装備・回復・攻撃・重要・材料/主装備位置
function itemTypeFunc() {
	let Typearray=[];
	const bit8 = [0b00000001,0b00000010,0b00000100,0b00001000,0b00010000,0b00100000,0b01000000,0b10000000];
	//アイテムデータ00 上4ビット：$1～$7なら主装備位置、$8以上なら罠アイテム
	const ue4bit=["","頭","右","左","体","足","アクセ","自由","罠"];
	//アイテムデータ00 下4ビット：装備品なら装備種類、装備品以外ならアイテム種別
	const sita4bit=["","","回復(無限)","回復(1回)","攻撃(無限)","攻撃(1回)","銃","杖","日用品","野性武器","刀","グローブ","剣","ロボ","重要","盾",];
	//アイテムデータ01 上6ビット：装備部位/下1ビット：材料アイテム
	for (let i = 0; i < itemData.length; i++) {
		let temp="";
		let syusoubi="";
		if ((itemData[i][1] & 0b11111100) != 0) { 
			temp+="装備(";
				for (let j = 0; j < 6; j++) {
					if ((itemData[i][1] & bit8[7-j]) == bit8[7-j]) {
						temp+=ue4bit[j+1]+",";
					}
				}
			temp.endsWith(",")&&(temp=temp.slice(0,-1));
			temp+="),";
		}
		if ((itemData[i][1] & 0b00000001) == 1) {
			temp+="材料,";
		}
		if ((itemData[i][0] & 0b10000000) != 0) {
			temp+="罠,";
		}
		if ((itemData[i][0] & 0x0F)<6) {	//下4ビット0～5
			temp+=sita4bit[itemData[i][0] & 0x0F]+",";
		}
		if ((itemData[i][0] & 0x0F)==14) {	//重要
			temp+=sita4bit[14]+",";
		}
		temp.endsWith(",")&&(temp=temp.slice(0,-1));
		temp.endsWith(",")&&(temp=temp.slice(0,-1));
		//主装備位置
		for (let j = 1; j < 8; j++) {
			if (Math.trunc((itemData[i][0] & 0xF0)/16) == j) {
				syusoubi=ue4bit[j];
			}
		}
		Typearray[i]=temp + "</td><td>" +syusoubi;
	}
	Typearray.unshift("種類</th><th>主装備位置");
	return(Typearray);
}

//00	上4ビット：1～7は主装備位置、8以上なら罠アイテム/下4ビット：装備品なら装備種類、装備品以外ならアイテム種別
//06	力　主能力変動値（符号付き8ビット整数値、一番上のビットが正負、下7ビットが数値になる。以下09まで同じ）
//07	速　主能力変動値
//08	体　主能力変動値
//09	知　主能力変動値
//11	副能力変動値計算用の値
//14	下6ビット：攻撃または防御の値

//符号付き8ビット整数値用（上1ビットが1なら負の値　下7ビットが絶対値）
//JavaScriptで符号付き8ビット整数値を扱うのはちょっとややこしいみたい……
function convertToSigned8Bit(val) {
	if (val & 0x80) {
		val = val - 0x100;
	}
	return val;
}

//副能力変動用(負の時は切り捨てではなくMath.floorで計算）
function FukunouryokuFunc(x){
	let n = Math.trunc(x/2);
	if (x < 0) { 
		n = Math.floor(x/2);
	}
	return n;
}

//アイテム装備変動値
function itemStatusFunc() {
	let Statusarray=[];
	//アイテムデータ00 上4ビット：$1～$7なら主装備位置、$8以上なら罠アイテム
	for (let i = 0; i < itemData.length; i++) {
		let temp="";
		//14	下6ビット：攻撃または防御の値
		let n = itemData[i][14] & 0b00111111;
			if ( (n==0)&&((itemData[i][1] & 0b11111000) == 0)||((itemData[i][1] & 0b11111100) == 0b00000100) ) {n=""}
		temp+=n;	//攻撃または防御の値 武器防具なら攻撃または防御の値0でもそのまま処理 装備位置がアクセサリだけなら非表示で（数値は設定されているが効果ない）
		temp+="</td><td>";
		//主能力変動
		//06	力　主能力変動値（符号付き8ビット整数値、一番上のビットが正負、下7ビットが数値になる。以下09まで同じ）
		//07	速　主能力変動値
		//08	体　主能力変動値
		//09	知　主能力変動値
		//符号付き8ビット整数値用関数convertToSigned8Bitで変換
		let stPow = convertToSigned8Bit(itemData[i][06]);	//力　主能力変動値
		let stSpd = convertToSigned8Bit(itemData[i][07]);	//速　主能力変動値
		let stTai = convertToSigned8Bit(itemData[i][08]);	//体　主能力変動値
		let stChi = convertToSigned8Bit(itemData[i][09]);	//知　主能力変動値
		//副能力変動
		let fPow = FukunouryokuFunc(stPow);
		let fSpd = FukunouryokuFunc(stSpd);
		let fTai = FukunouryokuFunc(stTai);
		let fChi = FukunouryokuFunc(stChi);
		//11	副能力変動値計算用の値
		if (itemData[i][11]==0) {
			;
		} else if ((itemData[i][11] & 0b11000000)==0b00000000) {	//力
			fPow = convertToSigned8Bit((fPow + (((itemData[i][11] & 0b00111111) ^ 0xFF) + 1)) & 0xFF);	//排他的論理和XORは「^」
		} else if ((itemData[i][11] & 0b11000000)==0b01000000) {	//速
			fSpd = convertToSigned8Bit((fSpd + (((itemData[i][11] & 0b00111111) ^ 0xFF) + 1)) & 0xFF);
		} else if ((itemData[i][11] & 0b11000000)==0b10000000) {	//体
			fTai = convertToSigned8Bit((fTai + (((itemData[i][11] & 0b00111111) ^ 0xFF) + 1)) & 0xFF);
		} else if ((itemData[i][11] & 0b11000000)==0b11000000) {	//知
			fChi = convertToSigned8Bit((fChi + (((itemData[i][11] & 0b00111111) ^ 0xFF) + 1)) & 0xFF);
		}
		//副能力変動値　主装備位置自由なら変動なしなので値入れない
		if ( Math.trunc((itemData[i][0] & 0xF0)/16)==7 ) {
			fPow = "";
			fSpd = "";
			fTai = "";
			fChi = "";
		}
		//変動値をまとめる
		let array =[stPow,stSpd,stTai,stChi,fPow,fSpd,fTai,fChi,];
		for (let j = 0; j < array.length; j++) {
			if (array[j] == 0) {
				array[j] = "";
			}
			temp += array[j] + "</td><td>";
		}
		//最後の「<td>」はカットする
		temp.endsWith("<td>")&&(temp=temp.slice(0,-4));
		Statusarray[i]=temp;
	}
	Statusarray.unshift("攻撃/防御</th><th>力<br>(主)</th><th>速<br>(主)</th><th>体<br>(主)</th><th>知<br>(主)</th><th>力<br>(副)</th><th>速<br>(副)</th><th>体<br>(副)</th><th>知<br>(副)");
	return(Statusarray);
}

//アイテム装備種類/タイプ
function itemSoubiTypeFunc() {
	let SoubiTypearray=[];
	//アイテムデータ00 下4ビット：装備品なら装備種類、装備品以外ならアイテム種別
	const sita4bit_00=[[0x6,0x7,0x8,0x9,0xA,0xB,0xC,0xD,0xF,],["銃","杖","日用品","野性武器","刀","グローブ","剣","ロボ","盾",]];
	//アイテムデータ03 上4ビットは装備タイプ
	const ue4bit_03=[[0x10,0x40,0x60,0x80,0x90,0xC0,],["超能","特殊","女性","重装","勇者","野性",]];
	for (let i = 0; i < itemData.length; i++) {
		let temp="";
		for (let j = 0; j < 9; j++) {
			if ((itemData[i][0] & 0x0F) == sita4bit_00[0][j]) {
				temp+=sita4bit_00[1][j];
			}
		}
		temp+="</td><td>";
		for (let k = 0; k < 6; k++) {
			if ((itemData[i][3] & 0xF0) == ue4bit_03[0][k]) {
				temp+=ue4bit_03[1][k];
			}
		}
		SoubiTypearray[i]=temp;
	}
	SoubiTypearray.unshift("装備種類</th><th>装備タイプ");
	return(SoubiTypearray);
}

//アイテム無効状態異常
//02	無効状態異常（8ビット）
function mukouItemFunc() {
	let mukouarray=[];
	const joutaiIjou = ["石","酔","眠","麻","毒","腕","足","首",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	for (let i = 0; i < itemData.length; i++) {
		let temp="";
		//石化から順に1bitずつ判定
		for (let j = 0; j < joutaiIjou.length; j++) {
			if ((itemData[i][2] & bit8[j]) == bit8[j]) {
				temp += joutaiIjou[j] + ",";
			}
		}
		//最後の「, 」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		mukouarray[i]=temp;
	}
	mukouarray.unshift("無効状態異常");
	return(mukouarray);
}

//アイテム フィールド吸収
//03	上4ビット：装備タイプ/下4ビット：フィールド吸収
function itemfieldFunc() {
	let fieldarray=[];
	const field = ["電","火","毒","水"];
	const bit8 = [0b00000001,0b00000010,0b00000100,0b00001000,];
	for (let i = 0; i < itemData.length; i++) {
		let temp="";
		//1bitずつ判定
		for (let j = 0; j < field.length; j++) {
			if ((itemData[i][3] & bit8[j]) == bit8[j]) {
				temp += field[j] + ",";
			}
		}
		//最後の「, 」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		fieldarray[i]=temp;
	}
	fieldarray.unshift("フィールド<br>吸収");
	return(fieldarray);
}

//回避属性
//04	回避属性1（8ビット）
//05	回避属性2（8ビット）
function kaihiZokuseiItemFunc() {
	//回避属性はitemData[i][4], itemData[i][5]の2バイト
	let kaihiarray=[];
	const zokusei1 = ["手","足","突","鋭","鈍","締","飛","背",];
	const zokusei2 = ["火","水","風","土","精","善","悪","無",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	for (let i = 0; i < itemData.length; i++) {
		let temp="";
		let temp2="";
		//zokusei1 1bitずつ判定
		for (let j = 0; j < zokusei1.length; j++) {
			if ((itemData[i][4] & bit8[j]) == bit8[j]) {
				temp += zokusei1[j] + ",";
			}
		}
		//zokusei2 1bitずつ判定
		for (let k = 0; k < zokusei2.length; k++) {
			if ((itemData[i][5] & bit8[k]) == bit8[k]) {
				temp2 += zokusei2[k] + ",";
			}
		}
		temp=temp+temp2;
		//最後の「, 」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		kaihiarray[i]=temp;
	}
	kaihiarray.unshift("回避属性");
	return(kaihiarray);
}

//アイテム使用技
//10	味方技ID
function wazaItemFunc() {
	let wazaarray=[];
	for (let i = 0; i < itemData.length; i++) {
		wazaarray[i]=wazaData_chara_ID[itemData[i][10]];
	}
	wazaarray.unshift("アイテム使用技");
	return(wazaarray);
}

//メカ技
//12	メカがアクセサリ装備で技追加（$08～$0F）
function mechawazaItemFunc() {
	let mechawazaarray=[];
	const mechawaza = ["ラッカーふんむ弾","ゲキレツ弾","天使のリサーチ","キンギョ弾","ヒヨコ弾","ボヨヨンパンチ","１００Ｖレーザー","プラズマスパーク","５万Ｖのショック","ポイズンジェット",];
	for (let i = 0; i < itemData.length; i++) {
		if (itemData[i][12]==0){
			mechawazaarray[i]="";
		} else {
			mechawazaarray[i]=mechawaza[itemData[i][12]-8];
		}
	}
	mechawazaarray.unshift("メカ装備技");
	return(mechawazaarray);
}

//戦闘開始時行動異常
//13	上4ビット：戦闘開始時行動異常を起こす敵種族（※かつ左装備のみ）/下4ビット：戦闘開始時行動異常
function openingItemFunc() {
	let openingarray=[];
	const Enemy = ["","超人","妖怪","悪魔","猛禽","虫","機械","植物","小型動物","","大型動物","宇宙人","軟体動物","物質","魔法生命","恐竜",];
	for (let i = 0; i < itemData.length; i++) {
	let temp=Math.trunc((itemData[i][13] & 0xF0)/16);	//アイテム13 上4ビット
		if (((itemData[i][1] & 0b00100000) == 0b00100000) && (itemData[i][13]!=0) && (temp!=0) && (temp!=9)) {	//左装備ONかつアイテム13が0以外
			openingarray[i]=Enemy[temp]+","+Math.trunc((itemData[i][13] & 0xF0)/16).toString(16).toUpperCase();
		} else {
			openingarray[i]="";
		}
	}
	openingarray.unshift("戦闘開始時<br>行動異常");
	return(openingarray);
}

//状態異常追加効果
//15	状態異常追加効果（8ビット）
function JoutaiTsuikaItemFunc() {
	let Joutaiarray=[];
	const joutaiIjou = ["石","酔","眠","麻","毒","腕","足","首",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	for (let i = 0; i < itemData.length; i++) {
		let temp="";
		//石化から順に1bitずつ判定
		for (let j = 0; j < joutaiIjou.length; j++) {
			if ((itemData[i][15] & bit8[j]) == bit8[j]) {
				temp += joutaiIjou[j] + ",";
			}
		}
		//最後の「, 」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		Joutaiarray[i]=temp;
	}
	Joutaiarray.unshift("状態異常<br>追加効果");
	return(Joutaiarray);
}

//----------------------------//
//ここから実行時サブルーチン
//----------------------------//

//チェックボタンを押す度に実行
const functionMap = {
	c0: itemIDFunc,	//ID
	c1: itemNameFunc,	//アイテム名前
	c2: itemTypeFunc,	//アイテム種類
	c3: itemStatusFunc,	//アイテム装備変動値
	c4: itemSoubiTypeFunc,	//アイテム装備種類/タイプ
	c5: mukouItemFunc,	//アイテム無効状態異常
	c6: itemfieldFunc,	//アイテムフィールド吸収
	c7: kaihiZokuseiItemFunc,	//回避属性
	c8: wazaItemFunc,	//アイテム使用技
	c9: mechawazaItemFunc,	//メカ技
	c10: openingItemFunc,	//戦闘開始時行動異常
	c11: JoutaiTsuikaItemFunc,	//状態異常追加効果
};

const checklist = document.getElementById('checklist');
// テーブルを挿入する対象の要素を取得
const tableContainer = document.getElementById('charadata_table');

// テーブルを描画する処理を関数にまとめる
function updateTable() {
		// ラジオボタンの状態を取得
		const radios = document.querySelectorAll('input[name="ilist"]');
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
		//ラジオボタンチェック checkedRadioが0（すべて） または、checkedRadioが1～8ならアイテム種類で分ける
		let scenarioIDChecker = 
		(checkedRadio==0)||
		((checkedRadio==1) && ((itemData[i-1][1] & 0b10000000) == 0b10000000))||	//頭
		((checkedRadio==2) && ((itemData[i-1][1] & 0b01000000) == 0b01000000))||	//右
		((checkedRadio==3) && ((itemData[i-1][1] & 0b00100000) == 0b00100000))||	//左
		((checkedRadio==4) && ((itemData[i-1][1] & 0b00010000) == 0b00010000))||	//体
		((checkedRadio==5) && ((itemData[i-1][1] & 0b00001000) == 0b00001000))||	//足
		((checkedRadio==6) && ((itemData[i-1][1] & 0b00000100) == 0b00000100))||	//アクセサリー
		((checkedRadio==7) && ((itemData[i-1][1] & 0b11111100) != 0))||	//装備
		((checkedRadio==8) && (((itemData[i-1][0] & 0x0F) == 2)||((itemData[i-1][0] & 0x0F) == 3)))||	//回復
		((checkedRadio==9) && (((itemData[i-1][0] & 0x0F) == 4)||((itemData[i-1][0] & 0x0F) == 5)));	//攻撃

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

// 変更時実行：ラジオボタンの状態が変わるたびに実行
document.getElementById('itemlist').addEventListener('change', (event) => {
		if (event.target.type === 'radio') {
				updateTable();
		}
});