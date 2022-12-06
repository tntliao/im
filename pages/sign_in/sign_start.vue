<template>
	<view class="sign">
		<view>
			<top_bar title="答题" right="true"></top_bar>
		</view>
		<!-- 主体 -->
		<view class="subject">
			<view class="content">
				<view class="title">答题时间: {{time}}秒</view>
				<!--题目-->
				<view class="topic">{{list.question_title}}</view>
				<view class="btns">
					<view v-for="(it,index) of list.choice" :class="it.class" @click="clickBtn(it,index)" :key="index">
						<p>
							<!-- <span>{{it.choice_name}}</span> -->
							<!-- :&nbsp; -->
							{{it.choice_title}}
						</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 按钮样式
				time: 60,
				list: {},
				msg: '', //弹窗内容
				lv: function() {}, //倒计时
				flag: true,
			}
		},
		methods: {
			// 答题完成/时间结束
			overlay() {
				this.$showToast(this.msg, +'1秒后自动返回到签到页');
				setTimeout(() => {
					this.$goBack(4, '/pages/sign_in/sign_in');
				}, 1000);
			},
			countDown() {
				this.lv = setInterval(() => {
					if (this.time > 0) {
						this.time -= 1;
					} else {
						clearInterval(this.lv);
						// 失败
						this.msg = '时间到!'
						this.overlay();
					}
				}, 1000);
			},
			clickBtn(it, index) {
				if (this.flag) {
					this.flag = false
					this.list.choice[index].class = 'btn btn-active'
					let data = {
						userId: uni.getStorageSync('userId'),
						question_id: this.list.question_id, //题目id
						answer: it.choice_name
					}
					this.utils.tools.luch_post('/index/Question/answer', data).then(res => {
						this.msg = res.msg;
						this.overlay();
						clearInterval(this.lv); //关闭倒计时
					})
				}
			},
			// 路由守卫
			ajax() {
				this.utils.tools.luch_get('/index/Question/answerrecord').then(rs => {
					if (rs.is_answer)
						this.$goBack(4, '/pages/sign_in/sign_in');
				})
			}
		},
		mounted() {
			this.utils.tools.luch_get('/index/Question/index', {
				page: 1
			}).then(res => {
				console.log(res);
				res.data.forEach((item, index) => {
					item.choice.map(x => {
						x.class = 'btn'
					})
					this.list = item
				})
			})
			this.ajax();
			this.countDown();
		}

	}
</script>
<style lang="scss" scoped>
	.sign {
		color: #333333;
	}

	.subject {
		background: #F2F5F8;
		width: 335rpx*2;
		border-radius: 17rpx*2;
	}

	.content {
		width: 90%;
		padding: 20rpx*2 0;

		.title {
			font-size: 15rpx*2;

		}

		.topic {
			padding: 20rpx*2 0;
		}

		.btns {
			.btn {
				width: 301rpx*2;
				min-height: 34rpx*2;
				word-break: break-all; //自动换行
				background: #F2F5F8;
				border: 1rpx*2 solid #4578D1;
				border-radius: 17rpx*2;
				margin-bottom: 20rpx*2;
				display: flex;
				align-items: center;

				p {
					width: 270rpx*2;
					margin: 0 auto;
					display: flex;
					align-items: center;

					span {
						font-size: 40rpx;
						color: #4578D1;
					}
				}
			}

			.btn-active {
				background: #f65959 !important;
				border: none !important;
				color: #F2F5F8 !important;
			}
		}
	}

	// margin:0auto;
	.subject,
	.content,
		{
		margin: 0 auto;
	}

	/***************回答正确与错误*********************/
	.warp {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		.rect {
			width: 295px;
			height: 111px;
			background: #FFFFFF;
			box-shadow: 0px 1px 6px 1px rgba(22, 105, 233, 0.16);
			border-radius: 4px 4px 4px 4px;
			opacity: 1;

			.quest {
				text-align: center;
				font-size: 18px;
				font-weight: 400;
				color: #666666;
				-webkit-background-clip: text;
				padding: 29px 0;
			}
		}
	}

	.ubtn {
		background: #4578D1;
		border: 0;
		color: #fff;
		font-size: 14px;
	}
</style>
