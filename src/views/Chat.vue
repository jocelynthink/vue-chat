<template>
	<div class="my-container">
	<nav-item :title=$route.params.userId :isgoback="true" path="/list" type="back"></nav-item>
	<message>
		<message-item v-for="mes in messages" 
				:name="mes.name"
				:src="mes.src"
				:message="mes.message"
				:isleft="mes.isSender"
				:isshowname="mes.isshowname"
				:playaudioid.sync="playaudioid"
			></message-item>
	</message>
	<input-box v-if="isshowinputbox" :isshowfuns="true"></input-box>
	</div>
</template>

<script>
	import headJpg from '../assets/me.jpg'
	import jpg0 from '../assets/images/0.jpg'
	import jpg1 from '../assets/images/1.jpg'
	import jpg2 from '../assets/images/2.jpg'
	import jpg3 from '../assets/images/3.jpg'
	import jpg4 from '../assets/images/4.jpg'
	import jpg5 from '../assets/images/5.jpg'

	import InputBox from '../components/InputBox'
	import NavItem from '../components/NavItem'
	import Message from '../components/Message'
	import MessageItem from '../components/MessageItem'
	
	export default {
		props: {
			isshowinputbox: {
				type: Boolean,
				default: true
			}
		},
		ready () {
			this.$on('playaudio', src => {
				console.log('playAudio');
			});
			this.audio = new Audio();
		},
		data () {
			return {
				playaudioid:'',
				title: this.$parent.showName,
				isshowmedia: false,
				messages: [
					{
						name: 'jocelyn',
						src: headJpg,
						message: {
							type: 'text',
							cont: '你好！'
						},
						isSender: true,
						isshowname: false	
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'text',
							cont: '你在干什么呢？'
						},
						isSender: false,
						isshowname: true	
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'image',
							src: jpg0,
							mediaid: 0
						},
						isSender: false,
						isshowname: true		
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'audio',
							src: 'http://ictt.xidian.edu.cn/yy1.mp3',
							mediaid: 6,
							audiotime: 2
						},
						isSender: false,
						isshowname: true		
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'image',
							src: jpg1,
							mediaid: 1
						},
						isSender: false,
						isshowname: true		
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'audio',
							src: 'http://ictt.xidian.edu.cn/yy.mp3',
							mediaid: 7,
							audiotime: 6

						},
						isSender: true,
						isshowname: true	
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'image',
							src: jpg3,
							mediaid: 3
						},
						isSender: true,
						isshowname: true		
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'video',
							src: 'http://ictt.xidian.edu.cn/aa.mp4',
							mediaid: 2
						},
						isSender: false,
						isshowname: true		
					},
					{
						name: 'kaijun',
						src: headJpg,
						message: {
							type: 'video',
							src: 'http://ictt.xidian.edu.cn/aa.mp4',
							mediaid: 5
						},
						isSender: true,
						isshowname: true		
					}
				]
			}
		},
		methods: {
			goBack() {
				this.$parent.ok = true;
				console.log(this.$parent.showName);
			}
		},
		events: {
			playaudio: function (id) {
				console.log('playaudio' + id);
				this.playaudioid = id;
			}
		},
		components: {
			InputBox,
			NavItem,
			Message,
			MessageItem
		}
	}
</script>

<style>
/*html {
  font-size: 20px;
}
@media only screen and (min-width: 400px) {
  html {
    font-size: 21.33333333px !important;
  }
}
@media only screen and (min-width: 414px) {
  html {
    font-size: 22.08px !important;
  }
}
@media only screen and (min-width: 480px) {
  html {
    font-size: 25.6px !important;
  }
}*/
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
* {
	margin: 0;
	padding: 0;
}
.my-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	box-sizing: border-box;
	line-height: 1;
}
.my-container p{
	margin-bottom: 0 !important;
	line-height: 1.41176471;

}
.chat {
	background:rgb(235,235,235);
	padding: 5px;
	flex:1;
	overflow: scroll;
	font-size: 1rem;
	

}
.message-content {
    padding: .5rem;
    flex:1;
    overflow: scroll;
}
.message {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
}
.message-img img {
	width: 2.7rem;
	height: 2.7rem;
  border-radius: 0.3rem;
}
.right {
    /*justify-content: flex-end;*/
    flex-direction: row-reverse;
}
.message-main {

    /*padding: 10px;*/
    border-radius: 5px;
}
.left  .message-main{
    background: #ffffff;
}
.left  .message-img {
    margin-right: 0.5rem;
}
.right  .message-main{
    background: rgb(162,231,89);
}
.right  .message-img {
    margin-left: 0.5rem;
}

.nike {
    font-size: 10px;
}
.nike-right:first-child {
    text-align: right;
}
</style>