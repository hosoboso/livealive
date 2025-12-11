{// 順にX, facebook, HatenaBookmark, Line, bluesky, taittsuu, misskey, mastodon

	// %20 : 半角スペース
	// %0A : 改行
	// %40 : @
	// %23 : #

	const d = document,
	socialName = 'hoso_boso',
	hashTag = encodeURIComponent('ライブアライブ'),
	webAddress = encodeURIComponent(location.href),
	webTitle = encodeURIComponent(d.title),

	newUrl = [
	`x.com/share?url=`+webAddress+`&text=`+webTitle+`&via=`+socialName,
	`www.facebook.com/share.php?u=`+webAddress,
	`b.hatena.ne.jp/entry/`+webAddress,
	`line.me/R/msg/text/?`+webTitle+`%0A`+webAddress,
	`bsky.app/intent/compose?text=`+webTitle+`%20`+webAddress+`%20%23`+hashTag,
	`taittsuu.com/share?text=`+webTitle+`%0A`+webAddress+`%20%40`+socialName+`%20%23`+hashTag,
	`misskey.io/share?text=`+webTitle+`%0A`+webAddress+`%20%40`+socialName+`%20%23`+hashTag,
	`mstdn.jp/share?text=`+webTitle+`%0A`+webAddress+`%20%40`+socialName+`%20%23`+hashTag,
	];

	d.addEventListener("DOMContentLoaded", () => {

		const socialList = d.querySelectorAll('.social>p>a');

		socialList.forEach((n,index) => {
			socialList[index].href = `https://`+newUrl[index];
		});

	});

}
