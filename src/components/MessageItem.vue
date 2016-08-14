<template>
	<div class="message left" v-if="isleft">
	  <div class="message-img"><img v-bind:src="src" alt=""></div>
	  <div class="message-conts">
      <p class="nike" v-if="isshowname">{{nickname}}</p>
      <div class="message-main">
      	<p v-if="message.type==='text'" class="message-cont">{{message.cont}}</p>
      </div>
      <a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'image'} }"
    	   v-if="message.type==='image'">
    		<img v-bind:src="message.src"  class="message-image">
    	</a>
    	<a v-if="message.type==='audio'">
    		<div  class="message-audio cricleplay"  v-bind:style="{'width':audiowidth+'rem'}"
  					@click="playaudios(message.src,message.mediaid)">
						<div class="small"></div>
						<div class="middle" v-bind:class="{'stopanimate': !(message.mediaid === playaudioid) }"></div>
						<div class="large" v-bind:class="{'stopanimate': !(message.mediaid === playaudioid)}"></div>
						<audio v-bind:src="message.src"
						       v-el:myaudio>
				    </audio>
    				<span>{{message.audiotime + '"'}}</span>
    		</div>
    	</a>
    	<a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'video'} }"
    	   v-if="message.type==='video'">
    		  <video  v-bind:src="message.src"
    					    class="message-video"
    					    v-el:myvideo>
    			</video>
    	</a>
	  </div>
	</div>
	<div class="message right" v-else>
	  <div class="message-img"><img v-bind:src="src" alt=""></div>
	  <div class="message-conts">
      <p class="nike nike-right" v-if="isshowname">{{nickname}}</p>
      <div class="message-main" v-if="message.type==='text'">
      	<p v-if="message.type==='text'" class="message-cont">{{message.cont}}</p>
      </div>
    	<a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'image'} }"
    	   v-if="message.type==='image'">
    		<img v-bind:src="message.src"  class="message-image">
    	</a>
    	<a v-if="message.type==='audio'">
    		<div  class="message-audio cricleplay" v-bind:style="{'width':audiowidth+'rem'}"
    					@click="playaudios(message.src,message.mediaid)">
  						<div class="smallr"></div>
  						<div class="middler" v-bind:class="{'stopanimate': !(message.mediaid===playaudioid)}"></div>
  						<div class="larger" v-bind:class="{'stopanimate': !(message.mediaid===playaudioid)}"></div>
							<audio v-bind:src="message.src"
							       v-el:myaudio>
					    </audio>
    					<span>{{message.audiotime + '"'}}</span>
    		</div>
    	</a>
    	<a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'video'} }"
    	   v-if="message.type==='video'">
    		  <video  v-bind:src="message.src"
    					    class="message-video"
    					    v-el:myvideo>
    			</video>
    	</a>
	  </div>
	</div>
	<!-- <media v-if="isShowMedia" :mediasrc="message.src" ></media> -->
</template>

<script type="es6">
/**
	*	message: 信息类
			type：消息类型
				text:文本
				image:图片
        audio:音频
        video:视频
        mediaid:媒体的id
      cont：文本内容
      src： 图片、音频、视频地址
*/
	export default {
		props: {
			src:{
				type: String,
				require: true
			},
      nickname: {
				type: String,
				require: true,
			},
			message: {
				type: Object,
				require: true
			},
			isleft: {
				type: Boolean,
				require: true
			},
			isshowname: {
				type: Boolean,
				default: false
			},
			playaudioid: {
				default: false
			}
		},
		data () {
			return {
				isShowMedia: false,
				isPlayAudio: false,
				isPlayVedio: false,
				audiowidth: (this.message.audiotime * 2)>16? 16:(this.message.audiotime * 2)
			}
		},
		ready () {
			window.messageAudio = window.messageAudio || new Audio();
			window.isplay = window.isplay || false;
		},
		methods: {
			viewImg: function() {
				console.log(this);
				this.isShowMedia = true;
			},
			playaudios (src,mediaid) {
				console.log(window.messageAudio);
				console.log(this.isPlayAudio);
				console.log(this.$els.myaudio.duration)
				if(src === window.messageAudio.src && this.isPlayAudio){
					window.messageAudio.pause();
					this.isPlayAudio = !this.isPlayAudio;
					this.playaudioid = '';
				}else if(src === window.messageAudio.src && !this.isPlayAudio){
					window.messageAudio.play();
					this.isPlayAudio = !this.isPlayAudio;
					this.playaudioid = mediaid;
				}else {
					window.messageAudio.src=src;
					window.messageAudio.play();
					this.isPlayAudio = true;
					this.playaudioid = mediaid;
					this.$dispatch('playaudio',mediaid);
				}
			},
			playvedio () {
				if(!this.isPlayVedio){
					this.$els.myvideo.play();
				}else{
					this.$els.myvideo.pause();
				}
				this.isPlayVedio = !this.isPlayVedio;
			}
		}
	}
</script>

<style>
	.message-cont{
		padding: 10px;
	}
	.message-image {
		/*padding: 0px;*/
		width:6rem;
		border-radius: .3rem;
	}
	.message-audio {
		display: block;
		width: 6rem;
		height: 2.6rem;
		background: rgb(162,231,89);
		border-radius: .3rem;
	}
	.message-video {
		width: 6rem;
	}
	.left .message-audio {
		background: #ffffff;
		box-sizing: border-box;
    padding-top: .3rem;
	}
	.left .message-audio  span {
		float: right;
		margin-right: -1.3rem;
		font-size: 1rem;
		color: #A2A2A2;
		margin-top:1rem;
	}

	.message-audio span {
		display: inline-block;
		float: left;
		margin-left: -1.3rem;
		margin-top: 1rem;
		font-size: 1rem;
		color: #A2A2A2;
	}

	/*画圆弧左边*/
	.small {
		width: 10px;
		height: 10px;
		border-style: solid;
		border-top-color: transparent;
		border-left-color: transparent;
		border-bottom-color: transparent;
		border-radius: 50%;
		box-sizing: border-box;
		vertical-align: middle;
		display: inline-block;
		color: #A2A2A2;
	}
	.middle {
		width: 20px;
		height: 20px;
		border-style: solid;
		border-top-color: transparent;
		border-left-color: transparent;
		border-bottom-color: transparent;
		border-radius: 50%;
		box-sizing: border-box;
		vertical-align: middle;
		vertical-align: middle;
		display: inline-block;
		margin-left: -20px;
		animation: show2 3s ease-in-out infinite;
		opacity: 1;
		color: #A2A2A2;
	}
	@keyframes show2 {
		0%{
			opacity: 0;
		}
		30%{
			opacity: 1;
		}
		100%{
			opacity: 0;
		}
	}
	.large{
		width: 30px;
		height: 30px;
		border-style: solid;
		border-top-color: transparent;
		border-left-color: transparent;
		border-bottom-color: transparent;
		border-radius: 50%;
		box-sizing: border-box;
		vertical-align: middle;
		display: inline-block;
		margin-left: -29px;
		animation: show3 3s ease-in-out infinite;
		opacity: 1;
		color: #A2A2A2;
	}
	@keyframes show3 {
		0% {
			opacity: 0;
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.stopanimate {
		-moz-animation-name: none;
		-webkit-animation-name: none;
		-ms-animation-name: none;
		animation: none;
	}
	/*画圆弧右边*/
	/*画圆弧*/
	.right .message-audio{
		text-align: end;
    box-sizing: border-box;
    padding-top: .3rem;
	}
	.smallr {
		width: 10px;
		height: 10px;
		border-style: solid;
		border-top-color: transparent;
		/*border-left-color: transparent;*/
		border-right-color:transparent;
		border-bottom-color: transparent;
		border-radius: 50%;
		box-sizing: border-box;
		vertical-align: middle;
		display: inline-block;
		color: #A2A2A2;
	}
	.middler {
		width: 20px;
		height: 20px;
		border-style: solid;
		border-top-color: transparent;
		border-right-color:transparent;
		border-bottom-color: transparent;
		border-radius: 50%;
		box-sizing: border-box;
		vertical-align: middle;
		vertical-align: middle;
		display: inline-block;
		margin-left: -19px;
		animation: show2 3s ease-in-out infinite;
		opacity: 1;
		color: #A2A2A2;
	}
	.larger{
		width: 30px;
		height: 30px;
		border-style: solid;
		border-top-color: transparent;
		border-right-color:transparent;
		border-bottom-color: transparent;
		border-radius: 50%;
		box-sizing: border-box;
		vertical-align: middle;
		display: inline-block;
		margin-left: -30px;
		animation: show3 3s ease-in-out infinite;
		opacity: 1;
		color: #A2A2A2;
	}
	.right .stopanimate{
		-moz-animation-name: none;
		-webkit-animation-name: none;
		-ms-animation-name: none;
		animation: none;
	}
</style>
