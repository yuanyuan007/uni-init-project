const url = '' // 服务端地址
let api = {
	example:{
		url: '',
		method: 'get',
		form: true,
		loading: true
	}
}

if(process.env.NODE_ENV === 'production') {
  Object.keys(api).forEach(item => {
    api[item]['url'] = 'http://www.educvip.com/smart_sand/' + api[item]['url'];
  })
} else {
  Object.keys(api).forEach(item => {
    api[item]['url'] = 'http://www.educvip.com/smart_sand/' + api[item]['url'];
  })
}
export default api;
