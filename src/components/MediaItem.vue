<template>
	<ul class="media" v-bind:style="{left: left+'vw' ,width: width+'vw' }">
		<li class="mediaBg"
				v-for="media in mediaset"
				v-on:click="hiddenMedia"
				v-touch:swipeleft="weipeleft(event,$index)"
				v-touch:swiperight="weiperight(event,$index)"
				v-bind:style="{left: $index*100 + 'vw'}">
				<img v-bind:src="media.src"
				     v-if="media.type==='image'">
				<video-item  v-if="media.type==='video'"
						         :mediasrc="media.src"></video-item>
				<!-- <p>{{$index}}</p> -->
		</li>
	</ul>
	<a class="mediaMg" v-link="{path: '/mediamanger'}">
		<span><i class="fa fa-th" aria-hidden="true"></i></span>
	</a>
</template>

<script type="es6">
	import VideoItem from '../components/VideoItem'

	export default {
		props: {
			mediaset: {
				type: Array
			},
			currentid: '',
			mediatype: {
				type: String
			}
		},
		data () {
			return {
				left: 0,
				width: this.mediaset.length * 100
			}
		},
		ready () {
			console.log('sss');
			this.left = -this.currentid*100
		},
		methods: {
			hiddenMedia() {
				history.back();
			},
			weipeleft (event,index) {
				console.log('left');
				console.log(index);
				console.log(this.mediaset.length);
				if(index === this.mediaset.length - 1){
					console.log("最后面的一个了");
				}else {
					this.left = -(index + 1) * 100 ;
				}
			},
			weiperight (event,index) {
				console.log('right');
				console.log(index);
				if(index ===  0){
					console.log("最后前面的一个了");
				}else {
					this.left = -(index - 1) * 100 ;
				}
				// this.$els.myvideo.pause();
			}
		},
		components: {
			VideoItem
		}
	}
</script>

<style>
.media {
	position: absolute;
	left:0;
	height: 100vh;
	overflow: hidden;
}
.mediaBg {
	background: #000;
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left:0;
	z-index:3;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	z-index: 20;
	overflow: hidden;
}
.mediaMg {
	position: absolute;
	bottom: 1rem;
	right: 0.3rem;
	width: 1.5rem;
	height: 1.5rem;
	border: solid rgba(255,255,255,.5) 1px;
	background-color: rgba(0,0,0,.5);
	display: inline-block;
	z-index: 20;
	text-align: center;
	border-radius: 0.1rem;
}
.mediaBg img {
	background-size: 100% 100%;
}
.mediaMg span{
	cursor:pointer;
}
.mediaMg i{
	color: #fff;
	z-index: 8;
	font-size: 1rem;
	line-height: 1.5rem;
}
.swipeme {
	position: absolute;
	bottom: 0px;
	width: 100vw;
	height: 20vh;
	background: red;
}

</style>
