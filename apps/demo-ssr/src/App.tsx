import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
import { ContextBanner } from './ContextBanner'

const REACT_VERSION_REQUEST: string =
  typeof __REACT_VERSION_REQUEST__ !== 'undefined' ? __REACT_VERSION_REQUEST__ : '?'

export default function App () {
  return (
    <>
      <ContextBanner mode="SSR" reactVersionRequest={REACT_VERSION_REQUEST} />
      <main style={{ paddingTop: 60, fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ paddingLeft: 20 }}>react-zmage SSR demo</h1>
        <p style={{ paddingLeft: 20, color: '#475569' }}>
          这页 HTML 由 Express + renderToString 在服务端生成,
          下一步浏览器接管做 hydration. 点击图片应当能正常进入查看模式.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: 20 }}>
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/1.jpg" alt="A" />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/2.jpg" alt="B" />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/3.jpg" alt="C" />
        </div>
      </main>
    </>
  )
}
