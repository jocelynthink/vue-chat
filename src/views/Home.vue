<template>
	<div class="my-container">
	<nav-item title="首页" :isgoback="false" type="goback"></nav-item>
	
	</div>
</template>

<script>
import Bar from '../components/Bar'
import BarItem from '../components/BarItem'
import NavItem from '../components/NavItem'

	export default {
		data() {
			return {
				haha: 'ddd'
			}
		},
		components: {
			Bar,
			BarItem,
			NavItem
		}
	}
</script>