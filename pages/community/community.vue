<template>
	<view class="app">
		<Header select="4" @toPage="toPage" />
		<view class="block"></view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll" :style="{height:`${scrollHeight}px`}"
			@scrolltolower="lower">
			<view class="CircleOfFriends" v-for="(it,index) of list" :key="index">
				<CommunityCmp :item="it"></CommunityCmp>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import CommunityCmp from '@/components/community/CommunityCmp.vue'
	export default {
		components: {
			CommunityCmp
		},
		data() {
			return {
				list: [], //朋友圈内容
				page: 1, //页码
				scrollTop: 0,
				notify: false,
				message: '没有更多数据了', //提示语句
				headerHeight: 0,
				windowHeight: 0,
				scrollHeight: 0
			}
		},
		mounted() {
			this.getList();

			//拿到视口宽度
			uni.getSystemInfo({
				success: (response) => {
					this.windowHeight = response.windowHeight
				}
			})
			//拿到头部高度
			uni.createSelectorQuery().in(this).select('.header').boundingClientRect(data => {
				this.headerHeight = data.height + 50
				this.scrollHeight = this.windowHeight - this.headerHeight
			}).exec();
		},
		methods: {
			// 滚动到底部时触发
			lower() {
				console.log('触底');
				this.getList();
			},
			// 获取动态列表
			getList() {
				this.utils.tools.luch_get('/index/Moments/index', {
					userId: uni.getStorageSync('userId'),
					page: this.page, //页码
				}).then(response => {
					console.log(response);
					if (response.total > 0) {
						if (response.data.length > 0) {
							this.list.push(...response.data);
							this.page += 1;
						} else {
							uni.showToast({
								title: '当前数据已是最新',
								icon: "none"
							})
						}
					}
				})
			},
			//页面跳转
			toPage(value) {
				if (value == 'community') return;

				if (value == 'index') {
					uni.reLaunch({
						url: '../index/index?userId=' + uni.getStorageSync('userId')
					})
					return
				}
				uni.reLaunch({
					url: '../' + value + '/' + value
				})
			},
			// 添加朋友
			addFriend() {

			},
			qianDao() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.CircleOfFriends {
		margin-top: 10px;
	}

	.block {
		height: 270rpx;
		width: 100vw;
		/* #ifdef APP-PLUS */
		margin-top: 30rpx;
		/* #endif */
	}
</style>
