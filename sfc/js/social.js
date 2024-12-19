// 順にX, facebook, HatenaBookmark, Line, bluesky, taittsuu, misskey, mastodon
{

const d = document,
socialName = 'hoso_boso',
hashTag = encodeURIComponent('ライブアライブ'),
webAddress = location.href,
webTitle = encodeURIComponent(d.title),

aTag = [
d.getElementById("x-social-button"),
d.getElementById("facebook-social-button"),
d.getElementById("hatena-social-button"),
d.getElementById("line-social-button"),
d.getElementById("bluesky-social-button"),
d.getElementById("taittsuu-social-button"),
d.getElementById("misskey-social-button"),
d.getElementById("mastodon-social-button"),
],

// %20 : 半角スペース
// %0A : 改行
// %40 : @
// %23 : #

newUrl = [
`https://x.com/share?url=${webAddress}&text=${webTitle}&via=${socialName}`,
`https://www.facebook.com/share.php?u=${webAddress}`,
`https://b.hatena.ne.jp/entry/${webAddress}`,
`https://line.me/R/msg/text/?${webTitle}%0A${webAddress}`,
`https://bsky.app/intent/compose?text=${webTitle}%20${webAddress}%20%23${hashTag}`,
`https://taittsuu.com/share?text=${webTitle}%0A${webAddress}%20%40${socialName}%20%23${hashTag}`,
`https://misskey.io/share?text=${webTitle}%0A${encodeURIComponent(location.href)}%20%40${socialName}%20%23${hashTag}`,
`https://mstdn.jp/share?text=${webTitle}%0A${webAddress}%20%40${socialName}%20%23${hashTag}`
];

for (let i = 0; i < aTag.length; i++) {
	aTag[i].setAttribute("href",newUrl[i]);
}

}
