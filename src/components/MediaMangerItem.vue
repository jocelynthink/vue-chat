<template>
	<ul class="mmbcont">
		<li class="mmbcontitem"
		   v-for="media in mediaset"
		   v-link="{name: 'media', params: { mediaid: media['mediaid']}}">
			<img v-bind:src="media.src" v-if="media.type==='image'">
			<video v-bind:src="media.src" v-if="media.type==='video'"></video>
	</ul>
<!-- <a class="mmbcontitem">
			<img v-bind:src="src" alt="">
		</a>
		<a class="mmbcontitem">
			<img v-bind:src="src" alt="">
		</a>
		<a class="mmbcontitem">
			<img v-bind:src="src" alt="">
		</a>
		<a class="mmbcontitem">
			<video controls src="http://ictt.xidian.edu.cn/aa.mp4" width="100%" height="100%"></video>
		</a>
		<a class="mmbcontitem">
			<img v-bind:src="src" alt="">
		</a> -->
	</div>
</template>

<script type="es6">
	export default {
		props: {
			mediaset : {
				type: Array
			}
		}
	}
</script>

<style>

</style>
