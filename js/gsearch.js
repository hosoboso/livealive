{//Google検索用

let hostAddress = location.protocol + "//" + location.host + "/";

if ( document.title.includes("（SFC版）") ) {
	hostAddress += "sfc/";
}

function updateSize() {
	// 表示リセット(div内削除)
	document.getElementById('google_search').replaceChildren();

	let searchWindowWid = "12";

	if ( window.innerWidth <= 768 ) {
		searchWindowWid = "16";
	}

	const GText = `
<!-- Google 検索 -->
<form action="https://www.google.com/search" class="search-form" method="get" target="_blank">
	<input type="hidden" name="hl" value="ja">
	<input type="hidden" name="sitesearch" value="${hostAddress}">
	<input type="text" name="q" size="${searchWindowWid}" maxlength="255">
	<button type="submit" style="box-shadow: 0 2px 2px rgba(0, 0, 0, .3); font-size: 0.7em;padding: 1px;">サイト内検索</button>
</form>
<!-- Google 検索 -->
`;

	document.getElementById('google_search').insertAdjacentHTML('beforeend', GText);
}

updateSize();
window.addEventListener("resize", updateSize);

}