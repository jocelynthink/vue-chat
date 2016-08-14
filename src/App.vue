<template>
<div id="app">
  <!--<bar v-if="isIndex">-->
    <!--<bar-item path="/list" label="微信" icon="fa fa-weixin" isactive="true"></bar-item>-->
    <!--<bar-item path="/tasks" label="联系人" icon="fa fa-reddit"></bar-item>-->
    <!--<bar-item path="/user" label="我自己" icon="fa fa-whatsapp"></bar-item>-->
    <!--<bar-item path="/home" label="首页" icon="fa fa-home"></bar-item>-->
  <!--</bar>-->
  <router-view>
  </router-view>
</div>
</template>

<script>

import List from './views/List'
import Bar from './components/Bar'
import BarItem from './components/BarItem'
import FontAwesome from './assets/font-awesome/css/font-awesome.css'

export default {
  components: {
    Bar,
    BarItem
  },
  data () {
    return {
      isIndex: true
    }
  }
}
</script>

<style>
  body{
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .fade-transition {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
