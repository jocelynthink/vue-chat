<template>
  <div class="my-container my-list" v-if="ok">
    <!--<nav-item :title="title" :isgoback="false" type="goback"></nav-item>-->
    <Loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
              :top-pull-text="''" :top-drop-text="'Refresh'" top-loading-text="Loading..."
              :bottom-pull-text="''" :bottom-drop-text="'More'" bottom-loading-text="Loading...">
      <!--<div class="list-block infinite-list">-->
      <ul class="list-content">
        <list-item v-for="item in data"
                   :headimgurl="item.headimgurl"
                   :nickname="item.nickname"
                   :uid="item.uid"
                   :message="item.last_post.MsgType == 'text' ? item.last_post.Content : item.last_post.MsgType"
                   :time="item.last_seen + ''"
                   :openid="item.openid"
                   :istip="item.unreplied"
                   path="/chat/user">
        </list-item>
      </ul>
      <!--</div>-->
    </Loadmore>
  </div>
  <Chat v-else
        :isshowinputbox="true">
  </Chat>
</template>

<script type="es6">
  import Util from '../util'
  import Loadmore from 'vue-loadmore'
  import headJpg from '../assets/head.jpeg'
  //import headJpg2 from '../assets/me2.jpg'

  import Chat from '../views/Chat'
  //import Bar from '../components/Bar'
  //import BarItem from '../components/BarItem'
  //import NavItem from '../components/NavItem'
  import ListItem from '../components/ListItem'
  export default {
    data () {
      return {
        data: [
          //{
          //  headimgurl: headJpg,
          //  nickname: 'jocelyn',
          //  last_post: 'hello! good morning!',
          //  last_seen: 1471156368,
          //  openid: 'odst7jsi-QVE7Eobl06kmVCj9V3Q"'
          //},
        ],
        title: '聊天记录',
        ok: true,
        showName: '',
        allLoaded: true,
        next_id: ''
      }
    },
    ready(){
      const that = this
      setTimeout(() => {
        if (!that.data || !that.data.length) {
          that.getData().then().catch(e => alert(e))
        }
      }, 4000)
      //this.getData()
      document.head.getElementsByTagName('title')[0].innerText = '聊天记录'
    },
    methods: {
      //gotoChat (openid, nickname) {
      //  this.ok = false;
      //  this.$broadcast('showName', nickname);
      //  this.showName = nickname;
      //},
      getData(next_id){
        return new Promise((resolve, reject) => {
          const url = Util.url + 'recent_customer.php'
          const data = {
            page_size: 10,
            //next_id: next_id || (window.localStorage['ringy_need_relocation'] == 1 ? window.localStorage['ringy_index_next_id'] : '')
            next_id: next_id ||  ''
          }
          const options = {
            jsonpCallback: 'callback'
          }

          //取消重新定位
          window.localStorage['ringy_need_relocation'] = 0

          Util.fetchJsonp(url, data, options).then(response => response.json())
            .catch(e => {
              console.log("Oops, error", e)
              reject(e)
            })
            .then(json => {
              console.log("success", json)
              if (json.data && json.data.length) {
                if (next_id) {
                  this.data = this.data.concat(json.data)
                  window.localStorage['ringy_index_next_id'] = next_id
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
        this.getData().then(json => {
          console.log('resolve top')
          this.$broadcast('onTopLoaded', id);
        }).catch(e => alert(e))
      },
      loadBottom(id){
        console.log('bottom', id)
        this.getData(this.next_id).then(json => {
          console.log('resolve bottom')
          this.$broadcast('onBottomLoaded', id);
        }).catch(e => {
          this.loadBottom(id)
        })
      }
    },
    components: {
      Loadmore,
      Chat,
      //Bar,
      //BarItem,
      //NavItem,
      ListItem
    }
  }
</script>

<style>
  body {
    font-size: 20px;
    width: 100vw;
    height: 100vh;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  /*@media only screen and (min-width: 400px) {
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

  .music i {
    transform: rotate(90deg);
    width: 0px;
    transition: all 2s linear;
  }

  .content {
    /*background:rgb(235,235,235);*/
    flex: 1;
    height: 100%;
    width: 100vw;
    box-sizing: border-box;
  }

  .list-block {
    height: 39.5rem;
    overflow: scroll;
    width: 100vw;
  }

  .item-content {
    display: flex;
    padding: 0.5rem 0.5rem;
    flex-direction: row;
    position: relative;
  }

  .item-content:before {
    content: " ";
    position: absolute;
    left: 0.3rem;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
  }

  .item-content:first-child:before {
    display: none;
  }

  .item-content:last-child:after {
    content: " ";
    position: absolute;
    left: 0rem;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
  }

  .item-left img {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
    margin-top: 0.3rem;
    border-radius: 0.3rem;
  }

  .item-right p:first-child {
    /*font-weight: bold;*/
    font-size: 1.3rem;
  }

  .item-right p:nth-child(2) {
    /*font-weight: bold;*/
    /*font-size:1.2rem;*/
    color: #888;
  }

  .item-right p:last-child {
    position: absolute;
    right: 1rem;
    top: 0.9rem;
    font-size: 1rem;
    color: #A2A2A2;
  }

  .list-content {
    position: relative;
    top: -20px;
  }

  .my-list .mint-loadmore-top {
    position: relative;
    top: -40px;
    text-align: center;
    color: #a2a2a2;
  }

  .my-list .mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
  }

  .my-list .mint-loadmore-bottom {
    /*position: relative;*/
    /*top: 0px;*/
    text-align: center;
    color: #a2a2a2;
  }

  .my-list .mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
  }

  .rotate {
    transform: rotate(180deg);
  }
</style>
