# notify前端Code Of Conduct



### 一、整体结构

- 本⼩程序前端整体使⽤原⽣微信⼩程序架构
- ⼩程序不使⽤云开发，使⽤服务器提供后端服务
- ⼩程序使⽤组件化（components）和模块化（models）开发

> 组件化详情请参考https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/
>
> 模块化详情请参考https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html）





### 二、页面规范

#### WXML

- wxml尽量不要超过200⾏（特殊情况除外）
- wxml中需要维持⼀定数量的注释（使⽤<!-- comment --> 来创建注释
- 除优先级问题导致组件样式必须写到style内，其余css style尽量写在wxss⾥
- 尽量为每⼀个标签给class属性
- 过⻓的⼀⾏可以换⾏



#### WXSS

- 每个⻚⾯中的WXSS尽量只包含该⻚⾯中出现的特殊样式，复⽤样式尽量更新到app.wxss等全局样
  式表中
- WXSS中需要维持⼀定数量的注释（使⽤/* comment */ 创建注释），只需要对⼀类的样式进⾏标
  注即可
- 单位使⽤rpx，rpx的相关⽂档请参考（https://developers.weixin.qq.com/miniprogram/dev/fra
  mework/view/wxss.html），尽量不要使⽤px单位



#### JSON

- 在JSON中配置⻚⾯的⼀些相关参数，具体⽤法请参考（https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html）
  
  

#### WXS

- WXML中嵌⼊的WXS脚本有着⽐JS更⾼的效率，对于⼀些⻚⾯的简单逻辑可以考虑写⼊WXML中的WXS，WXS语法请参考（https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/）



### 三、代码规范

提供Prettier插件进行代码格式化，已经写入npm命令，请在安装完npm插件后，使用

~~~
npm run format
~~~

命令来进行格式化，**提交代码前务必使用format命令**

1. 常量、变量和一般函数(非组件)使用小驼峰命名. 例如

   ```ts
   let userId = 2333;
   const maxNameLength = 10;
   const getMax = (a: number, b: number): number => (a > b ? a : b);
   const [count, setCount] = useState(0);
   ```

   在取名时尽量使用有实际意义的单词全拼组合, 比`filePath, groupName`

   对于一些约定俗成的常见单词可以使用缩写, 比如`imageSrc, sendMsg, resp`

   一些不好的命名方式`jiami`(不要用拼音 QAQ) `dfs`(请描述功能而不是算法) `a`(这是啥) `zym`(奇怪的缩写增加了!) `getuserbyname`(不要全部小写), `get_user_name`(使用下划线不是 js 系的风格)等等

   特例: 循环变量可以使用约定俗成的`i` `j` `k` `l` (不会真的有人套五层 for 循环吧)

   - 变量定义请使用`let`, 而不是`var`.

2. 组件(class, function)统一使用大驼峰命名. 例如

   ```ts
   class Children extends Father {
      
   }
   ```

3. 大括号

   - 为了程序的可扩展性, 即使代码块中只有一个语句, 也请添加大括号.

     ```ts
     if (recvMsg.content.indexOf('tql') != -1) {
        askForBg(recvMsg.sender);
     } else {
        ...
     }
     ```

   - 左大括号不换行 (这是当然的吧!)

   - 右大括号如果后面跟右小括号则右小括号不换行, 否则在后面换行

     ```ts
     https.on('data', (data) => {
        if(...) {
           ...
        }
     
        ...
     });
     ```

4. 引号

   字符串强烈建议双引号`""`，~~当然如果你非常喜欢单引号那也可以用~~

5. 分号

   众所周知,`js是一门需要分号结尾的语言`;

6. tabstop

   请使用**两个空格**来缩进. 用小程序自带的编辑器里右键格式化即可。

7. 逗号

   - 请尽量不要用逗号来分隔两个或更多表达式, 请把他们分别列出来 (即使这样会显著增加代码的行数
   - 关于 Trailing Comma(就是在最后一项后面跟着的~~多余的~~逗号`,`), 如果不报错就可以随便用, 一般是出现在比较大的 Array 和 Object 后面, 可以方便别人往后添加内容 (这个倒是没有也无所谓)
   - 对于参数列表来说, trailing comma 可以有但没必要, 所以建议不加.
   - JSON **hates** trailing commas. ~~(虽然我觉得这样不好)~~ 请不要在 JSON 中出现多余的逗号

8. 函数

   请尽量使用命名function函数

   ~~~js
   function Log(e){
   	console.log(e)
   }
   ~~~

   而不是匿名函数

   ~~~js
   (e)=>{
   	console.log(e)
   }
   ~~~

   

#### WX API

- 使⽤wx api时需要处理好错误，如果需要使⽤toast或者弹窗的话，请参考下⽂的错误处理部分
- 使⽤同步⽅法（以Sync结尾）时，使⽤try catch结构

~~~js
try {
	wx.setStorageSync('key', 'value')
} catch (e) {
	console.error(e)
}
~~~



#### ⻚⾯尺⼨

​	根据rpx的定义，iphoneX中，1px正好等于2rpx

​	如果考虑到⻚⾯适配等问题，可以酌情灵活使⽤其他的尺⼨单位



### 三、组件规范

页面请采用组件化进行开发，非页面组件请在代码中留足**相应的注释和传参说明**，务必注意组件的可拓展性

##### 组件测试

组件的功能将通过⽂档的⽅式给出，组件的开发阶段尽量在独⽴于主程序的⼩程序中进⾏测试（如果涉
及到⽤户身份等问题，可以使⽤主程序测试⻚⾯进⾏搭载测试）



##### 关于组件Behaviours

可能使⽤较少，需要使⽤时，多使⽤注释标明即可



##### 组件的复⽤性

⼀般只考虑特别相近的功能，可以通过单个组件进⾏实现，若功能相差过⼤（需要额外100-200⾏代
码），只需要单独新建组件实现即可



##### 组件的封装

**组件与⻚⾯的信息传递只限于下⾯的⽅法**

- ⻚⾯通过setData改变组件的properties
- 组件通过事件冒泡向⻚⾯传递消息
- 少⽤⻚⾯通过获取组件实例直接调⽤组件⽅法



### 四、全局变量和函数



##### 全局变量

全局需要使⽤的变量建议以json或者js的⽅式储存在根⽬录下的data或者settings⽂件夹中，⽅便整体调节
全局变量⼤致包含以下内容：

- ⼩程序固定⽂案
- 多个⻚⾯和组件中使⽤的常量
- ⼀些固定的字典和数组



##### 全局函数

需要全局使⽤的函数可以写在app.js中，⼀般是⼀些与wx api相关的函数。其他情况下建议使⽤model
来处理



### 五、错误处理

- ⼀般错误处理需要在进⾏⼀定处理的同时，⼤部分时间需要通过⼀定的可感知的形式反馈给⽤户
- 组件的错误处理⼀般需要：
  - 调⽤微信API中的模态窗⼝反馈错误
  - 在设计稿中明确了交互形式的可能需要在组件中调⽤组件或者冒泡给⻚⾯进⾏处理



### 六、工作流程

本项目使用git flow进行开发，无法向master分支直接提交合并请求，必须通过merge request发起合并请求，有关git flow的文档请参考https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow/

commit格式要求：

- 核心概念：指出修改了哪些部分, 为了实现什么目的?
- 列举一些不好的例子
  - `修复破损的铁布衫` (这是干了啥?)
  - `12.04 20:33` (commit 的时候是有时间信息的, 不需要你标出来..)





### 七、文档

**开发中使用jsdoc来自动化生成注释**，要求每个实际使用的函数方法必须通过param来进行注释，无论是component还是model

开发完成后使用

~~~
npm run docs
~~~

来生成注释文件

开发中一定注意维护每个组件的注释

