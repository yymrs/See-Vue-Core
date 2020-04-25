/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0
// Vue 是个类，
export function initMixin (Vue: Class<Component>) {
  // initMixin函数为Vue原型添加一个_init方法
  Vue.prototype._init = function (options?: Object) {
    // this 就是Vue的实例,options是new Vue()的参数
    // console.log(options,this);
    // console.log(this instanceof Vue);
    // console.log(this.constructor);
    const vm: Component = this
    // a uid
    vm._uid = uid++
    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      // vm.constructor 就是Vue构造函数
      // mergeOptions()首先格式化了props，Inject，directives最后返回了一个对象
      /** 例如:
       * components: {}
        created: [ƒ]
        data: ƒ mergedInstanceDataFn()
        directives: {}
        el: "#demo"
        filters: {truncate: ƒ, formatDate: ƒ}
        methods: {fetchData: ƒ, test: ƒ}
        props: {Dd: {…}}
        watch: {currentBranch: "fetchData"}
        _base: ƒ Vue(options)
        __proto__: Object
      */  
      //  把生成实例的参数放到实例的$options属性上面
      vm.$options = mergeOptions(
        // resolveConstructorOptions (vue构造函数，实例化的对象的参数||空对象，当前实例)
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // 代理 实例的option属性
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // debugger
    // expose real self
    vm._self = vm
    // 初始化生命周期
    initLifecycle(vm)
    // 初始化事件
    initEvents(vm)
    // 初始化render
    initRender(vm)
    // 调用钩子函数beforeCreate，此时还没有初始化state，data/props/methods还不能调用
    callHook(vm, 'beforeCreate')
    // 在初始化data/props之前 
    initInjections(vm) // resolve injections before data/props
    // 对data/props等属性进行初始化和检验
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    // 调用钩子函数created，此时可以调用data/props等属性了
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
    // 如果实例化Vue时指明了el，则进行挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}
// 参数是个类 结果返回的是参数的options属性
export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
