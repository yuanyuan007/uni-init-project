import {
	Loading,
	hideLoading
} from '/pages/utils/uniApi.js';

function http(api, data) {
	let post_data = {
		url: api.url, //仅为示例，并非真实接口地址。
		data: data,
		header: {
			'content-type': api.form ? 'application/x-www-form-urlencoded' : 'application/json'
		},
		method: api.method.toUpperCase(),
		timeout: 3000,
	}
	return Promise((reslove, reject) => {
		uni.request({
			...post_data,
			success: (res) => {
				// 根据接口返回参后续进行封装
				reslove(checkOutCode(res));
			},
			fail: (rej) => {
				reject(rej);
			}
		});
	})

}

function checkOutCode(data) {
	// 检查服务端数据
	return data
}

export default http;
