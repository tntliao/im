<!-- 有数据的版本 -->
<template>
	<view class="cmp">
		<!-- 内容区 -->
		<view class="content">
			<!-- 头像区 -->
			<view class="head" style="padding: 20rpx 0;">
				<view class="head_content">
					<image :src="item.customer.headimgurl" mode=""></image>
					<view class="head_text">
						<!-- 名称 -->
						<view class="name">{{item.customer.xm}}</view>
						<!-- 时间 -->
						<view class="tips">{{item.created_at}}</view>
					</view>
				</view>
				<!-- <image @click="popupShow=true" src="../../static/imgs/community/more.png"></image> -->
			</view>
			<!-- 文章内容区 -->
			<view class="textOrImg">
				<view class="text">
					<!-- 内容 -->
					<p :class="'line '+(line>4?p:'')">{{item.content}}</p>
					<span v-if="this.line>4" style="color: blue;" @click="changeState">{{state?'展开':'收起'}}</span>
				</view>
				<!-- 图片内容 -->
				<view class="imgs">
					<!-- {{contentImgs}} -->
					<image :class="contentImgs" v-for="(it,index) of item.thumb" :key="index" :src="it.image"
						@click="previewImage(it.image)" />
					<!-- <image v-for="(it,index) of item.thumb" :key="index" :src="it.image" @click="previewImage(it.image)"/> -->
				</view>
			</view>
		</view>
		<!-- 评论区 -->
		<!-- style="border-top: 1px solid rgba(0,0,0,0.1);" -->
		<view>
			<view class="" v-for="(it,key) of item.comment" :key="key">
				<CommentCmp :item="it"></CommentCmp>
			</view>
		</view>
		<!-- 功能区 -->
		<view class="tools">
<!-- 			<view class="tool">
				<image src="../../static/imgs/community/tool1.png"></image>
				<span>转发</span>
			</view> -->
			<view class="tool" @click="popupPlShow=true">
				<image src="../../static/imgs/community/tool2.png"></image>
				<!--评论按钮 -->
				<span>{{item.comment_num || '评论'}}</span>
			</view>
			<!-- 点赞 -->
			<view class="tool" @click="goodClick">
				<image :src="require('../../static/imgs/community/'+good.img)"></image>
				<!-- 点赞按钮 -->
				<span>{{item.agree_num || '赞'}}</span>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup :show="popupShow" mode="bottom" @open="open" @close="popupClose">
			<view class="popup" v-show="popupContent">
				<view class="modules">
					<view class="row" @click="popupContent=false">
						<image src="../../static/imgs/community/popup/pupup2.png" mode=""></image>
						<view>
							<span>屏蔽</span>
							<span class="content_tips">屏蔽这条消息、关键词或用户</span>
						</view>
					</view>
				</view>
				<view class="btn" @click="popupShow=false">取消</view>
			</view>
			<!-- 屏蔽 -->
			<view class="popup" v-show="!popupContent">
				<view class="modules">
					<view class="row" @click="">
						<image src="../../static/imgs/community/popup/pupup3.png" mode=""></image>
						<view>屏蔽xxx</view>
					</view>
					<view class="row" @click="">
						<image src="../../static/imgs/community/popup/pupup4.png" mode=""></image>
						<view>屏蔽关键词</view>
					</view>
					<view class="row" @click="">
						<image src="../../static/imgs/community/popup/pupup5.png" mode=""></image>
						<view>屏蔽此条信息</view>
					</view>
				</view>
				<view class="btn" @click="pingBiCencel">取消</view>
			</view>
		</u-popup>
		<!-- 评论弹出层 -->
		<u-popup :show="popupPlShow" mode="bottom" @close="popupPlShow=false">
			<view class="pl" style="position: fixed;bottom: 0; width: 100%;z-index: 9999;">
				<view class="input">
					<u-textarea :adjust-position="true" class="textarea" v-model="plValue" confirmType="done"
						placeholder="友善评论,文明发言" autoHeight></u-textarea>
					<!-- <textarea placeholder="友善评论，文明发言" border="surround" rows="7" v-model="plValue"></textarea> -->
				</view>
				<view class="">
					<u-button class="custom" shape="circle" :disabled="plDisabled" @click="sendcomment" text="确定">
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import CommentCmp from '@/components/community/CommentCmp.vue'
	import http from '@/common/base.js'
	export default {
		components: {
			CommentCmp
		},
		props: ['item'],
		data() {
			return {
				line: 0, //文章的行数
				p: 'p', //控制行数的样式类
				popupShow: false, //弹出层
				popupContent: true, //弹出层里面的功能切换,true为功能列表，false为详情
				popupPlShow: false, //评论弹出层
				plValue: '', //评论内容
				plDisabled: true,
				// good点赞
				good: {
					// state: true,
					img: 'tool3.png',
					span: '点赞'
				},
				state: true, //true展开、false收起
				list: [],
				contentImgs: 'oneHeightImage', //oneWidthClass,oneHeightClass
			};
		},
		methods: {
			open() {
				console.log('打开');
			},
			lineHeight() {
				uni.createSelectorQuery().in(this).select('.line').boundingClientRect(res => {
					let height = res.height;
					this.line = height / 22 // 22 是因为单位尺寸的适配行高 ，行高为 44rpx , 则这里就为 22px 
				}).exec();
			},
			changeState() {
				this.state = !this.state
				this.p = this.state ? 'p' : ''
			},
			previewImage(img) {
				uni.previewImage({
					urls: [img],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
					}
				});
			},
			popupClose() {
				this.popupShow = false;
				setTimeout(() => {
					this.popupContent = true;
				}, 300); //等弹出层收起再改
			},
			// 屏蔽的取消
			pingBiCencel() {
				this.popupContent = true; //弹出层里面的功能切换
			},
			// 评论
			sendcomment() {
				this.utils.tools.luch_post('/index/Moments/sendcomment', {
					userId: uni.getStorageSync('userId'),
					moments_id: this.item.moments_id,
					content: this.plValue,
				}).then(rs => {
					if (rs.status == 1) {
						let xm = uni.getStorageSync('user').xm
						this.popupPlShow = false
						this.item.comment.push({
							content: this.plValue,
							customer: {
								xm
							}
						});
						this.item.comment_num += 1
						this.plValue = ''; //清除评论文字
					} else {
						console.log('失败');
					}
				})
			},
			// 点赞
			goodClick() {
				this.utils.tools.luch_post('/index/Moments/addagree', {
					userId: uni.getStorageSync('userId'),
					moments_id: this.item.moments_id
				}).then(rs => {
					console.log(rs);
					if (rs.msg == '点赞') {
						this.item.agree_num += 1
						//点赞-改变图片为亮图片
						this.good = {
							// state: false,
							img: 'good-active.png',
						}
					} else {
						this.item.agree_num -= 1
						// 取消点赞
						this.good = {
							// state: true,
							img: 'tool3.png',
						}
					}
				})
			},
			addImgClass() {
				// 判断是一张图片还是多张
				if (this.item.thumb.length == 1) {
					uni.getImageInfo({
						src: this.item.thumb[0].image,
						success: (res) => {
							let {
								width,
								height
							} = res
							if (width > height) {
								this.contentImgs = 'oneWidthImage'
							} else if (width < height) {
								this.contentImgs = 'oneHeightImage'
							} else {
								this.contentImgs = 'manyImage'
							}
						},
						fail: (err) => {
							// 出错了，使用默认样式类
							this.contentImgs = 'manyImage'
						}
					});
				}
			}
		},
		watch: {
			plValue(value) {
				this.plDisabled = value.length > 0 ? false : true
			}
		},
		beforeMount() {
			this.item.thumb.map(x => {
				x.image = this.imgJoin(x.image); //图片拼接
			});
			this.addImgClass();
			this.item.customer.headimgurl = this.imgJoin(this.item.customer.headimgurl); //头像拼接
			// 有没有点过赞？点过就显示
			this.good.img = this.item.is_agree == 0 ? 'tool3.png' : 'good-active.png';
		},
		mounted() {
			// moments_id当前这条动态的id
			this.lineHeight();
			// window.scrollTo(0, 0);
		}
	}
</script>

<style lang="scss" scoped>
	@import './CommunityCmp.scss';
</style>
