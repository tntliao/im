<!-- 群聊天 -->
<template>
	<view class="app">
		<view class="header">
			<view class="retuen_icon" @click="returnToBack()"></view>
			<view class="title" v-if="!updateTitle">{{title}}</view>
			<input placeholder="请输入新的群昵称" class="header_input" v-model="titleValue" focus @blur="changTitle" v-else />
			<view class="edit_icon" @click="updateTitle=true"></view>
			<view class="more_icon" @click="toGroupInfo()"></view>
		</view>

		<view style="height: 200rpx"></view>
		<scroll-view id="scrollview" scroll-y enable-flex
			:style="{height:scrollContentHeight+'px',marginBottom:keyHeight+'px'}" :scroll-top="scrollTop"
			@click="scrollViewClick" @scroll="scrollChange">
			<view class="list">
				<view class="msg_list" v-for="(item,i) in msgList" :key="i">
					<view class="msg" v-if="item.uid!=user.userId">
						<image :src="item.avatar" class="avatar"></image>
						<view class="info">
							<!-- 对方发的 -->
							<view class="user">{{item.userName}}</view>
							<!-- @touchstart="touchStartFun" @touchend="touchEndFun($event,item.recordid,false)" -->
							<view class="msg_info" v-if="item.msgtype==1" :id="'msg' + item.recordid"
								@longtap="touchEndFun($event,item.recordid,false)">
								{{decrypt(item.msg)}}
							</view>
							<view class="msg_info msg_image" v-else-if="item.msgtype==2" @click="pieview(item.msg)">
								<img :src="item.msg"></img>
							</view>
							<!-- 视频 -->
							<view class="" v-else-if="item.msgtype==3" @click="pieVideoView(item.msg)">
								<j-video :url="item.msg" height="300rpx" width="450rpx"></j-video>
							</view>
							<!-- 文件 -->
							<view class="" v-else-if="item.msgtype==4" @click="pieVideoView(item.msg)">
								<view @click="checkFiles(item.msg)" class="fileClassImage">
									<view class="fileName">
										{{item.filename}}
									</view>
									<view class="">
										<image src="../../static/imgs/wenhao.png" mode=""></image>
									</view>
								</view>
							</view>
							<view v-else-if="item.msgtype==6" @click="receive(item.msguuid,0)">
								<honbao :active="getStatus(item)" :title="getTitle(item)"></honbao>
							</view>
						</view>
					</view>

					<view class="my_msg" v-else>
						<!-- 我发的 -->
						<view class="msg_info" v-if="item.msgtype==1" :id="'msg' + item.recordid"
							@longtap="touchEndFun($event,item.recordid)">
							{{decrypt(item.msg)}}
						</view>

						<view class="msg_info msg_image" v-else-if="item.msgtype==2" @click="pieview(item.msg)">
							<img :src="item.msg"></img>
						</view>
						<!-- 视频 -->
						<view class="" v-else-if="item.msgtype==3" @click="pieVideoView(item.msg)">
							<j-video :url="item.msg" height="300rpx" width="450rpx"></j-video>
						</view>
						<!-- 文件 -->
						<view class="" v-else-if="item.msgtype==4" @click="pieVideoView(item.msg)">
							<view @click="checkFiles(item.msg)" class="fileClassImage">
								<view class="fileName">
									{{item.filename}}
								</view>
								<view class="">
									<image src="../../static/imgs/wenhao.png" mode=""></image>
								</view>
							</view>
						</view>
						<!-- <view v-else-if="item.msgtype==6" @click="receive(item.msguuid,1)"> -->
						<view v-else-if="item.msgtype==6">
							<honbao :active="getStatus(item)" :title="getTitle(item)"></honbao>
						</view>
					</view>
				</view>
				<view style="height: 10rpx;"></view>
			</view>
		</scroll-view>
		<view style="height: 120rpx"></view>
		<view class="my_keyboard" style="z-index: 999;">
			<view class="send_class" :style="{marginBottom:keyHeight+'px' }">
				<view class="yuyin"></view>
				<input class="input" v-model="msg" @confirm="uploadAllSuccess" @input="changeInput" @focus="changeinfo"
					@click="inputClick" @blur="cursorss" :focus="focus" :adjust-position="false" />
				<view class="face" @click="openEmoji"></view>
				<view class="add" v-if="!showSend" @click="addMore()"></view>
				<view class="send" v-else @click="uploadAllSuccess"></view>
			</view>

			<!-- 20220715 jiajia start 增加表情 -->
			<view v-show="emojiShow">
				<emoji @transmitEmojiClick="emojiClick"></emoji>
			</view>
			<!-- end -->

			<!--功能列表-->
			<view class="function" v-show="showPopup">
				<!-- 发送图片 -->
				<view class="info" @click="msgtype=2" v-for="(vo,i) in [1]" :class="i%4==0?'info1':'info2'">
					<u-upload class="block" v-model="imageValue" @afterRead='uploadAll'>
						<image src="../../static/img/image.png"></image>
						<view>相册</view>
					</u-upload>
				</view>
				<!-- 发送视频 -->
				<view class="info" @click="msgtype=3" v-for="(vo,i) in [1]" :class="i%4==0?'info1':'info2'">
					<u-upload class="block" :fileList="videoValue" @afterRead="uploadAll" name="2" multiple
						:maxCount="10" accept="video">
						<image src="../../static/img/video.png"></image>
						<view>发送视频</view>
					</u-upload>
				</view>

				<!-- 发送文件 -->
				<view class="info" @click="infoNodeClcik" v-for="(vo,i) in [1]" :class="i%4==0?'info1':'info2'">
					<!-- #ifdef APP-PLUS -->
					<image src="../../static/img/files.png"></image>
					<view>发送文件</view>
					<nk-select-file v-model="show" @confirm="getPath"></nk-select-file>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<u-upload class="block" :fileList="fileValue" accept="file" @afterRead="uploadAll">
						<image src="../../static/img/files.png"></image>
						<view>发送文件</view>
					</u-upload>
					<!-- #endif -->
				</view>
				<!-- 这里 -->
				<!-- <view class="info info1" @click="toHonbao">
					<image src="../../static/img/honbao.png"></image>
					<view class="viewBlock">红包</view>
				</view> -->
			</view>
		</view>
		<!-- 没有撤回功能 -->
		<view class="tips" id="tips" :style="{left: tipsOffset.left + 'px',top: tipsOffset.top + 'px'}"
			v-show="tipsShow">
			<text class="hidden" @click="tipsClicck">复制</text>
			<text @click="deleteMsg">删除</text>
			<view class="subscript" :class="{ leftActive: leftActive, rightActive: rightActive,topActive:topActive }">
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/base.js'
	import websocket from '@/methos/webSocket/webSocket.js'
	import emoji from "@/components/emoji/emoji.vue";
	import emojiData from "@/common/emoji.js";
	import emojiTran from "@/components/emojiTran.js"

	import {
		sendAjax
	} from "@/common/sendAjax.js"
	export default {
		components: {
			emoji,
		},
		data() {
			return {
				msgList: [],
				msg: '',
				// sendMsg: "",
				groupId: '',
				title: '',
				user: uni.getStorageSync('user'),
				height: 0, //屏幕可用高度
				scrollTop: 0,
				recordid: 0,
				imageValue: '',
				videoValue: [],
				fileValue: [],
				showSend: false, //是否显示发送图标
				showPopup: false,
				updateTitle: false,
				titleValue: '', //新的群聊名称
				sendData: {},
				msgtype: 1, //发送的消息类型
				emojiShow: false, //是否显示表情
				resStart: 0, //input光标位置
				//tips的位置
				tipsOffset: {
					left: 0,
					top: 0,
				},
				//是否显示复制和撤回
				tipsShow: false,
				//按下和抬起的时间
				touchData: {
					start: 0,
					end: 0,
				},
				//触发的功能的id
				handleRecordidId: 0,
				//角标样式
				leftActive: false,
				rightActive: false,
				tipsFlag: false,
				topActive: false,
				//是否获取焦点
				focus: false,
				//隐藏聊天页面的滚动条高度
				hiddenScrollHeight: 0,
				//聊天内容高度
				scrollContentHeight: 0,
				keyHeight: 0,
				show: false,
				is_member: 0,
				HeaderHeight: 0,
			}
		},
		watch: {
			msgList(value) {
				this.$nextTick(() => {
					this.scrollToBottom()
				})
			},
			// 监视内容发生变化
			msg(newValue) {
				//如果字符的长度发生改变就显示发送按钮 A
				if (newValue.length) this.showSend = true;
				else this.showSend = false;
			},
		},
		onLoad(opations) {
			if (opations.id && opations.name) {
				this.groupId = opations.id * 1
				this.title = opations.name
			}
			// 为1就是从群组进来的群组聊天
			// 为0就是从主页进来的群组聊天
			if (opations.group_msg) {
				this.group_msg = opations.group_msg
			}

			const data = {
				userId: this.user.userId,
				groupid: this.groupId
			}
			sendAjax("POST", "index/Index/getgroupone", data)
				.then(res => {
					if (res.data.status == 1) {
						this.is_member = res.data.is_member
						if (!this.is_member) {
							return uni.showToast({
								title: "您当前已被移出群聊",
								icon: "none"
							})
						}
					}
				})
		},
		async mounted() {
			// #ifdef APP-PLUS
			uni.onKeyboardHeightChange(res => {
				this.keyHeight = res.height
			})
			// #endif

			websocket.create(); //websocket打开
			setTimeout(() => {
				let msg = {
					type: 'connectdo',
					uid: this.user.userId //用户id
				}
				uni.sendSocketMessage({ //通过 WebSocket 连接发送数据
					data: JSON.stringify(msg)
				});
			}, 500)
			setTimeout(() => {
				let msg1 = {
					type: 'joinGroup',
					groupid: this.groupId, //群聊id
				}
				uni.sendSocketMessage({
					data: JSON.stringify(msg1)
				});
			}, 500)
			// 实时监听聊天消息，并且加以处理展示获取信息
			uni.onSocketMessage(res => {
				//接收消息
				let item = JSON.parse(res.data)
				console.log(item, '群聊天onSocketMessage');
				if (!this.is_member) return;
				// 心跳检测
				if (item.type == "ping") return;
				if (item.type == "friend") return;
				if (item.msgtype == 5) {
					let param = this.$websocket.getRoute(); //获取路由
					// console.log('我传递的参数', param)
					// 语音通话
					let roomId = `f_${item.sender}_${this.userId}`;
					this.$goBack(4,
						`/pages/voice/voice?id=${item.sender}&name=${item.sender_xm}&voice=2&roomid=${roomId}&backRoute=${param}`
					);
				} else {
					// 这个消息是  文件类型名？
					let filename = "";
					if (item.msgtype == 4) {
						let content = item.content;
						item.content = content.split("?")[0];
						filename = content.split("?")[1].replace("filename=", "");
					}
					let data = {
						uid: item.sender,
						groupid: item.groupid,
						userName: item.sender_xm,
						msg: item.content,
						recordid: item.recordid * 1,
						avatar: item.sender_avtar,
						msgtype: item.msgtype,
						filename,
						msguuid: item.msguuid,
					};
					if (data.groupid == this.groupId) {
						this.msgList.push(data);
						uni.setStorageSync(this.groupId + '_' + this.user.userId, this.msgList);
					}
				}
			});
			this.getFriendCache();
			const HeaderHeight = await this.getNodeHeight('.header')
			this.HeaderHeight = HeaderHeight;
			const bottomHeight = await this.getNodeHeight('.send_class')
			uni.getSystemInfo({
				success: (response) => {
					this.scrollContentHeight = response.windowHeight - HeaderHeight - bottomHeight - 20
				}
			})
			this.toBottom();
		},
		methods: {
			decrypt(msg) {
				return emojiTran(msg);
			},
			getStatus(item) {
				const obj = JSON.parse(item.msg);
				return obj.status * 1 ? true : false;
			},
			getTitle(item) {
				const obj = JSON.parse(item.msg);
				return obj.title;
			},
			receive(msguuid, index) {
				uni.redirectTo({
					url: `/pages/receive/receive?path=group_msg&id=${this.groupId}&name=${this.title}&group_msg=${this.group_msg}&msguuid=${msguuid}&index=${index}`,
					fail(err) {
						console.log(err);
					}
				})
			},
			toHonbao() {
				const id = this.groupId;
				const name = this.title;
				const group_msg = this.group_msg;

				uni.redirectTo({
					url: `/pages/honbao/honbao?path=group_msg&id=${id}&name=${name}&group_msg=${group_msg}`,
				})
			},
			getPath(event) {
				for (let i = 0; i < event.length; i++) {
					const {
						url,
						name
					} = event[i]
					console.log(url, name);
					this.msgtype = 4;
					this.uploadAllSuccess(url, name)
				}
			},

			infoNodeClcik() {
				// #ifdef APP-PLUS
				this.show = true
				// #endif
			},
			//获取元素高度
			toBottom() {
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#scrollview').boundingClientRect(data => {
						uni.pageScrollTo({
							scrollTop: data.height,
							duration: 0
						}); //到指定位置
					}).exec();
				})
			},
			//拿到元素高
			getNodeHeight(selectNode) {
				return new Promise((resolve, reject) => {
					uni.createSelectorQuery().in(this)
						.select(selectNode)
						.boundingClientRect((data) => {
							resolve(data.height)
						}).exec();
				})
			},
			//手指抬起
			touchEndFun(event, id, flag = true) {
				const clientY = event.changedTouches[0].clientY;
				//触发节点的offset left top
				let nodeOffsetLeft = event.currentTarget.offsetLeft
				let nodeOffsetTop = event.currentTarget.offsetTop
				//保存当前id
				this.handleRecordidId = id;
				//保存当前时间戳
				this.touchData.end = Date.now();
				this.tipsShow = true;
				let tipsWidth = 100;
				uni
					.createSelectorQuery()
					.in(this)
					.select("#" + event.target.id)
					.boundingClientRect((data) => {
						let msgWidth = data.width; //信息的宽度
						let widthFlag = data.width > 80 //标识
						//tips的left值
						let left = flag ?
							widthFlag ? (tipsWidth - data.width) / 2 : (tipsWidth - data.width) :
							//我的逻辑
							widthFlag ? (tipsWidth - data.width) / 2 : (tipsWidth - (data.width *
								1.5)) //对方的逻辑
						//tips left值
						this.tipsOffset.left = nodeOffsetLeft - left;
						//tips的top值
						if (clientY < 180) {
							this.tipsOffset.top = nodeOffsetTop - this.hiddenScrollHeight + this.HeaderHeight + data
								.height * 2.15;
							this.topActive = true;
						} else {
							this.tipsOffset.top = nodeOffsetTop - this.hiddenScrollHeight;
							this.topActive = false;
						}
						//如果是我的信息，进行一些操作
						flag ? this.tipsFlag = true : this.tipsFlag = false;
						//角标样式
						/* left 是我的 right是对方的 */
						if (flag) {
							widthFlag ? this.leftActive = false : this.leftActive = true;
							this.rightActive = false;
						} else {
							widthFlag ? this.rightActive = false : this.rightActive = true;
							this.leftActive = false;
						}
					})
					.exec();
			},
			deleteMsg() {
				//找到当前触发的信息
				let index = this.msgList.findIndex(
					(item) => item.recordid == this.handleRecordidId
				);
				const item = this.msgList[index];
				const data = {
					msguuid: item.msguuid,
					userId: uni.getStorageSync("userId"),
					groupid: this.groupId,
				}
				sendAjax("POST", "/index/Index/delgmsgone", data)
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							this.msgList.splice(index, 1);
							uni.setStorageSync(this.groupId + '_' + this.user.userId, this.msgList)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
						this.tipsShow = false
					})
			},
			//点击复制
			async tipsClicck() {
				//找到当前触发的信息
				let index = this.msgList.findIndex(
					(item) => item.recordid == this.handleRecordidId
				);
				//复制内容
				uni.setClipboardData({
					data: this.msgList[index].msg,
					success: (response) => {
						uni.showToast({
							title: "复制成功",
							duration: 1000,
							icon: "none",
						});
						this.tipsShow = false;
					},
				});
			},
			//聊天页面被点击
			scrollViewClick() {
				this.emojiShow = false;
				this.showPopup = false;
				// this.tipsShow = false;
			},
			//聊天界面滚动条发送变化
			scrollChange(event) {
				//滚动条到顶部的距离
				this.hiddenScrollHeight = event.detail.scrollTop
				// this.showPopup = false; //关闭发送文件
				// this.emojiShow = false; //关闭表情
				this.tipsShow = false; //关闭功能框
			},
			/* 文本框点击 */
			inputClick() {
				this.tipsShow = false; //关闭功能框
				this.emojiShow = false;
			},
			//打开表情
			openEmoji() {
				if (this.emojiShow) {
					this.focus = true;
					this.emojiShow = false;
				} else {
					this.emojiShow = true;
				}
				this.tipsShow = false; //关闭功能框
				this.showPopup = false;
			},
			//传递给封装的组件 表情被点击
			emojiClick(emoji) {
				// 返回获取从0到光标位置的字符串
				let str = this.msg.substring(0, this.resStart);
				// this.sendMsg = this.msg.replace(str, str + emoji);
				// 将表情插入指定位置
				this.msg = this.msg.replace(str, str + emoji);
				// 光标向后移动两位
				this.resStart += 2; //光标加(表情是占两个位置)
				this.cursor = true; //设置聚焦
			},
			// 失去焦点时获取当前光标的位置
			cursorss(event) {
				this.focus = false;
				this.resStart = event.target.cursor; //保存光标位置
			},
			//通过浏览器打开链接
			checkFiles(path) {
				let url = path.replace(/\\/g, "/"); //将反斜杠转换为正斜杠
				plus.runtime.openURL(url);
			},
			//视频预览
			pieVideoView(url) {
				this.videoContext = uni.createVideoContext("video_play");
				// 进入全屏状态
				this.videoContext.requestFullScreen();
			},
			//返回
			returnToBack() {
				uni.closeSocket()
				// 为1就是从群组进来的群组聊天
				// 为0就是从主页进来的群组聊天
				if (this.group_msg == 1) {
					this.$goBack(4, `/pages/index/index?userId=${this.user.userId}&goGo =/pages/group_chat/group_chat`)
				} else {
					this.$goBack(4, `/pages/index/index?userId=${this.user.userId}`)
				}
			},
			//前往群组详情页
			toGroupInfo() {
				uni.navigateTo({
					url: '../group_info/group_info?groupId=' + this.groupId
				})
			},
			// 连接
			openSocket() {
				uni.closeSocket()
				uni.connectSocket({
					url: http.wssUrl,
					success: res => {
						console.log(res)
						console.log('....websocket正在连接')
					}
				})
			},
			//缓存
			cacheData(data) {
				// console.log('data=>', data)
				let that = this
				//如果存在跟当前用户的聊天记录
				if (uni.getStorageSync(that.groupId + '_' + that.user.userId)) {
					let msgList = uni.getStorageSync(that.groupId + '_' + that.user.userId); //获得聊天记录
					msgList.push(data) //将新的数据缓存进去
					that.msgList = msgList
					uni.setStorageSync(that.groupId + '_' + that.user.userId, msgList)
				} else {
					let msgList = []
					msgList.push(data)
					that.msgList = msgList
					uni.setStorageSync(that.groupId + '_' + that.user.userId, msgList)
				}
			},

			//获取缓存中的聊天记录
			getFriendCache() {
				// this.msgList = uni.getStorageSync(this.groupId) || []
				let that = this
				let dataList = uni.getStorageSync(this.groupId + '_' + that.user.userId) || []
				let recordid = 0;
				if (dataList.length > 0) recordid = dataList[dataList.length - 1].recordid

				let msguuid;
				if (dataList.length > 0) {
					msguuid = dataList[dataList.length - 1].msguuid;
				} else {
					msguuid = uni.getStorageSync(that.groupId + '_' + that.user.userId + "_lastuuid")
				}
				that.utils.tools.luch_get('index/Index/getgnewg', {
					userId: that.user.userId,
					groupid: that.groupId,
					recordid,
					msguuid,
				}).then(res => {
					if (res.length > 0 && this.is_member) {
						res.forEach(item => {
							let filename = "";
							if (item.msgtype == 4) {
								let content = item.content;
								item.content = content.split("?")[0];
								filename = content.split("?")[1].replace("filename=",
									"");
							}
							let data = {
								uid: item.sender,
								msg: item.content,
								userName: item.sender_xm,
								recordid: item.recordid,
								avatar: item.sender_avtar,
								msgtype: item.msgtype,
								filename,
								msguuid: item.msguuid
							}
							try {
								if (!dataList.find(item => data.msguuid == item.msguuid)) {
									dataList.push(data);
								}
							} catch (e) {}
						})
						that.msgList.push(...dataList)
						that.recordid = that.msgList[that.msgList.length - 1].recordid
						uni.setStorageSync(that.groupId + '_' + that.user.userId, that.msgList)
					} else {
						// console.log('走缓存');
						that.msgList = uni.getStorageSync(that.groupId + '_' + that.user.userId) || []
						// console.log(that.msgList)
						if (that.msgList.length) {
							that.recordid = that.msgList[that.msgList.length - 1].recordid
						}
					}

				})
			},
			//uuid
			guid(sendId, receiveId) {
				let timeint = parseInt(new Date().getTime() / 1000);
				return (sendId + '-' + timeint + '-xxxyxxxy-' + receiveId).replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},

			//跳转到页面底部
			scrollToBottom() {
				let view = uni.createSelectorQuery().in(this).select("#scrollview"); //得到节点

				//
				view.fields({
					size: true,
					scrollOffset: true
				}, data => {
					this.scrollTop = (data.scrollHeight + data.height) //修改scrollTop为节点的高度

				}).exec();
			},
			//方法1、 选完文件的回调
			uploadAll(event) {
				let filePath = '';
				let url = this.$base.apiUrl;
				let userId = uni.getStorageSync("userId");
				let msgtype = this.msgtype;
				if (msgtype == 2) {
					filePath = event.file.url
					url += 'api/Upload/picone';
				} else if (msgtype == 3) {
					filePath = event.file[0].url
					url += 'api/Upload/video';
				} else if (msgtype == 4) {
					filePath = event.file.url
					url += 'api/Upload/file';
				}
				this.showPopup = false;
				uni.showLoading({
					title: '发送中...',
					mask: true
				});
				uni.uploadFile({
					url, // 仅为示例，非真实的接口地址
					filePath,
					name: 'file',
					formData: {
						userId,
					},
					success: (res) => {
						console.log(res, '视频==========');
						if (JSON.parse(res.data).code == -1) {
							this.$showToast("发送失败," + JSON.parse(res.data).msg);
						} else {
							// 如果是文件
							if (msgtype == 3) {
								let thumb = JSON.parse(res.data).thumb;
								this.uploadAllSuccess(JSON.parse(res.data).path, thumb); //文件
							} else if (msgtype == 4) {
								let filename = JSON.parse(res.data).filename;
								this.uploadAllSuccess(JSON.parse(res.data).path, filename); //文件
							} else {
								this.uploadAllSuccess(JSON.parse(res.data).path); //调用方法
							}
						}
					},
				});
			},
			transcoding(str) {
				const length = emojiData.length;
				for (let i = 0; i < length; i++) {
					const itemEmoji = emojiData[i].value
					const index = str.indexOf(itemEmoji);
					if (index != -1) {
						const strArr = str.split("");
						strArr.splice(index + 1, 1);
						strArr[index] = emojiData[i].title;
						str = strArr.join("");
					}
				}
				return str;
			},
			//方法2、 选择上传完文件后的回调，发送websocket
			uploadAllSuccess(url, filename) {
				uni.hideLoading();
				this.emojiShow = false;
				if (!this.is_member) {
					this.msg = ""; //文本消息清空
					return uni.showToast({
						title: "您当前已被移出群聊",
						icon: "none"
					})
				}

				let that = this;
				let msgtype = that.msgtype;
				if (msgtype == 1 && !this.msg.trim()) return this.msg = '';
				let mine = '';
				if (msgtype == 3) {
					mine = `${url}?thumb=${filename}`
				} else if (msgtype == 4) {
					mine = `${url}?filename=${filename}`
				} else if (msgtype == 1) {
					mine = this.transcoding(this.msg);
				} else {
					mine = url; //图片、视频
				}
				let msguuid = this.guid(uni.getStorageSync("userId"), that.groupId)
				// websocket发送的消息数据
				let msg = {
					type: "groupMessage", //群组
					data: {
						mine,
						groupid: that.groupId, //群组
						msgtype,
						msguuid,
					},
				};
				// 通过 WebSocket 连接发送数据
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					success: (res) => {
						let msg = this.msgtype == 1 ? that.msg : url;
						that.recordid += 1; //每次自己发消息的时候需要给recordid+1
						if (this.msgtype == 3) msg = mine;
						let data = {
							uid: uni.getStorageSync("userId"),
							userName: that.user.xm,
							msg,
							recordid: that.recordid,
							avatar: that.user.avatar,
							msgtype,
							filename,
							msguuid
						};
						try {
							if (!this.msgList.find(item => data.msguuid == item.msguuid)) {
								this.msgList.push(data);
							}
						} catch (e) {}
						// console.log(that.user.userId)
						uni.setStorageSync(that.groupId + "_" + that.user.userId, that.msgList); //群组
						if (msgtype == 1) {
							that.msg = ""; //文本消息清空
							that.showSend = false;
						}
						this.msgtype = 1;
						return;
					},
					fail: (err) => {
						console.log('websocket发送文件图片视频消息失败')
						that.openSocket();
					},
				})
			},
			//输入框内容发生改变
			changeInput() {
				// console.log(this.msg)
				if (this.msg != '') {
					this.showSend = true
				} else {
					this.showSend = false
				}
			},
			changeinfo() {
				this.showPopup = false
			},
			//图片预览
			pieview(url) {
				// 预览图片
				let arr = []
				arr.push(url)
				uni.previewImage({
					urls: arr,
					longPressActions: {
						itemList: ['保存图片'],
					}
				});
			},
			//选择更多文件
			addMore() {
				if (this.showPopup) {
					this.focus = true;
					this.showPopup = false;
				} else {
					this.showPopup = true;
				}
				this.emojiShow = false;

			},
			//修改群昵称
			changTitle() {
				if (!this.titleValue) {
					this.updateTitle = false
					return
				}
				let that = this
				let url = '/index/Index/savegname'
				let userId = that.user.userId
				let groupid = that.groupId
				let groupname = that.titleValue
				that.utils.tools.luch_get(url, {
					userId,
					groupid,
					groupname
				}).then(res => {
					if (res.status == 1) {
						uni.showToast({
							title: '修改成功',
							icon: "none"
						})
						that.title = that.titleValue
						this.updateTitle = false
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						this.updateTitle = false;
					}
				})
			}
		}
	}
</script>
<style>
	.app {
		width: 100%;
		min-height: 100vh;
		max-height: 100vh;
	}

	.header {
		position: fixed;
		top: 0;
		width: 100%;
		height: 20vw;
		display: flex;
		align-items: center;
		z-index: 100;
		background: #FFFFFF;
	}

	.header .retuen_icon {
		/* #ifdef APP-PLUS */
		margin-top: 30rpx;
		/* #endif */
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/back.png');
		background-size: cover;
		/* margin-top: 108rpx; */
		margin-left: 20rpx;
	}

	.header .title {
		/* #ifdef APP-PLUS */
		margin-top: 60rpx;
		/* #endif */
		width: 400rpx;
		font-size: 44rpx;
		font-weight: bold;
		color: #22345E;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* margin-top: 118rpx; */
		margin-left: 40rpx;
	}

	.header .header_input {
		/* #ifdef APP-PLUS */
		margin-top: 60rpx;
		/* #endif */
		width: 360rpx;
		height: 78rpx;
		border: 1rpx solid #dcdcdc;
		border-radius: 10rpx;
		padding: 0 20rpx;
		/* margin-top: 100rpx; */
		margin-left: 40rpx;
	}

	.header .edit_icon {
		/* #ifdef APP-PLUS */
		margin-top: 60rpx;
		/* #endif */
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/edit_1.png');
		background-size: cover;
		/* margin-top: 108rpx; */
		margin-left: 20rpx;
	}

	.header .more_icon {
		/* #ifdef APP-PLUS */
		margin-top: 60rpx;
		/* #endif */
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/more.png');
		background-size: cover;
		/* margin-top: 108rpx; */
		margin-left: 20rpx;
	}

	/*聊天内容*/
	.msg_list {
		width: 730rpx;
		margin-left: 10rpx;
		margin-top: 20rpx;
	}

	/*好友发送的消息*/
	.msg {
		min-height: 80rpx;
		display: flex;
		font-size: 22rpx;
		align-items: flex-start;
	}

	.msg .avatar {
		width: 86rpx;
		height: 86rpx;
		border-radius: 50%;
		margin-left: 20rpx;
	}

	.msg img {
		max-width: 400rpx;
	}

	.msg .info {
		margin-left: 10rpx;
	}

	.msg .user {
		margin-left: 10rpx;
	}

	.msg .msg_info {
		max-width: 450rpx;
		background: #E2E6EC;
		border-radius: 0rpx 34rpx 34rpx 34rpx;
		padding: 26rpx 18rpx 18rpx 40rpx;
		font-size: 28rpx;
		color: #22345E;
		word-break: break-word;
	}


	/*我发的消息*/
	.my_msg {
		min-height: 80rpx;
		display: flex;
		flex-direction: row-reverse;
		font-size: 24rpx;
		align-items: flex-start;
		margin-right: 20rpx;
	}

	.my_msg .msg_info {
		max-width: 450rpx;
		background: #4578D1;
		border-radius: 40rpx 40rpx 0 40rpx;
		padding: 26rpx 40rpx 18rpx 28rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		word-break: break-word;
	}

	.my_msg img {
		max-width: 400rpx;
	}

	/*输入框*/
	.my_keyboard {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;
		/* padding-top: 28rpx; */
		border-top: 1rpx solid rgba(220, 220, 220);
		background: #FFFFFF;
	}

	.send_class {
		width: 750rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
	}

	.function {
		width: 750rpx;
		height: 24vh;
		box-sizing: border-box;
		background: #F7F7F7;
		filter: blur(undefinedpx);
		display: flex;
		flex-wrap: wrap;
	}

	.function .info {
		text-align: center;
		margin-top: 70rpx;
	}

	.function .info image {
		width: 108rpx;
		height: 108rpx;
		margin-bottom: 8rpx;
	}

	.info1 {
		margin-left: 42rpx;
	}

	.info2 {
		margin-left: 78rpx;
	}

	.yuyin {
		width: 52rpx;
		height: 52rpx;
		background: url(@/static/img/language.png);
		background-size: cover;
		margin-left: 40rpx;
	}

	.input {
		width: 460rpx;
		height: 80rpx;
		margin-left: 12rpx;
		margin-top: 10rpx;
		padding-left: 30rpx;
		margin-bottom: 10rpx;
		border-radius: 15rpx;
		background: #F2F5F8;
		font-size: 40rpx;
	}

	.my_keyboard .face {
		width: 62rpx;
		height: 62rpx;
		background: url('@/static/img/bq.png');
		background-size: cover;
		margin-left: 22rpx;
	}

	.my_keyboard .add {
		width: 52rpx;
		height: 52rpx;
		background: url('@/static/img/add.png');
		background-size: cover;
		margin-left: 10rpx;
	}

	.send {
		width: 38rpx;
		height: 28rpx;
		background: url('@/static/img/send.png');
		background-size: cover;
		margin-left: 20rpx;
	}

	/* ******************************video视频展示 ***********************/
	.video {
		width: 400rpx;
		height: 300rpx;
	}

	/* ******************************文件展示 ***********************/
	.fileClassImage {
		width: 350rpx;
		height: 104rpx;
		display: flex;
		justify-content: space-between;
		border: 1rpx solid rgba(0, 0, 0, 0.1);
		padding: 10rpx;
		border-radius: 15rpx;
	}

	.fileName {
		color: #333;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		padding: 0 10rpx;
		width: 272rpx;
		line-height: 50rpx;
		color: gray;
		/* 自动换行 */
		word-break: break-all;
		display: -webkit-box;
		/* //显示4行内容 */

		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		box-orient: vertical;
		overflow: hidden;
	}

	.fileClassImage image {
		width: 78rpx;
		height: 104rpx;
	}

	.tips {
		width: 100px;
		height: 65px;
		position: absolute;
		z-index: 999;
		border-radius: 15px;
		background: white;
		color: #5f6c80;
		padding: 10px 5px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		box-shadow: 0px 0px 4px 2px rgb(0 0 0 / 10%);
		flex-direction: column;
	}

	.tips text {
		padding: 10px 0;
		display: inline-block;
		width: 100%;
		text-align: center;
		border-bottom: 2px solid #f8f7fa;
		border: 0;
	}

	.tips text:nth-of-type(1) {
		border-bottom: 2rpx solid #f8f7fa;
	}

	.tips .subscript {
		display: inline-block;
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 10px;
		height: 10px;
		transform: translate(-50%, 50%) rotate(135deg);
		background: white;
		z-index: -1;
		box-shadow: 3px -4px 6px -1px rgb(0 0 0 / 10%);
	}

	.tips .subscript.leftActive {
		left: 70% !important;
	}

	.tips .subscript.rightActive {
		left: 30% !important;
	}

	.tips .subscript.topActive {
		box-shadow: 0px 6px 6px -1px rgb(0 0 0 / 10%);
		top: -10px !important;
	}

	.function .info {
		width: 130rpx;
	}
</style>
