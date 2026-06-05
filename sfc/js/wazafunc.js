//技データ
//方向表示の都合で3行表示前提で

//技ID
function wazaIDFunc() {
	let IDarray=[];
	for (let i = 0; i < wazaData_chara_ID.length; i++) {
		IDarray[i]= i.toString(16).padStart(2, '0').toUpperCase() + `<br>(味)`;
	}
	for (let i = 0; i < wazaData_enemy_ID.length; i++) {
		IDarray[i+256]=i.toString(16).padStart(2, '0').toUpperCase() + `<br>(敵)`;
	}
	IDarray.unshift("ID");
	return(IDarray);
}

//技名
function wazaNameFunc() {
	let namearray=[];
	for (let i = 0; i < wazaData_chara_ID.length; i++) {
	 namearray[i]=wazaData_chara_ID[i];
	}
	for (let i = 0; i < wazaData_enemy_ID.length; i++) {
	 namearray[i+256]=wazaData_enemy_ID[i];
	}
	namearray.unshift("名前");
	return(namearray);
}

//06	技の方向
//wazaData_chara[i][06]
//wazaData_enemy[i][06]
//技の方向array出力 HTMLで8マス方向
function wazaWayFunc() {
	//技データ06の8bitがそれぞれ向き（キャラ右下向き時） 上の桁から順に、→↗↑↖←↙↓↘となる。
	//ONなら矢印、OFFなら□とし、中央にキャラ位置■を置く
	//↖↑↗<br>←■→<br>↙↓↘
	//技データ06が00だと方向は周囲
	const bit8waza = [0b00010000,0b00100000,0b01000000,0b00001000,0b10000000,0b00000100,0b00000010,0b00000001];
	const yajirushi = ["&#x2196;","&#x2191;","&#x2197;","&#x2190;","&#x2192;","&#x2199;","&#x2193;","&#x2198;",];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let Wayarray=[];
	for (let i = 0; i < combinedArray.length; i++) {
		let temp="";
		if (combinedArray[i][06] == 0) {	//周囲処理
			temp = '<span class="bgy">□□□</span><br><span class="bgy">□</span>■<span class="bgy">□</span><br><span class="bgy">□□□</span>';
		} else {	//周囲以外
			for (let j = 0; j < bit8waza.length; j++) {
				if ((combinedArray[i][06] & bit8waza[j])==bit8waza[j]) {
					temp += yajirushi[j];
				} else {
					temp += "□";
				}
				if ((j == 2)||(j == 4)) {	//<br>区切り入れる
					temp += "<br>";
				}
				if (j == 3) {	//<br>■入れる
					temp += "■";
				}
			}
		}
		//tempを<div class="dataarrow">～</div>で挟んで完成
		Wayarray[i] = '<div class="dataarrow">' + temp + "</div>";
	}
	Wayarray.unshift("方向");
	return(Wayarray);
}

//命中タイプ/狙撃・直進・貫通・貫通＋
//技データ11 上2ビットは命中タイプ %00	狙撃 %01	直進 %10	貫通 %11	貫通→
function wazaHitTypeFunc() {
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let Typearray=[];
	for (let i = 0; i < combinedArray.length; i++) {
		if ((combinedArray[i][11] & 0b11000000) == 0b00000000 ) {	//%00	攻撃(狙撃)
			Typearray[i] = "狙撃";
		} else if ((combinedArray[i][11] & 0b11000000) == 0b01000000 ) {	//%01	攻撃(直進)
			Typearray[i] = "直進";
		} else if ((combinedArray[i][11] & 0b11000000) == 0b10000000 ) {	//%01	攻撃(直進)
			Typearray[i] = "貫通";
		} else if ((combinedArray[i][11] & 0b11000000) == 0b11000000 ) {	//%01	攻撃(直進)
			Typearray[i] = "貫通→";
		}
	}
	Typearray.unshift("命中<br>タイプ");
	return(Typearray);
}

//タイプ
//技データ13 上4ビットは、技のタイプ関係の値の合計値 %0000	通常 %0010	範囲が周囲 %0100	反撃専用 %1000	回復
//技データ21 上4ビット
//  技データ13の上4ビットが$8未満： %0011	吸収 %0111	外すとダメージ %1000	自爆999ダメージ
//  技データ13の上4ビットが$8以上：%0011	HP振り分け %1000	自滅
function wazaTypeFunc() {
	const bit8 = [0b00000001,0b00000010,0b00000100,0b00001000,0b00010000,0b00100000,0b01000000,0b10000000];
	const d13 = ["通常","範囲が周囲","反撃専用","回復"];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let Typearray=[];
	for (let i = 0; i < combinedArray.length; i++) {
		let temp="";
		//技データ13
		for (let j = 0; j < d13.length; j++) {
			if ((combinedArray[i][13] & bit8[j+4]) == bit8[j+4]) {
				temp += d13[j] + ",";
			}
		}
		//技データ21処理　
		if ((combinedArray[i][13] & 0b10000000) == 0b10000000) {
		//技データ13の上4ビットが$8以上
			if ((combinedArray[i][21] & 0xF0) == 0b00110000) {
				temp += "HP振り分け,";
			}
			if ((combinedArray[i][21] & 0xF0) == 0b10000000) {
				temp += "自滅,";
			}
		} else {
		//技データ13の上4ビットが$8未満
			if ((combinedArray[i][21] & 0xF0) == 0b00110000) {
				temp += "吸収,";
			}
			if ((combinedArray[i][21] & 0xF0) == 0b01110000) {
				temp += "外すとダメージ,";
			}
			if ((combinedArray[i][21] & 0xF0) == 0b10000000) {
				temp += "自爆999ダメージ,";
			}
		}
		//最後の「,」はカットする
		temp.endsWith(",")&&(temp=temp.slice(0,-1));
		Typearray[i]=temp;
	}
	Typearray.unshift("タイプ");
	return(Typearray);
}

//射程　技データ07　下4ビット：射程
function wazaDistantFunc() {
	const shatei = ["なし","1","2","1～2","3","-","2～3","1～3","4～","-","-","-","3～","-","2～","無限",];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let Distarray=[];
	for (let i = 0; i < combinedArray.length; i++) {
		Distarray[i] = shatei[combinedArray[i][7] & 0x0F]
	}
	Distarray.unshift("射程");
	return(Distarray);
}

//範囲
//技データ12 下2ビット：技データ21の下3ビットが%000の時のみ、効果範囲
function wazaRangeFunc() {
	d21=["縦±0×横全体","縦±1×横全体","縦±2×横全体","縦全体×横±0","縦全体×横±1","縦全体×横±2",];
	d12=["1×1","3×3","5×5","全体",];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let Rangearray=[];
	for (let i = 0; i < combinedArray.length; i++) {
		if ((combinedArray[i][21] & 0b00000111) != 0) {	//技データ21の下3ビットが%000以外
			for (let j = 0; j < d21.length; j++) {
				if ((combinedArray[i][21] & 0b00000111) == j+1) {	
					Rangearray[i] = d21[j];
				}
			}
		} else { 	//技データ21の下3ビットが%000以外
			for (let k = 0; k < d12.length; k++) {
				if ((combinedArray[i][12] & 0b00000011) == k) {	
					Rangearray[i] = d12[k];
				}
			}
		}
	}
	Rangearray.unshift("範囲");
	return(Rangearray);
}

//属性
//技データ13 下4ビットは技の属性の値
function wazaPropertyFunc() {
	const zokusei = ["手","足","突","鋭","鈍","締","飛","背","火","水","風","土","精","善","悪","無",];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		for (let j = 0; j < zokusei.length; j++) {
			if ((combinedArray[i][13] & 0x0F) == j) {	
				array[i] = zokusei[j];
			}
		}
	}
	array.unshift("属性");
	return(array);
}

//ヒット数
//技データ19　最大連発数と、ヒット数パターン
function wazaHitFunc() {
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		let temp="";
		if ((combinedArray[i][19] & 0b10000000) == 0b10000000) {
			//上1ビットで範囲内に1ヒット確定
			array[i] = "1(範囲内)";
		} else {
			const pat =["","(レベルにより減)","(範囲内に1ヒット)","(ランダムに減)",];
			for (let j = 0; j < pat.length; j++) {
				if (Math.trunc((combinedArray[i][19] & 0b00110000)/16) == j) {
					//下4ビットはヒット数＋(レベルにより減)または(ランダムに減)なら追加
					array[i] = (combinedArray[i][19] & 0x0F) + pat[j];
				}
				//範囲内に1ヒット判定されたら下4ビットのヒット数は無効
				if (Math.trunc((combinedArray[i][19] & 0b00110000)/16) == 2) {	
					array[i] = "1(範囲内)";
				}
			}
		}
	}
	array.unshift("ヒット数");
	return(array);
}

//タメ時間（チャージタイム）
//17	上4ビット：発動時間（16で1ターン）/下4ビット：技LV
function wazaTimeFunc() {
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		array[i] = (combinedArray[i][17] & 0xF0);
	}
	array.unshift("発動時間");
	return(array);
}

//位置変化
//技データ11 下6ビットは位置変化の値
function wazaPositionFunc() {
	const bit8 = [0b00000001,0b00000010,0b00000100,0b00001000,0b00010000,0b00100000,0b01000000,0b10000000];
	const ichi = ["後方吹き飛ばし","90度右回転","180度回転","使用者後退","使用者90度右回転","使用者180度回転",]
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		let temp = "";
		for (let k = 0; k < ichi.length; k++) {
			if ((combinedArray[i][11] & bit8[k]) == bit8[k]) {
				temp += ichi[k] + ",<br>";
			}
		}
		//最後の「,<br>」はカットする
		if (temp.endsWith(",<br>")){
		 temp=temp.slice(0, -5);
		}
		array[i]=temp;
	}
	array.unshift("位置変化");
	return(array);
}

//フィールド変化
//技データ22　上4ビットはダメージフィールド
function wazaFieldFunc() {
	const field = ["水","毒","火","電"];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		//1bitずつ判定
		for (let j = 0; j < field.length; j++) {
			if (Math.trunc((combinedArray[i][22] & 0b01110000)/16) == j+4) {
				array[i]=field[j];
			}
		}
	}
	array.unshift("フィールド変化");
	return(array);
}

//ステータス増減
//技データ23　ステータス変動。$00ならステータス変動なし。
//上1ビット：%0なら変動するのは標的、%1なら変動するのは使用者
//上2～3ビット：下降か上昇か
//上4～8ビット：変動するステータス、合計値が入る。
function wazaStatusUpDownFunc() {
	const bit8 = [0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	const st1 = [" 下降(大)"," 下降(中)"," 下降(小)"," 上昇",];
	const st2 = ["力","速","体","知","LV",];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		if (combinedArray[i][23] == 0) {
			array[i]="";
		} else {
			let temp = "";
			if ((combinedArray[i][23] & 0b10000000) == 0) {
				temp += "標的<br>"
			} else {
				temp += "自身<br>"
			}
			//変動するステータス判定
			for (let j = 0; j < st2.length; j++) {
				if ((combinedArray[i][23] & bit8[j]) == bit8[j]) {
					temp += st2[j] + ",";
				}
			}
			//最後の「,」はカットする
			if (temp.endsWith(",")){
			 temp=temp.slice(0, -1);
			}
			//下降か上昇か
			for (let k = 0; k < st1.length; k++) {
				if (Math.trunc((combinedArray[i][23] & 0b01100000)/32) == k) {
					temp += st1[k];
				}
			}
			array[i]=temp;
		}
	}
	array.unshift("ステータス増減");
	return(array);
}

//反撃属性
//技データ14～15
//技データ15は上7ビット
function wazaHangekiZFunc() {
	const zokusei1 = ["手","足","突","鋭","鈍","締","飛","背",];
	const zokusei2 = ["火","水","風","土","精","善","悪","無",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		let temp="";
		let temp2="";
		//zokusei1 1bitずつ判定
		for (let j = 0; j < zokusei1.length; j++) {
			if ((combinedArray[i][14] & bit8[j]) == bit8[j]) {
				temp += zokusei1[j] + ",";
			}
		}
		//zokusei2 1bitずつ判定　7ビットまで
		for (let k = 0; k < zokusei2.length-1; k++) {
			if ((combinedArray[i][15] & bit8[k]) == bit8[k]) {
				temp2 += zokusei2[k] + ",";
			}
		}
		temp=temp+temp2;
		//最後の「, 」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		//文字数長かったら<br>入れて改行
		if (temp.length>15){
			temp = temp.slice(0,16) + "<br>" + temp.slice(16);
		}
		array[i]=temp;
	}
	array.unshift("反撃属性");
	return(array);
}

//状態異常
//技データ09	状態異常（8ビット）
//技データ18
//状態異常を回復させる技なら$00
//上1～2ビット：状態異常自身依存ステータス
//上3～4ビット：状態異常敵依存ステータス
//下4ビット：状態異常時間係数（$0～$F）
function wazaStaAilmentFunc() {
	const joutaiIjou = ["石","酔","眠","麻","毒","腕","足","首",];
	const bit8 = [0b10000000,0b01000000,0b00100000,0b00010000,0b00001000,0b00000100,0b00000010,0b00000001,];
	const st = ["力","速","体","知",];
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		if (combinedArray[i][9]== 0) {
			//状態異常を発生させない技なら$00
			array[i]="</td><td></td><td></td><td>";
		} else {
			let temp = "";
			//回復か判定する定数
			const kaihukuHantei = (combinedArray[i][18]==0);
			//技データ09	状態異常（8ビット）
			for (let j = 0; j < joutaiIjou.length; j++) {
				if ((combinedArray[i][9] & bit8[j]) == bit8[j]) {
					temp += joutaiIjou[j] + ",";
				}
			}
			//最後の「,」はカットする
			if (temp.endsWith(",")){
			 temp=temp.slice(0, -1);
			}
			if (kaihukuHantei) {
				temp += "(回復)"
			}
			temp += "</td><td>";
			if (kaihukuHantei) {
				//状態異常回復だと依存ステータス以下なし
				temp += "</td><td></td><td>";
			} else {
				//上1～2ビット：状態異常自身依存ステータス
				for (let k = 0; k < st.length; k++) {
					if (Math.trunc((combinedArray[i][18] & 0b11000000)/64) == k) {
						temp += st[k]+"</td><td>";
					}
				}
				//上3～4ビット：状態異常敵依存ステータス
				for (let m = 0; m < st.length; m++) {
					if (Math.trunc((combinedArray[i][18] & 0b00110000)/16) == m) {
						temp += st[m]+"</td><td>";
					}
				}
				//下4ビット：状態異常時間係数（$0～$F）
				temp += (combinedArray[i][18] & 0x0F);
			}
			array[i]=temp;
		}
	}
	array.unshift("状態異常</th><th>状態異常自身依存</th><th>状態異常敵依存</th><th>状態異常時間係数");
	return(array);
}

//行動異常
//技データ22
//下4ビットは、上4ビットが$8以上の時、行動異常の値$0～$Fが入る。
function wazaMovAilmentFunc() {
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		if ((combinedArray[i][22] & 0xF0) >= 0x80) {
			array[i]=(combinedArray[i][22] & 0x0F).toString(16).toUpperCase();
		} else {
			array[i]="";
		}
	}
	array.unshift("行動異常");
	return(array);
}

//ダメージ量計算値関係まとめて
//技LV　技データ17　下4ビット
//LV差係数　技データ10　上8ビットと%1111 1100の論理積
//攻撃力依存　技データ15　下1ビット
//自身依存ステータス　技データ07　上1～2ビット：自身依存係数　上3～4ビット：自身依存ステータス
//敵依存ステータス　技データ10　下2ビットは敵依存ステータスと防御力依存係数を兼用した値
function wazaDamageFunc() {
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		//技LV,LV差係数
		let temp = (combinedArray[i][17] & 0x0F) + "</td><td>" + (combinedArray[i][10] & 0b11111100);
		//攻撃力依存
		if ((combinedArray[i][15] & 1) == 1) {	
			temp += "</td><td>あり</td><td>"
		} else {
			temp += "</td><td>なし</td><td>"
		}
		//自身依存ステータス
		const st1 = ["力","速","体","知"];
		const st2 = ["","1/2","1/4","なし"];
		if ((combinedArray[i][7] & 0b11000000) == 0b11000000) {
			temp += "なし"
		} else {
			for (let j = 0; j < st1.length; j++) {
				if (Math.trunc((combinedArray[i][7] & 0b00110000)/16) == j) {
					temp += st1[j];
				}
			}
			for (let k = 0; k < st2.length; k++) {
				if (Math.trunc((combinedArray[i][7] & 0b11000000)/64) == k) {
					temp += st2[k];
				}
			}
		}
		temp += "</td><td>"
		//敵依存ステータス・防御力依存係数
		const st3 = ["1/4","1/2","1","0"];
		for (let m = 0; m < st1.length; m++) {
			if ((combinedArray[i][10] & 0b00000011) == m) {
				temp += st1[m] + "</td><td>" + st3[m];
			}
		}
		array[i] = temp;
	}
	array.unshift("技LV</th><th>LV差係数</th><th>攻撃力依存</th><th>自身依存ステータス</th><th>敵依存ステータス</th><th>防御依存係数");
	return(array);
}

//必中状態異常
//12	上2～4ビット：必中状態異常（腕・足・首）/下2ビット：効果範囲（1）
function wazaHichuFunc() {
	//味方技Arrayと敵技Arrayを結合
	let combinedArray = wazaData_chara.concat(wazaData_enemy);
	let array=[];
	for (let i = 0; i < combinedArray.length; i++) {
		let temp="";
		if ((combinedArray[i][12] & 0b01000000) == 0b01000000) {
			temp+="腕,";
		}
		if ((combinedArray[i][12] & 0b00100000) == 0b00100000) {
			temp+="足,";
		}
		if ((combinedArray[i][12] & 0b00010000) == 0b00010000) {
			temp+="首";
		}
		//最後の「,」はカットする
		if (temp.endsWith(",")){
		 temp=temp.slice(0, -1);
		}
		array[i] = temp;
	}
	array.unshift("必中状態異常");
	return(array);
}

//----------------------------//
//ここから実行時サブルーチン
//----------------------------//

//<select>の中身をArrayから取得して埋める
//フォーム生成
const selectElement1 = document.getElementById("mikataSelect");
const selectElement2 = document.getElementById("tekiSelect");

//配列のループ処理
charaData_ID.forEach((item,index) => {
	// option要素を新しく作る
	const option = document.createElement("option");
	
	// optionのテキストと値を設定
	option.textContent = item;
	option.value = index; // 必要に応じてIDなどを入れる

	// select要素の中に追加する
	selectElement1.appendChild(option);
});

let enemyNameList = [];
for (let i = 0; i < enemyData_ID.length-21; i++) {
	enemyNameList[i]=enemyData_ID[i][0];
}

enemyNameList.forEach((item,index) => {
	// option要素を新しく作る
	const option = document.createElement("option");
	
	// optionのテキストと値を設定
	option.textContent = item;
	option.value = index; // 必要に応じてIDなどを入れる

	// select要素の中に追加する
	selectElement2.appendChild(option);
});
//フォーム生成 ここまで
//selectElement1.selectedIndex は、選択された味方キャラID
//selectElement2.selectedIndex は、選択された敵キャラID

//--------------------------------------------------------------------

//アイテム技ID一覧を作る（itemWazaArray）　※味方技から抽出されている
let tempArray=[];
for (let i = 0; i < itemData.length; i++) {
	tempArray[i]=itemData[i][10];
}
const itemWazaArray = [...new Set(tempArray.filter(item => item !== 0))].sort((a, b) => a - b);	//0削除＆被りID削除＆並び替え

//未使用技を取り除いた技ID一覧を作る
//※セットされていても使わない技も含まれるけど……
//※メカ技はキャラ使用技扱い
let tempArrayX=[];
let tempArrayY=[];
for (let i = 0; i < enemyData.length; i++) {
let enemyType=enemyData[i][09] & 0b10000000;
	for (let j = 0; j < 4; j++) {
		if (enemyType==0b10000000) {
			tempArrayX.push(enemyData[i][11+j]);	//味方ID
		} else {
			tempArrayY.push(enemyData[i][11+j]);	//敵ID
		}
	}
}
for (let k = 0; k < charaData.length; k++) {
	for (let m = 0; m < 16; m++) {
		tempArrayX.push(charaData[k][m+5]);	//味方ID
	}
}
const MikataWazaArray = [...new Set(tempArrayX.filter(item => item !== 0))].sort((a, b) => a - b);	//0削除＆被りID削除＆並び替え
const TekiWazaArray_temp = [...new Set(tempArrayY.filter(item => item !== 0))].sort((a, b) => a - b);	//0削除＆被りID削除＆並び替え
const TekiWazaArray = TekiWazaArray_temp.map(num => num + 256);	//敵技IDに＋256
const ShiyouwazaArray = MikataWazaArray.concat(TekiWazaArray);	//味方技と敵技一覧を結合

//--------------------------------------------------------------------

//チェックボタンを押す度に実行
const functionMap = {
	c0: wazaIDFunc,	//技ID
	c1: wazaNameFunc,	//技名前
	c2: wazaWayFunc,	//方向
	c3: wazaHitTypeFunc,	//命中タイプ
	c4: wazaTypeFunc,	//タイプ
	c5: wazaDistantFunc,	//射程
	c6: wazaRangeFunc,	//範囲
	c7: wazaPropertyFunc,	//属性
	c8: wazaHitFunc,	//ヒット数
	c9: wazaTimeFunc,	//タメ時間（チャージタイム）
	c10: wazaPositionFunc,	//位置変化
	c11: wazaFieldFunc,	//フィールド変化
	c12: wazaStatusUpDownFunc,	//ステータス増減
	c13: wazaHangekiZFunc,	//反撃属性
	c14: wazaStaAilmentFunc,	//状態異常
	c15: wazaMovAilmentFunc,	//行動異常
	c16: wazaDamageFunc,	//ダメージ量計算値
	c17: wazaHichuFunc,	//必中状態異常
};

const checklist = document.getElementById('checklist');
// テーブルを挿入する対象の要素を取得
const tableContainer = document.getElementById('wazadata_table');

// テーブルを描画する処理を関数にまとめる
function updateTable() {
	// ラジオボタンの状態を取得
	const radios = document.querySelectorAll('input[name="wlist"]');
	const checkedRadio = Array.from(radios).findIndex(radio => radio.checked);
	//フォームの値取得
	let selectForm1 = selectElement1.selectedIndex;	//選択された味方キャラID
		if (selectForm1 < 0) {selectForm1=0};
	let selectForm2 = selectElement2.selectedIndex;	//選択された敵キャラID
		if (selectForm2 < 0) {selectForm2=0};

	//フォームの値から、味方キャラID技array出力
	let MikataWazaarray=[];
	for (let j = 0; j < 16; j++) {
		if (charaData[selectForm1][j+5] != 0) {
			MikataWazaarray.push(charaData[selectForm1][j+5]);
		}
	}
	//フォームの値から、敵キャラID技array出力
	let TekiWazaarray=[];
	for (let j = 0; j < 4; j++) {
		if ((enemyData[selectForm2][09] & 0b10000000)==0b10000000) {
			if (enemyData[selectForm2][11+j] != 0) {
				TekiWazaarray.push(enemyData[selectForm2][11+j]);
			}
		} else {
			if (enemyData[selectForm2][11+j] != 0) {
				TekiWazaarray.push(enemyData[selectForm2][11+j] + 256)
			}
		}
	}

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
	//ラジオボタンチェックで処理分ける
	let RadioBChecker = 
	(checkedRadio==0)||
	((checkedRadio==1) && (i<256+1))||	//味方技
	((checkedRadio==2) && (i>255+1))||	//敵技
	((checkedRadio==3) && (itemWazaArray.includes(i-1)))||	//アイテム技
	((checkedRadio==4) && ((ShiyouwazaArray.includes(i-1))||(itemWazaArray.includes(i-1))))||	//全て（未使用技なし）
	((checkedRadio==5) && ((!ShiyouwazaArray.includes(i-1))&&(!itemWazaArray.includes(i-1))))||	//全て（未使用技のみ）
	((checkedRadio==6) && (MikataWazaarray.includes(i-1)))||	//選択した味方キャラ
	((checkedRadio==7) && (TekiWazaarray.includes(i-1)))	//選択した敵キャラ

	//ラジオボタンでテーブル列を作るか1行ずつ判定
	if (RadioBChecker) {
	
		tableHtml += `<tr id ="waza_n${i}">`;	//idつける（敵の技だと＋256の値が入る）
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

// ラジオボタン実行
document.getElementById('wazalist').addEventListener('change', (event) => {
	if (event.target.type === 'radio') {
		updateTable();
	}
});

// 選択式メニュー<select>用　実行
document.getElementById('selecter').addEventListener('change', () => {
	updateTable();
});
