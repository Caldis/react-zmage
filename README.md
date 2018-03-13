[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

<div align="center">
  <a href="https://github.com/Caldis/react-zmage">
    <img width="200" height="200"
      src="docs/logo.png">
  </a>
  <h1>react-zmage</h1>
</div>

> react-zmage 是一个基于 React 的的图片缩放控件, 使用 Zmage 标签包裹后的图片可以获得缩放效果, 您可以用这个控件完全替代原生的 img 标签, 令其附带图片缩放功能, 本项目仍在开发中, 您可以点击 [演示页面](http://zmage.caldis.me) 看看示例。如果您感兴趣, 欢迎根据以下的说明使用, 也欢迎 [来这里](https://github.com/Caldis/react-zmage/issues) 反馈意见

**需要 react 版本大于 v16.0**
<h2 align="center">演示</h2>

**在线**
[http://zmage.caldis.me](http://zmage.caldis.me)

**本地**
```bash
git clone https://github.com/Caldis/react-zmage
cd react-zmage
npm i
npm exam-dev
open http://127.0.0.1:8080/
```


<h2 align="center">安装</h2>

```bash
npm i react-zmage --save
```


<h2 align="center">使用</h2>


**引入**
```js
import Zmage from 'react-zmage'
```

**将页面中的 img 标签替换为 Zmage**
```js
<img src="图片源连接"/>
👆 to 👇
<Zmage src="图片源连接"/>
```

**现在这些图片都可以放大查看了 ！**


<h2 align="center">配置</h2>

- 简单上手，请参见 http://zmage.caldis.me

|配置项|类型|默认值|描述|示例|
|:--:|:--:|:-----:|:-----|:----------:|
| **`src`** | `{String}` | "" | 图片 Url，与 img 标签的`src`属性一样 | [示例](https://github.com/Caldis/react-zmage#src) |
| **`alt`** | `{String}` | "" | 图片占位文字，与`img`标签的`alt`属性一样 | [示例](https://github.com/Caldis/react-zmage#alt) |
| **`txt`** | `{String}` | "" | 图片描述文字（暂未实现） | [示例](https://github.com/Caldis/react-zmage#txt) |
| **`set`** | `{{ObjectArray}}` | [] | 如果想在查看模式下呈现多张图片，您可以使用`set`传入一个或多个图片对象，每个图片对象包含了`src` `alt` `txt` | [示例](https://github.com/Caldis/react-zmage#set) |
| **`hotKey`** | `{Object}` | { allTrue } | 如果想禁用查看模式下的特定快捷键操作，您可以在`hotKey`中将特定项设为`false`以隐藏它们 | [示例](https://github.com/Caldis/react-zmage#hotKey) |
| **`controller`** | `{Object}` | { allTrue } | 如果想隐藏查看模式下的关闭按钮、放大按钮等操作控件，您可以在`controller`中将特定项设为`false`以隐藏它们 | [示例](https://github.com/Caldis/react-zmage#controller) |

### `src`
```js
"http://zmage.caldis.me/imgSet/aboutDeer/demo.jpg"
```

### `alt`
```js
"图片的占位文字，尽量保持简短，描述图片作用"
```

### `txt`
```js
"图片的描述文字，用于描述图片内容"
```

### `set`
```js
set: [
    {
        // 图片 Url
        src: "http://zmage.caldis.me/imgSet/aboutDeer/1.jpg",
        // 图片占位文字
        alt: "图片的占位文字，尽量保持简短，描述图片作用",
        // 图片描述文字
        txt: "图片的描述文字，可以写很长，描述图片内容"
    }
]
```

### `hotKey`
```js
hotKey: {
    // 关闭（ESC）
    close: true,
    // 缩放（空格）
    zoom: true,
    // 翻页（左右键）
    flip: true,
}
```

### `controller`
```js
controller: {
    // 关闭按钮
    close: true,
    // 缩放按钮
    zoom: true,
    // 分页
    pagination: true,
}
```


<h2 align="center">贡献</h2>

我们随时欢迎您发起一个 [PR](https://github.com/Caldis/react-zmage/pulls) 来帮助我们改进代码
如果您发现任何问题, 也欢迎 [来这里](https://github.com/Caldis/react-zmage/issues) 反馈意见


<h2 align="center">证书</h2>

react-zmage 基于 [MIT licensed](./LICENSE) 发布