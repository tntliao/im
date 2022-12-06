<template>
	<view class="sign">
		<view>
			<top_bar title="签到" :route="[4,'/pages/community/community']" right="true"></top_bar>
		</view>
		<!-- 主体 -->
		<view class="subject">
			<view class="top">
				<p>连续签到:{{res.answer_count}}天</p>
				<p>现有龙币：{{res.score}}</p>
			</view>
			<h1 class="title">每天答题</h1>
			<view class="guiZhe">
				社区有奖问答，每天一次，一次10题，
				一共10次(300龙币)，一共100道题，
				每天10道题目答对奖励30龙币
				（活动时间开放：未到活动时间）
			</view>
			<view class="start"  @click="start">
				开始答题
			</view>
			<view class="ps">
				<view class="p" v-for="(it,index) of ps" :key="index">
					<p>{{it.p1}}</p>
					<p>{{it.p2}}</p>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				ps: [{
						p1: '1 关于答题',
						p2: '每日答题可以学习区块链知识，并且能获取高额的算力奖励。'
					},
					{
						p1: '2 进入答题',
						p2: '每日总共可领取1次奖励，次日0点重置，若已领取当日所有奖励，则当日无法再进行作答，每日0点系统会重置答题卡为1张。'
					},
					{
						p1: '3 答题',
						p2: '题目分为判断题，单选题和多选题。用户需在每道题倒计时结束前提交回答，若超时未提交，则视为本题回答错误。用户答题时，判断颗和单选题在用户点击选项后将直接提交回答，多选题则需用户选中多个选项后再点击下方的提交按钮答错不消耗次数不奖励。'
					},
				],
				res:{}
			}
		},
		methods: {
			start() {
				// 0能答题，1不能答题
				if(this.res.is_answer==0){
					this.$goBack(2, '/pages/sign_in/sign_start');
				}else{
					// 不能答题了
					this.$showToast('今天不能答题了');
				}
			},
			ajax() {
				this.utils.tools.luch_get('/index/Question/answerrecord').then(rs => {
					console.log(rs);
					this.res=rs
				})
			}
		},
		mounted() {
			this.ajax();
		}

	}
</script>
<style lang="scss" scoped>
	.sign {
		color: #333333;
	}

	.subject {
		width: 90vw;

		.top {
			display: flex;
			justify-content: space-between;

			p {
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
			}
		}

		.title {
			font-size: 76rpx;
			font-weight: 400;
			color: #333333;
			text-align: center;
			margin-top: 60rpx;
		}

		.guiZhe {
			max-width: 158rpx*2.8;
			min-height: 54rpx*2;
			font-size: 12rpx*2;
			font-weight: 400;
			text-align: center;
			padding: 20rpx 0 40rpx 0;
		}

		.start {
			background: #F65959;
			width: 171rpx*2;
			height: 31rpx*2;
			background: #F65959;
			border-radius: 15rpx*2;
			line-height: 31rpx*2;
			text-align: center;
			font-size: 11rpx*2;
			color: #FEFEFE;
		}

		.ps {
			.p {
				margin: 40rpx;
			}
		}
	}

	// margin:0auto;
	.subject,
	.guiZhe,
	.start {
		margin: 0 auto;
	}
</style>
