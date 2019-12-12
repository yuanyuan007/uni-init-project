/*
 参数说明
 @url
 要跳转的目标地址
 @opt
 要传给目标地址的参数
 可在目标页面的onLoad生命周期函数的第一个参数中获取
*/
// 压栈跳转页面
export function navigateTo(type, url, opt, ) {
	// H5端页面跳转目前不支持动画 (浏览器性能限制)
	let toUrl = url;
	let api = 'navigateTo';
	toUrl = opt ? toUrl + '?' + convertObj(opt) : toUrl;

	switch (type) {
		case 1:
			api = 'navigateTo';
			break;
		case 2:
			api = 'redirectTo'; // 关闭当前页,跳转应用内某个页面
			break;
		case 3:
			api = 'reLaunch'; // 关闭所有页面,打开到应用内某个页面
			break;
		case 4:
			api = 'switchTab'; //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
			break;
		default:
			api = 'navigateTo'
			break;
	}
	uni[api]({
		url: toUrl,
		animationType: 'slide-in-right',
		animationDuration: 200
	});
}

// 关闭当前页面并返回上一页面  delta 标识返回几层
export function navigateBack(delta) {
	uni.navigateBack({
		delta: delta
	});
}

// setStorage 将数据存入缓存
export function setStorage(key, val) {
	if (typeof val == 'string') {
		uni.setStorageSync(key, val);
		return val
	}
	uni.setStorageSync(key, JSON.stringify(val));
}

// getStorage 从缓存中读取数据
export function getStorage(key) {
	let uu = uni.getStorageSync(key);
	try {
		if (typeof JSON.parse(uu) != 'number') {
			uu = JSON.parse(uu);
		}
	} catch (e) {}
	return uu;
}
// 删除缓存中的数据
export function removeStorage(key) {
	if (key) {
		uni.removeStorageSync(key);
	}
}
// 将缓存中的数据清空
export function clearStorage() {
	try {
		uni.clearStorageSync();
	} catch (e) {
		throw new Error('处理失败');
	}
}
// 显示Toast
/*
@title 最多汉字数量7个
@icon success loading none 
*/
export function Toast(title, icon = 'none', obj = {}) {
	let toastData = {
		title: title,
		duration: 2000,
		position: 'center',
		mask: true,
		icon: icon ? icon : 'none',
		...obj
	};
	console.log(toastData);
	uni.showToast(toastData);
}
/*
显示loading提示框,需要手动隐藏
*/
export function Loading(title = '加载中...', obj = {}) {
	uni.showLoading({
		title: title,
		mask: true,
		...obj
	});
}
// 隐藏loading
export function hideLoading() {
	try {
		uni.hideLoading();
	} catch (e) {
		//TODO handle the exception
		throw new Error('处理失败');
	}
}
// 模态框 
/*
确定取消按钮的文字颜色可修改
obj 对象中传入 cancelColor : rgb 即可修改取消按钮颜色
obj 对象中传入 confirmColor : rgb 即可修改确认按钮颜色
*/
export function Modal(title = '提示', content = '这是一个模态弹窗!', obj = {
	showCancel: true,
	cancelText: '取消',
	confirmText: '确定'
}) {
	return new Promise((reslove, reject) => {
		uni.showModal({
			title: title,
			content: content,
			...obj,
			success: (res) => {
				if (res.confirm) {
					reslove()
				}
				if (res.cancel) {
					reject()
				}
			}
		});
	})
}
/*
显示操作菜单
@itemList 操作菜单数组
@itemColor 文字颜色
*/
export function ActionSheet(itemList, itemColor = "#000000") {
	return new Promise((reslove, reject) => {
		uni.showActionSheet({
			itemList: itemList,
			itemColor: itemColor,
			success: (res) => {
				reslove(res.tapIndex);
			},
			fail: function(res) {
				reject(res.errMsg);
			}
		});
	})
}
//将页面滚动到目标位置。
export function ScrollTo(ScrollTop) {
	uni.pageScrollTo({
		scrollTop: ScrollTop,
		duration: 300
	})
}

// 获取用户信息
export function GetUserInfo() {
	return new Promise((reslove, reject) => {
		uni.getUserInfo({
			success(res) {
				console.log(res);
				reslove(res);
			},
			fail(rej) {
				reject(rej);
			}
		})
	})
}

// 获取用户授权信息
export function Authorize(scoped = 'scope.userInfo') {
	return new Promise((reslove, reject) => {
		uni.authorize({
			scope: scoped,
			success(res) {
				reslove(res);
			},
			fail(rej) {
				reject(rej);
			}
		})
	})
}


function convertObj(opt) {
	let str = '';
	let arr = [];
	Object.keys(opt).forEach(item => {
		arr.push(`${item}=${opt[item]}`);
	})
	str = arr.join('&');
	return str;
}
