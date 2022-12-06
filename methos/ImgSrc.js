import http from '@/common/base.js'
let imgJoin = url => {
	if(!url) return//如果为空跳过
	let src=''
	if (url.substr(0, 7).toLowerCase() == "http://" || url.substr(0, 8).toLowerCase() == "https://") {
		src=url
	} else {
		src=http.apiUrl + url;
	}
	return src.replace(/\\/g,'/')
}
export {
	imgJoin
}
