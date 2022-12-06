import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import utils from '@/common/utils.js'
import header from '@/components/header/header.vue'
import base from '@/common/base.js'
Vue.use(uView);

Vue.prototype.$base = base

let toastImg = (title, icon = 'none', num = 1000) => {
	uni.showToast({
		title,
		icon,
		duration: num,
	})
}
Vue.prototype.$showToast = toastImg


import store from './store'
Vue.prototype.$store = store

// console.log = function() {}

import urlencode from 'urlencode';
Vue.prototype.$urlencode = urlencode

import websocket from '@/methos/webSocket/webSocket.js';
Vue.prototype.$websocket = websocket;

import {
	minixOne
} from '@/methos/minixOne.js';
Vue.mixin(minixOne);

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.utils = utils

import {
	imgJoin
} from '@/methos/ImgSrc.js'
Vue.prototype.imgJoin = imgJoin

Vue.component('Header', header)

// 引用navigate跳转路由方法
import {
	goBack
} from '@/methos/navigate.js'
Object.assign(Vue.prototype, {
	'$goBack': goBack,
});

Vue.prototype.$store.utils = utils
Vue.prototype.$store.$goBack = goBack
Vue.prototype.$store.$showToast = toastImg

const app = new Vue({
	store,
	...App
})
app.$mount()
