<template>
	<section id="sideBar" class="nav-list" :class="{'show': showMenu}">
		<user-info></user-info>
		<ul class="list-ul">
			<li><i class="fa fa-optin-monster" aria-hidden="true"></i><span>精华</span></li>
			<li><i class="fa fa-book" aria-hidden="true"></i><span>分享</span></li>
			<li><i class="fa fa-angellist" aria-hidden="true"></i><span>游戏</span></li>
			<li><i class="fa fa-tripadvisor" aria-hidden="true"></i><span>消息</span></li>
			<li><i class="fa fa-viadeo" aria-hidden="true"></i><span>关于</span></li>
		</ul>
	</section>
</template>

<script>
	import UserInfo from "../components/UserInfo"
	export default {
		props: {

		},
		components: {
			UserInfo
		}
	}
</script>

<style>
	.nav-list {
		position: fixed;
		top: 0;
		bottom: 0;
		left: -200px;
		width: 200px;
		background-color: #fff;
		transition: all .3s ease;
		z-index: 90;
	}
	.list-ul {
		margin: 0 24px;
		border-top: 1px solid #d4d4d4;
		overflow: hidden;
		padding-top: 9%;
	}
	.list-ul li {
		font-size: 0.8rem;
		font-weight: 200;
		padding: 9% 0;
		text-align: left;
		line-height: 1rem;
		color: #7f8c8d;
	}
	.ShowMenu {
		transform: translateX(200px);
	}
	
	.list-ul li span{

		float: right;
		margin-right: 60px;
	}
	
</style>