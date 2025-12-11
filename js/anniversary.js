{
//発売日周年表示用Javascript

const
n = new Date(),
y = n.getFullYear(),
m = n.getMonth() + 1,
d = n.getDate(),

days = [
	((m==9) && (d==2)),
	((m==7) && (d==22)),
	((m==4) && (d==27)),
	((m==4) && (d==28)),
],

b = `<span style="font-weight:bold;text-shadow: 2px 2px 2px #`,

cmn = [
	`${b}bdb3b3;">`,
	`</span>${b}c28f8f;color:#e30909;">ア</span>`,
	`版） 発売`,
],

c = `HD-2Dリメイク「ライブ${cmn[1]}${cmn[0]}ライブ」（`,

anivText = [
	`「ライブ・${cmn[1]}${cmn[0]}・ライブ」（SFC${cmn[2]}${y-1994}`,
	`${c}Nintendo Switch${cmn[2]}${y-2022}`,
	`${c}PlayStation 4/5${cmn[2]}${y-2023}`,
	`${c}Steam${cmn[2]}${y-2023}`,
];

let resultText="";

for (let i = 0; i < days.length; i++) {
	if (days[i]) {
		resultText = `<div style="border-bottom: 4px solid #e30909;border-left: 8px solid #e30909;box-shadow: 2px -2px 4px 0px #ccc; padding: 5px;margin: 5px;display: inline-block;">本日${y}年${m}月${d}日は<br>${cmn[0]}${anivText[i]}周年！</span></div>`;
		break;
	}
}

document.getElementById('anivposition').insertAdjacentHTML('beforeend', resultText);

}