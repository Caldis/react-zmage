[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

<div align="center">
  <a href="https://github.com/Caldis/react-zmage">
    <img width="150" height="150" src="docs/logo.png">
  </a>
  <h1>react-zmage</h1>
</div>

> react-zmage 是一个基于 React 的的图片缩放控件, 使用 Zmage 标签包裹后的图片可以获得缩放效果, 您可以用这个控件替代原生的 img 标签, 令其附带图片缩放功能

**需 react 版本大于 v16.3.0**
<h2 align="center">演示</h2>

**在线**
[https://zmage.caldis.me](https://zmage.caldis.me)

**本地**
```bash
git clone https://github.com/Caldis/react-zmage
cd react-zmage
npm i
npm run dev
```


<h2 align="center">安装</h2>

```bash
npm i react-zmage --save
```


<h2 align="center">使用</h2>


**1.引入**
```js
import Zmage from 'react-zmage'
```

**2.将页面中的 img 标签替换为 Zmage**
```js
<img src="图片源连接"/>
👆 to 👇
<Zmage src="图片源连接"/>
```

**现在这些图片都可以放大查看了 ！**


<h2 align="center">配置</h2>

#### 简单上手，请参见 [https://zmage.caldis.me](https://zmage.caldis.me)

- 基础数据

|配置项|类型|默认值|描述|示例|
|:--:|:--:|:-----:|:----------|:----------:|
| **`src`** | String | "" | 图片 Url，与 `img` 标签的 `src` 属性相同 | [示例](https://github.com/Caldis/react-zmage#src) |
| **`alt`** | String | "" | 图片占位文字，与 `img` 标签的 `alt` 属性相同 | [示例](https://github.com/Caldis/react-zmage#alt) |
| **`set`** | ObjectArray | [] | 如果想在查看模式下呈现多张图片，可以在 `set` 中传入多个图片对象 | [示例](https://github.com/Caldis/react-zmage#set) |
| **`defaultPage`** | Number | 0 | 如果传入了多张图片, 可以指定打开后的默认页 | [示例](https://github.com/Caldis/react-zmage#defaultPage) |

- 预设配置 (beta)

|配置项|类型|默认值|描述|示例|
|:--:|:--:|:-----:|:----------|:----------:|
| **`preset`** | String | "auto" | 轻松配置界面的功能及样式, 可设置为 `auto` `desktop` `mobile` | [示例](https://github.com/Caldis/react-zmage#preset) [受影响的配置项](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L144) |

- 功能控制

|配置项|类型|默认值|描述|示例|
|:--:|:--:|:-----:|:----------|:----------:|
| **`controller`** | Object | [桌面](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L148)\|[移动](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L166) | 将特定项设为 `false` 来隐藏查看模式下的操作控件 | [示例](https://github.com/Caldis/react-zmage#controller) |
| **`hotKey`** | Object | [桌面](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L155)\|[移动](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L173) | 将特定项设为 `false` 来禁用查看模式下的快捷键 | [示例](https://github.com/Caldis/react-zmage#hotKey) |

- 界面样式

|配置项|类型|默认值|描述|示例|
|:--:|:--:|:-----:|:----------|:----------:|
| **`backdrop`** | String | "#FFFFFF" | 控制图片放大后的背景色 | [示例](https://github.com/Caldis/react-zmage#backdrop) |
| **`zIndex`** | Number | 1000 | 外部容器的 `z-index`, 防止被其他元素遮挡 | [示例](https://github.com/Caldis/react-zmage#zIndex) |
| **`radius`** | Number | [桌面](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L160)\|[移动](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L178) | 控制图片在查看模式下的圆角 | [示例](https://github.com/Caldis/react-zmage#radius) |
| **`edge`** | Number | [桌面](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L161)\|[移动](https://github.com/Caldis/react-zmage/blob/master/src/config/default.js#L179) | 控制图片在查看模式下距离屏幕边缘的距离 | [示例](https://github.com/Caldis/react-zmage#edge) |

- 生命周期

|配置项|类型|默认值|描述|示例|
|:--:|:--:|:-----:|:----------|:----------:|
| **`onBrowsing`** | func | ()=>{} | 生命周期方法, 在显示/隐藏时调用, 会回传显示状态 | [示例](https://github.com/Caldis/react-zmage#onBrowsing) |
| **`onZooming`** | func | ()=>{} | 生命周期方法, 在放大/缩小时调用, 会回传缩放状态 | [示例](https://github.com/Caldis/react-zmage#onZooming) |
| **`onSwitching`** | func | ()=>{} | 生命周期方法, 在切换图片时调用, 会回传页码 | [示例](https://github.com/Caldis/react-zmage#onSwitching) |
| **`onRotating`** | func | ()=>{} | 生命周期方法, 在旋转图片时调用, 会回传角度 | [示例](https://github.com/Caldis/react-zmage#onRotating) |

### `src`
```js
"http://zmage.caldis.me/imgSet/childsDream/demo.jpg"
```

### `alt`
```js
"图片的占位文字，作为图片的标题, 请尽量保持简短"
```

### `set`
```js
// 如果设置了 Set, 则进入查看模式后第一张图片将会是 set 的首图, 而不是 src
// 如果你需要在查看模式中呈现高精度图片, 可以将其设置为 set 的首图, 或使用 defaultPage 指定
set={[
    {
        // 图片 Url
        src: "http://zmage.caldis.me/imgSet/childsDream/1.jpg",
        // 图片占位文字
        alt: "图片的占位文字，作为图片的标题, 请尽量保持简短",
    },
    {
        // 另一个图片 Url
        src: "http://zmage.caldis.me/imgSet/childsDream/2.jpg",
        // 另一段图片占位文字
        alt: "图片的占位文字，作为图片的标题, 请尽量保持简短",
    }
]}
```

### `defaultPage`
```js
set: [
    {
        // 图片 Url
        src: "http://zmage.caldis.me/imgSet/childsDream/1.jpg",
        // 图片占位文字
        alt: "图片的占位文字，尽量保持简短，描述图片作用",
    }
]
```

### `hotKey`
```js
hotKey={{
    // 关闭（ESC）
    close: true,
    // 缩放（空格）
    zoom: true,
    // 翻页（左右）
    flip: true,
}}
```

### `controller`
```js
controller={{
    // 关闭按钮
    close: true,
    // 缩放按钮
    zoom: true,
    // 分页
    pagination: true,
    // 旋转按钮
    rotate: true,
    // 左右翻页
    flip: true
}}
```

### `backdrop`
```js
backdrop="linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(26,94,215,1) 100%)"
```

### `zIndex`
```js
zIndex={19260817}
```

### `radius`
```js
radius={5}
```

### `edge`
```js
edge={20}
```

### `onBrowsing`
```js
onBrowsing={state => {
    console.info("Browsing State: ", state)
}}
```

### `onZooming`
```js
onZooming={state => {
    console.info("Zooming State: ", state)
}}
```

### `onSwitching`
```js
onSwitching={page => {
    console.info("Switching page: ", page)
}}
```

### `onRotating`
```js
onRotating={deg => {
    console.info("Rotating State: ", deg, "deg")
}}
```


<h2 align="center">贡献</h2>

我们随时欢迎发起一个 [PR](https://github.com/Caldis/react-zmage/pulls) 来帮助我们改进代码
如果发现任何问题, 也欢迎 [发起一个ISSUE](https://github.com/Caldis/react-zmage/issues) 来反馈你的意见


<h2 align="center">证书</h2>

react-zmage 基于 [MIT licensed](./LICENSE) 发布
