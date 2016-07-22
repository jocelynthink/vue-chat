<template>
	<div class="video-class">
		<video  v-bind:src="mediasrc" 
					  autoplay="{{isAutoPlay}}"
					  v-el:myvideo
					  v-on:progress="progressing"
					  v-on:canplay="canplays">
		</video>
		<div class="progress">
			<span>
				<a v-on:click.stop="playvideo">
					<i class="fa fa-play" aria-hidden="true" v-if="!isPalyVideo"></i>
					<i class="fa fa-pause" aria-hidden="true" v-if="isPalyVideo"></i>
				</a>
			</span>	
			<span v-text="currentTime"></span>						
			<span v-text="duration"></span>
			<div class="progress1">
				<div  class="progress2" 
				      v-bind:style="{left: left  +'rem'}"
				      @mousedown.stop="startDrag" @touchstart.stop="startDrag"
				      @mousemove.stop="onDrag" @touchmove.stop="onDrag"
				      @mouseup.stop="stopDrag" @touchend.stop="stopDrag" @mouseleave.stop="stopDrag"
				      >
				</div>
			</div>	
		</div>
	</div>
</template>
	
<script>
	export default {
		props: {
			mediasrc: {
				type: String
			}
		},
		data () {
			return {
				isAutoPaly: false,
				currentTime: '00:00',
				duration: '00:00',
				isPalyVideo: false,
				left: 0,
				width: 100,
	      dragging: false,
	      start: 0
			}
		},
		ready () {
			this.currentTime = this.changeTime(this.$els.myvideo.currentTime);
		},
		methods: {
			playvideo () {
				if(!this.isPalyVideo){
					this.$els.myvideo.play();
				}else {
					this.$els.myvideo.pause();
				}
				this.isPalyVideo = !this.isPalyVideo;
			},
			progressing () {
				var temp = this.$els.myvideo.duration,
						scale = this.$els.myvideo.currentTime/temp;
				this.left = scale* (11.5-0.5)/11.5 ;
				this.currentTime = this.changeTime(this.$els.myvideo.currentTime);
			},
			canplays () {
				console.log('canplay...');
				this.duration = this.changeTime(this.$els.myvideo.duration);
			},
		  changeTime(iNum) {
				var iH = Math.floor(iNum/3600);
				var iM = Math.floor(iNum%3600/60);
				var iS = Math.floor(iNum%60);
				if(iH===0){
					return this.toZero(iM) + ':' + this.toZero(iS);
				}else {
					return this.toZero(iH) + ':' + this.toZero(iM) + ':' + this.toZero(iS);
				}
			},
			toZero ( iNum ) {
				if(iNum<10){
					return '0'+iNum;
				}
				else{
					return ''+iNum;
				}
			},
			startDrag (e) {
			  e = e.changedTouches ? e.changedTouches[0] : e;
			  this.dragging = true;
			  this.start = e.clientX - 0.5*16;
			  console.log('start' + this.start);
			},
			onDrag (e) {
			  e = e.changedTouches ? e.changedTouches[0] : e;
			  if (this.dragging) {
			    var L = e.clientX - this.start;
			  	console.log('L' + L);
			    if(L < 0 ){
			    	L = 0;
			    }else if(L > (11.5 - 0.5)*16){
			    	L = (11.5 - 0.5)*16;
			    }
			    this.left = L/16;
			    var scale =( L/((11.5 - 0.5)*16));
			    this.currentTime = this.changeTime (scale* this.$els.myvideo.duration);
			    this.$els.myvideo.currentTime = scale* this.$els.myvideo.duration;
			  }
			},
			stopDrag () {
			  if (this.dragging) {
			    this.dragging = false;
			    
			  }
			}
		}
	}
</script>

<style>
	.video-class {
		color: #fff;
		font-size: 0.5rem;
	}

	/*进度条*/
	.progress {
		width: 24rem;
		height: 1.5rem;
		position: absolute;
		bottom: 0.3rem;
		left:0;
	}
	.progress1{ 
		width:17rem; 
		height:0.2rem; 
		background:gray; 
		float: left;
		position: relative;
	}
	.progress2{ 
		width:0.5rem; 
		height:0.5rem; 
		border-radius: 50%;
		background:#fff; 
		position:absolute; 
		left:0;
		top:-0.13rem;
	}
	.progress span:first-child,.progress span:nth-child(2) {
		display: inline-block;
		float: left;
		margin: -0.4rem .2rem 0 ;
	}
	.progress span:nth-child(3) {
		display: inline-block;
		float: right;
		margin: -0.3rem .2rem 0 ;
	}
	.progress span:first-child {
		font-size: 1rem;
		margin-top: -.5rem;
	}
	.progress span a{
		color:#FFF;
	}
</style>