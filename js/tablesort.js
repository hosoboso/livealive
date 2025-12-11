//Table並べ替え用JavaScript

//すべてのthに対して
document.querySelectorAll('th').forEach(header => {
	//thクリック時イベント
	header.addEventListener('click', () => {
		//tableタグ取得
		const table = header.closest('table');
		
		//table内のtbody要素取得
		const tbody = table.querySelector('tbody');
		
		//tbody内のtr要素を配列で取得
		const rows = Array.from(tbody.querySelectorAll('tr'));
		
		//クリックされたthのインデックス（0～）を取得する
		const index = Array.from(header.parentNode.children).indexOf(header);
		
		//thに設定されたdata-typeを取得する。
		//th data-type="number"またはth data-type="string"をあらかじめHTMLで設定
		const type = header.getAttribute('data-type');
		
		//<th>のclass属性に'sort-asc'が含まれているかどうか（True/FalseのBooleanが返る）
		//CSSであらかじめ「th.sort-asc::after」「th.sort-desc::after」でthの文字列の後にソート後記号を設定しておく
		const isAscending = header.classList.contains('sort-asc');

		//rowsを並び替え
		rows.sort((rowA, rowB) => {
			//children[index]でクリックされたthインデックスを指定、.textContentはth内テキスト
			//trimでセル内文字列の両端にホワイトスペースが含まれていた場合削除
			const cellA = rowA.children[index].textContent.trim();
			const cellB = rowB.children[index].textContent.trim();

			if (type === 'number') {	//要素がnumber、整数の時
				return isAscending	//isAscendingがTrue、つまり'sort-asc'が存在しているかどうか、つまりすでに降順かどうか
					? cellB - cellA	//True、つまり降順なので、昇順並び替えを行う
					: cellA - cellB;	//降順並び替えを行う
			//整数以外の並び替え
			} else {
				return isAscending
					? cellB.localeCompare(cellA)
					: cellA.localeCompare(cellB);
			}
		});

		//appendで並べ替えをしたrows（Nodeオブジェクト）をtbody以下に挿入
		tbody.append(...rows);

		//isAscendingがFalseなら'sort-asc'表示（CSSのth.sort-asc::afterが働いてソート記号変更）
		header.classList.toggle('sort-asc', !isAscending);
		//isAscendingがTrueなら'sort-desc'表示（CSSのth.sort-desc::afterが働いてソート記号変更）
		header.classList.toggle('sort-desc', isAscending);
		//すでにほかの行で'sort-asc'や'sort-desc'が表示されていた時、それらを削除し初期状態に戻す
		header.parentNode.querySelectorAll('th').forEach(th => {
			if (th !== header) th.classList.remove('sort-asc', 'sort-desc');
		});
	});
});