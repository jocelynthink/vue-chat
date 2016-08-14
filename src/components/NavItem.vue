<template>
	<nav class="bar bar-nav" :style="setStyle" >
		<a href="javascript:;"
		   v-if="isgoback"
		   v-link="{path: path}">
		   <i class="fa fa-chevron-left" aria-hidden="true" v-if="type==='back'"></i>
		   <i class="fa fa-align-justify" aria-hidden="true" v-if="type==='menu'"></i>
		</a>
    <p class="title">{{title}}</p>
  </nav>
</template>

<script type="es6">
	export default {
		props: {
			path:'',
			title:'',
			isgoback: {
				type: Boolean,
				default: true
			},
			options: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: {
				type: String
			}
		},
		computed: {
			setStyle () {
				return {
					padding: this.options.padding || '0.5rem',
					zIndex: this.options.zIndex || 4
				}
			}
		}
	}
</script>

<style>
.bar {
	background: rgb(55,55,57);
	color: #fff;
	text-align: center;
	font-size: 1.5rem;
}
.bar a {
	color: #fff;
	float: left;
	text-decoration: none;
	margin-top: .5rem;
}
</style>
