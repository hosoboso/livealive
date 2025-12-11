/*--------------------------------------------------------------------------*
 *  
 *  SmoothScroll JavaScript Library V2
 *  
 *  MIT-style license. 
 *  
 *  2007-2011 Kazuma Nishihata 
 *  http://www.to-r.net
 *  
 *--------------------------------------------------------------------------*/


//上ライブラリに手を加えています
{
const d = document, w = window;

// 文書が現在垂直方向にスクロールしているピクセル数
function scroll_Y() {
	return w.pageYOffset || w.scrollY || d.documentElement.scrollTop || d.body.scrollTop || 0
}

d.addEventListener("DOMContentLoaded", function () {

	function SmoothScroll(a) {
		// document.querySelectorAllで取得したリンクをa.hashでハッシュタグ「#aaa」部分だけ取得
		// .slice(1)で頭1文字削る（#のみ削除）
		// 対応したgetElementByIdを取得しoffsetTop（親からの相対的位置）をend（移動したいYの高さ）とする
		let end = d.getElementById(a.hash.slice(1)).offsetTop;

		// ページのフルの高さ
		const docHeight = d.documentElement.scrollHeight;
		// ウィンドウのページ表示部分の縦幅
		const winHeight = w.innerHeight || d.documentElement.clientHeight;
		
		if (docHeight - winHeight < end) {
			end = docHeight - winHeight;
		}
		
		// 文書が現在垂直方向にスクロールしているピクセル数
		const start = scroll_Y();
		
		// 移動したいYの高さ＜開始位置の高さの時true　そうでなければfalse
		const flag = end < start ? true : false;
		
		function scrollMe(start, end, flag) {
			setTimeout( () => {
				if (flag && start >= end) {
					start = start - (start - end) / 20 - 1;
					w.scrollTo(0, start);
					scrollMe(start, end, flag);
				} else if (!flag && start <= end) {
					start = start + (end - start) / 20 + 1;
					w.scrollTo(0, start);
					scrollMe(start, end, flag);
				} else {
					scrollTo(0, end);
				}
				return;
			}, 10);
		}

		scrollMe(start, end, flag);
	}

	//頭に#付きのアンカーのみ取得
	const anchors = document.querySelectorAll('a[href^="#"]');
	//アンカーにforEachで処理
	anchors.forEach((n) => {
		n.rel = n.href;
//		n.href = "javascript:void(0)";
		n.addEventListener("click", function () {
			SmoothScroll(this);
		});
	});

// 外部リンク用　aタグチェッカー
// nowマーク用JavaScript

	// 現在のURLのドメイン名の入った文字列
	const currentHost = location.hostname;
	// <a href="X" target="_blank">Y</a>をすべて取得する
	const links = d.querySelectorAll('a[target="_blank"]');

	//ファイル名を取得
	const fileName = w.location.href.split('/').pop();

	// サイドバーの中のaタグの配列SideTagList
	const SideTagList = d.querySelectorAll('.option > .content > ul > li > a');
	
	// Array.forEach()で配列SideTagListの項目1つずつに処理
	SideTagList.forEach(link => {
		// aタグ内のhrefの部分とファイル名が一致しているかどうか
		if (fileName == link.getAttribute("href")) {
			// liにnow_locationクラスを追加する（nowマーク追加）
			link.parentElement.classList.add("now_location");
			// リンクなしの文字列のみにする（親要素のli以下を書き換え）
			const linktext = link.innerHTML;
			link.parentElement.innerHTML = linktext;
		}
	});
	
	//タブ内のaタグの配列TopTabTagList
	const TopTabTagList = d.querySelectorAll('nav.droplinetabs a');
	
	// Array.forEach()で配列TopTabTagListの項目1つずつに処理
	TopTabTagList.forEach(link => {
		// aタグ内のhrefの部分とファイル名が一致しているかどうか
		if (fileName == link.getAttribute("href")) {
			// classにnow_tab追加
			link.classList.add("now_tab");
			// トップのタブにはチェックマーク追加しない
			if ( !link.parentNode.classList.contains("here") ){
				// ドロップダウンリストのみ、文字列の最後に「&#x2714;」（チェックマーク）を追加
				link.innerHTML = link.innerHTML + ` &#x2714;`;
			}
		}
	});
	
	links.forEach(link => {
		// aタグ内のhref="X"の部分
		const href = link.href;

		// 外部リンクかどうか
		// Xが現在のドメイン名と一致していない　あるいはXのドメイン名が現在のドメイン名と一致していない
		const isExternal = href && (new URL(href)).hostname !== currentHost;

		// 中身が <img> だけではないかどうか
		// link.childrenでY部分、.lengthが1ならY部分の子要素はひとつのみ、かつそのひとつだけの子要素のtagNameはIMG
		const hasOnlyImage = link.children.length === 1 && link.children[0].tagName === "IMG";

		// 外部リンク　かつ、　IMGタグではない（!つき）を満たしていたら、<a>タグにclass="external-link"追加
		if (isExternal && !hasOnlyImage) {
			link.classList.add("external-link");
		}
	});

});

// 上に戻る矢印の動作
// https://blog-mi.com/js-smooth-scroll/ を参考にさせていただきました。

const topArrowID = d.getElementById("top_arrow");

topArrowID.addEventListener("click", () => {
	const startPos = scroll_Y();
	const duration = 800;
	let startTime;
	function animation(currentTime) {
		if (startTime === undefined) {
			startTime = currentTime;
		}
		const timeElapsed = currentTime - startTime;
		const scrollPos = (-startPos * (-Math.pow(2, (-10 * timeElapsed) / duration) + 1) * 1024) / 1023 + startPos;
		w.scrollTo(0, scrollPos);
		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		} else {
			w.scrollTo(0, 0);
		}
	}
	requestAnimationFrame(animation);
});

//上に戻る矢印の表示・非表示調整JavaScript
const topArrowstyle = topArrowID.style;
topArrowstyle.visibility = "hidden";
topArrowstyle.opacity = 0;
topArrowstyle.transition = "opacity 0.4s";

// ウィンドウがスクロールした時に実行
w.addEventListener('scroll', () => {
	const currentPos = scroll_Y();
	// スクロール位置がトップから80px以上の時のみ上に戻る矢印を表示する
	// visibilityも設定しないと、見えない矢印をクリックしてしまう
	if (currentPos > 80) {
		topArrowstyle.visibility = "visible";
		topArrowstyle.opacity = 1;
	} else {
		topArrowstyle.visibility = "hidden";
		topArrowstyle.opacity = 0;
	}
});

}