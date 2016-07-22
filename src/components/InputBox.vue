<template>
  <!-- 输入框 -->
  <div class="input_message" id="input_message">
      <form class="outer">
          <div class="iner">
              <input type="text" class="message_text" id="message_text" required="">
          </div>
          <a href="javascript:" class="add_icon" id="add" v-on:click="showFunction">+</a>        
      </form>
  </div>
	<!-- 功能框 -->
	<div class="function" id="function" v-if="isshowfuns" v-bind:class="{'show_functon': isShowFunction,'hide_functon':isHideFunction}">
    <a href="javascript:;" class="function_item" v-for="fun in funs">
    	<div class="function_icon">
    		<img v-bind:src="fun.src" alt="">
    	</div
    	<p class="function_label">{{ fun.name }}</p>
    </a>
	</div>
</template>

<script>
	import photoPng from '../assets/photo.png'

	export default {
		props: {
			isshowfuns: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				isShowFunction: false,
				isHideFunction: true,
				funs : [
				{
					name: '图片',
					src: photoPng
				},
				{
					name:'音频',
					src: photoPng
				},
				{
					name:'音频',
					src: photoPng
				},
				{
					name:'音频',
					src: photoPng
				},
				{
					name:'音频',
					src: photoPng
				},
				{
					name:'音频',
					src: photoPng
				},
				{
					name:'音频',
					src: photoPng
				},
				{
					name:'音频',
					src: photoPng
				}]
			}
		},
		methods: {
			showFunction () {
				if(this.isShowFunction===false){
				    this.isShowFunction = true;
				    this.isHideFunction = false;
				    // var messageContent = document.getElementById("message-content");
				    // var h = messageContent.scrollHeight - messageContent.offsetHeight;
				    // messageContent.scrollTop = h;
				}else{
				    this.isShowFunction = false;
				    this.isHideFunction = true;
				    // var messageContent = document.getElementById("message-content");
				    // messageContent.scrollTop = messageContent.scrollHeight - messageContent.offsetHeight;
				}
				console.log(this.isShowFunction);
				console.log(event.target);
				console.log(this.$parent);
			}
		}
	}
</script>

<style>
	.input_message {
	    width: 100%;
	    padding: 8px 10px;
	    box-sizing: border-box;
	    background-color: rgb(244,244,246);
	    z-index: 3;
	}
	.outer {
	    position: relative;
	    display: flex;
	    height: 100%;
	    width: 100%;
	    background-color: rgb(244,244,246);
	}
	.iner {
	    height: 100%;
	    width: 100%;
	    background: #fff;
	    border-radius: 3px;
	}
	.message_text {
	    border-radius: 3px;
	    color: #9B9B9B;
	    background: #FFFFFF;
	    flex: 1;
	    padding: 4px 0;
	    width: 100%;
	    height: 1.42857143em;
	    border: 0;
	    font-size: 14px;
	    line-height: 1.42857143em;
	    box-sizing: content-box;
	    background: transparent;
	    background-image: initial;
	    background-position-x: initial;
	    background-position-y: initial;
	    background-size: initial;
	    background-repeat-x: initial;
	    background-repeat-y: initial;
	    background-attachment: initial;
	    background-origin: initial;
	    background-clip: initial;
	    background-color: transparent;   
	}
	.message_text:focus {
	    outline: none;
	}
	.add_icon {
	    display: inline-block;
	    margin-left: 10px;
	    line-height: 28px;
	    color: #09BB07;
	}
	a.add_icon {
		font-size: 2rem;
		text-decoration: none;
	}
	.function {
	    height: 0px;
	    width: 100%;
	    background: #EFEFF4;
	    display: flex;
	    flex-direction: row ;
	    flex-wrap :wrap;
	    overflow: hidden;
	    align-items:  center;
	    align-content: space-around;
			text-align: center;
	    /*-webkit-transition: height 0.5s linear;*/
	}
	.function_item {
	    flex: 1;
	    /*margin: 10px;*/
	    padding: 10px;
	}
	a.function_item{
	    text-decoration: none;
	}
	.function_icon{
	    margin: 0 auto;
	    width: 3rem;
	    height: 3rem;
	}
	.function_icon img {
	    display: block;
	    /*background-size: 100%;*/
	    width: 3rem;
	    height: 3rem;
	}
	.function_label {
	    text-align: center;
	    color: #888;
	    font-size: 0.8rem;
	}
	.column {
	    display: flex;
	}

	.show_functon  {
	    
	    height: 10rem;
	}
	.hide_function {

	    height: 0px;
	}
</style>