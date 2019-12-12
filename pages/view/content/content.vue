<template>
	<div @click="update">122344</div>
</template>

<script>
	export default {
		onLoad() {
			uni.$once('adds', function(data) {
				console.log(data);
			})
		},
		data() {
			return {};
		},
		methods: {
			update() {
			
			}
		}
	};
</script>

<style></style>
