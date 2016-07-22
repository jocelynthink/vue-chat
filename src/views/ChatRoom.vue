<template>
	<div class="my-container">
		<nav-item :title=title :isgoback="false" type="goback"></nav-item>
		<silder :items="items" :speed="0.5" :delay="3" :pause="true" :autoplay="true" :dots="true" :arrows="false"></silder>
		<!-- <button @click="connectServer">连接服务器</button> -->
</template>

<script>
	import NavItem from '../components/NavItem'
	import Silder from '../components/Slider'
	import jpg0 from '../assets/images/6.jpg'
	import jpg1 from '../assets/images/7.jpg'
	import jpg2 from '../assets/images/8.jpg'
	import jpg3 from '../assets/images/9.jpg'
	import jpg4 from '../assets/images/4.jpg'
	import jpg5 from '../assets/images/5.jpg'

	export default {
		components: {
			NavItem,
			Silder
		},
		data () {
			return {
				title: 'Web聊天室',
				items: [
				{
					src: jpg0,
					alt: 'jpg0'
				},
				{
					src: jpg1,
					alt: 'jpg1'
				},
				{
					src: jpg2,
					alt: 'jpg2'
				},
				{
					src: jpg3,
					alt: 'jpg3'
				}
				]
			}
		},
		methods: {
			connectServer () {
				console.log('connect to server');
				console.log($);
				$.ajax({
					url: 'localhost: 3000',
					dataType: "jsonp",
					jsonp: "callback",
					success: function(data) {
						console.log(data);
					}
				})

			}
		}
	}
</script>

<style>
	
</style>