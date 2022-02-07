task:

1. 完成 dashboard 页面
2. 显示学员列表
3. 左侧导航栏可以收缩
4. 顶部导航右侧推出功能，点击后退出应用，定位到登陆页面。

问题：

1. 左侧导航栏下方 箭头 按钮 和上面 header 按钮 目前只能 2 选一

- 已解决，通过 Sider 的 onCollapse attribute 设置

2. 左侧 Sider 和 顶部 Header 不固定

- 已解决， 通过 Affix 组件 设置固定 （not sure if this is best practice）

3. 没有思路 如何封装 /code splitting - 按照什么 标准或者 有没有 best practice

领域驱动设计 - 相关领域知识之后开发， 这个领域的 通用 概念/知识
example： blockchain - smart contract/ 上链

getUrl（path）{
return path..
}

参数传递？ 单独封装或者
get  
post

axios 拦截器

业务/底层

面向对象/ function 等等
