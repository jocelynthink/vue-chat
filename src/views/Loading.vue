<template>
<div class="loading">

	<div class="spinner">
		<div class="bounce1"></div>
		<div class="bounce2"></div>
		<div class="bounce3"></div>
		<div class="bounce4"></div>
		<!-- <div class="bounce5"></div> -->
	</div>
</div>
</template>

<script type="es6">

</script>

<style>
	.loading{
		width: 100vw;
		height: 100vh;

		background-color: #22475E;
	}
	.spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 200;
		margin-left: -6px;
		margin-left: -60px;
		width: 120px;
		text-align: center;
	}
	.spinner > div {
		width: 20px;
		height: 20px;
		background-color: #67CE22;
		border-radius: 100%;
		display: inline-block;
		animation: bouncedelay 2.8s infinite ease-in-out;
		animation-fill-mode: both;
	}
	.spinner .bounce1 {
		background-color:#cd402e;
	}
	.spinner .bounce2 {
		animation-delay: -0.16s;
		background-color: #b07da8;
	}
	.spinner .bounce3 {
	    animation-delay: -0.32s;
	    background-color:#f1b428  ;
	}
	.spinner .bounce4 {
	    animation-delay: -0.48s;
	    background-color:#95c0ea;
	}
	.spinner .bounce5 {
	    animation-delay: -0.64s;
	    background-color:#46b646;
	}
	@keyframes bouncedelay {
		0%{
			transform: translate(-400px, 0);
			opacity: 0;
		}
		35%,65%{
			transform: translate(0,0);
			opacity: 1;
		}
		100%{
			transform: translate(400px,0);
			opacity: 0;
		}
	}
</style>
