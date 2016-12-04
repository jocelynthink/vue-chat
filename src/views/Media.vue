<template>
  <div class="mediaContainer">
    <ul class="media" v-bind:style="{left: left+'vw' ,width: width+'vw' }">
      <li class="mediaBg"
          v-for="(index, item) in mediaset"
          v-bind:style="{left: index*100 + 'vw'}">
          <media-item :media="item" :hiddenmedia="hiddenmedia"
                      :weipeleft="weipeleft" :weiperight="weiperight" >
          </media-item>
        <!--<img v-if="media.type==='image'"-->
             <!--class="img"-->
             <!--v-el:media-img-->
             <!--v-bind:src="media.src">-->
        <!--<video-item v-if="media.type==='video'"-->
                    <!--:mediasrc="media.src"></video-item>-->
      </li>
    </ul>
    <a class="mediaMg"
       @click.stop="showmedaimanager">
       <!--v-link="{path: '/mediamanger'}">-->
      <span><i class="fa fa-th" aria-hidden="true"></i></span>
    </a>
	<!--<p>{{$route.params.mediatype}}</p>-->
  </div>

</template>

<script type="es6">
	import MediaItem from '../components/MediaItem'

	export default {
		props: {
			mediaset: {
				type: Array
			},
			currentid: {
        type: String
      },
			mediatype: {
				type: String
			},
      hiddenmedia:{
        type: Function
      },
      showmedaimanager:{
        type: Function
      }
		},
		data () {
			return {
				left: 0,
				width: this.mediaset.length * 100,
        count: +this.currentid,
        height: 0,
        clientheight: document.body.clientHeight,
			}
		},
		ready () {
      //this.height = this.$els.mediaImg.height || 0;
			this.left = -this.currentid*100;
		},
		methods: {
			//hiddenmedia() {
				//history.back();
			//},
			weipeleft () {
        const index = +this.count;
				console.log('left');
				console.log(index);
				if(index === this.mediaset.length - 1){
					console.log("最后面的一个了");
				}else {
          this.count++;
					this.left = -(index + 1) * 100 ;
				}
			},
			weiperight () {
        const index = +this.count;
				console.log('right');
				console.log(index);
				if(index ===  0){
					console.log("最后前面的一个了");
				}else {
          this.count--;
					this.left = -(index - 1) * 100 ;
				}
				// this.$els.myvideo.pause();
			}
		},
		components: {
      MediaItem
		}
	}
</script>

<style>
  .mediaContainer{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
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
    /*overflow-y: scroll;*/
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

