<template>
  <div class="MediaMangerBg">
    <!--<div class="mmbbar">-->
    <!--<a style="font-family:sans-serif" v-on:click="goBack"> <i class="fa fa-chevron-left" aria-hidden="true"></i> </a>-->
    <!--<h5>聊天记录</h5>-->
    <!--</div>-->
    <media-manger-item :mediaset="mediaset" :currentid="currentid" :mediatype="mediatype"
                       :hidemedaimanager="hidemedaimanager">
    </media-manger-item>
    <div class="MediaManagerFooter">
      <a class="return"
         @click.stop="hidemedaimanager(1)" >
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
        <span>返回</span>
      </a>
      <span class="page">{{+currentid + 1}} / {{mediaset.length}}</span>
      <a class="close"
         @click.stop="hidemedaimanager()" >
        <span>关闭</span>
        <i class="fa fa-times" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<script type="es6">
  //import jpg0 from '../assets/images/0.jpg'
  //import jpg1 from '../assets/images/1.jpg'
  //import jpg2 from '../assets/images/2.jpg'
  //import jpg3 from '../assets/images/3.jpg'
  //import jpg4 from '../assets/images/4.jpg'
  //import jpg5 from '../assets/images/5.jpg'

  import headJpg from '../assets/me.jpg'
  import MediaMangerItem from '../components/MediaMangerItem'

  export default {
    props: {
      mediaset: {
        type: Array
      },
      currentid: {
        type: Number
      },
      mediatype: {
        type: String
      },
      hidemedaimanager: {
        type: Function
      }
    },
    data () {
      return {}
    },
    methods: {
      goBack () {
        history.back();
      }
    },
    components: {
      MediaMangerItem
    }
  }
</script>

<style>
  .MediaMangerBg {
    background-color: rgba(0, 0, 0, 1);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
  }

  .mmbbar {
    background: rgb(55, 55, 57);
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    padding: 0.5rem;
  }

  .mmbbar a {
    color: #fff;
    float: left;
    text-decoration: none;
  }

  .mmbcont {
    display: flex;
    width: 100%;
    column-gap: .1rem;
    flex-wrap: wrap;
    /*justify-content: space-around;*/
  }

  li.mmbcontitem {
    width: 6.37rem;
    height: 6.37rem;
    display: block;
    overflow: hidden;
    margin-bottom: 0.1rem;
  }

  .mmbcont li:nth-child(4n+1), .mmbcont li:nth-child(4n+2), .mmbcont li:nth-child(4n+3) {
    margin-right: 0.1rem;
  }

  /*div.*/
  li.mmbcontitem img {
    width: 100%;
    height: 100%;
  }

  li.mmbcontitem video {
    width: 100%;
    height: 100%;
  }

  .MediaManagerFooter{
    position: fixed;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 3rem;
    border-top: 1px solid #666;
    color: #8A8B8B;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .MediaManagerFooter a, .MediaManagerFooter span{
    color: #8A8B8B;
  }
  .MediaManagerFooter .return{
    font-size: 16px;
    align-items: center;
    display: flex;
  }
  .MediaManagerFooter .page{
    font-size: 16px;
    align-items: center;
    display: flex;
  }
  .MediaManagerFooter .close{
    font-size: 16px;
    align-items: center;
    display: flex;
  }
</style>
