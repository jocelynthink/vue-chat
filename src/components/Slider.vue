<template>
	<div class="slider" @mouseover="pause && pausePlay()" @mouseout="pause && goPlay()">
		<ul :style="{'width': `${this.count * 100}%`,'left': `${-100 * this.current}%`, transitionDuration:`{this.speed}s`}">
			<slider-item	v-for="item in items" :count="count" :item="item"></slider-item>
		</ul>
		<slider-dots v-if="dots" :count="count" :current="current" :turn="turn"></slider-dots>
		<slider-arrows v-if="arrows" :turn="turn"></slider-arrows>
	</div>
</template>

<script>
	import SliderItem from '../components/SliderItem'
	import SliderDots from '../components/SliderDots'
	import SliderArrows from '../components/SliderArrows'

	export default {
		data () {
			return {
				current: 0,
				count: this.items.length,
				autoPlayFlag: null
			}
		},
		props: {
			items: {
				type: Array,
				required: true
			},
			dots: {
				type: Boolean,
				required: false,
				default: true
			},
			arrows: {
				type: Boolean,
				required: false,
				default: true
			},
			autoplay: {
				type: Boolean,
				required: false,
				default: true
			},
			delay: {
				type: Number,
				required: false,
				default: 2
			},
			speed: {
				type: Number,
				required: false,
				default: 1.5
			},
			pause: {
				type: Boolean,
				required: false,
				default: true
			}
		},
		methods: {
			turn(i) {
				let _i = this.current +i ;
				if(_i < 0 ){
					(_i = _i + this.count);
				}
				if(_i >= this.count) {
					_i =_i - this.count
				}
				this.current = _i
			},
			goPlay(){
				if(this.autoplay) {
					this.autoPlayFlag = setInterval( () => {
						this.turn(1)
					},this.delay*1000)
				}
			},
			pausePlay(){
				clearInterval(this.autoPlayFlag)
			}
		},
		ready(){
			this.goPlay()
		},
		components: {
			SliderItem,
			SliderDots,
			SliderArrows
		}
	}
</script>

<style>
	.slider {
		width: 100vw;
		position: relative;
		overflow: hidden;
	}
	.slider > ul {
		height: auto;
		overflow: hidden;
		position: relative;
		left: 0;
		transition: left 1s;
	}
	.slider .slider-item {
		display: inline-block;
		height: auto;
	}
	.slider .slider-item >img {
		display: block;
		height: auto;
		width: 100%;
	}
	.slider .slider-arrow {
		display: inline-block;
		color: #fff;
		font-size: 50px;
		position: absolute;
		top: 50%;
		margin-top: -50px;
		z-index: 100;
		padding: 20px;
		cursor: pointer;
		font-weight: bold;
	}
	.slider .slider-arrow:hover {
		background: rgba(0, 0, 0, 0.2);
	}
	.slider .slider-arrow-right {
		right: 0;
	}
	.slider .slider-arrow-left {
		left: 0;
	}
	.slider .slider-dots-wrap {
		z-index: 99;
		text-align: center;
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.slider .slider-dots-wrap .slider-dot {
		display: inline-block;
		width: 12px;
		height: 12px;
		/*border: 3px solid #ccc;*/
		background: rgba(0, 0, 0, 0.2);
		margin: 6px;
		cursor: pointer;
		border-radius: 20px;
	}
	.slider .slider-dots-wrap .slider-dot:hover {
		border: 3px solid #868686;
	}
	.slider .slider-dots-wrap .slider-dot-selected {
		background: #ccc;
	}
</style>