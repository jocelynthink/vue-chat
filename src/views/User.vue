<template>
<div class="my-container">
	<div v-bind:class="{'HideMenu page-cover':isShowMenu}">
		<nav class="bar bar-nav user-bar" >
				<a v-on:click="ShowMenu" >
				   <i class="fa fa-align-justify"  aria-hidden="true" ></i>
				</a>
		    <p class="title">我自己</p>
		</nav>
	</div>
</div>
	<!-- v-bind:class="{'fabar':isShowMenu}" -->
	<Menu v-if="isShowMenu" v-bind:class="{'ShowMenu':isShowMenu}"></Menu>
</template>

<script type="es6">
	import NavItem from '../components/NavItem'
	import Menu from '../components/Menu'
	export default {
		components: {
			NavItem,
			Menu
		},
		data () {
			return {
				isShowMenu: false
			}
		},
		methods: {
			ShowMenu() {
				console.log('sss');
				this.isShowMenu = !this.isShowMenu;
			}
		}
	}
</script>

<style>
	.user-bar {
		padding: 0.5rem;
	}
	.HideMenu {
		-webkit-transform: translateX(200px);
		background-color: rgba(0,0,0,.2);

	}
	.fabar{
		color:#ccc;
	}
	.page-cover {
		width: 100vw;
		height: 100vh;

	}
	/*.staggered-transition {
	    transition: all .5s ease;
	    overflow: hidden;
	    margin: 0;
	    left: 0;
	}
	.staggered-enter, .staggered-leave {
	    opacity: 0;
	    height: 0;
	}
	*/
</style>
