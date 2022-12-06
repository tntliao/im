import base from '@/common/base.js'
import urlencode from 'urlencode';
import {
	methods
} from 'uview-ui/libs/mixin/mixin';
// 方法1、创建一个 WebSocket连接、打开连接
let webSocketState = false;

let create = () => {
	uni.closeSocket(); //如果有就先关闭websocket
	// 创建websocket
	uni.connectSocket({
		url: base.wssUrl
	})
	uni.onSocketOpen(res => {
		// console.log('WebSocket连接已打开！');
		webSocketState = true;
	});
	uni.onSocketError(function(res) {
		// console.log('WebSocket连接打开失败，请检查!');
		webSocketState = false;
	});
}
// 方法2、向服务器发送消息
let sendMessage = (data) => {
	return new Promise(resolve => {
		if (webSocketState) {
			// console.log(data)
			uni.sendSocketMessage({
				data: JSON.stringify(data),
				success: (res) => {
					// console.log(res)
					resolve(res);
				},
				fail: (err) => {
					console.log('error', err);
					create()
				}
			})
		} else {
			// console.log('WebSocket连接打开失败，重新连接!');
			create()
		}
	})
}
// 方法3、监听收到的消息
let getMessage = (func) => {
	// if(webSocketState){
	// 	uni.onSocketMessage(res => {
	// 		console.log(res);//res:监听到的数据
	// 		func()
	// 	});
	// }else{
	// 	console.log('WebSocket连接打开失败，重新连接!');
	// 	create()
	// }
}
// 方法4、关闭websocket
let closeWebsocket = () => {
	uni.closeSocket(); //关闭websocket连接
	// 监听websocket关闭连接
	uni.onSocketClose(function(res) {
		// console.log('WebSocket 已关闭！');
	});
}
// 获取当前路由
let getRoute = () => {
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = '/' + routes[routes.length - 1].route //获取当前页面路由
	let curParam = routes[routes.length - 1].options; //获取路由参数
	// 拼接参数
	let param = ''
	for (let key in curParam) {
		param += '&' + key + '=' + curParam[key]
	}
	//将第一个&替换成?
	// 加密
	return urlencode(curRoute + param.replace('&', '?')); //拼接
}

// 方法5，监听语音通话
let monitorVoice = methods => {
	create(); //创建websocket
	setTimeout(() => {
		let msg = {
			type: "connectdo",
			uid: localStorage.getItem('user').userId,
		};
		sendMessage(msg);
	}, 500);
	uni.onSocketMessage(res => {
		if (JSON.parse(res.data)) {
			if (methods) {
				methods()
			}
			let item = JSON.parse(res.data);
			if (item.msgtype == 5) {
				uni.setStorageSync('backRoute', this.$websocket.getRoute());
				let param = uni.getStorageSync('backRoute');
				// 语音通话
				let roomId = `f_${item.sender}_${this.userId}`;
				this.$goBack(4,
					`/pages/voice/voice?id=${item.sender}&name=${item.sender_xm}&voice=2&roomid=${roomId}&backRoute=${param}`
				);
			}
		}
	});
}
export default {
	create,
	sendMessage,
	getMessage,
	closeWebsocket,
	monitorVoice,
	getRoute
}
