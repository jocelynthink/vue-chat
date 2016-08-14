<template>
	<div class="MediaMangerBg" >
		<div class="mmbbar">
			<a style="font-family:sans-serif" v-on:click="goBack"> <i class="fa fa-chevron-left" aria-hidden="true"></i> </a>
			<h5>聊天记录</h5>
		</div>
		<media-manger-item  :mediaset="mediaset">
		</media-manger-item>
	</div>
</template>

<script type="es6">
	import jpg0 from '../assets/images/0.jpg'
	import jpg1 from '../assets/images/1.jpg'
	import jpg2 from '../assets/images/2.jpg'
	import jpg3 from '../assets/images/3.jpg'
	import jpg4 from '../assets/images/4.jpg'
	import jpg5 from '../assets/images/5.jpg'

	import headJpg from '../assets/me.jpg'
	import MediaMangerItem from '../components/MediaMangerItem'

	export default {
		data () {
			return {
				mediaset: [
				{
					src:jpg0,
					mediaid: 0,
					type: 'image'
				},
				{
					src:jpg1,
					mediaid: 1,
					type: 'image'

				},
				{
					src:'http://ictt.xidian.edu.cn/aa.mp4',
					mediaid: 2,
					type: 'video'
				},
				{
					src:jpg3,
					mediaid: 3,
					type: 'image'
				},
				{
					src:jpg4,
					mediaid: 4,
					type: 'image'
				},
				{
					src:jpg5,
					mediaid: 5,
					type: 'image'
				}]
			}
		},
		methods: {
			goBack () {
				history.back();
			}
		},
		components: {
			MediaMangerItem
		}
	}
</script>

<style>
.MediaMangerBg{
	background-color: rgba(0,0,0,0.9);
	position: absolute;
	top:0;
	left:0;
	width: 100vw;
	height:100vh;
	z-index:40;
}
.mmbbar {
	background: rgb(55,55,57);
	color: #fff;
	text-align: center;
	font-size: 1.5rem;
	padding: 0.5rem;
}
.mmbbar a {
	color: #fff;
	float: left;
	text-decoration: none;
}
.mmbcont {
 display: flex;
 width: 100%;
 column-gap: .1rem;
 flex-wrap: wrap;
 /*justify-content: space-around;*/
}
li.mmbcontitem {
	width:6.37rem;
	height:6.37rem;
	display: block;
	overflow: hidden;
	margin-bottom: 0.1rem;
}
.mmbcont li:nth-child(4n+1), .mmbcont li:nth-child(4n+2) ,.mmbcont li:nth-child(4n+3){
	margin-right: 0.1rem;
}
/*div.*/
li.mmbcontitem img {
	width: 100%;
	height: 100%;
}
li.mmbcontitem video {
	width: 100%;
	height: 100%;
}
</style>
