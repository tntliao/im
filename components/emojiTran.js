import emojiData from "@/common/emoji.js";

export default function(msg) {
	const pattern = /\{.*?@/gm;
	const emojiArr = msg.match(pattern);
	if (!emojiArr) return msg;
	const length = emojiArr.length
	for (let i = 0; i < length; i++) {
		const item = emojiArr[i];
		const strL = emojiArr[i].length;
		const emojiIndex = emojiData.findIndex(i => i.title == item);
		if (emojiIndex != -1) {
			const emojiStr = emojiData[emojiIndex].value;
			msg = msg.replace(item, emojiStr);
		}
	}
	return msg;
}
