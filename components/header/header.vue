<template>
	<view class="header" @click="showMore=false">
		<view class="header_top">
			<view class="title" v-if="showTitle">
				<view class="logo"></view>
				<view class="title_name">LOOIM</view>
			</view>
			<view class="search_input" v-else>
				<input type="text" class="searchInput" placeholder="搜索" v-model="keyword" :showAction="false"
					bgColor="#F2F5F8" @blur="searchFriend()" :focus="true" />
				<image src="../../static/imgs/search.png" @search="search" mode=""></image>
			</view>
			<!-- 在消息、好友列表、群组、社区时显示 -->
			<view v-if="select!=4" class="more_icon" @click.stop="showMore=!showMore"></view>
			<!-- 在社区时显示 -->
			<view v-if="select==4" class="qiandao_icon" @click="$goBack(2,'/pages/sign_in/sign_in')">签到</view>
			<view v-if="select==4" class="add_icon" @click="showAdd=!showMore"></view>
		</view>

		<view class="switchover">
			<view class="msg" :class="select=='1'?'switchover_active':''" @click="toIndex">
				<view class="icon" :class="{active:select==1}"></view>
				<view>消息</view>
			</view>
			<view class="friend" :class="select=='2'?'switchover_active':''" @click="toFriend">
				<view class="icon" :class="{active:select==2}"></view>
				<view>好友列表</view>
				<span v-if="count"></span>
			</view>
			<view class="group" :class="select=='3'?'switchover_active':''" @click="toGroup()">
				<view class="icon" :class="{active:select==3}"></view>
				<view>群组</view>
			</view>
			<view class="community" :class="select=='4'?'switchover_active':''" @click="toCommuntiy">
				<view class="icon" :class="{active:select==4}"></view>
				<view>社区</view>
			</view>
		</view>

		<view class="showMore" v-show="showMore">
			<view class="group_chat" @click="groupChat()">发起群聊</view>
			<view class="line"></view>
			<view class="add_friend" @click="addFriend()">添加朋友<view class="msg_num" v-if="count">{{count}}</view>
			</view>
			<view class="line"></view>
			<view class="group_chat" @click="toAuth()">个人中心</view>
			<view class="line"></view>
			<view @click="toKefu()" style="margin-top: 22rpx;">客服中心</view>
		</view>

		<u-overlay :show="showAdd" opacity="0" @click="showAdd = false">
			<view class="warp">
				<view class="warp_son" style="margin-top: 20rpx;" @click="$goBack(2,'/pages/community/article')">
					<image src="../../static/imgs/community/addText.png" mode=""></image>
					<view class="">写文章</view>
				</view>
				<view class="warp_son" style="margin-bottom: 20rpx;" @click="sendImg">
					<image src="../../static/imgs/community/addImg.png" mode=""></image>
					<view class="">图片</view>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import PubSub from 'pubsub-js'
	export default {
		name: 'Headers',
		props: ['select'],
		data() {
			return {
				showTitle: true, //是否显示标题
				keyword: '',
				showMore: false,
				showAdd: false, //写文章，发图片
				user: uni.getStorageSync('user'),
				count: '', //添加朋友角标人数
				kefuid: 0,
				xm: '',
			}
		},
		methods: {
			searchFriend() {
				this.showTitle = !this.showTitle
				this.keyword = ''
			},
			search() {

			},
			toIndex() {
				this.$emit('toPage', 'index')
			},
			toFriend() {
				this.$emit('toPage', 'friend')
			},
			toGroup() {
				this.$emit('toPage', 'group_chat')
			},
			groupChat() {
				this.showMore = false;
				this.$emit('groupChat', true)
			},
			addFriend() {
				this.$emit('addFriend')
			},
			toAuth() {
				this.$emit('toPage', 'auth')
			},
			//到社区
			toCommuntiy() {
				this.$emit('toPage', 'community')
			},
			// 获取“添加朋友的信息”
			getAddFriend() {
				let that = this;
				that.utils.tools.luch_get('/index/Index/addfpending', {
					userId: this.user.userId
				}).then(rs => {
					this.count = rs.count;
				})

			},
			// 跳转到客服
			toKefu() {
				uni.navigateTo({
					url: `../../pages/msginfo/msginfo?id=${this.kefuid}&name=${this.xm}`
				})
			},
			// 社区发送图片
			sendImg() {
				uni.chooseImage({ //选择图片
					count: 9, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择、摄像头
					success: res => {
						let imgs = res.tempFiles.map(x => x.path);
						this.$store.commit('changeImImgs', imgs); //修改vuex里的数据
						this.$goBack(2, '/pages/community/sendImg');
					}
				})
			}
		},
		mounted() {
			// 获取客服信息
			this.utils.tools.luch_get('/index/Index/getsinfo').then(rs => {
				this.kefuid = rs.userId
				this.xm = rs.xm
			})
			this.getAddFriend()
			PubSub.subscribe('close', (_, data) => {
				this.showMore = false;
			});
		}
	}
</script>

<style lang="scss" scoped>
	.header {

		/* #ifdef APP-PLUS */
		margin-top: 30rpx;
		/* #endif */

		height: 270rpx;
		position: fixed;
		width: 750rpx;
		z-index: 100;
		background: #FFFFFF;
		top: 0;
	}

	.header .header_top {
		width: 100%;
		display: flex;
	}

	.header_top .title {
		font-size: 36rpx;
		font-weight: bold;
		color: #155fd1;
		margin-top: 68rpx;
		margin-left: 40rpx;
		display: flex;
		align-items: flex-end;
	}

	.header_top .title .logo {
		width: 50rpx;
		height: 50rpx;
		background: url('@/static/img/logo.png');
		background-size: cover;
		margin-right: 10rpx;
	}

	.header_top .search_icon {
		position: absolute;
		right: 140rpx;
		top: 48rpx;
		width: 80rpx;
		height: 80rpx;
		background: url(@/static/img/search.png);
		background-size: cover;
	}

	.header_top .more_icon {
		position: absolute;
		right: 40rpx;
		width: 80rpx;
		height: 80rpx;
		top: 40rpx !important;
		background: url(@/static/img/more.png);
		background-size: cover;
	}

	.header .switchover {
		width: 670rpx;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		border-radius: 30rpx;
		background: #F7FBFF;
		font-size: 24rpx;
		color: #AEB5C0;
		margin-left: 40rpx;
		margin-top: 60rpx;
		/* margin-bottom: 28rpx; */
	}

	.switchover .msg {
		width: 182rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		border-radius: 30rpx;
		background-size: cover !important;
	}

	.switchover .msg .icon {
		width: 28rpx;
		height: 28rpx;
		background: url(@/static/img/index_msg.png);
		background-size: cover !important;
		margin-left: 50rpx;
		margin-right: 6rpx;
		background-repeat: no-repeat !important;
	}

	.switchover .msg .icon.active {
		background-image: url(@/static/img/index_msg_active.png) !important;
	}

	.switchover .friend {
		width: 182rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		border-radius: 30rpx;
	}

	.switchover .friend .icon {
		width: 24rpx;
		height: 24rpx;
		background: url(@/static/img/friend.png);
		background-size: cover;
		margin-left: 24rpx;
		margin-right: 6rpx;
		background-repeat: no-repeat !important;
	}

	.switchover .friend .icon.active {
		background-image: url(@/static/img/friend_active.png) !important;
	}

	.switchover .community {
		width: 182rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		border-radius: 30rpx;
	}

	.switchover .community .icon {
		width: 28rpx;
		height: 28rpx;
		background: url(@/static/img/community.png);
		background-size: cover;
		margin-left: 50rpx;
		margin-right: 6rpx;
		background-repeat: no-repeat !important;
	}

	.switchover .community .icon.active {
		background-image: url(@/static/img/community_active.png) !important;
	}

	.switchover .group {
		width: 182rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		border-radius: 30rpx;
	}

	.switchover .group .icon {
		width: 20px;
		height: 24rpx;
		margin-left: 54rpx;
		margin-right: 6rpx;
		background: url(@/static/img/group.png) 0% 0% / cover;
	}

	.switchover .group .icon.active {
		background-image: url(@/static/img/group_active.png);
	}

	.switchover_active {
		color: #4578D1;
		background: #EEF4FF;
	}

	.search_input {
		width: 570rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 48rpx;
		margin-left: 40rpx;
		position: relative;
	}

	.search_input image {
		position: absolute;
		width: 30rpx;
		height: 30rpx;
		top: 30rpx;
		right: 30rpx;
	}

	/*更多*/
	.showMore {
		/* #ifdef APP-PLUS */
		margin-top: 30rpx;
		/* #endif */
		position: fixed;
		top: 140rpx;
		right: 18rpx;
		width: 422rpx;
		height: 340rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 4rpx 56rpx 2rpx rgba(0, 0, 0, 0.16);
		border-radius: 60rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #22345E;
		text-align: center;
	}

	.showMore .group_chat {
		margin-top: 20rpx;
		margin-bottom: 18rpx;
	}

	.showMore .line {
		width: 422rpx;
		height: 2rpx;
		background: #F2F5F8;
	}

	.showMore .add_friend {
		margin-top: 22rpx;
		margin-bottom: 18rpx;
		position: relative;
	}

	/* 红点样式 */
	.msg_num {
		position: absolute;
		top: -12rpx;
		right: 110rpx;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		border-radius: 50%;
		background: #F65959;
	}

	/* 签到 */
	.qiandao_icon {
		position: absolute;
		right: 140rpx;
		top: 40rpx !important;
		width: 80rpx;
		height: 80rpx;
		background: url(@/static/img/search.png);
		background: #F2F5F8;
		border-radius: 26rpx;
		/* 签到文字 */
		font-size: 22rpx;
		color: #B2B9C4;
		line-height: 80rpx;
		text-align: center;
	}

	.add_icon {
		position: absolute;
		top: 40rpx !important;
		right: 40rpx;
		width: 80rpx;
		height: 80rpx;
		background: url(@/static/imgs/community/add.png);
		background-size: cover;
	}

	/* 写文章功能块 */
	.warp {
		width: 238rpx;
		height: 200rpx;
		background: url('@/static/imgs/community/block.png') no-repeat;
		background-size: 100% 100%;
		// border-radius: 35rpx;
		// box-shadow: 0 0 24rpx 4rpx rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		top: 120rpx;
		right: 35rpx;

		.warp_son {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 120rpx;

			image {
				width: 22rpx;
				height: 28rpx;
			}

			view {
				width: 80rpx;
				font-size: 24rpx;
				color: #B2B9C4;
			}
		}
	}

	.searchInput {
		width: 570rpx;
		height: 80rpx;
		background: url('@/static/imgs/Searchbox.png') no-repeat;
		background-size: 100% 100%;
		text-indent: 20rpx;
	}

	.friend {
		position: relative;
	}

	.friend span {
		position: absolute;
		top: 15rpx;
		right: -5rpx;
		width: 20rpx;
		height: 20rpx;
		font-weight: 500;
		color: #ffffff;
		text-align: center;
		border-radius: 50%;
		background: #F65959;
	}
</style>
