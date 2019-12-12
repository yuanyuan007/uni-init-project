<script>
	import {
		setStorage
	} from 'pages/utils/uniApi.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			uni.onWindowResize((res) => {
				// 监听视口变化，实时存储，并节流
				this.throttle(this.resize(res.size.windowWidth, res.size.windowHeight))
			})
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		data() {
			return {
				t: Object
			}
		},
		methods: {
			resize(width, height) {
				setStorage('windowWidth', width);
				setStorage('windowHeight', height);
			},
			// 节流函数
			throttle(fn, delay) {
				var lastTime;
				var timer;
				var delay = delay || 200;
				return function() {
					var args = arguments;
					// 记录当前函数触发的时间
					var nowTime = Date.now();
					if (lastTime && nowTime - lastTime < delay) {
						clearTimeout(timer);
						timer = setTimeout(function() {
							// 记录上一次函数触发的时间
							lastTime = nowTime;
							// 修正this指向问题
							fn.apply(this, args);
						}, delay);
					} else {
						lastTime = nowTime;
						fn.apply(this, args);
					}
				}
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	@import url('./static/globalLess/index.less');
</style>
