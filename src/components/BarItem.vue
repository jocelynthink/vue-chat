<template>
	<a class="tab-item" v-link="{path: path,replace: true , activeClass: 'active'}">
		<i class="{{icon}}" aria-hidden="true" ></i>
		<p class="tab-label">{{label}}</p>
	</a>
</template>

<script type="es6">
export default{
	props: {
		path: '',
		icon: '',
		label: '',
		isactive:''
	}
}
</script>

<style>

</style>
