<template>
	<a  class="item-content"
			track-by="$index"
			v-link="{name: 'chat' ,params: { openid: openid, nickname: nickname }}"
			v-touch:swipeleft="delete">
    <div class="item-left"><img v-bind:src="headimgurl"></div>
    <div class="item-right">
      <p>{{ nickname }}</p>
      <p>{{ message }}</p>
      <p>{{ moment(time*1000).format('MM.DD HH:mm') }}</p>
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
			type: Number
		},
    openid: {
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
	methods: {
		delete () {
			console.log('delete');
		}
	},
  data() {
    return {
      moment
    }
  }
}
</script>
<style>
	.content a:hover{
		background:#ccc;
	}
</style>
