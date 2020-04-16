/*
 * @Author: your name
 * @Date: 2020-04-16 11:16:19
 * @LastEditTime: 2020-04-16 14:58:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \See-Vue-Core\scripts\alias.js
 */
const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
