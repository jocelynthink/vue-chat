<template>
  <div class="my-container my-chat">
    <!--<nav-item :title=$route.params.userId :isgoback="true" path="/list" type="back"></nav-item>-->
    <message v-el:chat-content>
      <Loadmore :top-method="loadTop"
                :top-pull-text="''" :top-drop-text="'More'" top-loading-text="Loading..."
                :bottom-pull-text="''" :bottom-drop-text="''" bottom-loading-text="">
        <message-item v-for="mes in data"
                      track-by="$index"
                      :index="$index"
                      :nickname="mes.nickname"
                      :src="mes.headimgurl"
                      :message="mes.message"
                      :isleft="mes.isSender"
                      :isshowname="mes.isshowname"
                      :playaudioid.sync="playaudioid"
                      :showmedia="showmedia"
                      :isfirstpost="mes.isfirstpost"
                      :createtime="mes.createtime + ''"
        ></message-item>
      </Loadmore>
    </message>
    <!--<input-box v-if="isshowinputbox" :isshowfuns="true"></input-box>-->
  </div>
  <media v-if="isshowmedia" :hiddenmedia="hiddenmedia" :showmedaimanager="showmedaimanager" :mediaSet="mediaData"
         :currentid="currentid + ''" :mediatype="mediatype"></media>
  <media-manager v-if="isshowmediamanager" :hidemedaimanager="hidemedaimanager" :mediaSet="mediaData"
                 :currentid="currentid + ''" :mediatype="mediatype"></media-manager>
</template>

<script type="es6">
  import Util from '../util'
  import Loadmore from 'vue-loadmore'
  import headJpg from '../assets/head.jpeg'
  //import jpg0 from '../assets/images/0.jpg'
  //import jpg1 from '../assets/images/1.jpg'
  //import jpg2 from '../assets/images/2.jpg'
  //import jpg3 from '../assets/images/3.jpg'
  //import jpg4 from '../assets/images/4.jpg'
  //import jpg5 from '../assets/images/5.jpg'

  //import InputBox from '../components/InputBox'
  //import NavItem from '../components/NavItem'
  import Media from '../views/Media'
  import MediaManager from '../views/MediaManger'
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
      console.log('openid', this.$route.params.openid)
      //document.head.getElementsByTagName('title')[0].innerText = this.$route.params.nickname

      this.getData().then(() => {
        this.scollBottom()
      })

      this.initAudio()

      this.$on('playaudio', src => {
        console.log('playAudio');
      });
      this.audio = new Audio();

      //返回时重新定位
      window.localStorage['ringy_need_relocation'] = 1
    },

    data () {
      return {
        playaudioid: '',
        isPlayAudio: false,
        isLoadingAudio: false,
        isshowmedia: false,
        isshowmediamanager: false,
        openid: this.$route.params.openid,
        _mediaData: [],
        currentid: 0,
        mediatype: 0,
        data: [
          //{
          //  name: 'jocelyn',
          //  headimgurl: headJpg,
          //  message: {
          //    type: 'text',
          //    cont: '你好！'
          //  },
          //  isSender: true,
          //  isshowname: false
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'text',
          //    cont: '你在干什么呢？'
          //  },
          //  isSender: false,
          //  isshowname: true
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'image',
          //    src: jpg0,
          //    mediaid: 0
          //  },
          //  isSender: false,
          //  isshowname: true
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'audio',
          //    src: 'http://ictt.xidian.edu.cn/yy1.mp3',
          //    mediaid: 6,
          //    audiotime: 2
          //  },
          //  isSender: false,
          //  isshowname: true
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'image',
          //    src: jpg1,
          //    mediaid: 1
          //  },
          //  isSender: false,
          //  isshowname: true
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'audio',
          //    src: 'http://ictt.xidian.edu.cn/yy.mp3',
          //    mediaid: 7,
          //    audiotime: 6
          //
          //  },
          //  isSender: true,
          //  isshowname: true
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'image',
          //    src: jpg3,
          //    mediaid: 3
          //  },
          //  isSender: true,
          //  isshowname: true
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'video',
          //    src: 'http://ictt.xidian.edu.cn/aa.mp4',
          //    mediaid: 2
          //  },
          //  isSender: false,
          //  isshowname: true
          //},
          //{
          //  name: 'kaijun',
          //  src: headJpg,
          //  message: {
          //    type: 'video',
          //    src: 'http://ictt.xidian.edu.cn/aa.mp4',
          //    mediaid: 5
          //  },
          //  isSender: true,
          //  isshowname: true
          //}
        ]
      }
    },
    methods: {
      initAudio(){
        window.messageAudio = window.messageAudio || new Audio();
        window.messageAudio.autoplay = true;
        window.messageAudio.removeEventListener('ended', null)
        window.messageAudio.addEventListener('ended', () => {
          this.playaudioid = ''
          this.isLoadingAudio = false
        }, false)
        window.messageAudio.removeEventListener('loadstart', null)
        window.messageAudio.addEventListener('loadstart', () => {
          this.isLoadingAudio = true
        }, false)
        window.messageAudio.removeEventListener('loadeddata', null)
        window.messageAudio.addEventListener('loadeddata', () => {
          this.isLoadingAudio = false
        }, false)
        window.messageAudio.removeEventListener('error', null)
        window.messageAudio.addEventListener('error', (e) => {
          alert('您的设备暂时不支持播放该格式的音频文件,错误代码: ' + window.messageAudio.error.code)
        }, false)
      },
      goBack() {
        this.$parent.ok = true;
        console.log(this.$parent.showName);
      },
      showmedia (currentid, mediatype) {
        this.isshowmedia = true;
        this.currentid = currentid;
        this.mediatype = mediatype;
      },
      hiddenmedia () {
        this.isshowmedia = false;
      },
      showmedaimanager () {
        this.isshowmediamanager = true;
        this.isshowmedia = false;
      },
      hidemedaimanager (isshowmedia, currentid, mediatype) {
        this.currentid = (currentid || currentid === 0) ? currentid : this.currentid;
        this.mediatype = mediatype || this.mediatype;
        this.isshowmedia = !!isshowmedia || false;
        this.isshowmediamanager = false;
      },
      getData(next_id){
        return new Promise((resolve, reject) => {
          const url = Util.url + 'user_sessions.php'
          const data = {
            page_size: 10,
            openid: this.openid,
            next_id: next_id || ''
          }
          const options = {
            jsonpCallback: 'callback'
          }
          Util.fetchJsonp(url, data, options).then(response => response.json())
            .catch(e => {
              console.log("Oops, error", e)
              reject(e)
            })
            .then(json => {
              console.log("success", json)
              if (json.data && json.data.sessions && json.data.sessions.length) {
                let _data = [], _mediaData = [], voiceCount = 0
                json.data.sessions.map(item => {
                  item.posts.map((_item, _i) => {
                    const isCustom = _item.FromUserName === data.openid
                    const isText = _item.MsgType === 'text'
                    const isVoice = _item.MsgType === 'voice'
                    const isImage = _item.MsgType === 'image'
                    let src = Util.imageUrl + _item.MediaUrl
                    if (!isImage) {
                      src = Util.mediaUrl + _item.MediaUrl
                    }
                    const message = {
                      type: _item.MsgType || 'text',
                      src,
                      thumbMediaUrl: Util.imageUrl + _item.ThumbMediaUrl || '',
                      mediaid: !isText ? _mediaData.length : null,
                      voiceId: voiceCount++,
                      cont: _item.Content || ''
                    }
                    _data.push({
                      headimgurl: isCustom ? json.customer.headimgurl : item.headimgurl || headJpg,
                      nickname: isCustom ? json.customer.nickname : item.nickname || '',
                      message,
                      isSender: isCustom,
                      isshowname: true,
                      isfirstpost: _i === 0,
                      createtime: +_item.CreateTime || 0
                    })
                    if (!isText && !isVoice) {
                      _mediaData.push(message)
                    }
                  })
                })
                if (next_id) {
                  this.data = this.data.concat(_data)
                  this.mediaData = this.data.concat(_mediaData)
                } else {
                  this.data = _data
                  this.mediaData = _mediaData
                }

                if (json.next_id && json.data.length >= data.page_size) {
                  this.next_id = json.next_id
                  this.allLoaded = false
                }

                document.head.getElementsByTagName('title')[0].innerText = json.customer.nickname
              }
              resolve(json)
            })
        })

      },
      scollBottom(){
        //const el = document.getElementById('message-content');
        const el = this.$els.chatContent;
        setTimeout(() => {
          el.scrollTop = el.scrollHeight
        }, 200)
        let imgList = document.getElementsByTagName('img')
        for (var i = 0; i <= imgList.length; i++) {
          imgList[i].addEventListener('load', function () {
            if (el.scrollTop !== el.scrollHeight) {
              el.scrollTop = el.scrollHeight
            }
          })
        }

      },
      loadTop(id){
        console.log('top', id)
        this.getData(this.next_id).then(json => {
          console.log('resolve bottom')
          this.$broadcast('onBottomLoaded', id);
        })
      }
    },
    events: {
      playaudio: function (id) {
        console.log('playaudio' + id);
        this.playaudioid = id;
      }
    },
    components: {
      Loadmore,
      Media,
      MediaManager,
      //InputBox,
      //NavItem,
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

  .my-container p {
    margin-bottom: 0 !important;
    line-height: 1.41176471;
  }

  .chat {
    background: rgb(235, 235, 235);
    padding: 5px;
    flex: 1;
    overflow: scroll;
    font-size: 1rem;

  }

  .message-content {
    padding: .5rem;
    flex: 1;
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

  .left .message-main {
    background: #ffffff;
  }

  .left .message-img {
    margin-right: 0.5rem;
  }

  .right .message-main {
    background: rgb(162, 231, 89);
  }

  .right .message-img {
    margin-left: 0.5rem;
  }

  .nike {
    font-size: 10px;
  }

  .nike-right:first-child {
    text-align: right;
  }

  .my-chat .mint-loadmore-top {
    position: relative;
    top: -40px;
    text-align: center;
    color: #a2a2a2;
  }

  .my-chat .mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
  }

  .my-chat .mint-loadmore-bottom {
    /*position: relative;*/
    /*top: 0px;*/
    text-align: center;
    color: #a2a2a2;
  }

  .my-chat .mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
  }

  .rotate {
    transform: rotate(180deg);
  }
</style>
