//敵パーティ初期配置表示用（西部編）
{
// LEADERの旗マーク
const leader = '<img src="../icon/leaderflag.svg" class="flag" alt="LEADER">';

const styR = '<span style="color:#FF0000;">';

// 西部敵パーティ編成
const SeibueParty = [

[
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[1,2],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[5,3],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
`マッドドッグ：${styR}1</span>`,
],

[
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[5,1],[0,0],[0,0],[0,0],[0,0],[1,4],[0,0],
[5,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],
`パイク：${styR}1</span>`,
],

[
[5,1],[5,0],[0,0],[8,1],[9,1],[6,2],[6,0],
[5,0],[5,0],[14,1],[8,0],[9,0],[6,0],[6,0],
[5,0],[5,0],[14,0],[15,1],[0,0],[6,0],[6,0],
[10,1],[16,3],[12,0],[15,0],[0,0],[13,1],[17,2],
[10,0],[16,0],[12,0],[7,3],[7,0],[13,0],[17,0],
[18,1],[11,1],[19,1],[7,0],[7,0],[1,4],[2,4],
[18,0],[11,0],[19,0],[7,0],[7,0],[3,4],[4,4],
`${leader}ディオ：${styR}1</span><br>
デュオ・デ・チコ：${styR}2,3</span><br>
ダットン兄弟：${styR}4,5,6,7,8,9</span><br>
パイク兄弟：${styR}10,11,12,13,14,15</span><br>
※詳細は攻略参照`,
],

];

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
		enTable[i] += 1 == list[i][1] ? "&#x2198;"
			: 2 == list[i][1] ? "&#x2199;"
			: 3 == list[i][1] ? "&#x2197;"
			: 4 == list[i][1] ? "&#x2196;"
			: "";
		enTable[i] += '</div>';
	}


	let resulttext="";
	for (let i = 0; i < enTable.length; i++) {
		resulttext += enTable[i];
	}
	return [resulttext,list[list.length-1]]
}

// trクリック時イベントで敵パーティ初期配置表示する

const D = document;
const trList = D.querySelectorAll('#note1 > tr');

trList.forEach((row, index) => {
	row.addEventListener('click', () => {
		// すべての<tr>内のclass='selected-row'を削除
		trList.forEach(rows => {
			rows.classList.remove('selected-row');
		});
		
		//<div>内削除
		D.getElementById("parent1").replaceChildren();
		D.getElementById("text1").replaceChildren();
		
		// 表のid「en_index」が付いたコンテンツを取得して数値化し-1して、敵パーティリストのインデックスにする
		const enIndex = Number( row.querySelector('#en_index').textContent )-1;
		
		//戦闘フィールド＆注意テキスト出力用関数で<div>内にテキストを出力
		D.getElementById("parent1").insertAdjacentHTML("afterbegin", battleTable(SeibueParty[enIndex])[0]);
		D.getElementById("text1").insertAdjacentHTML("afterbegin", battleTable(SeibueParty[enIndex])[1] + `<br><span style="color:#0000FF;">青数字</span>は味方キャラ<br>矢印は向き`);
		
		//classにselected-rowを設定して、クリック行だけ太字にする
		row.classList.add('selected-row');
	});
});

}