<template>
	<div class="content">
		<!-- <open-data type="userAvatarUrl"></open-data> -->

		<div @click="set">存储数据</div>
		<div @click="get">读取数据</div>
		<div @click="clearAllData">清空数据</div>
		<div class="link" @click="link">点击跳转</div>
		<div @click="showToast">toast</div>
		<div @click="showLoading">Loading</div>
		<div @click="showModel">Modal</div>
		<div @click="showActionSheet" ref="sheet">ActionSheet</div>
		<view :animation="animationData" style="background:red;height:100rpx;width:100rpx"></view>
	<view>
	    <uni-calendar 
	    :insert="true"
	    :lunar="true" 
	    :start-date="'2019-3-2'"
	    :end-date="'2019-5-20'"
	    @change="change"
	     ></uni-calendar>
	</view>
	</div>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import {
		navigateTo,
		setStorage,
		getStorage,
		clearStorage,
		Toast,
		Loading,
		hideLoading,
		Modal,
		ActionSheet,
		GetUserInfo,
		Authorize
	} from 'pages/utils/uniApi.js';
	import emits from 'pages/utils/uniX.js';
	export default {
		components:{
			  uniCalendar
		},
		onShow() {
			// uni.setNavigationBarTitle({
			// 	title: '新的标题'
			// });
			// uni.setNavigationBarColor({
			//     frontColor: '#ffffff',
			//     backgroundColor: '#ff0000',
			//     animation: {
			//         duration: 400,
			//         timingFunc: 'easeIn'
			//     }
			// })
			var animation = uni.createAnimation({
				duration: 1000,
				timingFunction: 'ease',
			})

			animation.scale(2, 2).rotate(5).step()
			this.animation = animation
			this.animationData = animation.export()
			setTimeout(() => {
				animation.translate(60).step()
				this.animationData = animation.export()
			}, 1000);

			// 以下代码只会在微信小程序执行
			// #ifdef MP-WEIXIN 
			// uni.login({
			// 	success(res) {
			// 		console.log(res);
			// 		GetUserInfo().then(res => {
			// 			console.log(res);
			// 		}).catch(rej => {
			// 			console.log(rej, '失败');
			// 			Authorize().then(res => {

			// 			}).catch(rej => {
			// 				console.log(rej);
			// 			})
			// 		})
			// 	},
			// 	fail(rej) {
			// 		console.log(rej)
			// 	}
			// })
			// #endif

		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 2000)
		},
		data() {
			return {
				animationData: {}
			}
		},
		methods: {
			  change(e) {
			            console.log(e);
			        },
			link() {
				emits.setValue({
					a: '1'
				});
				navigateTo(1, '../content/content');
			},
			set() {

				setStorage('asd', {
					a: '1',
					b: '3'
				})
			},
			get() {
				let a = getStorage('asd');
				console.log('get');

			},
			clearAllData() {
				clearStorage();
			},
			showToast() {
				Toast('测试');
			},
			showLoading() {
				Loading();
				setTimeout(() => {
					hideLoading()
				}, 2000)
			},
			showModel() {
				Modal().then(res => {
					console.log('确定');
				}).catch(rej => {
					console.log('取消');
				})
			},
			showActionSheet() {

				ActionSheet(['a', 'b', 'c']).then(res => {
					console.log(res);
					console.log(this.$refs.sheet.offsetTop);
				}).catch(rej => {
					console.log(rej);
				})
			}
		}
	};
</script>

<style scoped lang="less">
	.content {
		div {
			margin-top: 20rpx;
		}

		.link {
			color: #007aff;
			font-size: 14px;
		}
	}
</style>
