<template>
	<view class="expression">
		<view v-for="(item) in emojis" :key="item.title" class="emoji" @click="emojiClick(item.value)">
			{{item.value}}
		</view>
	</view>
</template>

<script>
	import emojis from "@/common/emoji.js"
	export default {
		name: 'emoji',
		data() {
			return {
				emojis
			};
		},
		methods: {
			emojiClick(item) {
				this.$emit('transmitEmojiClick', item)
			}
		}
	}
</script>

<style>
	/* 20220714  start */
	.expression {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 1vw;
		text-align: center;
		height: 24vh;
		box-sizing: border-box;
	}

	.emoji {
		font-size: 6vw;
		flex-basis: 16.6667%;
		padding: 1vh;
		margin-bottom: 1vh;
		box-sizing: border-box;
	}

	/* end */
</style>
