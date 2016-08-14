<template>
  <div class="my-container my-chat">
    <!--<nav-item :title=$route.params.userId :isgoback="true" path="/list" type="back"></nav-item>-->
    <message v-el:chat-content>
      <Loadmore :top-method="loadTop"
                :top-pull-text="''" :top-drop-text="'More'" top-loading-text="Loading..."
                :bottom-pull-text="''" :bottom-drop-text="''" bottom-loading-text="">
        <message-item v-for="mes in messages"
                      track-by="$index"
                      :nickname="mes.nickname"
                      :src="mes.headimgurl"
                      :message="mes.message"
                      :isleft="mes.isSender"
                      :isshowname="mes.isshowname"
                      :playaudioid.sync="playaudioid"
          ></message-item>
      </Loadmore>
    </message>
    <input-box v-if="isshowinputbox" :isshowfuns="true"></input-box>
  </div>
</template>

<script type="es6">
  import Util from '../util'
  import Loadmore from 'vue-loadmore'
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
      console.log('openid', this.$route.params.openid)
      document.head.getElementsByTagName('title')[0].innerText = this.$route.params.nickname

      this.getData()

      this.$on('playaudio', src => {
        console.log('playAudio');
      });
      this.audio = new Audio();
    },
    data () {
      return {
        playaudioid: '',
        isshowmedia: false,
        messages: [
          {
            name: 'jocelyn',
            headimgurl: headJpg,
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
      },
      getData(openid){
        return new Promise((resolve, reject) => {
          const url = 'http://121.201.68.192/recent_customer.php'
          const data = {
            page_size: 10,
            next_id: openid || ''
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
              if (json.data && json.data.length) {
                if (openid) {
                  this.data = this.data.concat(json.data)
                } else {
                  this.data = json.data
                }

                if (json.next_id && json.data.length >= data.page_size) {
                  this.next_id = json.next_id
                  this.allLoaded = false
                }
              }
              resolve(json)
            })
        })

      },
      loadTop(id){
        console.log('top', id)
        setTimeout(() => {
          this.messages = this.messages.concat(this.messages)
          this.$broadcast('onTopLoaded', id)
        }, 1000)
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
      InputBox,
      NavItem,
      Message,
      MessageItem
    }
  }
</script>

<style >
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
