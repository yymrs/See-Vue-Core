## 第一天我们看到最终核心部分在src/core文件下
入口文件src/core/index开始一步步初始化vue
在src/core/index文件里面引入  vue './instance/index'
接着在'./instance/index'文件里面开始初始化vue的各种属性
## 第2/3/4天我们看到最终核心部分在src/core文件下
入口文件src/core/index开始一步步初始化vue
在src/core/index文件里面引入  vue './instance/index'
接着在'./instance/index'文件里面开始初始化vue的各种属性
// init对Vue实例进行属性的初始化
initMixin(Vue)
// 给Vue原型里面添加属性和方法
stateMixin(Vue)
// 给原型添加事件
eventsMixin(Vue)
// 给原型添加更新销毁方法
lifecycleMixin(Vue)
renderMixin(Vue)
这些方法为Vue原型添加属性和方法
