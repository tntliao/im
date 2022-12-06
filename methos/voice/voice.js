// https://doc-zh.zego.im/article/7638  参考文档
// “请求方推流” ----->   “接收方同意之后接收方推流，拉流”  ----->   “请求方拉流”
import {
	ZegoExpressEngine
} from './ZegoExpressWebRTC.js';
class Voice {
	constructor() {
		this.zg = '' //创建语音通话实例对象
		this.audioDeviceList = []
		this.videoDeviceList = []
		this.cameraDevicesVal = '' //摄像头有哪些硬件
		this.microphoneDevicesVal = null //麦克风有哪些硬件
		this.videoCodec = localStorage.getItem('VideoCodec') === 'H.264' ? 'H264' : 'VP8'
		this.video1 = {} //媒体流1
		this.video2 = {} //媒体流1
		this.no_2_show = '';
	}
	create(appID, server) {
		window.zg = this.zg = new ZegoExpressEngine(appID, server); //创建实例对象
		this.initEvent(); //监听
	}
	initEvent() {
		//房间状态变化通知
		zg.on('roomStateUpdate', (roomId, state) => {
			// console.log(state)
			if (state === 'CONNECTED') {
				console.log('连接')
			}
			if (state === 'DISCONNECTED') {
				console.log('未连接')
			}
		})
		//推流状态变更回调
		zg.on('publisherStateUpdate', (result) => {
			if (result.state === 'PUBLISHING') {
				console.log('推流状态变更回调表示成功，PUBLISHING');
			} else if (result.state === 'NO_PUBLISH') {
				console.log('推流状态变更回调表示失败，NO_PUBLISH')
			}
		});
		//拉流状态变更回调
		zg.on('playerStateUpdate', (result) => {
			console.log(result)
			if (result.state === 'PLAYING') {
				console.log('拉流状态变更回调表示成功，PLAYING')
			} else if (result.state === 'NO_PLAY') {
				console.log('拉流状态变更回调表示失败，NO_PLAY')
			}
		});
	}
	// // 兼容性测试
	async no_2() {
		const result = await this.checkSystemRequirements(); //输出兼容性测试的结果
		if (result) {
			console.log('可以用语音通话') //
			this.enumDevices(); //调用，获取硬件信息
			return true
		} else {
			console.log('不能用语音通话(大概)')
			return this.no_2_show; //将错误信息返回
		}
	}
	//输出兼容性测试的结果
	async checkSystemRequirements() {
		// console.log('sdk的版本是', zg.getVersion());
		try {
			const result = await zg.checkSystemRequirements();
			console.warn('checkSystemRequirements ', result); //输出警告信息。
			if (!result.webRTC) {
				console.error('浏览器不支持webrtc!!');
				this.no_2_show = '不支持webrtc!!'
				return false;
			} else if (!result.videoCodec.H264 && !result.videoCodec.VP8) {
				console.error('浏览器不支持H264和VP8')
				this.no_2_show = '不支持H264和VP8'
				return false;
			} else if (!result.camera && !result.microphones) {
				console.error('未允许使用麦克风摄像头'); //可能的原因：1、没装。2、非本地环境的http环境（不是本地环境需要https）
				this.no_2_show = '未允许使用麦克风摄像头'
				return false;
			} else if (result.videoCodec.VP8) {
				if (!result.screenSharing) {
					console.warn('浏览器不支持屏幕共享');
					this.no_2_show = '不支持屏幕共享'
				}
			} else {
				console.log('不支持VP8，请前往混流转码测试');
				this.no_2_show = '不支持VP8，请前往混流转码测试'
			}
			return true; //环境可用
		} catch (err) {
			console.error('不能够用语音通话的原因是：checkSystemRequirements', err);
			return false;
		}
	}
	// enumDevices获取硬件信息
	async enumDevices() {
		const deviceInfo = await zg.enumDevices();
		this.audioDeviceList = deviceInfo &&
			deviceInfo.microphones.map((item, index) => {
				if (!item.deviceName) {
					item.deviceName = 'microphone' + index;
				}
				console.log('音频设备: ', item.deviceName); //音频设备
				return item;
			});
		this.audioDeviceList.push({
			deviceID: 0,
			deviceName: '禁止'
		});
		this.microphoneDevicesVal = this.audioDeviceList[0].deviceID;
		this.videoDeviceList = deviceInfo &&
			deviceInfo.cameras.map((item, index) => {
				if (!item.deviceName) {
					item.deviceName = 'camera' + index;
				}
				return item;
			});
		this.videoDeviceList.push({
			deviceID: 0,
			deviceName: '禁止'
		});
		this.cameraDevicesVal = this.videoDeviceList[0].deviceID;
	}
	// 进房
	async no_3(roomId, userID, userName, token) {
		console.log('进房参数:', roomId, userID, userName, token);
		try {
			this.isLogin = await zg.loginRoom(roomId, token, {
				userID,
				userName
			});
			console.log('登录进房成功');
		} catch (err) {
			console.log('登录进房报错了');
			console.log(err);
		}
	}

	// 推流
	async no_4(streamID, videoState, audioState) {
		// streamID我的推流id
		const flag = await this.startPublishingStream(streamID, {
			camera: {
				audioInput: this.microphoneDevicesVal, //摄像头媒体
				videoInput: this.cameraDevicesVal,
				video: videoState, //是否开启摄像头
				audio: audioState, //是否使用麦克风
			}
		})
		if (flag) {
			console.log('推流成功,返回我的视频');
			return this.video1 //返回我的的视频
		} else {
			console.log('推流失败')
		}
	}
	// Step4 Start Publishing Stream
	async startPublishingStream(streamId, config) {
		console.log('推流id:' + streamId + '推流配置', config);
		try {
			let localStream = await zg.createStream(config); //等待返回流媒体对象
			zg.startPublishingStream(streamId, localStream, { // 开始推流，将自己的音视频流推送到 ZEGO 音视频云
				videoCodec: this.videoCodec
			});
			this.video1 = localStream;
			console.log('推流返回的媒体流', localStream);
			console.log('推流成功');
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}
	// videoCheckStatus是否开摄像头
	// audioCheckStatus是否开麦克风
	// 拉流，playStreamID对方的推流id
	async no_5(playStreamID, videoCheckStatus, audioCheckStatus) {
		console.log('拉流id:' + playStreamID, videoCheckStatus, audioCheckStatus)
		const flag = await this.startPlay(playStreamID, {
			video: videoCheckStatus,
			audio: audioCheckStatus
		});
		if (flag) {
			console.log('拉流成功,返回他的视频');
			return this.video2; //拉流成功,返回他的视频
		} else {
			console.log('拉流失败')
		}
	}
	// 拉谁的流就填谁的推流id
	//  拉取其他用户的音视频
	// Step5 Start Play Stream
	async startPlay(streamId, options = {}) {
		try {
			this.video2 = await zg.startPlayingStream(streamId, options);
			// that.$refs['playVideo'].$refs.video.srcObject = this.remoteStream;//展示视频
			return true;
		} catch (err) {
			console.log(err)
			return false;
		}
	}
	// 退出通话
	async stop(streamID, streamID2, roomID) {
		let st1 = await zg.stopPublishingStream(streamID); // 根据streamID 停止推流
		console.log('停止推流');
		let st2 = await zg.destroyStream(this.video1); // 销毁媒体流
		console.log('销毁媒体流');
		let st3 = await zg.stopPlayingStream(streamID2); // 停止拉流
		console.log('streamID2');
		let st4 = await zg.logoutRoom(roomID); //退出房间
		console.log('退出房间');
	}
}
export {
	Voice
}
