# DOM备忘录

### document
------
* document.anchors
获取当前页面所有锚

* document.forms
获取当前页面所有表单

* document.getElementById
返回第一个匹配的元素

* document.images
获取当前页面所有图片

### event
------
* event.keycode
对应键盘的按键code

* event.button
鼠标点击的哪个按键，0=>左键，1=>中键，2=>右键

* event.clientX | clientY
事件发生的坐标

* event.screenX | screenY
相对屏幕的X或Y的值

* event.shiftKey
点击shift返回1，否则返回0

> IE环境event.srcElement等于FireFox的event.target

### nodeType
------
* 1：元素
* 2：属性
* 3：文本
* 8：注释
* 9：文档

### form
------
``` js{4}
var f = document.getElementById('x')
```
* f.action // 获取action的值
* f.action = 'some action' // 设置action的值
* f.method // 获取请求方法
* 如果input元素拥有name值，那么使用f.name的具体值即可获取对应的input元素
* f.elements // 获取此form对象下的所有input元素
* f.onsubmit = function(){ return false | true} // 返回false此表单不会提交

### button
-------
```
disable = true // 禁用
disable = false | null // 启用
```

### checkbox
-------
```
checked = true // 选中
checked = false // 取消
```

### 选中文本内容
---
``` js{4}
var text = document.getElementById('x')
text.select() // 选中文本域内容
```

### 下拉列表
------
``` js{4}
var selectDom = document.getElementById('x')
```
* selectDom.selectedIndex // 选中的索引
* selectDom.options // 列出options
* selectDom.length // 有几个可选项
* selectDom.size = 3 // 设置选择框可见选项的数量
* selectDom.multiple = true // 用来设置是否可以多选
* 如果options没有设置value属性，那么文本就是value
* 通过selectDom.remove(index)，移除对应的option
* 选中options，设置属性selected="selected"

### Table
------
``` js{4}
var t = document.getElementById('x')
```
* cellpadding	单元边沿与其内容之间的空白
* cellspacing 规定单元格之间的空白
* frame 规定外边框哪部分可见（void，above，below，hsides，lhs，rhs，vsides，box，border）
* t.rows()获取所有行
* 获取tr元素的rowIndex属性，使用deleteRow(rowIndex)来删除一行
* insertRow(index)返回的row对象再执行，insertCell(index)返回cell对象
* td标签使用colspan用来指定单元格横向跨越的列数，rowspan用来指定单元格纵向跨越的行数

### AccessKey元素快捷访问
------
* windows
```
alt + key
FireFox shift + alt + key
```
* mac
```
control + option + key
```

### frameset、frame、iframe
------
* frameset设置rows="30%，30%，30%"，每一行占屏幕百分比高度
* frameset设置cols="30%，30%，30%"，每一行占屏幕百分比宽度
* frame不能脱离frameset使用，但是iframe可以脱离文档使用
* frame的frameset使用时不能有body标签
* iframe的frameset使用时必须在body标签里
* iframe单独使用时有无body标签都可以
* 通过src属性来设置框架源

### window
------
* window.top 顶层窗口，可使用window.top != window.self来判断当前窗口是否是顶层窗口
* window.open(URL,name,specs,replace) 打开窗口，name可填写target值
* window.screen.availWidth | availHeight 屏幕可用宽度或高度

### navigator
------
* appCodeName	浏览器的代码名
* appName	浏览器的名称
* appVersion	浏览器的平台和版本信息
* cookieEnabled	指明浏览器中是否启用 cookie 的布尔值
* platform	运行浏览器的操作系统平台
* userAgent	由客户机发送服务器的user-agent 头部的值

### location
------
* hash	URL的锚部分
* host	URL的主机名和端口
* hostname	URL的主机名
* href	完整的URL
* pathname	URL路径名
* port	服务器使用的端口号
* protocol	协议(http、https)
* search	queryString（如：?a=1&b=2）
* location.reload() 重新加载页面
* location.replace(url) 替换当前页面，浏览器不产生后退
