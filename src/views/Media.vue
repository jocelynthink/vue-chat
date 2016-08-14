<template>
	<media-item :mediaSet="mediaset" :currentid="$route.params.mediaid" :mediatype="$route.params.mediatype">
	</media-item>
	<p>{{$route.params.mediatype}}</p>
</template>

<script type="es6">
	import jpg0 from '../assets/images/0.jpg'
	import jpg1 from '../assets/images/1.jpg'
	import jpg2 from '../assets/images/2.jpg'
	import jpg3 from '../assets/images/3.jpg'
	import jpg4 from '../assets/images/4.jpg'
	import jpg5 from '../assets/images/5.jpg'

	import MediaItem from '../components/MediaItem'
	export default {
		data () {
			return {
				mediaset: [
				{
					src:jpg0,
					mediaid: 0,
					type: 'image'
				},
				{
					src:jpg1,
					mediaid: 1,
					type: 'image'

				},
				{
					src:'http://ictt.xidian.edu.cn/aa.mp4',
					mediaid: 2,
					type: 'video'
				},
				{
					src:jpg3,
					mediaid: 3,
					type: 'image'
				},
				{
					src:jpg4,
					mediaid: 4,
					type: 'image'
				},
				{
					src:jpg5,
					mediaid: 5,
					type: 'image'
				}]
			}
		},
		ready () {
			// console.log($route.params.mediatype);
			// console.log($route.params.media);
		},
		methods: {

		},
		components: {
			MediaItem
		}
	}
</script>
