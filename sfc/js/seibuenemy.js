//SFC版
{
const d = document, 
hi = "hidden",
vi = "visible",

// チェックボタン
c = [d.getElementById("item0"), d.getElementById("item1"), d.getElementById("item2"), d.getElementById("item3"), d.getElementById("item4"), d.getElementById("item5"), d.getElementById("item6"), d.getElementById("item7"), d.getElementById("item8")],

//敵id
v = [d.getElementById("pike1").style, d.getElementById("datn2").style, d.getElementById("pike3").style, d.getElementById("pike4").style, d.getElementById("datn5").style, d.getElementById("datn6").style, d.getElementById("datn7").style, d.getElementById("pike8").style, d.getElementById("datn9").style, d.getElementById("pike10").style, d.getElementById("pike11").style, d.getElementById("datn12").style, d.getElementById("duod1").style, d.getElementById("iwa1").style, d.getElementById("duod2").style, d.getElementById("iwa2").style];

//チェックボタンを押す度に実行
d.getElementById("radiobtn").addEventListener("change", () => {

	//ロープのみデュオ・デ・チコ制御
	if (c[8].checked) {
		v[12].visibility = v[14].visibility = hi;
		v[13].visibility = v[15].visibility = vi;
	} else {
		v[12].visibility = v[14].visibility = vi;
		v[13].visibility = v[15].visibility = hi;
	}

	//ロープ以外でトラップで倒せる合計人数計算
	let trap = 0;

	for (let i = 0; i < 8; i++) {
		if (c[i].checked) {
			if (i == 0) {
				trap += 4;
			} else if (i == 1) {
				trap += 2;
				//馬フンはスコップと同時のみ
			} else if ((i == 5) && (c[4].checked)) {
				trap += 1;
			} else if ((i == 5) && !(c[4].checked)) {
				;
			} else {
				trap += 1;
			}
		}
	}

	//トラップで倒せる合計人数に応じてダットンとパイクの表示切り替え
	for (let i = 0; i < 12; i++) {
		v[i].visibility = trap <= i ? vi : hi;
	}

});

}