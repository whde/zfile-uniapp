<template>
	<uni-list>
		<uni-list-item v-for="item in dataList" :key="item.id" :title="item.name" :note="item.type.description"
			showArrow thumb="../../static/img/drive.png" thumb-size="base" :data="item" clickable @click="onClick(item)">
		</uni-list-item>
	</uni-list>
</template>

<script>
	var self;
	export default {
		data() {
			return {
				dataList: [],
			}
		},
		onLoad() {
			self = this
			this.request()
		},
		methods: {
			request() {
				uni.request({
					url: 'http://172.30.145.177:8080/api/drive/list',
					success: function(res) {
						self.dataList = res.data.data.driveList;
						console.log(self.dataList)
					}
				});

			},
			onClick(item) {
				uni.navigateTo({
					url: '/pages/dir/index?id=' + item.id + '&name=' + item.name
				});
			}
		}
	}
</script>

<style>

</style>
