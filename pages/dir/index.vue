<template>
	<uni-list>
		<uni-list-item v-for="item in dataList" :key="item.id" :title="item.name" :note="item.formatSize"
			:rightText="item.time" :showArrow="item.isFolder" :thumb="item.thumb" thumb-size="base" :data="item" clickable
			@click="onClick(item)">
		</uni-list-item>
	</uni-list>
</template>

<script>
	import {makeThumb,tmpDirName, formatSize} from '../filetools.js'
	
	var self;
	export default {
		data() {
			return {
				driveId: '',
				name: '',
				dataList: []
			}
		},
		onLoad: function(option) {
			self = this
			console.log(option.name)

			this.name = option.name
			var path = option.path
			if (path == undefined) {
				path = ''
			}
			this.driveId = option.id
			this.request(this.driveId, path)
		},
		methods: {
			request(id, path) {
				console.log('http://172.30.145.177:8080/api/list/' + self.driveId + '?path=' + path)

				uni.request({
					url: 'http://172.30.145.177:8080/api/list/' + self.driveId + '?path=' + path,
					success: function(res) {
						self.dataList = res.data.data.files.filter(function(item) {
							return item.name != tmpDirName;
						}).map(function(item) {
							item.thumb = makeThumb(item)
							item.isFoolder = (item.type == 'FOLDER')
							item.formatSize = formatSize(item.size)
							return item;
						})
						console.log(res.data.data.files)
					}
				});

			},
			onClick(item) {
				if (item.type == 'FOLDER') {
					uni.navigateTo({
						url: '/pages/dir/index?id=' + self.driveId + '&name=' + item.name + '&path=' + encodeURI(
							item.path + item.name)
					});
				}

			},
		}
	}
</script>

<style>
</style>
