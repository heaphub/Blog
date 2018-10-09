# MVVM的基础原理与实现
![](http://otj0cetqv.bkt.clouddn.com/170808/mvvm.png)
### 什么是MVVM

MVVM的核心思想是数据驱动，数据（Model）通过ViewModel与视图（View）绑定，此时对Model的操作将映射为DOM更新，可以看出数据驱动使开发者不用关心DOM操作，只专注对数据的操作。

MVVM功能完备的框架，Vue、React、Angular等


### 一码胜千言
下面是作者实现的一个仅具备简单数据驱动的MVVM Demo

<script async src="//jsrun.net/cDYKp/embed/all/light/"></script>

------

### ViewModel
ViewModel作为数据驱动的核心，主要功能就是数据变化时维护DOM，那么一般如何检测数据变化呢？
一种是通过显示调用设置方法，另一种就是基于 ES5 Object.defineProperty。

Object.defineProperty可以设置对象某个属性的set方法，在对这个对象某个属性赋值时，就可以编写符合自己需求的设置方法或执行一些逻辑处理。

上面Demo的实现思路是，递归遍历某个指定element下的childNodes，对nodeType为1并且包含指定属性的元素进行数据绑定处理。
此属性的值就是Model对象的属性，从而将DOM与Model建立了联系。在不考虑性能的前提下，只要set方法被调用就可以直接将新值应用在DOM上。


>ECMAScript 5 (ES5)：ECMAScript 的第五版修订，于 2009 年完成标准化。这个规范在所有现代浏览器中都相当完全的实现了

### 原理重要不？
如果你觉得不重要，那么真的不重要。

