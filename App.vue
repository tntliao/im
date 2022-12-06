<script>
	// #ifdef APP-PLUS
	const jpushModule = uni.requireNativePlugin("JG-JPush")
	// #endif
	export default {
		onLaunch: function() {
			//#ifdef APP-PLUS
			jpushModule.setLoggerEnable(true);
			// 初始化函数
			jpushModule.initJPushService();
			jpushModule.addConnectEventListener(result => {
				let connectEnable = result.connectEnable
				console.log("jpush连接", connectEnable)
			})
			jpushModule.getRegistrationID(result => {
				console.log(result.registerID, "注册ID.....");
				this.registerID = result.registerID
				uni.setStorageSync('registerID', result.registerID)
			})
			jpushModule.isPushStopped(result => {
				let code = result.code
				console.log('连接状态回调', result)
			});
			// 设置别名
			jpushModule.setAlias({
				'alias': 'coder',
				'sequence': 1
			})
			jpushModule.addNotificationListener(result => {
				let notificationEventType = result.notificationEventType
				let messageID = result.messageID
				let title = result.title
				let content = result.content
				let extras = result.extras
				console.log('通知事件回调', result)
				// 推送一个本地通知
				jpushModule.addLocalNotification({
					messageID,
					title,
					content,
					extras
				})
			})
			//#endif
		},
		onShow: function() {

		},
		onHide: function() {}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './node_modules/uview-ui/index.scss'
</style>
