<template>
	<view class="container">
		<view class="back" @click="back">
			<svg t="1662109113567" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
				p-id="19892" width="200" height="200">
				<path d="M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z" fill="#dbdbdb" p-id="19893">
				</path>
			</svg>
		</view>
		<view class="arc">
		</view>
		<view class="main">
			<view class="title">
				<view class="publish">{{honbaoInfo.sender}}的红包</view>
				<view class="detail">
					{{honbaoInfo.title}}
				</view>
			</view>
			<view class="value">
				{{jiequ(honbaoInfo.total)}}元
			</view>
			<view class="user" v-for="item in detail">
				<!-- <image class="avatar" src="../../static/code.png" mode=""></image> -->
				<view class="content">
					<view class="left">
						<text class="name">{{item.receiver}}</text>
						<text class="time">{{item.receive_time}}</text>
					</view>
					<view class="right">
						<text class="price">{{item.money}}元</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		sendAjax
	} from "@/common/sendAjax.js"
	export default {
		data() {
			return {
				path: "",
				receiver: "",
				numVal: "",
				priceVal: "",
				content: "",
				group_msg: "",
				honbaoInfo: {
					count: "", //数量
					receiver: "", //接受者
					sender: "", //发送者
					title: "", //标题
					total: "", //金额
					type: "", //个人红包还是群红包 
				},
				detail: {}
			}
		},
		onLoad(props) {
			this.friendId = props.id;
			this.title = props.name;
			this.path = props.path;
			props.group_msg ? this.group_msg = props.group_msg : "";
			sendAjax("POST", "/index/hongbao/info", {
					msguuid: props.msguuid
				})
				.then(res => {
					this.honbaoInfo = {
						...res.data.data
					}
					this.detail = {
						...res.data.data.detail.data
					}
				}).catch(err => {
					console.log(err);
				});
			sendAjax("POST", "/index/hongbao/grab", {
				msguuid: props.msguuid,
				userId: uni.getStorageSync("userId") + ""
			}).then(res => {
				console.log(res);
			})
		},
		methods: {
			jiequ(str) {
				/* let newStr = str.split("").reverse().join("");
				return newStr.substring(4).split("").reverse().join(""); */
				return str;
			},
			back() {
				let url = `/pages/${this.path}/${this.path}?id=${this.friendId}&name=${this.title}`;
				if (this.path == "group_msg") url += `&group_msg=${this.group_msg}`;
				uni.redirectTo({
					url,
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;

		.back {
			position: absolute;
			left: 20rpx;
			top: 20rpx;

			svg {
				width: 30rpx;
			}
		}

		.arc {
			width: 100%;
			height: 350rpx;
			margin-top: -170rpx;
			border-radius: 0 0 40% 40%;
			background-color: #f25542;
		}

		.main {
			margin-top: 70rpx;

			.title {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.publish {
					font-weight: bold;
					font-size: 50rpx;
				}

				.detail {
					color: #c4c4c4;
				}
			}

			.value {
				font-size: 80rpx;
				color: #d1ac75;
				font-weight: bold;
				line-height: 80rpx;
				text-align: center;
				margin: 50rpx 0;
			}

			.user {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin: 0 20px;
				padding: 10rpx 0rpx;
				border-bottom: 1rpx solid rgba(0, 0, 0, .1);

				.avatar {
					width: 80rpx;
					height: 80rpx;
				}

				.content {
					width: 630rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						flex-direction: column;
						margin-left: 10rpx;

						.time {
							margin-top: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
