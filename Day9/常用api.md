# WX API

https://developers.weixin.qq.com/miniprogram/dev/api/  官方文档地址

 ## wx.request https网络请求

~~~js
wx.request({

url: 'test.php', //仅为示例，并非真实的接口地址

method:"GET",

data: {

x: '' ,

y: ''

},

header: {
'content-type': 'application/json' },
success: function(res) {
console.log(res.data)
}
})
~~~





## 本地缓存

 

 ### 通过key的形式添加缓存setStorage （异步接口）

wx.setStorage({

key:"key"

data:"value"

})

 ### 通过key的形式获取缓存getStorage （异步接口）

wx.getStorage({

key: 'key',

success: function(res) {

console.log(res.data) }

})

 ### 从本地缓存中异步移除指定 key

wx.removeStorage({

key: 'key',

success: function(res) {

console.log(res.data)

}

})

 ### 清理本地数据缓存

wx.clearStorage()

 ## 显示、隐藏消息提示框

wx.showToast({

title: '加载中',

icon: 'loading',

duration: 10000 })

setTimeout(function(){

wx.hideToast()

},2000)

 ## 动态设置当前页面的标题

wx.setNavigationBarTitle({

title: '当前页面'

})

 ## 导航

    ### 保留当前页面，跳转到应用内的某个页面

wx.navigateTo({

url: 'test?id=1'

})

 ### 关闭当前页面，跳转到应用内的某个页面

wx.redirectTo({ url: 'test?id=1'

})

 ## 获取用户信息，需要先调用wx.login 接口

wx.getUserInfo({

success: function(res) {

var userInfo = res.userInfo

var nickName = userInfo.nickName

var avatarUrl = userInfo.avatarUrl

var gender = userInfo.gender //性别 0：未知、1：男、2：女

var province = userInfo.province

var city = userInfo.city

var country = userInfo.country

}

})

 ## 获取系统信息（异步接口）

wx.getSystemInfo({

success: function(res) {

console.log(res.model)

console.log(res.pixelRatio)

console.log(res.windowWidth)

console.log(res.windowHeight)

console.log(res.language)

console.log(res.version)

}

})

 ## 拨打电话

wx.makePhoneCall({

phoneNumber: '1340000' //仅为示例，并非真实的电话号码

}

 

 ## 获取当前的地理位置、速度

wx.getLocation({

type: 'wgs84',

success: function(res) {

var latitude = res.latitude

var longitude = res.longitude

var speed = res.speed

var accuracy = res.accuracy

}

})