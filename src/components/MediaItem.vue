<template>
  <div class="mediaitem"
       v-touch:swipeleft="weipeleft()"
       v-touch:swiperight="weiperight()"
       @click.stop="hiddenmedia"
       v-el:media-div>
       <!--v-bind:style="{display: clientheight <= height ? 'list-item' : 'flex'}">-->
    <img v-if="media.type==='image'"
         class="img"
         v-el:media-img
         v-bind:src="media.src">
    <video-item v-if="media.type==='shortvideo' || media.type==='video'"
                :mediasrc="media.src"></video-item>
  </div>
</template>

<script type="es6">
  import VideoItem from '../components/VideoItem'

  export default {
    props: {
      media: {
        type: Object
      },
      count:{
        type: Number
      },
      weipeleft: {
        type: Function
      },
      weiperight: {
        type: Function
      },
      hiddenmedia: {
        type: Function
      },

    },
    data () {
      return {
        height: 0,
        clientheight: document.body.clientHeight,
      }
    },
    ready () {
      this.height = this.$els.mediaImg ? (this.$els.mediaImg.height || 0) : 0;
      console.log('height', this.height)
      if(this.height < this.clientheight){
        this.$els.mediaDiv.style.display = 'flex'
      }

    },
    methods: {
      //hiddenmedia() {
      //history.back();
      //},

    },
    components: {
      VideoItem
    }
  }
</script>

<style>
  .mediaitem {
    display: list-item;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    overflow-y: scroll;
  }

  .img {
    width: 100%;
    /*height: 100%;*/
    background-size: 100% 100%;
  }


</style>
