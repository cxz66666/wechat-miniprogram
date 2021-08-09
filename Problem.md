## Problem1：

信息的可视化一直是前端非常重要的研究领域，图标则是一个非常好的工具，echart提供了微信小程序端的简单可用的图表库，请仔细阅读https://github.com/ecomfe/echarts-for-weixin 的内容，实现下方的页面

> 注意，你需要做的是一个懒加载的页面，所有数据均需要等待3s后才能展示（模拟延迟）



所有数据均需要自己去拟造，上下两图表均要实现

![img](https://pic.raynor.top/images/2021/08/07/0A2A2BDE1F2AA60D58B1F8AF928DD931b028af956aa6c08f.jpg)



![img](https://pic.raynor.top/images/2021/08/07/44EFC4241871370E8B8C420846D1336E.jpg)



## Problem2：

身为一名前端工程师，你有一天接到了这样一个需求，需要开发如下的一个小程序页面

<img src="file:///C:\Users\ChenXuzheng\Documents\Tencent Files\1092889706\Image\C2C\24B11243D35C59C2A6707557C2AD22DE.jpg" alt="img" style="zoom:67%;" />

一个刷牙的动态页面，简单的将牙齿划分为6部分。 上下 左上左下 右上右下，顶部底部均不用实现

简单起见我们将每部分的刷牙时间设置为30s。你需要复现这个页面

- 每30s就需要切换下一个牙齿的动画和图片，刷新标题，刷新时间

- 而在这30s内，你又需要前半段将文本改成xx牙齿外侧面，后半段将文本改成xx牙齿内侧面
- 牙刷的gif旁需要轮流切换文本，位置需要在gif旁，需要根据目的字符串数组的长度动态分配每个的时间，这里我们简单起见**固定文本数组为[大张口,颤动颤动，浮刷浮刷]**，所以每个文本展示的时间为30/3=10s
- 下面三个按钮作用依次为：
  - 左侧为强制结束按钮，需要在开始后才能生效，立刻停止刷牙并且切换到结束页面
  - 中间为开始按钮，按下后转变为暂停按钮，同时开始计时，暂停按钮按下后将会停止计时，同时转换为开始按钮
  - 右侧按钮为复位按钮，**单击**将本部分牙齿倒计时复位，**双击**将从头开始倒计时（即从最初的第一部分牙齿开始倒计时）

如果用户不点击暂停或结束按钮，则将顺序播放六部分的gif和文本、时间，最终自动切换到结束页面，如果用户点击强制结束按钮，则将跳转到结束页面

用户从结束页面返回时，整个刷牙页面需要重置为初始状态

**你可能需要用到的js知识，这可能有些难度，所以有一些提示**

- 异步promise resolve时代表定时6个30s完成，无需reject
- 定时器中需要更新时间，判断是否下一个牙齿
- promise包裹setInterval



如下是用到的图标资源：

- 下方按钮的资源请自行到iconfont.cn上寻找
- 其余资源均已上传到阿里云oss上

牙齿的图片：

https://oss.raynor.top/teethb/teeth.png  初始未开始的图

https://oss.raynor.top/teethb/teeth_0.png  每部分的图

https://oss.raynor.top/teethb/teeth_1.png

https://oss.raynor.top/teethb/teeth_2.png

https://oss.raynor.top/teethb/teeth_3.png

https://oss.raynor.top/teethb/teeth_4.png

https://oss.raynor.top/teethb/teeth_5.png



牙刷的gif：

https://oss.raynor.top/teethb/1.gif

https://oss.raynor.top/teethb/2.gif

https://oss.raynor.top/teethb/3.gif

https://oss.raynor.top/teethb/4.gif

https://oss.raynor.top/teethb/5.gif

https://oss.raynor.top/teethb/6.gif