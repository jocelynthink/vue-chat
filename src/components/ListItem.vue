<template>
	<a  class="item-content"
			track-by="$index"
			v-on:click="gotoChat(name)"
			v-link="{name: 'chat' ,params: { userId: name }}"
			v-touch:swipeleft="delete">
    <div class="item-left"><img v-bind:src="src"></div>
    <div class="item-right">
      <p>{{ name }}</p>
      <p>{{ message }}</p>
      <p>{{ time }}</p>
    </div>
  </a>
</template>

<script type="es6">
export default {
	props: {
		src: {
			type: String,
			require: true
		},
		name: {
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
		'goto-chat': {
			type: Function,
			default: function(name) {
				console.log('name-----'+name);
			}
		},
		path:''
	},
	methods: {
		delete () {
			console.log('delete');
		}
	}
}
</script>
<style>
	.content a:hover{
		background:#ccc;
	}
</style>
