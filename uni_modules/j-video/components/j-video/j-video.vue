<template>
	<view class="root" :style="{width,height}">
		<view :style="{width,height}" @click="state=!state" class="box">
			<image class="playIcon" src="../../../../static/play.png" mode="widthFix"></image>
			<image class="preview" v-if="posterUrl" :src="posterUrl" mode="widthFix"></image>
			<image class="preview" v-else="posterUrl" src="../../../../static/defaultPlayer.png" mode="widthFix">
			</image>
		</view>
		<video :id="videoId" :style="{height,width:state?'750rpx':'1rpx'}" @pause="state=0" @timeupdate="timeupdate"
			@fullscreenchange="fullscreenchange" class="video" :src="url"></video>
		<!-- <progress :style="{'top':height,width}" class="progress" :percent="currentTime?parseInt(currentTime/duration*100):0" show-info border-radius="5" active></progress> -->
	</view>
</template>

<script>
	export default {
		computed: {
			posterUrl() {
				const str = "thumb=";
				const index = this.url.indexOf(str);
				if (index == -1) return false;
				const url = this.url.substring(index + str.length);
				if (url == "undefined") {
					return false
				} else {
					return url;
				}
			},
		},
		created() {
			this.videoId = Date.now() + Math.ceil(Math.random() * 10000000) + "";
		},
		mounted() {
			this.VideoContext = uni.createVideoContext(this.videoId)
		},
		methods: {
			fullscreenchange(e) {
				console.log(e.detail.fullScreen);
				this.state = e.detail.fullScreen
			},
			timeupdate(e) {
				console.log(e.detail);
				this.duration = e.detail.duration
				this.currentTime = e.detail.currentTime
			}
		},
		watch: {
			state(state, oldValue) {
				//console.log(state,'state');
				if (!state) {
					this.VideoContext.pause()
				} else {
					this.VideoContext.play()
					setTimeout(() => {
						this.VideoContext.requestFullScreen({
							direction: this.direction
						})
					}, 10)
				}
			}
		},
		data() {
			return {
				VideoContext: {},
				state: false,
				currentTime: 0,
				duration: 0,
				videoId: ''
			};
		},
		props: {
			poster: {
				type: [String, Boolean],
				default () {
					return ''
				}
			},
			url: {
				type: String,
				default () {
					return ''
				}
			},
			direction: {
				type: Number,
				default () {
					return 0
				}
			},
			width: {
				type: String,
				default () {
					return "750rpx";
				}
			},
			height: {
				type: String,
				default () {
					return "450rpx";
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.root {
		position: relative;
		width: 750rpx;
		height: 300px;
		margin: 0 30rpx;
		overflow: hidden;
	}

	.posterImg,
	.video,
	.box {
		display: flex;
		width: 750rpx;
		height: 300px;
		//border: solid 1px red;absolute
		position: absolute;
	}

	.video {
		margin-left: -2000px;
	}

	.posterImg {
		//border: solid red 1px;
	}

	.box {
		justify-content: center;
		align-items: center;
	}

	.playIcon {
		width: 100rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 100;
		transform: translate(-50%, -50%);
	}

	.preview {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 400rpx;
		height: 150rpx;
	}
</style>
