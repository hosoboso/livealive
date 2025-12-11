{
// 上に戻る矢印の表示・非表示調整JavaScript
const d = document, w = window, gID = d.getElementById("top_arrow").style;
gID.visibility = "hidden";	// 初期非表示
gID.opacity = 0;	// 初期透過度0
gID.transition = "opacity 0.4s";	// 透過度変更　0.4秒

// スクロール毎に実行する
w.addEventListener('scroll', () => {
	// 上からのスクロール位置currentPos　ブラウザ互換性でscrollTopでもor指定
	const currentPos = w.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
	if (currentPos > 80) {	// 上から80px以上で表示（visibility変更＆透過度を1にする）
		gID.visibility = "visible";
		gID.opacity = 1;
	} else {
		gID.visibility = "hidden";
		gID.opacity = 0;
	}
});
}