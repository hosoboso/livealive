//味方キャラデータ

//味方ID
function charaIDFunc() {
	let IDarray=[];
	for (let i = 0; i < charaData_ID.length; i++) {
		IDarray[i]=i.toString(16).padStart(2, '0').toUpperCase();
	}
	IDarray.unshift("ID");
	return(IDarray);
}

//名前
function charaNameFunc() {
	let namearray=[];
	for (let i = 0; i < charaData_ID.length; i++) {
	 namearray[i]=charaData_ID[i];
	}
	namearray.unshift("名前");
	return(namearray);
}

//初期ステータス
function firstStatusFunc() {
	let firstStatusarray=[];
	for (let i = 0; i < charaData.length; i++) {
	//HP計算
	let HP=charaData[i][0];
	if (charaData[i][0] >= 0x80) {
		HP=(charaData[i][0] & 0x7F) * 0x10;
	}
	//LV・HP・力速体知の順
	firstStatusarray[i]=`${charaData[i][25]}</td><td>${HP}</td><td>${charaData[i][1]}</td><td>${charaData[i][2]}</td><td>${charaData[i][3]}</td><td>${charaData[i][4]}`;
	}
	firstStatusarray.unshift("LV<br>(初)</th><th>HP<br>(初)</th><th>力<br>(初)</th><th>速<br>(初)</th><th>体<br>(初)</th><th>知<br>(初)");
	return(firstStatusarray);
}

//技
function wazaFunc() {
	let wazaarray=[];
	for (let i = 0; i < charaData.length; i++) {
	let temp="";
		for (let j = 0; j < 16; j++) {
			temp += wazaData_chara_ID[charaData[i][j+5]]+"</td><td>";
		}
		wazaarray[i]=temp;
		//最後の<td>カット
		wazaarray[i]=wazaarray[i].slice(0, -4);
	}
	wazaarray.unshift("技LV00</th><th>技LV01</th><th>技LV02</th><th>技LV03</th><th>技LV04</th><th>技LV05</th><th>技LV06</th><th>技LV07</th><th>技LV08</th><th>技LV09</th><th>技LV10</th><th>技LV11</th><th>技LV12</th><th>技LV13</th><th>技LV14</th><th>技LV16");
	return(wazaarray);
}

//レベルアップ時上昇値（HP力速体知）
function levelUPstatusFunc() {
	let HPup2bit=[];
	let HPdown6bit=[];
	let HPmax=[];
	let HPmin=[];
	let chikara_max=[];
	let chikara_min=[];
	let soku_max=[];
	let soku_min=[];
	let tai_max=[];
	let tai_min=[];
	let chiryoku_max=[];
	let chiryoku_min=[];

	let levelUPstatus = [];

	for (let i = 0; i < charaData.length; i++) {
		//上2ビット
		HPup2bit[i] = charaData[i][27] & 0xC0;
		//下6ビット
		HPdown6bit[i] = charaData[i][27] & 0x3F;
		if (HPup2bit[i] == 0){
			HPmin[i] = HPdown6bit[i];
			HPmax[i] = HPmin[i] + Math.max(Math.trunc(HPdown6bit[i]/2) - 1, 0);
			} else if (HPup2bit[i] == 0x40){
			HPmin[i] = HPdown6bit[i];
			HPmax[i] = HPmin[i] + Math.max(HPdown6bit[i] - 1, 0);
			} else if (HPup2bit[i] == 0x80){
			HPmin[i] = Math.trunc(HPdown6bit[i]/2);
			HPmax[i] = HPmin[i] + Math.max(HPdown6bit[i] - 1, 0);
			} else if (HPup2bit[i] == 0xC0){
			HPmin[i] = 0;
			HPmax[i] = HPmin[i] + Math.max(HPdown6bit[i] - 1, 0);
		}
		//下限値 = データ値の上4ビット = trunc(データ値 & $F0 / $10)
		//上限値 = max(下限値 + データ値の下4ビット-1, 0) = max(下限値 + データ値 & $0F -1, 0)
		chikara_min[i] = Math.trunc((charaData[i][21] & 0xF0) / 0x10);
		chikara_max[i] = Math.max((chikara_min[i] + (charaData[i][21] & 0x0F) -1), 0);
		soku_min[i] = Math.trunc((charaData[i][22] & 0xF0) / 0x10);
		soku_max[i] = Math.max((soku_min[i] + (charaData[i][22] & 0x0F) -1), 0);
		tai_min[i] = Math.trunc((charaData[i][23] & 0xF0) / 0x10);
		tai_max[i] = Math.max((tai_min[i] + (charaData[i][23] & 0x0F) -1), 0);
		chiryoku_min[i] = Math.trunc((charaData[i][24] & 0xF0) / 0x10);
		chiryoku_max[i] = Math.max((chiryoku_min[i] + (charaData[i][24] & 0x0F) -1), 0);
		
		let HPtext=`${HPmin[i]}～${HPmax[i]}`;
			if (HPmin[i]==HPmax[i]) { HPtext=HPmin[i] };
		let chikaratext=`${chikara_min[i]}～${chikara_max[i]}`;
			if (chikara_min[i]==chikara_max[i]) { chikaratext=chikara_min[i]; }
		let sokutext=`${soku_min[i]}～${soku_max[i]}`;
			if (soku_min[i]==soku_max[i]) { sokutext=soku_min[i]; }
		let taitext=`${tai_min[i]}～${tai_max[i]}`;
			if (tai_min[i]==tai_max[i]) { taitext=tai_min[i]; }
		let chiryokutext=`${chiryoku_min[i]}～${chiryoku_max[i]}`;
			if (chiryoku_min[i]==chiryoku_max[i]) { chiryokutext=chiryoku_min[i]; }
		
		levelUPstatus[i] = `${HPtext}</td><td>${chikaratext}</td><td>${sokutext}</td><td>${taitext}</td><td>${chiryokutext}`;
	}
	levelUPstatus.unshift("HP<br>(LV)</th><th>力<br>(LV)</th><th>速<br>(LV)</th><th>体<br>(LV)</th><th>知<br>(LV)");
	return(levelUPstatus);
}

//無効状態異常
function mukouJoutaiFunc() {
	let mukouarray=[];
	const joutaiIjou = ["石","酔","眠","麻","毒","腕","足","首",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	for (let i = 0; i < charaData.length; i++) {
		let temp="";
		//石化から順に1bitずつ判定
		for (let j = 0; j < joutaiIjou.length; j++) {
			if ((charaData[i][28] & bit8[j]) == bit8[j]) {
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

//向き補正
function mukiFunc() {
	//側面補正,背後補正の順
	let mukiarray=[];
	for (let i = 0; i < charaData.length; i++) {
		mukiarray[i]=(charaData[i][29] & 0x0F)+"</td><td>"+(Math.trunc((charaData[i][29] & 0xF0) / 16));
	}
	mukiarray.unshift("側面<br>補正</th><th>背後<br>補正");
	return(mukiarray);
}

//回避属性
function kaihiZokuseiFunc() {
	//回避属性はcharaData[i][30], charaData[i][31]の2バイト
	let kaihiarray=[];
	const zokusei1 = ["手","足","突","鋭","鈍","締","飛","背",];
	const zokusei2 = ["火","水","風","土","精","善","悪","無",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	for (let i = 0; i < charaData.length; i++) {
		let temp="";
		let temp2="";
		//zokusei1 1bitずつ判定
		for (let j = 0; j < zokusei1.length; j++) {
			if ((charaData[i][30] & bit8[j]) == bit8[j]) {
				temp += zokusei1[j] + ",";
			}
		}
		//zokusei2 1bitずつ判定
		for (let k = 0; k < zokusei2.length; k++) {
			if ((charaData[i][31] & bit8[k]) == bit8[k]) {
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

//初期装備
function firstsoubiFunc() {
	//charaData[i][32]～[36]がアイテムID
	//頭右左体足の順
	//アクセサリはcharaData[i][37]～[41]だが装備しているキャラなし
	let ftsoubiarray=[];
	for (let i = 0; i < charaData.length; i++) {
		ftsoubiarray[i] = "";
		for (let j = 0; j < 5; j++) {
			ftsoubiarray[i]+=itemData_ID[charaData[i][32+j]]+"<br>";
		}
		//最後の「<td>」はカットする
		ftsoubiarray[i]=ftsoubiarray[i].slice(0, -4);
	}
	ftsoubiarray.unshift('初期装備');
	return(ftsoubiarray);
}

//装備可能
//装備可能（charaData[i][26] 上4ビット：タイプ/下4ビット：種類）
//タイプ charaData[i][26] & 0xF0
//種類 charaData[i][26] & 0x0F
//タイプは便宜上の分類名　世界の合言葉は森部様参照
function soubiTypeFunc() {
	let soubiarray=[];
	//タイプ
	const soubiType=["超能","女性","特殊","重装","勇者"];
	//種類
	const soubiGroup=["銃","杖","日用品","野性武器","刀","グローブ","剣","ロボ",];
	const bit8 = [0b00000001,0b00000010,0b00000100,0b00001000,0b00010000,0b00100000,0b01000000,0b10000000];
	for (let i = 0; i < charaData.length; i++) {
		let temp = "";
		//タイプ
		if ((charaData[i][26] & 0b10010000) == 0b10010000) {
			temp += soubiType[4] + ", ";	//勇者は重装かつ超能（上4ビット%1001）の時
		}
		if ((charaData[i][26] & bit8[4]) == bit8[4]) {
			temp += soubiType[0] + ", ";
		}
		if ((charaData[i][26] & bit8[5]) == bit8[5]) {
			temp += soubiType[1] + ", ";
		}
		if ((charaData[i][26] & bit8[6]) == bit8[6]) {
			temp += soubiType[2] + ", ";
		}
		if ((charaData[i][26] & bit8[7]) == bit8[7]) {
			temp += soubiType[3] + ", ";
		}
		//種類
		for (let j = 0; j < soubiGroup.length; j++) {
			if ((charaData[i][26] & 0x0F) == (6+j)) {
				temp = soubiGroup[j] + ", " + temp;
			}
		}
		//最後の「, 」はカットする
		if (temp.endsWith(", ")){
			temp=temp.slice(0, -2);
		}
		soubiarray[i]=temp;
	}
	soubiarray.unshift("装備可能");
	return(soubiarray);
}

//最終編追加レベル
//charaData[i][44]
//最終編追加レベルarray出力
function LastScenarioLVFunc() {
	let lvLastarray=[];
	for (let i = 0; i < charaData.length; i++) {
		lvLastarray[i] = charaData[i][44];
	}
	lvLastarray.unshift("最終編<br>追加LV");
	return(lvLastarray);
}

//----------------------------//
// ここから実行時サブルーチン
//----------------------------//

//チェックボタンを押す度に実行
const functionMap = {
	c0: charaIDFunc,	//ID
	c1: charaNameFunc,	//名前
	c2: firstStatusFunc,	//初期ステータス
	c3: wazaFunc,	//技
	c4: levelUPstatusFunc,	//レベルアップ時上昇値（HP力速体知）
	c5: mukouJoutaiFunc,	//無効状態異常
	c6: mukiFunc,	//向き補正
	c7: kaihiZokuseiFunc,	//回避属性
	c8: firstsoubiFunc,	//初期装備
	c9: soubiTypeFunc,	//装備可能タイプ・種類
	c10: LastScenarioLVFunc,	//最終編追加レベルarray出力
};

const checklist = document.getElementById('checklist');
// テーブルを挿入する対象の要素を取得
const tableContainer = document.getElementById('charadata_table');

// テーブルを描画する処理を関数にまとめる
function updateTable() {
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
				tableHtml += '<tr>';
				resultMatrix.forEach(columnData => {
						const cellValue = columnData[i] !== undefined ? columnData[i] : '';
						tableHtml += `<td>${cellValue}</td>`;
				});
				tableHtml += '</tr>';
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