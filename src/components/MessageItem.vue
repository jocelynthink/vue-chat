<template>
  <div class="message-line"
       v-bind:style="{'margin-top': index === 0 ? '5px' : ''}"
        v-if="isfirstpost">
    <span>{{moment(createtime * 1000).format('MM.DD HH:mm')}}</span>
  </div>
  <div class="message left" v-if="isleft">
    <div class="message-img"><img v-bind:src="src" alt=""></div>
    <div class="message-conts">
      <p class="nike" v-if="isshowname">{{{ qqWechatEmotionParser(nickname) }}}</p>

      <div class="message-main">
        <p v-if="message.type==='text'" class="message-cont">{{{ qqWechatEmotionParser(message.cont) }}}</p>
      </div>
      <!--<a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'image'} }"-->
      <a @click.stop="showmedia(message['mediaid'], 'image')"
         v-if="message.type==='image'">
        <img v-bind:src="message.src" class="message-image">
      </a>
      <a v-if="message.type==='voice'">
        <div class="message-audio cricleplay" v-bind:style="{'width':audiowidth+'rem'}"
             @click.stop="playaudios(message.src,message.voiceId)">
          <div v-if="!isLoadingAudio" class="small"></div>
          <div v-if="!isLoadingAudio" class="middle" v-bind:class="{'stopanimate': !(message.voiceId===playaudioid)}"></div>
          <div v-if="!isLoadingAudio" class="large" v-bind:class="{'stopanimate': !(message.voiceId===playaudioid)}"></div>
          <div v-if="isLoadingAudio && message.voiceId===playaudioid" class="audioLoading"><i class="fa fa-spinner" aria-hidden="true"></i></div>
          <!--<audio v-bind:src="message.src"-->
                 <!--v-el:myaudio>-->
          <!--</audio>-->
          <span>{{(message.audiotime || '0') + '"'}}</span>
        </div>
      </a>
      <!--<a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'video'} }"-->
      <a @click.stop="showmedia(message['mediaid'], 'video')"
               v-if="message.type==='shortvideo' || message.type==='video'">
        <!--<video v-bind:src="message.src"-->
               <!--v-if="message.type==='shortvideo' || message.type==='video'"-->
               <!--class="message-video"-->
               <!--controls-->
               <!--v-bind:poster="message.thumbMediaUrl"-->
               <!--v-el:myvideo>-->
        <img v-bind:src="message.thumbMediaUrl" class="message-image">
        </video>
      </a>
    </div>
  </div>
  <div class="message right" v-else>
    <div class="message-img"><img v-bind:src="src" alt=""></div>
    <div class="message-conts">
      <p class="nike nike-right" v-if="isshowname">{{{ qqWechatEmotionParser(nickname) }}}</p>

      <div class="message-main" v-if="message.type==='text'">
        <p v-if="message.type==='text'" class="message-cont">{{{ qqWechatEmotionParser(message.cont) }}}</p>
      </div>
      <!--<a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'image'} }"-->
      <a @click.stop="showmedia(message['mediaid'], 'image')"
         v-if="message.type==='image'">
        <img v-bind:src="message.src" class="message-image">
      </a>
      <a v-if="message.type==='voice'">
        <div class="message-audio cricleplay" v-bind:style="{'width':audiowidth+'rem'}"
             @click.stop="playaudios(message.src,message.voiceId)">
          <div v-if="!isLoadingAudio" class="smallr"></div>
          <div v-if="!isLoadingAudio" class="middler"
               v-bind:class="{'stopanimate': !(message.voiceId===playaudioid)}"></div>
          <div v-if="!isLoadingAudio" class="larger"
               v-bind:class="{'stopanimate': !(message.voiceId===playaudioid)}"></div>
          <div v-if="isLoadingAudio && message.voiceId===playaudioid" class="audioLoading"><i class="fa fa-spinner" aria-hidden="true"></i></div>

          <!--<audio v-bind:src="message.src"-->
                 <!--v-el:myaudio>-->
          <!--</audio>-->
          <span>{{(message.audiotime || '0') + '"'}}</span>
        </div>
      </a>
      <!--<a v-link="{name: 'media', params: { mediaid : message['mediaid'], mediatype: 'video'} }"-->
      <a @click.stop="showmedia(message['mediaid'], 'video')"
         v-if="message.type==='shortvideo' || message.type==='video'">
        <!--<video v-bind:src="message.src"-->
        <!--v-if="message.type==='shortvideo' || message.type==='video'"-->
        <!--class="message-video"-->
        <!--controls-->
        <!--v-bind:poster="message.thumbMediaUrl"-->
        <!--v-el:myvideo>-->
        <img v-bind:src="message.thumbMediaUrl" class="message-image">
        </video>
    </div>
  </div>

</template>

<script type="es6">
  /**
   *  message: 信息类
   type：消息类型
   text:文本
   image:图片
   audio:音频
   video:视频
   mediaid:媒体的id
   cont：文本内容
   src： 图片、音频、视频地址
   */
  import moment from 'moment'

  export default {
    props: {
      src: {
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
        default: ''
      },
      showmedia: {
        type: Function,
        default: false
      },
      isPlayAudio: {
        type: Boolean,
        default: false
      },
      isLoadingAudio: {
        type: Boolean,
        default: false
      },
      isfirstpost: {
        type: Boolean,
        default: false
      },
      createtime: {
        type: String,
        default: '0'
      },
      index: {
        type: Number,
        default: 0
      },
    },
    data () {
      return {
        audiowidth: (this.message.audiotime * 2) > 16 ? 16 : (this.message.audiotime * 2),
        qqWechatEmotionParser: qqWechatEmotionParser,
        moment,
      }
    },
    ready () {
      window.isplay = window.isplay || false;
    },
    methods: {

      playaudios (src, voiceId) {
        if (src === window.messageAudio.src && this.isPlayAudio) {
          window.messageAudio.pause();
          this.isPlayAudio = !this.isPlayAudio;
          this.playaudioid = '';
        } else if (src === window.messageAudio.src && !this.isPlayAudio) {
          window.messageAudio.play();
          this.isPlayAudio = !this.isPlayAudio;
          this.playaudioid = voiceId;
        } else {
          window.messageAudio.src = src;
          //window.messageAudio.play();
          this.isPlayAudio = true;
          this.playaudioid = voiceId;
          this.$dispatch('playaudio', voiceId);
        }
      },
      playvedio () {
        if (!this.isPlayVedio) {
          this.$els.myvideo.play();
        } else {
          this.$els.myvideo.pause();
        }
        this.isPlayVedio = !this.isPlayVedio;
      }
    }
  }
</script>

<style>
  .message-cont {
    padding: 10px;
  }

  .message-image {
    /*padding: 0px;*/
    width: 6rem;
    border-radius: .3rem;
  }

  .message-audio {
    display: block;
    width: 6rem;
    height: 2.6rem;
    background: rgb(162, 231, 89);
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

  .left .message-audio span {
    float: right;
    margin-right: -1.6rem;
    font-size: 1rem;
    color: #A2A2A2;
    margin-top: 1rem;
  }

  .message-audio span {
    display: inline-block;
    float: left;
    margin-left: -1.6rem;
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
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .large {
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
  .right .message-audio {
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
    border-right-color: transparent;
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
    border-right-color: transparent;
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

  .larger {
    width: 30px;
    height: 30px;
    border-style: solid;
    border-top-color: transparent;
    border-right-color: transparent;
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

  .audioLoading {
    text-align: center;
    line-height: 2rem;
    float: left;
    width: 100%;
  }
  .audioLoading i{
    animation: audioLoadingAnimation 2s infinite;
  }

  @keyframes audioLoadingAnimation{
    0%{
      transform:rotate(0deg);
    }
    50%{
      transform:rotate(180deg);
    }
    100%{
      transform:rotate(360deg);
    }
  }

  .right .stopanimate {
    -moz-animation-name: none;
    -webkit-animation-name: none;
    -ms-animation-name: none;
    animation: none;
  }

  .message-line{
    text-align: center;
    color: #A2A2A2;
    border-bottom: 1px solid #d4cdcd;
    margin: 55px 0 30px;
    padding: 5px 0;
  }
</style>
