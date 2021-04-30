/**
 * 主页程序
 **/

// Libs
import React from 'react'
// Style
import style from './index.less'
// App Entry
import Zmage from '@/index'

function HighlightJavaScript ({ children }: { children: React.ReactNode }) {
  return <pre><code className="javascript">{children}</code></pre>
}

export default class App extends React.Component {

  readonly state = {
    browsing: false,
  }

  render () {
    return (

      <div className={style.pageContainer}>

        {/*首屏, 项目名称与简介*/}
        <div className={style.page}>

          <a className={style.github} href="https://github.com/Caldis/react-zmage">
            <div aria-label="Github">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"></path>
              </svg>
            </div>
          </a>

          <div className={style.project}>

            <div>
              <a href="https://github.com/Caldis/react-zmage">
                <img src="logo.png"/>
              </a>
            </div>

            <h1>react-zmage</h1>
            <h4>一个基于 React 的可缩放图片控件, 您可以用这个控件替代原生的 img 标签, 令其附带图片缩放功能</h4>

            <div className={style.button} onClick={() => window.open('https://github.com/Caldis/react-zmage')}>马上开始</div>
          </div>

          <div className={style.scrollDownHint}>
            <span>向下滚动查看更多示例</span>
          </div>
        </div>

        {/*特性介绍*/}
        <div className={style.horizon}>
          <div className={style.helpBox}>
            <h2>轻松使用</h2>
            <p>一如原生的 {'<img/>'} 标签, 只需要直接替换 img 为 Zmage 即可, 您依旧可以使用 style, className 等原生属性</p>
            <p>现在, 点击图片, 您即可进入<b>查看模式</b></p>
            <pre>
              <HighlightJavaScript>
                {`<Zmage
    src="https://your.image.link.jpg"
    alt="最简单的使用方式"
/>`}
              </HighlightJavaScript>
            </pre>
          </div>
          <div className={style.imageBox}>
            <Zmage
              className={style.image}
              src="imgSet/childsDream/1.jpg"
              alt="最简单的使用方式"
            />
            <a href="https://www.behance.net/gallery/56119387/_">via. sslololss Guihuahuzi on behance</a>
          </div>
        </div>

        <div className={style.horizon}>
          <div className={style.helpBox}>
            <h2>图片放大</h2>
            <p>点击右上角的放大图标, 即可进入放大模式。</p>
            <p>滑动鼠标则可以浏览超出屏幕的部分, 对浏览大尺寸图片时尤为方便</p>
            <p>在<b>放大模式</b>中, 图片会设置为 100%放大, 确保不会有任何失真</p>
            <p>再次点击屏幕即可退出<b>放大模式</b></p>
            <pre>
              <HighlightJavaScript>
                {`<Zmage
    src="https://your.image.link.jpg"
    alt="放大图片并并滑动预览"
/>`}
              </HighlightJavaScript>
            </pre>
          </div>
          <div className={style.imageBox}>
            <Zmage
              className={style.image}
              src="imgSet/childsDream/2.jpg"
              alt="放大图片并并滑动预览"
            />
            <a href="https://www.behance.net/gallery/56119387/_">via. sslololss Guihuahuzi on behance</a>
          </div>
        </div>

        <div className={style.horizon}>
          <div className={style.helpBox}>
            <h2>展示序列图片</h2>
            <p>您可以传入一系列图片来显示一系列幻灯片, 使用 <b>set</b> 来包裹它们</p>
            <p>点击放大后使用键盘的 <b>←</b> 或 <b>→</b> 即可切换图片</p>
            <pre>
              <HighlightJavaScript>
                {`<Zmage
    src="your.cover.image.link.jpg"
    alt="展示序列图片"
    set={[{
        src: "your.cover.image.link.jpg",
        alt: "First image description"
    },{
        src: "your.another.image.link.jpg",
        alt: "Second image description"
    }]}
/>`}
              </HighlightJavaScript>
            </pre>
          </div>
          <div className={style.imageBox}>
            <Zmage
              className={style.image}
              src="imgSet/childsDream/3.jpg"
              alt="展示序列图片"
              set={[{
                src: 'imgSet/childsDream/3.jpg',
                alt: '童夢 · THREE',
              }, {
                src: 'imgSet/childsDream/4.jpg',
                alt: '童夢 · FOUR',
              }]}
            />
            <a href="https://www.behance.net/gallery/56119387/_">via. sslololss Guihuahuzi on behance</a>
          </div>
        </div>

        <div className={style.horizon}>
          <div className={style.helpBox}>
            <h2>快捷操作</h2>
            <p>您可以使用键盘来快捷操作</p>
            <p>除了在展示序列图片时使用键盘的 <b>←</b> 或 <b>→</b> 来切换页面, 你可以可以使用 <b>SPACE|空格键</b>, 来激活<b>放大模式</b></p>
            <p>处于放大模式时, 点击 <b>退出|ESC</b> 可以退出<b>放大模式</b>, 再次点击即可退出<b>查看模式</b></p>
            <p>滚动页面同样也可以退出<b>查看模式</b></p>
          </div>
          <div className={style.imageBox}>
            <Zmage
              className={style.image}
              src="imgSet/childsDream/5.jpg"
              alt="使用键盘进行快捷操作"
              set={[{
                src: 'imgSet/childsDream/5.jpg',
                alt: '童夢 · SIX'
              }, {
                src: 'imgSet/childsDream/6.jpg',
                alt: '童夢 · SEVEN'
              }]}
              onBrowsing={state => {
                console.info('Browsing State: ', state)
              }}
              onZooming={state => {
                console.info('Zooming State: ', state)
              }}
              onSwitching={page => {
                console.info('Switching page: ', page)
              }}
              onRotating={deg => {
                console.info('Rotating State: ', deg, 'deg')
              }}
            />
            <a href="https://www.behance.net/gallery/56119387/_">via. sslololss Guihuahuzi on behance</a>
          </div>
        </div>

        <div className={style.horizon}>
          <div className={style.helpBox}>
            <h2>受控属性与命令式调用</h2>
            <p>即使在文本中，您也可以为 <a onClick={() => Zmage.browsing({ src: 'imgSet/childsDream/5.jpg' })}>任意元素</a> 绑定一个事件，
              以直接显示一个不存在的图片</p>
            <p>也可以使用 <a onClick={() => this.setState({ browsing: !this.state.browsing })}>browsing</a> 属性来直接操作右侧的图片状态
            </p>
          </div>
          <div className={style.imageBox}>
            <Zmage
              className={style.image}
              src="imgSet/childsDream/7.jpg"
              browsing={this.state.browsing}
              onBrowsing={(status) => this.setState({ browsing: status })}
              set={[{
                src: 'imgSet/childsDream/7.jpg',
                alt: '童夢 · SIX'
              }, {
                src: 'imgSet/childsDream/8.jpg',
                alt: '童夢 · SEVEN'
              }]}
            />
            <a href="https://www.behance.net/gallery/56119387/_">via. sslololss Guihuahuzi on behance</a>
          </div>
        </div>

        <div className={style.horizon} style={{ display: 'none' }}>
          <div className={style.helpBox}>
            <h2>预设配置 (beta)</h2>
            <p>我们自带了两套默认配置项</p>
            <p>分别是 <b>桌面端(DESKTOP)</b> 以及 <b>移动端 (MOBILE)</b></p>
            <p>处于桌面端配置时, 即为您先前所见</p>
            <p>而移动端配置则不包含任何多余的操作项, 样式也会有些许变化</p>
          </div>
          <div className={style.imageBox}>
            <Zmage
              className={style.image}
              src="imgSet/childsDream/7.jpg"
              alt="使用键盘进行快捷操作"
              preset="mobile"
              set={[{
                src: 'imgSet/childsDream/7.jpg',
                alt: '童夢 · SIX'
              }, {
                src: 'imgSet/childsDream/8.jpg',
                alt: '童夢 · SEVEN'
              }]}
            />
            <a href="https://www.behance.net/gallery/56119387/_">via. sslololss Guihuahuzi on behance</a>
          </div>
        </div>

        {/*<div>*/}
        {/*    <Zmage.Wrapper backdrop={'black'}>*/}
        {/*        <div dangerouslySetInnerHTML={{ __html:'<h2 id="ghost-themes">Ghost themes</h2><p>Ghost comes with a default theme called Casper, which is designed to be a clean, readable publication layout and can be easily adapted for most purposes.</p><p>If you need something a little more customised, it\'s entirely possible to build on top of existing open source themes, or to build your own from scratch. Rather than giving you a few basic settings which act as a poor proxy for code, we just let you write code.</p><h2 id="marketplace">Marketplace</h2><p>There are a huge range of both free and premium pre-built themes which you can download from the <a href="https://ghost.org/marketplace/">Ghost Theme Marketplace</a>:</p><figure class="kg-card kg-image-card kg-card-hascaption"><img src="https://static.ghost.org/v3.0.0/images/theme-marketplace.png" class="kg-image" alt="Ghost theme marketplace screenshot"><figcaption>Anyone can write a completely custom Ghost theme with some solid knowledge of HTML and CSS</figcaption></figure><h2 id="theme-development">Theme development</h2><p>Ghost themes are written with a templating language called handlebars, which has a set of dynamic helpers to insert your data into template files. For example: <code>{{author.name}}</code> outputs the name of the current author.</p><p>The best way to learn how to write your own Ghost theme is to have a look at <a href="https://github.com/TryGhost/Casper">the source code for Casper</a>, which is heavily commented and should give you a sense of how everything fits together.<br></p><ul><li><code>default.hbs</code> is the main template file, all contexts will load inside this file unless specifically told to use a different template.</li><li><code>post.hbs</code> is the file used in the context of viewing a post.</li><li><code>index.hbs</code> is the file u</li><li>cused in the context of viewing the home page.</li><li>and so on</li></ul><p>We\'ve got <a href="https://ghost.org/docs/api/handlebars-themes/">full and extensive theme documentation</a> which outlines every template file, context and helper that you can use. You can also get started with our useful <a href="https://github.com/TryGhost/Starter/">starter theme</a>, which includes the most common foundations and components required to build your own theme.</p><blockquote>If you want to chat with other people making Ghost themes to get any advice or help, there\'s also a <strong>themes</strong> section on our <a href="https://forum.ghost.org/c/themes">public Ghost forum</a>.</blockquote>' }}></div>*/}
        {/*    </Zmage.Wrapper>*/}
        {/*</div>*/}

        <div className={style.bottomBanner} style={{ textAlign: 'center' }}>
          <div>
            <h2 style={{ textAlign: 'center' }}>您已经准备好了</h2>
            <div className={style.button} onClick={() => window.open('https://github.com/Caldis/react-zmage')}>查看文档</div>
            <div className={style.button} onClick={() => window.open('https://github.com/Caldis/react-zmage/issues')}>反馈建议</div>
          </div>
        </div>

        <div className={style.footer}>
          <div>
            <span>react-zmage</span>
          </div>
          <div>
            <span>Create & Design by </span>
            <a href="https://github.com/Caldis">Caldis </a>
            <span>, Power by </span>
            <a href="https://reactjs.org/">React</a>
          </div>
          <div>
            <span>Illustrator from </span>
            <a href="https://www.behance.net/gallery/56119387/_">sslololss Guihuahuzi </a>
            <span>on </span>
            <a href="https://www.behance.net">behance</a>
          </div>
          <a className={style.github} href="https://github.com/Caldis/react-zmage">
            <div aria-label="Github">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>

    )
  }
}
