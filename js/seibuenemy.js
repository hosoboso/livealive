//リメイク版
{
const d = document, 
hi = "hidden",
vi = "visible",

// チェックボタン
chkbtn = [d.getElementById("item0"), d.getElementById("item1"), d.getElementById("item2"), d.getElementById("item3"), d.getElementById("item4"), d.getElementById("item5"), d.getElementById("item6"), d.getElementById("item7"), d.getElementById("item8")],

//敵id
v = [d.getElementById("pike1"), d.getElementById("pike2"), d.getElementById("pike3"), d.getElementById("pike4"), d.getElementById("pike5"), d.getElementById("pike6"), d.getElementById("datn7"), d.getElementById("datn8"), d.getElementById("datn9"), d.getElementById("datn10"), d.getElementById("datn11"), d.getElementById("datn12"), d.getElementById("duod1"), d.getElementById("iwa1"), d.getElementById("duod2"), d.getElementById("iwa2")];

//チェックボタンを押す度に実行
d.getElementById("radiobtn").addEventListener("change", () => {

	//ロープのみデュオ・デ・チコ制御
	if (chkbtn[8].checked) {
		v[12].style.visibility = v[14].style.visibility = hi;
		v[13].style.visibility = v[15].style.visibility = vi;
	} else {
		v[12].style.visibility = v[14].style.visibility = vi;
		v[13].style.visibility = v[15].style.visibility = hi;
	}

	//ロープ以外でトラップで倒せる合計人数計算
	let trap = 0;

	for (let i = 0; i < 8; i++) {
		if (chkbtn[i].checked) {
			if (i == 0) {
				trap += 4;
			} else if (i == 1) {
				trap += 2;
				//馬フンはスコップと同時のみ
			} else if ((i == 5) && (chkbtn[4].checked)) {
				trap += 1;
			} else if ((i == 5) && !(chkbtn[4].checked)) {
				;
			} else {
				trap += 1;
			}
		}
	}

	//トラップで倒せる合計人数に応じてダットンとパイクの表示切り替え
	for (let i = 0; i < 12; i++) {
		v[i].style.visibility = trap <= i ? vi : hi;
	}

});
}