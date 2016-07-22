<template>
	<footer class="barfooter">	
		<slot></slot>
	</footer>
</template>

<style>
.tab-item.active {
	color: rgb(8,186,6) !important;
}
.barfooter {
	position: absolute;
	bottom: 0px;
	width: 100%;
	display: flex;
	background: rgba(246,246,246,.9);
	z-index: 50;
}
.barfooter .tab-item {
	color: #888;
}
.barfooter p {
	margin-bottom: 0;
}
.tab-item {
	display: block;
	text-align: center;
	font-size: 0.5rem;
	padding: 0.3rem 0;
	flex: 1;
}
.tab-item i{
	font-size: 2rem;
}
a.tab-item {
	text-decoration: none;
}
</style>
