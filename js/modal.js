// 画像のモーダル表示用JavaScript

/*---------------------------------------
別途、矢印切替表示をHTMLに入れること
<script>let arrowOn = true;</script>
矢印切替表示オンならtrue、オフはfalseとする
---------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {

	// モーダルセット用HTMLをbodyタグ直後に挿入する
	const modalsetHtml = 
	`<div class="modal"><span class="modal-close">&#x2716;</span><span class="modal-left">&#x2770;</span><span class="modal-right">&#x2771;</span><img class="modal-img" src="" alt="modal content"></div>`;

	document.querySelector("body").insertAdjacentHTML("afterbegin", modalsetHtml);

	let currentIndex = 0;
	
	// 各クラスのquerySelector
	// modal関係はCSSで初期表示させない（visibilityがhidden）
	const modal = document.querySelector(".modal");
	const modalImg = modal.querySelector(".modal-img");
	const closeBtn = modal.querySelector(".modal-close");

	const leftArrow = modal.querySelector(".modal-left");
	const rightArrow = modal.querySelector(".modal-right");
	
	// 画像がいくつあるかをquerySelectorAllで配列にしておく（左右矢印表示の有無判定用）
	const modalSetList = document.querySelectorAll(".modal-set");

	document.querySelectorAll(".modal-link").forEach((thumbnail, index) => {
		thumbnail.addEventListener("click", function (e) {
			// 通常の動作（画像クリックでリンク先の画像アドレスを開く）をさせないようにする
			e.preventDefault();
			// 左右矢印表示の有無判定のため、indexを登録
			currentIndex = index;
			// モーダル表示部分に画像リンク先アドレスを入れる
			const imgSrc = this.getAttribute("href");
			modalImg.src = imgSrc;
			// モーダルを表示する　CSSでshowクラスを追加してvisibilityをvisibleに
			modal.classList.add("show");
			// 左右矢印を表示するかどうかの判定
			if (modalSetList.length !== 1 && arrowOn) {
				if (index === 0) {
					leftArrow.classList.remove("show");
					rightArrow.classList.add("show");
				} else if (index === modalSetList.length - 1) {
					leftArrow.classList.add("show");
					rightArrow.classList.remove("show");
				} else {
					leftArrow.classList.add("show");
					rightArrow.classList.add("show");
				}
			}
		});
	});
	
	// 閉じるボタンをクリック時の処理＆
	// モーダル外クリックで閉じる
	modal.addEventListener("click", function (e) {
		if (e.target === closeBtn || e.target === modal) {
			// showクラス削除して初期状態に戻す
			modal.classList.remove("show");
		}
	});

	// 右矢印クリック時は次画像
	rightArrow.addEventListener("click", function () {
		// 画像indexが最後ではない時に処理
		if (currentIndex < modalSetList.length - 1) {
			// 次画像のindex。currentIndexを+1する
			currentIndex++;
			// 次画像のURLを取得する
			const nextImgSrc = modalSetList[currentIndex].querySelector(".modal-link").getAttribute("href");
			// 次画像のURL（.src）をセット
			modalImg.src = nextImgSrc;

			// 矢印の表示制御
			leftArrow.classList.add("show");
			// 画像indexが最後ならshowクラスを削除
			if (currentIndex === modalSetList.length - 1) {
				rightArrow.classList.remove("show");
			}
		}
	});

	// 左矢印クリック時は前画像
	leftArrow.addEventListener("click", function () {
		// 画像indexが0ではない（1以上）時に処理
		if (currentIndex > 0) {
			// 前画像のindex。currentIndexを-1する
			currentIndex--;
			// 前画像のURLを取得する
			const prevImgSrc = modalSetList[currentIndex].querySelector(".modal-link").getAttribute("href");
			// 前画像のURL（.src）をセット
			modalImg.src = prevImgSrc;

			// 矢印の表示制御
			rightArrow.classList.add("show");
			// 画像indexが0（一番最初）ならshowクラスを削除
			if (currentIndex === 0) {
				leftArrow.classList.remove("show");
			}
		}
	});
});