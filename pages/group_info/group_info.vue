<!-- 聊天 -->
<template>
	<view class="app">
		<view class="header">
			<view class="return" @click="returnToBack()"></view>
			<view class="title">聊天信息</view>
			<view class="search_btn" @click="searchShow = true" v-if="!searchShow">
				<image src="../../static/imgs/search.png" mode=""></image>
			</view>
		</view>
		<view class="search" v-if="searchShow">
			<input type="text" v-model="searchVal" placeholder="搜索账号" />
			<image src="../../static/imgs/search.png" @click="searchNumber()" mode=""></image>
		</view>
		<view class="user_list">
			<view class="user" v-for="(vo,i) in groupInfo.memberlist" :key="vo.userId">
				<image class="headImage" :src="vo.headimgurl"></image>
				<view class="userName">{{vo.xm}}</view>
				<image v-if="owner_id==userId && vo.userId!=owner_id" class="deleteUser"
					src="../../static/imgs/error.png" @click="showDeleteUser=true,deleteUserId=vo.userId" mode="">
				</image>
			</view>
			<image src="../../static/img/yq.png" v-if="!searchShow" class="yq" @click="invitation"></image>
			<!-- <view class="more" v-if="groupInfo.memberlist && groupInfo.memberlist.length>14">查看更多群成员></view> -->
		</view>
		<view class="line"></view>
		<view class="change">
			<view class="clear" @click="clearList">
				清空记录
			</view>
			<!-- 目前暂时只有群友退群，没有群主解散群 -->
			<view class="delete" v-if="owner_id!=userId" @click="showDelete=true">
				退出群聊
			</view>
			<view class="exit delete" v-if="isShowExit && owner_id==userId" @click="showDelete=true">
				退出群聊
			</view>
		</view>
		<!-- 群主删除群的功能 -->
		<u-popup :show="showDelete" mode="center">
			<view class="isdelete">
				<view class="title">{{owner_id==userId?'确认解散群?':'确认退出?'}}</view>
				<view class="btn">
					<view class="cancel" @click="showDelete=false">取消</view>
					<view class="ok" @click="exitGroup(owner_id==userId)">确认</view>
				</view>
			</view>
		</u-popup>
		<!-- 踢人 -->
		<u-popup :show="showDeleteUser" mode="center">
			<view class="isdelete">
				<view class="title">确认将该成员移除本群?</view>
				<view class="btn">
					<view class="cancel" @click="showDeleteUser=false">取消</view>
					<view class="ok" @click="deleteUser()">确认</view>
				</view>
			</view>
		</u-popup>
		<!-- 修改群名 -->
		<u-popup :show="showUpdate" mode="center" bgColor="transparent">
			<view class="updateEdit">
				<view class="title">修改{{updateTitle}}</view>
				<u-input placeholder="请输入内容" border="surround" v-model="updateValue" class="input" clearable>
				</u-input>
				<view class="update_btn">
					<view @click="showUpdate=false">取消</view>
					<view @click="updateGroup()">确认</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		sendAjax
	} from "@/common/sendAjax.js"
	export default {
		data() {
			return {
				groupId: 0,
				userId: uni.getStorageSync('userId'),
				groupInfo: {},
				showUpdate: false,
				updateValue: '',
				updateTitle: '',
				updateType: '',
				showDelete: false,
				showDeleteUser: false,
				deleteUserId: '', //“被踢人”的userId
				owner_id: '', //群主id
				searchVal: "",
				searchShow: false,
				copyGroupInfo: [],
				isShowExit: false,
			}
		},
		onLoad(opations) {
			if (opations.groupId) this.groupId = opations.groupId
		},
		beforeMount() {
			this.getGroupInfo()
		},
		methods: {
			searchNumber() {
				//把好友列表数据拷贝一份
				if (this.copyGroupInfo.length == 0)
					this.copyGroupInfo.push(...this.groupInfo.memberlist);

				//恢复数据
				if (!this.searchVal.trim())
					return this.getGroupInfo();
				/* 清空数据 */
				this.groupInfo.memberlist = [];
				/* 创建一个数组保存找到的数据 */
				const newArr = [];
				/*  */
				this.copyGroupInfo.forEach((item) => {
					if (item.userId == this.searchVal || item.xm.indexOf(this.searchVal) != -1) {
						newArr.push(item);
					}
				})
				this.groupInfo.memberlist.push(...newArr);
			},
			clearList() {
				const msgList = uni.getStorageSync(this.groupId + '_' + this.userId) || [];
				if (msgList.length > 0) {
					const lastItem = msgList[msgList.length - 1];
					uni.setStorageSync(this.groupId + "_" + this.userId + "_lastuuid", lastItem['msguuid']);
					/* --------- */
					const data = {
						userId: this.userId,
						groupid: this.groupId,
						msguuid: lastItem['msguuid'],
					}
					uni.showLoading({
						title: "Loading",
						mask: true
					})
					sendAjax("POST", "index/Index/delgmsgall", data)
						.then(res => {
							uni.hideLoading();
							if (res.data.status == 1) {
								/* ---------- */
								uni.removeStorageSync(this.groupId + "_" + this.userId);
								uni.showToast({
									title: "清除成功",
									icon: "none"
								})
								/* ----------- */
								setTimeout(() => {
									uni.redirectTo({
										url: "/pages/index/index"
									})
								}, 300)
							}
							uni.hideLoading();
						})

				}
			},
			// 踢人
			deleteUser() {
				this.utils.tools.luch_post('/index/Index/delgropmb', {
					userId: this.userId,
					groupid: this.groupId,
					meberid: this.deleteUserId
				}).then(rs => {
					this.$showToast(rs.msg);
				})
				// 寻找下标
				let index = this.groupInfo.memberlist.findIndex(x => {
					return x.userId == this.deleteUserId
				})
				if (index >= 0) {
					this.groupInfo.memberlist.splice(index, 1);
				} //删除
				this.showDeleteUser = false; //关闭弹窗
			},
			returnToBack() {
				this.$goBack(1, 1)
			},
			//获取群组信息
			getGroupInfo() {
				let that = this
				let url = '/index/Index/getallgropmb'
				that.utils.tools.luch_get(url, {
					userId: that.userId,
					groupid: that.groupId
				}).then(res => {
					if (res.status == -1) {
						return uni.showToast({
							title: "您已被踢出群聊",
							icon: "none"
						})
					}
					that.groupInfo = res
					const length = this.groupInfo.memberlist.length
					if (length == 1) this.isShowExit = true;
					this.owner_id = res.owner_id //群主id
				})
			},
			//要修改的内容
			updateInfo(title, type) {
				this.updateTitle = title
				this.updateType = type
				this.showUpdate = true
				this.updateValue = ''
			},
			//修改信息
			updateGroup() {
				let that = this
				let url = '';
				let data = {};
				if (!that.updateValue) {
					uni.showToast({
						title: '请输入要修改的内容',
						icon: "none"
					})
					return
				}
				if (that.updateType == 'name') {
					url = '/index/Index/savegname'
					data = {
						userId: uni.getStorageSync('userId'),
						groupid: that.groupId,
						groupname: that.updateValue
					}
				} else if (that.updateType == 'notice') {
					url = "/index/Index/savedes"
					data = {
						userId: uni.getStorageSync('userId'),
						groupid: that.groupId,
						des: that.updateValue
					}
				} else {
					url = "/index/Index/saveunickname"
					data = {
						userId: uni.getStorageSync('userId'),
						groupid: that.groupId,
						nickname: that.updateValue
					}
				}

				that.utils.tools.luch_get(url, data).then(res => {
					if (res.status == 1) {
						uni.showToast({
							title: '修改成功',
							icon: "none"
						})
						that.showUpdate = false
						that.getGroupInfo()
					}
				})
			},

			//退出群聊
			exitGroup(flag) {
				let that = this
				let url = '/index/Index/usoutgrop'
				that.utils.tools.luch_get(url, {
					userId: that.userId,
					groupid: that.groupId
				}).then(res => {
					if (res.status == 1) {
						uni.showToast({
							title: '退出群聊成功',
							icon: "none"
						})
						that.showDelete = false
						uni.reLaunch({
							url: '../group_chat/group_chat'
						})
					}
				})
			},

			//邀请好友加入群聊
			invitation() {
				uni.reLaunch({
					url: '../friend/friend?isGroupChat=' + true + '&type=' + 2 + '&groupId=' + this.groupId +
						'&groupName=' + this.groupInfo.groupname
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
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		margin-bottom: 80rpx;
		position: relative;
	}

	.header .return {
		width: 80rpx;
		height: 80rpx;
		background: url('@/static/img/back.png');
		background-size: cover;
		margin-top: 108rpx;
		margin-left: 40rpx;
	}

	.header .search_btn {
		height: 40rpx;
		width: 40rpx;
		position: absolute;
		top: 80rpx;
		right: 30rpx;
	}

	.header .search_btn image {
		width: 100%;
		height: 100%;
	}

	.header .title {
		font-size: 44rpx;
		font-weight: bold;
		color: #22345E;
		margin-top: 118rpx;
		margin-left: 166rpx;
	}

	.search {
		width: 670rpx;
		margin: 0 auto;
		position: relative;
	}

	.search input {
		width: 670rpx;
		height: 80rpx;
		background: url('@/static/imgs/Searchbox.png') no-repeat;
		background-size: 100% 100%;
		text-indent: 20rpx;
	}

	.search image {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: 20rpx;
		right: 30rpx;
	}

	/*群聊用户列表*/
	.user_list {
		width: 100%;
		/* max-height: 640rpx; */
		display: flex;
		flex-wrap: wrap;
		background: #FFFFFF;
	}

	.user_list .user {
		margin-bottom: 20rpx;
		position: relative;
		width: 150rpx;
	}

	.headImage {
		width: 104rpx;
		height: 104rpx;
		border-radius: 32rpx;
		margin: 20rpx 24rpx 0 24rpx;
	}

	/*踢人*/
	.deleteUser {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		background: gray;
		border-radius: 35rpx;
		top: 0;
		right: 0;
	}

	.user_list .user .userName {
		width: 100rpx;
		font-size: 20rpx;
		text-align: center;
		color: #22345E;
		margin: 16rpx auto 0 auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.user_list .yq {
		padding: 10rpx;
		width: 104rpx;
		height: 104rpx;
		margin-top: 30rpx;
		margin-left: 20rpx;
	}

	.user_list .more {
		width: 100%;
		font-size: 24rpx;
		color: #AEB5C0;
		text-align: center;
	}

	/*分割线*/
	.line {
		margin-top: 20rpx;
		width: 750rpx;
		height: 4rpx;
		background: #F2F5F8;
	}

	/*群组信息*/
	.group {
		width: 100%;
		margin-top: 20rpx;
		background: #FFFFFF;
	}

	.group .group_info {
		position: relative;
		width: 680rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 35rpx;
		display: flex;
		border-bottom: 2rpx solid rgba(192, 192, 192, 0.6);
	}

	.group view:last-child {
		border-bottom: none;
	}

	.group_info view:last-child {
		position: absolute;
		right: 20rpx;
		font-size: 26rpx;
		color: rgba(128, 128, 128);
	}

	.group_avatar {
		position: relative;
		width: 680rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 35rpx;
		display: flex;
		border-bottom: 2rpx solid rgba(192, 192, 192, 0.6);
	}

	.group_avatar .avatar+view {
		position: absolute;
		right: 20rpx;
	}

	/* 群公告 */
	.announcement {
		width: 680rpx;
		margin-left: 35rpx;
		margin-top: 8rpx;
	}

	.announcement_info {
		font-size: 22rpx;
		color: rgba(192, 192, 192);
		line-height: 50rpx;
	}

	.announcement_info text {
		font-size: 24rpx;
		color: black;
	}

	.operation {
		width: 100%;
		margin-top: 20rpx;
		background: #FFFFFF;
	}

	.operation view {
		width: 680rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: red;
		text-align: center;
		margin: 0 auto;
		border-bottom: 2rpx solid rgba(192, 192, 192, 0.6);
	}

	.operation view:last-child {
		border-bottom: none;
	}

	/*修改框*/
	.updateEdit {
		width: 600rpx;
		height: 300rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.updateEdit .title {
		width: 500rpx;
		font-size: 30rpx;
		color: rgba(169, 169, 169);
		text-align: center;
		margin: 20rpx auto;
	}

	.updateEdit .input {
		width: 500rpx;
		margin: 50rpx auto 40rpx auto;
	}

	.updateEdit .update_btn {
		width: 400rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 100rpx;
	}

	.updateEdit .update_btn view {
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 10rpx;
		background: rgba(220, 220, 220);
	}

	.change {
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 50rpx;
	}

	.clear {
		width: 264rpx;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: #c4c4c4;
		border-radius: 36rpx;
		opacity: 1;
	}

	/*删除*/
	.delete {
		width: 264rpx;
		height: 78rpx;
		line-height: 78rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: #F65959;
		border-radius: 36rpx;
		opacity: 1;
		margin-top: 20rpx;
	}

	/*删除退出确认*/
	.isdelete {
		position: relative;
		width: 590rpx;
		height: 222rpx;
	}

	.isdelete .title {
		position: absolute;
		top: 54rpx;
		font-size: 36rpx;
		color: #666666;
		width: 100%;
		text-align: center;
	}

	.btn {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 72rpx;
		display: flex;
		align-items: center;
	}

	.btn .cancel {
		width: 50%;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		color: #333333;
		text-align: center;
		border-top: 1rpx solid #F3F3F3;
	}

	.btn .ok {
		width: 50%;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		background: #4578D1;
	}
</style>
