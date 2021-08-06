## 数据绑定

WXML 中的动态数据均来自对应 Page 的 data。

## 简单绑定

数据绑定使用 Mustache 语法（双大括号）将变量包起来，可以作用于：

### 内容

```html
<view> {{ message }} </view>
Page({
  data: {
    message: 'Hello MINA!'
  }
})
```

### 组件属性(需要在双引号之内)

```html
<view id="{{id}}"> </view>
Page({
  data: {
    id: 0
  }
})
```

### 控制属性(需要在双引号之内)

```html
<view wx:if="{{condition}}"> </view>
Page({
  data: {
    condition: true
  }
})
```

### 关键字(需要在双引号之内)

`true`：boolean 类型的 true，代表真值。

`false`： boolean 类型的 false，代表假值。

```html
<checkbox checked="{{false}}"> </checkbox>
```

***特别注意：不要直接写 `checked="false"`，其计算结果是一个字符串，转成 boolean 类型后代表真值。***

## 运算

可以在 `{{}}` 内进行简单的运算，支持的有如下几种方式：

### 三元运算

```html
<view hidden="{{flag ? true : false}}"> Hidden </view>
```

### 算数运算

```html
<view> {{a + b}} + {{c}} + d </view>
Page({
  data: {
    a: 1,
    b: 2,
    c: 3,
	d: 1
  }
})
```

view中的内容为 `3 + 3 + d`。

### 逻辑判断

```html
<view wx:if="{{length > 5}}"> </view>
```

### 字符串运算

```html
<view>{{"hello" + name}}</view>
Page({
  data:{
    name: 'MINA'
  }
})
```

### 数据路径运算

```html
<view>{{object.key}} {{array[0]}}</view>
Page({
  data: {
    object: {
      key: 'Hello '
    },
    array: ['MINA']
  }
})
```

## 组合

也可以在 Mustache 内直接进行组合，构成新的对象或者数组。

### 数组

```html
<view wx:for="{{[zero, 1, 2, 3, 4]}}"> {{item}} </view>
Page({
  data: {
    zero: 0
  }
})
```

最终组合成数组`[0, 1, 2, 3, 4]`。

### 对象

```html
<template is="objectCombine" data="{{for: a, bar: b}}"></template>
Page({
  data: {
    a: 1,
    b: 2
  }
})
```

最终组合成的对象是 `{for: 1, bar: 2}`

也可以用扩展运算符 `...` 来将一个对象展开

```html
<template is="objectCombine" data="{{...obj1, ...obj2, e: 5}}"></template>
Page({
  data: {
    obj1: {
      a: 1,
      b: 2
    },
    obj2: {
      c: 3,
      d: 4
    }
  }
})
```

最终组合成的对象是 `{a: 1, b: 2, c: 3, d: 4, e: 5}`。

如果对象的 key 和 value 相同，也可以间接地表达。

```html
<template is="objectCombine" data="{{foo, bar}}"></template>
Page({
  data: {
    foo: 'my-foo',
    bar: 'my-bar'
  }
})
```

最终组合成的对象是 `{foo: 'my-foo', bar:'my-bar'}`。

**注意**：上述方式可以随意组合，但是如有存在变量名相同的情况，后边的会覆盖前面，如：

```html
<template is="objectCombine" data="{{...obj1, ...obj2, a, c: 6}}"></template>
Page({
  data: {
    obj1: {
      a: 1,
      b: 2
    },
    obj2: {
      b: 3,
      c: 4
    },
    a: 5
  }
})
```

最终组合成的对象是 `{a: 5, b: 3, c: 6}`。

**注意：** 花括号和引号之间如果有空格，将最终被解析成为字符串

```html
<view wx:for="{{[1,2,3]}} ">
  {{item}}
</view>


<view wx:for="{{[1,2,3]}}">
  {{item}}
</view>
```

等同于

```html
<view wx:for="{{[1,2,3] + ' '}}">
  {{item}}
</view>
```







## 列表渲染

## wx:for

在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。

默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item`

```html
<view wx:for="{{array}}">
  {{index}}: {{item.message}}
</view>


Page({
  data: {

	index:123,
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  }
})
```

使用 `wx:for-item` 可以指定数组当前元素的变量名，

使用 `wx:for-index` 可以指定数组当前下标的变量名：

```html
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```

`wx:for` 也可以嵌套，下边是一个九九乘法表

```html
<view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="i">
  <view wx:for="{{[1, 2, 3, 4, 5, 6, 7, 8, 9]}}" wx:for-item="j">
    <view wx:if="{{i <= j}}">
      {{i}} * {{j}} = {{i * j}}
    </view>
  </view>
</view>
```

## block wx:for

类似 `block wx:if`，也可以将 `wx:for` 用在`<block/>`标签上，以渲染一个包含多节点的结构块。例如：

```html
<block wx:for="{{[1, 2, 3]}}">
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>
```

## wx:key

如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 [input](https://developers.weixin.qq.com/miniprogram/dev/component/input.html) 中的输入内容，[switch](https://developers.weixin.qq.com/miniprogram/dev/component/switch.html) 的选中状态），需要使用 `wx:key` 来指定列表中项目的唯一的标识符。

`wx:key` 的值以两种形式提供

1. 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
2. 保留关键字 `*this` 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字。

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

**如不提供 `wx:key`，会报一个 `warning`， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。**



## 条件渲染

## wx:if

在框架中，使用 `wx:if=""` 来判断是否需要渲染该代码块：

```html
<view wx:if="{{}}"> True </view>
```

也可以用 `wx:elif` 和 `wx:else` 来添加一个 else 块：

```html
<view style="display:{{length>5?'':'none'}}"  id="view1"> 1 </view>
<view style="display:{{length>2&&length<5?'':'none'}}"  id="view2"> 2 </view>
<view style="display:{{length<2?'':'none'}}" > 3 </view>
```

## block wx:if

因为 `wx:if` 是一个控制属性，需要将它添加到一个标签上。如果要一次性判断多个组件标签，可以使用一个 `<block/>` 标签将多个组件包装起来，并在上边使用 `wx:if` 控制属性。

```html
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```

**注意：** `<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。



## 引用与template

WXML 提供两种文件引用方式`import`和`include`。

## 定义模板

使用 name 属性，作为模板的名字。然后在`<template/>`内定义代码片段，如：

```html
<!--
  index: int
  msg: string
  time: string
-->
<template name="msgItem">
  <view>
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>
```

## 使用模板

使用 is 属性，声明需要的使用的模板，然后将模板所需要的 data 传入，如：

```html
<template is="msgItem" data="{{...item}}"/>
Page({
  data: {
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }
  }
})
```

is 属性可以使用 Mustache 语法，来动态决定具体需要渲染哪个模板：

```html
<template name="odd">
  <view> odd </view>
</template>
<template name="even">
  <view> even </view>
</template>

<block wx:for="{{[1, 2, 3, 4, 5]}}">
  <template is="{{item % 2 == 0 ? 'even' : 'odd'}}"/>
</block>
```

## 模板的作用域

模板拥有自己的作用域，只能使用 data 传入的数据以及模板定义文件中定义的 `<wxs />` 模块。

`import`可以在该文件中使用目标文件定义的`template`，如：

在 item.wxml 中定义了一个叫`item`的`template`：

```html
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
```

在 index.wxml 中引用了 item.wxml，就可以使用`item`模板：

```html
<import src="item.wxml"/>
<template is="item" data="{{text: 'forbar'}}"/>
```







## 什么是事件

- 事件是视图层到逻辑层的通讯方式。
- 事件可以将用户的行为反馈到逻辑层进行处理。
- 事件可以绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数。
- 事件对象可以携带额外信息，如 id, dataset, touches。

## 事件的使用方式

- 在组件中绑定一个事件处理函数。

如`bindtap`，当用户点击该组件的时候会在该页面对应的Page中找到相应的事件处理函数。

```html
<view bindtap="">
    
    <view bindtap="tapName">


<view wx:for={{[1,2,3,4,5,6]}} id="tapTest" data-index="{{index}}" data-hi="Weixin" bindtap="tapName"> Click me! </view>

</view>

    
</view>

```

- 在相应的Page定义中写上相应的事件处理函数，参数是event。

```js
Page({
    data:{
        id:10
        cxz:"tapName"
    }
  tapName: function(e) {
    console.log(e)
  }
})
```

- 可以看到log出来的信息大致如下：

```json
{
  "type":"tap",
  "timeStamp":895,
  "target": { //哪个组件发出的事件？
    "id": "tapTest",
    "dataset":  {
      "hi":"Weixin",
        
    }
  },
  "currentTarget":  { //哪个组件绑定了处理的函数？
    "id": "tapTest",
    "dataset": {
      "hi":"Weixin",
      "index":3,
    }
  },
  "detail": {
    "x":53,
    "y":14
  },
  "touches":[{
    "identifier":0,
    "pageX":53,
    "pageY":14,
    "clientX":53,
    "clientY":14
  }],
  "changedTouches":[{
    "identifier":0,
    "pageX":53,
    "pageY":14,
    "clientX":53,
    "clientY":14
  }]
}
```



事件分为**冒泡事件**和**非冒泡事件**：

1. 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
2. 非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。



所以谁是冒泡事件？

| touchstart    | 手指触摸动作开始                                             |                                                              |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| touchmove     | 手指触摸后移动                                               |                                                              |
| touchcancel   | 手指触摸动作被打断，如来电提醒，弹窗                         |                                                              |
| touchend      | 手指触摸动作结束                                             |                                                              |
| tap           | 手指触摸后马上离开                                           |                                                              |
| longpress     | 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 | [1.5.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| longtap       | 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）     |                                                              |
| transitionend | 会在 WXSS transition 或 wx.createAnimation 动画结束后触发    |                                                              |

等等



事件绑定的写法类似于组件的属性，如：

```html
<view bindtap="handleTap"> //注意这里不用大括号 为什么？
    Click here!
</view>
```

如果用户点击这个 view ，则页面的 `handleTap` 会被调用。

事件绑定函数可以是一个数据绑定，如：

```html
<view bindtap="{{ handlerName }}">  //data是一个字符串，会调用这个字符串名字的函数
    Click here!
</view>
```

此时，页面的 `this.data.handlerName` 必须是一个字符串，指定事件处理函数名；如果它是个空字符串，则这个绑定会失效（可以利用这个特性来暂时禁用一些事件）





**捕获阶段**

使用`capture-bind`、`capture-catch`关键字

恰恰相反的过程

```html
<view id="outer" bind:touchstart="handleTap1" capture-bind:touchstart="handleTap2">
  outer view
  <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
    inner view
  </view>
</view>
```

点击 inner view 会先后调用`handleTap2`、`handleTap4`、`handleTap3`、`handleTap1`。





如果使用了captrue-catch将中断捕获阶段和取消冒泡阶段。

```html
<view id="outer" bind:touchstart="handleTap1" capture-catch:touchstart="handleTap2">
  outer view
  <view id="inner" bind:touchstart="handleTap3" capture-bind:touchstart="handleTap4">
    inner view
  </view>
</view>
```

只触发`handleTap2`







## WXSS

与 CSS 相比，WXSS 扩展的特性有：

- 尺寸单位
- 样式导入

### 尺寸单位



- rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

| 设备         | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| :----------- | :----------------------- | :----------------------- |
| iPhone5      | 1rpx = 0.42px            | 1px = 2.34rpx            |
| iPhone6      | 1rpx = 0.5px             | 1px = 2rpx               |
| iPhone6 Plus | 1rpx = 0.552px           | 1px = 1.81rpx            |

### 样式导入

使用`@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用`;`表示语句结束。

**示例代码：**

```less
/** common.wxss **/
.small-p {
  padding:5px;
}
/** app.wxss **/

@import "common.wxss";

.middle-p {
  padding:15px;
}
```

### 内联样式

框架组件上支持使用 style、class 属性来控制组件的样式。

- style：静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。

```html
<view style="color:{{color}};" />


page({
data:{
	color:"blue",
}
})
```







选择器

| 选择器           | 样例             | 样例描述                                       |
| :--------------- | :--------------- | :--------------------------------------------- |
| .class           | `.intro`         | 选择所有拥有 class="intro" 的组件              |
| #id              | `#firstname`     | 选择拥有 id="firstname" 的组件                 |
| element tag      | `view`           | 选择所有 view 组件                             |
| element, element | `view, checkbox` | 选择所有文档的 view 组件和所有的 checkbox 组件 |
| ::after          | `view::after`    | 在 view 组件后边插入内容                       |
| ::before         | `view::before`   | 在 view 组件前边插入内容                       |





### 很多栗子