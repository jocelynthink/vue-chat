<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-touch="http://www.w3.org/1999/xhtml">
	<a class="item-content"
			track-by="$index"
			v-link="{name: 'chat' ,params: { openid: openid}}"
			v-touch:swipeleft="delete">
    <div class="item-left">
      <img v-bind:src="headimgurl" />
      <div class="tip" v-if="!(istip===0)"><span>{{istip}}</span></div>
    </div>
    <div class="item-right">
      <p class="list-item-nickname">{{{ '[' + uid + '] ' + qqWechatEmotionParser(nickname) }}}</p>
      <p class="list-item-message">{{{ qqWechatEmotionParser(message) }}}</p>
      <p class="list-item-time">{{ moment(this.time*1000).format('MM.DD HH:mm') }}</p>
    </div>
  </a>
</template>

<script type="es6">

  import moment from 'moment'
  export default {
    props: {
      headimgurl: {
        type: String,
        require: true
      },
      nickname: {
        type: String,
        require: true
      },
      message: {
        type: String,
        require: true
      },
      time: {
        type: String
      },
      openid: {
        type: String
      },
      uid: {
        type: String
      },
      //'goto-chat': {
      //	type: Function,
      //	default: function(openid) {
      //		console.log('openid-----'+openid);
      //	}
      //},
      path:'',
      istip: {
        type: Number,
        require: true
      }
    },
    computed: {
    },
    methods: {
      delete () {
        console.log('delete');
      }
    },
    data() {
      return {
        moment: moment,
        urlencode: encodeURIComponent,
        qqWechatEmotionParser: qqWechatEmotionParser
      }
    },
    ready(){

    }
  }
</script>
<style>
	.content a:hover{
		background:#ccc;
	}
  .list-item-nickname{
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .list-item-message{
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item-left{
    position: relative;
  }
  .tip {
    background: red;
    width: 1em;
    height: 1em;
    border-radius: 1em;
    line-height: .8em;
    position: absolute;
    right: 0em;
    top: -.25em;
    color: #ffffff;
    text-align: center;
    /*font-size: .5em;*/
  }
  .tip span {
    font-size: .7em;
    /*line-height: .7em;*/
  }
</style>
