import {
	apiUrl
} from '@/common/base.js';

const sendAjax = (method = "POST", url, data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: apiUrl + url,
			data,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

//撤回一条消息
const withdraw = (data = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl + "/index/Index/retractmsgone",
			data,
			method: 'POST',
			success: (response) => {
				resolve(response)
			},
			fail: (error) => {
				reject(response)
			}
		})
	})
}
//撤回所有消息
const withdrawAll = (data = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiUrl + "/index/Index/retractmsgall",
			data,
			method: 'POST',
			success: (response) => {
				resolve(response)
			},
			fail: (error) => {
				reject(response)
			}
		})
	})
}
//修改备注
const changeRemarks = (data = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${apiUrl}/index/User/setremarkname`,
			data,
			method: 'GET',
			success: (response) => {
				resolve(response)
			},
			fail: (error) => {
				reject(response)
			}
		})
	})
}
export {
	withdraw,
	withdrawAll,
	changeRemarks,
	sendAjax
}
