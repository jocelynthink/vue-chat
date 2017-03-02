<template>
	<a  class="item-content"
			track-by="$index"
			v-link="{name: 'chat' ,params: { openid: openid}}"
			v-touch:swipeleft="delete">
    <div class="item-left"><img v-bind:src="headimgurl"></div>
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
		path:''
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
</style>
