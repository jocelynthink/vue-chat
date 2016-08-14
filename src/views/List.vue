<template>
  <div class="my-container my-list" v-if="ok">
    <nav-item :title="title" :isgoback="false" type="goback"></nav-item>
    <Loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
              :top-pull-text="''" :top-drop-text="'Refresh'" top-loading-text="Loading..."
              :bottom-pull-text="''" :bottom-drop-text="'More'" bottom-loading-text="Loading...">
      <!--<div class="list-block infinite-list">-->
        <ul class="list-content">
          <list-item v-for="todo in todos"
                     :src="todo.src"
                     :name="todo.name"
                     :message="todo.message"
                     :goto-chat="gotoChat"
                     :time="todo.time"
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
  import Loadmore from 'vue-loadmore'
  import headJpg from '../assets/me.jpg'
  import headJpg2 from '../assets/me2.jpg'

  import Chat from '../views/Chat'
  import Bar from '../components/Bar'
  import BarItem from '../components/BarItem'
  import NavItem from '../components/NavItem'
  import ListItem from '../components/ListItem'
  export default {
    data () {
      return {
        todos: [
          {
            src: headJpg,
            name: 'jocelyn',
            message: 'hello! good morning!',
            time: '14:23'
          },
          {
            src: headJpg,
            name: '徐扬',
            message: 'hello! good morning!',
            time: '14:22'
          },
          {
            src: headJpg,
            name: 'jocelyn',
            message: 'hello! good morning!',
            time: '12:11'
          },
          {
            src: headJpg2,
            name: 'jocelyn',
            message: 'hello! good morning!',
            time: '09:21'
          },
          {
            src: headJpg2,
            name: 'lu',
            message: '你在干什么呢？',
            time: '08:22'
          },
          {
            src: headJpg,
            name: 'jocelyn',
            message: 'hello! good morning!',
            time: '昨天'
          },
          {
            src: headJpg2,
            name: 'jocelyn',
            message: 'hello! good morning!',
            time: '昨天'
          },
          {
            src: headJpg,
            name: 'lu',
            message: 'hello! good morning!',
            time: '昨天'
          },
          {
            src: headJpg2,
            name: 'jocelyn',
            message: 'hello! good morning!',
            time: '星期三'
          }
        ],
        title: '聊天记录',
        ok: true,
        showName: '',
      }
    },
    ready(){
      this.getData()
    },
    methods: {
      gotoChat (value) {
        this.ok = false;
        this.$broadcast('showName', value);
        this.showName = value;
      },
      getData(){
        const url = 'http://wximg.qq.com/wxp/mmad/data/area/areas_core_20160415.js'
        const data = {}
        fetch(url).then(response => response.text())
          .catch(e => console.log("Oops, error", e))
          .then(data => {
            console.log(data)
          })
      },
      loadTop(id){
        console.log('top', id)
        setTimeout(() => {
          this.$broadcast('onTopLoaded', id)
        }, 1000)
      },
      loadBottom(id){
        console.log('bottom', id)
        setTimeout(() => {
          this.allLoaded = true;// if all data are loaded
          this.$broadcast('onBottomLoaded', id);
        }, 1000)

      },
      allLoaded(){
        console.log('allLoaded')
      }
    },
    components: {
      Loadmore,
      Chat,
      Bar,
      BarItem,
      NavItem,
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


  .list-content{
    position: relative;
    top: -20px;
  }

  .my-list .mint-loadmore-top{
    position: relative;
    top: -40px;
    text-align: center;
    color: #a2a2a2;
  }
  .my-list .mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
  }
  .my-list .mint-loadmore-bottom{
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
