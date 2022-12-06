import web3 from "web3"
import Request from 'luch-request'
import CONFIG from './base'

const http = new Request();
var tools = {
	address: uni.getStorageSync('address'),
	towei: function(money, decimals) {
		let amount = money * Math.pow(10, decimals)
		return amount.toFixed(0);
	},
	weito: function(money, decimals) {
		let amount = money / Math.pow(10, decimals)
		return amount.toFixed(2);
	},
	// 网络请求封装
	luch_post: async function(url, data) {
		return new Promise((resolve, reject) => {
			let dourl = CONFIG.apiUrl + url;
			data.userId = uni.getStorageSync("userId");
			data.wallet = uni.getStorageSync("wallet");
			data.token = uni.getStorageSync("token");
			http.post(dourl, data).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			});
		})
	},
	luch_get: async function(url, data = {}) {
		return new Promise((resolve, reject) => {
			let dourl = CONFIG.apiUrl + url;
			http.get(dourl, {
				params: data
			}).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			});
		})
	},
	//显示消息
	showmsg: function(txt, num = 5000) {
		uni.showToast({
			title: txt,
			icon: 'none',
			duration: num,
		})
	},
	//随机整数
	randomNum: function(minNum, maxNum) {
		switch (arguments.length) {
			case 1:
				return parseInt(Math.random() * minNum + 1, 10);
				break;
			case 2:
				return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
				break;
			default:
				return 0;
				break;
		}
	},
	// 复制
	copyToClipBoard: function(val) {
		let result
		// #ifndef H5
		uni.setClipboardData({
			data: val,
			success() {
				result = true
			},
			fail() {
				result = false
			}
		});
		// #endif

		// #ifdef H5 
		let textarea = document.createElement("textarea")
		textarea.value = val
		textarea.readOnly = "readOnly"
		document.body.appendChild(textarea)
		textarea.select() // 选中文本内容
		textarea.setSelectionRange(0, val.length)
		result = document.execCommand("copy")
		textarea.remove()
		// #endif
		return result
	},
	ppost: async function(url, data, that, fnSuccess, fnFail = function(err) {}, fnComplete = function(res) {}) {
		return new Promise((resolve, reject) => {
			let userId = uni.getStorageSync("userId");
			let wallet = uni.getStorageSync("wallet");
			let token = uni.getStorageSync("token");
			data.userId = userId;
			data.wallet = wallet;
			data.token = token;
			uni.request({
				url: CONFIG.apiUrl + url,
				dataType: 'JSON',
				method: 'GET',
				data: data,
				success: (res) => {
					resolve(res.data);
				},
				fail: (err) => {
					reject(err);
				},
				complete: fnComplete,
			});
		})
	},
	//post
	post: function(url, data, that, fnSuccess, fnFail = function(err) {}, fnComplete = function(res) {}) {
		var userId = uni.getStorageSync("userId");
		var wallet = uni.getStorageSync("wallet");
		var token = uni.getStorageSync("token");
		data.userId = userId;
		data.wallet = wallet;
		data.token = token;
		uni.request({
			url: CONFIG.apiUrl + url,
			dataType: 'JSON',
			method: 'GET',
			data: data,
			success: fnSuccess,
			fail: fnFail,
			complete: fnComplete,
		});
	},
	chatpost: function(url, data, that, fnSuccess, fnFail = function(err) {}, fnComplete = function(res) {}) {
		uni.request({
			url: CONFIG.chatUrl + url,
			dataType: 'JSON',
			method: 'GET',
			data: data,
			success: fnSuccess,
			fail: fnFail,
			complete: fnComplete,
		});
	},
	//post
	taskpost: function(url, data, fnSuccess = function(res) {}, fnFail = function(err) {}, fnComplete = function(
		res) {}) {
		var userId = uni.getStorageSync("userId");
		var wallet = uni.getStorageSync("wallet");
		var token = uni.getStorageSync("token");
		data.userId = userId;
		data.wallet = wallet;
		data.token = token;
		uni.request({
			url: CONFIG.taskUrl + url,
			dataType: 'JSON',
			method: 'GET',
			data: data,
			success: fnSuccess,
			fail: fnFail,
			complete: fnComplete,
		});
	},
	//post2
	post2: function(url, data, that, fnSuccess, fnFail = function(err) {}, fnComplete = function(res) {}) {
		var userId = uni.getStorageSync("userId");
		var wallet = uni.getStorageSync("wallet");
		var token = uni.getStorageSync("token");
		data.userId = userId;
		data.wallet = wallet;
		data.token = token;
		uni.request({
			url: CONFIG.apiUrl2 + url,
			dataType: 'JSON',
			method: 'GET',
			data: data,
			success: fnSuccess,
			fail: fnFail,
			complete: fnComplete
		});
	},
	//钱包地址转换
	getShowAddress: function(str) {
		return str.slice(0, 3) + '...' + str.slice(-4);
	},
	//钱包地址转换
	getShowAddresslong: function(str) {
		return str.slice(0, 8) + '...' + str.slice(-9);
	},
	//页面跳转
	toPage: function(pagekey) {
		var urls = {
			"home": "../index/index",
			"money": "../money/money",
			"shop": "../shop/shop",
			"combat": "../combat/combat",
			"free": "../free/free",
			"fantasy": "../fantasy/fantasy",
			"trade": "../trade/trade",
		}
		var url = urls[pagekey]
		uni.navigateTo({
			url: url,
			events: {},
			success: function(res) {
				// 通过eventChannel向被打开页面传送数据
			}
		})
	},
	//大数转换
	addzero: function(number, wei) {
		switch (wei) {
			case 3:
				break;
		}
	},
	//数组元素检查
	in_array: function(search, array) {
		for (var i in array) {
			if (array[i] == search) {
				return true;
			}
		}
		return false;
	},

	// 校验工具
	isnull: function(value) { //非空校验
		if (value.trim(value).length == 0) {
			return false;
		} else {
			return true;
		}
	},
	isidc: function(value) { //身份证校验
		var ext = /(^\d{15}&)|(^\d{18})|(^\d{17}(\d|X|x)$)/;
		return ext.test(value);
	},
	isen: function(value) { //英文校验
		var ext = /(^[a-zA-Z]+$)/;
		return ext.test(value);
	},
	isnum: function(value) { //数字校验
		var ext = /^[0-9]*$/;
		return ext.test(value);
	},
	isfloat: function(value) { //小数校验
		var ext = /^[0-9]+(.[0-9]{1,3})?$/;
		return ext.test(value);
	},
	isemail: function(value) { //邮箱校验
		var ext = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		return ext.test(value);
	},
	ismob: function(value) { //手机号校验
		var ext = /^1[3456789][0-9]{9}$/;
		return ext.test(value);
	},
	isInteger: function(s) { //是否整数
		var isInteger = RegExp(/^[0-9]+$/);
		return (isInteger.test(s));
	},
	isName: function(s) { //是否姓名
		var regName = /^[\u4e00-\u9fa5]{2,4}$/;
		if (!regName.test(s)) {
			return false;
		}
		return true;
	},
	isChinese: function(obj) { //是否汉字
		var reg = /^[\u0391-\uFFE5]+$/;
		if (obj != "" && !reg.test(obj)) {
			return false;
		}
		return true;
	},
	API_get: async function(url, data = {}) {
		return new Promise((resolve, reject) => {
			let dourl = CONFIG.API_URL + url;
			http.get(dourl, {
				params: data
			}).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			});
		})
	},
	API_post: async function(url, data = {}) {
		return new Promise((resolve, reject) => {
			let dourl = CONFIG.API_URL + url;
			console.log("API_post_DATA+++: ", data);
			http.get(dourl, {
				params: data
			}).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(err);
			});
		})
	},
}

export default {
	tools
}
