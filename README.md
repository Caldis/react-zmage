# react-zmage
- 本项目仍在开发中, 您可以点击 [演示页面](http://zmage.u2sk.com) 看看现在的效果
- 如果您感兴趣, 欢迎根据以下的说明试用, 也欢迎 [来这里](https://github.com/Caldis/react-zmage/issues) 反馈意见

## 简介

react-zmage 是一个简单的图片缩放控件, 您可以用这个控件完全替代原生的 img 标签, 令其附带图片缩放功能

## 使用三步走

安装
```
npm i react-zmage --save
```

然后在项目中引入
```
import Zmage from 'react-zmage'
```

将页面中的 <img/> 替换为 <Zmage/>
```
<Zmage src="图片源连接" alt="图片介绍文字"/>
```

好了, 刷新页面, 现在您的所有图片都可以放大观看了 !