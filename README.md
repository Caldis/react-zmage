#  [react-zmage](https://zmage.u2sk.com/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react-zmage) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

react-zmage 是一个基于 React 的的图片缩放控件, 使用 Zmage 标签包裹后的图片可以获得缩放效果

您可以用这个控件完全替代原生的 img 标签, 令其附带图片缩放功能

您也可以直接调用附带的接口, 直接以函数调用而不是组件的形式调用全屏的图片展示叠层

本项目仍在开发中, 您可以点击 [演示页面](http://zmage.u2sk.com) 看看现在的效果, 如果您感兴趣, 欢迎根据以下的说明试用, 也欢迎 [来这里](https://github.com/Caldis/react-zmage/issues) 反馈意见

- **使用简单** 您只需要引入组件, 然后直接替换 img 标签为 Zmage 标签即可
- **过渡动画** react-zmage 提供了一系列的平滑的过渡动画, 您可以在 [演示页面](http://zmage.u2sk.com) 查看效果
- **支持键盘** 如果图片大于屏幕尺寸, 您可以使用 Space 来放大图片, 然后使用鼠标来左右查看, 如果您传入了图片序列, 您也可以使用键盘的 ← → 来查看上一张或下一张图片, 当然 Esc 一直是退出的最好选择
- **函数调用** 如果您不想以组件方式查看大图, 您可以使用函数的方式来呼出 react-zmage


## 演示
#### 在线
http://zmage.u2sk.com
#### 本地
```shell
git clone https://github.com/Caldis/react-zmage
cd react-zmage
npm i
npm exam-dev
open http://127.0.0.1:8080/
```


## 简单上手
1. 从 NPM 安装
```
npm i react-zmage --save
```
2. 在项目中引入
```
import Zmage from 'react-zmage'
```
3. 将页面中的 img 标签替换为 Zmage
```
<img src="图片源连接" alt="图片介绍文字"/>
```
👆 to 👇
```
<Zmage src="图片源连接" alt="图片介绍文字"/>
```
好了, 刷新页面, 现在您的所有图片都可以放大观看了 !


## 配置
- 待完善


## 开源
[react](https://github.com/facebook/react)

[react-dom](https://github.com/facebook/react)

[prop-types](https://github.com/reactjs/prop-types)

[react-transition-group](https://github.com/reactjs/react-transition-group)


## 贡献
该组件的主要目的是扩展并增强原有 img 标签的功能, 使其更易于使用

我们随时欢迎您发起一个 [PR](https://github.com/Caldis/react-zmage/pulls) 来帮助我们改进代码
如果您发现任何问题, 也欢迎 [来这里](https://github.com/Caldis/react-zmage/issues) 反馈意见


## 证书
react-zmage 基于 [MIT licensed](./LICENSE) 发布