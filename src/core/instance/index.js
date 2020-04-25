import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// 定义一个构造函数
function Vue (options) {
  // 如果不是生产环境并且this不是Vue的实例给一个警告
  // options是我们new Vue()传的参数
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// init对Vue实例进行属性的初始化
initMixin(Vue)
// 给Vue原型里面添加属性和方法
stateMixin(Vue)
// 给原型添加事件
eventsMixin(Vue)
// 给原型添加更新销毁方法
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
