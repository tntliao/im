/**
 * 使用方法
 *<button @click="$goBack(1,1)">返回 上一级页面</button>
 *<button @click="$goBack(2,'/pages/mine/about')">跳转到 关于我们</button>
 *<button @click="$goBack(3,'/pages/index/index')">跳转到 tabbar 页面</button>
 *<button @click="$goBack(4,'/pages/login/login')">关闭所有页面跳转到 登录</button>
 *<button @click="$goBack(5,'/pages/order/orderList')">关闭当前页，跳转到 订单</button></view>
 */
export function goBack(index, url) {
	if (index == 1) {
		// 关闭当前页，返回上一页面或多级页面。
		let canNavBack = getCurrentPages();
		if (canNavBack && canNavBack.length > 1) {
			uni.navigateBack({
				delta: url,
				animationType: 'pop-out',
				animationDuration: 300
			});
		} else {
			const groupId = uni.getStorageSync('groupId')
			const groupName = uni.getStorageSync('groupName')
			uni.navigateTo({
				url: `/pages/group_msg/group_msg?id=${groupId}&name=${groupName}&group_msg=0`
			});
		}
	} else if (index == 2) {
		// 保留当前页，跳转到非tabbar页面，使用uni.navigateBack可以返回到原页面。
		uni.navigateTo({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	} else if (index == 3) {
		// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
		uni.switchTab({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	} else if (index == 4) {
		// 关闭所有页面，打开到应用内的某个页面。
		uni.reLaunch({
			url: url,
			animationType: 'pop-in',
			animationDuration: 300
		})
	} else if (index == 5) {
		// 关闭当前页面，跳转到应用内的某个页面。
		uni.redirectTo({
			url: url,
		});
	}
}
