<template>
	<view class="app">
		<view class="header">
			<view class="retuen_icon" @click="back"></view>
			<view class="authInfo">发红包</view>
		</view>
		<view class="main">
			<view class="count item">
				<text>红包个数</text>
				<text v-if="!many">1&nbsp;个</text>
				<view class="number" v-else>
					<input type="number" v-model="count">个
				</view>
			</view>
			<view class="price item">
				<text>金额</text>
				<view class="value">
					<input type="number" v-model="priceVal">Loo币
				</view>
			</view>
			<view class="item zhufu">
				<textarea placeholder="说的什么吧" v-model="content" maxlength="10"></textarea>
			</view>
			<view class="enterPass">
				<text>交易密码&nbsp;:</text>
				<input type="password" class="password">
			</view>
			<view class="sendBtn" @click="sendHonbao">
				发红包
			</view>
		</view>
	</view>
</template>

<script>
	import {
		sendAjax
	} from "@/common/sendAjax.js"
	export default {
		name: "honbao",
		data() {
			return {
				many: false,
				path: "",
				count: "",
				priceVal: "",
				content: "",
				group_msg: "",
				id: "",
				title: "",
				group_msg: "",
				canSend: true,
			}
		},
		onLoad(props) {
			this.id = props.id;
			this.title = props.name;
			this.path = props.path;
			props.group_msg ? this.group_msg = props.group_msg : "";
			if (props.path == "group_msg") this.many = true;
		},
		mounted() {
			uni.connectSocket({
				url: this.$base.wssUrl,
				success: (res) => {}
			});
			uni.onSocketOpen((res) => {});
			setTimeout(() => {
				let msg = {
					type: "connectdo",
					uid: uni.getStorageSync("userId"),
				};
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
				});
				if (this.group_msg) {
					console.log("群聊");
					let msg1 = {
						type: 'joinGroup',
						groupid: this.id, //群聊id
					}
					uni.sendSocketMessage({
						data: JSON.stringify(msg1)
					});
				}
			}, 500);
		},
		methods: {
			guid(sendId, receiveId) {
				let timeint = parseInt(new Date().getTime() / 1000);
				return (sendId + '-' + timeint + '-xxxyxxxy-' + receiveId).replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});
			},

			back() {
				let url = `/pages/${this.path}/${this.path}?id=${this.id}&name=${this.title}`;
				if (this.many) url += `&group_msg=${this.group_msg}`;
				console.log(url);
				uni.redirectTo({
					url,
				})
			},
			sendHonbao() {
				uni.showLoading({
					title: "Loading",
				})
				if (!this.canSend) return;
				this.canSend = false;
				if (this.content.length > 10) {
					return uni.showToast({
						title: "祝福语最长10个字",
						icon: "none"
					})
				}
				if (Number(this.priceVal) <= 0 || !this.priceVal) {
					return uni.showToast({
						title: "红包金额不能小于0",
						icon: "none"
					})
				}
				let msguuid = this.guid(uni.getStorageSync("userId"), this.id)
				const mine = {
					title: this.content ? this.content : "恭喜发财",
					total: Number(this.priceVal),
					/* 全部，type=1 好友，type=2 群 */
					type: 1,
					/* extend 数据是群红包扩展：money =0 随机，money=1 固定分配 */
					extend: {
						count: this.many ? this.count : 1,
						money: this.many ? 0 : 1,
					},
					status: 0, //领取状态
				}
				let msg;
				if (this.group_msg) {
					msg = {
						type: "groupMessage", //群组
						data: {
							mine: JSON.stringify(mine),
							groupid: this.id, //群组
							msgtype: 6,
							msguuid,
						},
					};
				} else {
					msg = {
						type: "chatMessage",
						data: {
							mine: JSON.stringify(mine),
							to: this.id,
							msgtype: 6,
							msguuid,
						},
					};
				}

				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					success: (res) => {

						const data = {
							msguuid,
							title: this.content ? this.content : "恭喜发财",
							type: this.many ? 2 : 1,
							total: Number(this.priceVal),
							count: this.many ? this.count : 1,
							money: this.many ? 0 : 1,
							userId: uni.getStorageSync("userId")
						}
						setTimeout(() => {
							sendAjax("POST", "/index/hongbao/send", data)
								.then(res => {
									if (res.data.status == 1) {
										uni.hideLoading();
										this.back();
									}
								})
						}, 2500)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.honbao {
		margin-left: 46rpx;
		margin-top: 0 !important;
	}

	.header {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.header .retuen_icon {
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/back.png');
		background-size: cover;
		margin-top: 108rpx;
		margin-left: 40rpx;
	}

	.header .authInfo {
		font-size: 44rpx;
		color: #22345E;
		margin-top: 120rpx;
		margin-left: 168rpx;
	}

	.main {
		padding: 20px;
		box-sizing: border-box;
		position: relative;

		.item {
			height: 80rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #F2F5F8;
			border-radius: 8rpx;
			padding: 0 15px;

			.value,
			.number {
				display: flex;

				input {
					text-align: right;
					width: 200rpx;
					margin-right: 10px;
				}
			}
		}

		.zhufu {
			height: 100rpx;
			border-radius: 10rpx;
			padding: 15px;

			textarea {
				width: 100%;
				height: 100%;
			}
		}

		.enterPass {
			background-color: #F2F5F8;
			margin-top: 20rpx;
			border-radius: 8rpx;
			padding: 0 15px;
			height: 80rpx;
			display: flex;
			align-items: center;

			text {
				margin-right: 15rpx;
			}

			.password {
				display: inline-block;
				height: 100%;
			}
		}

		.sendBtn {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			margin-top: 50rpx;
			width: 500rpx;
			height: 80rpx;
			border-radius: 8rpx;
			text-align: center;
			line-height: 80rpx;
			color: white;
			background-color: #f25542;
		}
	}
</style>
