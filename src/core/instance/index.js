import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// 定义一个构造函数
function Vue (options) {
  // 如果不是生产环境并且this不是Vue的实例给一个警告
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// init对Vue实例进行属性的初始化
initMixin(Vue)
stateMixin(Vue)
// 对事件绑定的注入
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
