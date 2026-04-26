import type { CSSProperties } from 'react'
import Zmage from 'react-zmage/ssr'
import 'react-zmage/style.css'
import { ContextBanner } from './ContextBanner'

const REACT_VERSION_REQUEST: string =
  typeof __REACT_VERSION_REQUEST__ !== 'undefined' ? __REACT_VERSION_REQUEST__ : '?'

const containerStyle: CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
  padding: '60px 24px 24px',
  fontFamily: 'system-ui, sans-serif',
}

const galleryStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 16,
  marginTop: 24,
}

const cellImgStyle: CSSProperties = {
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: 8,
  display: 'block',
}

export default function App () {
  return (
    <>
      <ContextBanner mode="SSR" reactVersionRequest={REACT_VERSION_REQUEST} />
      <div style={containerStyle}>
        <h1 style={{ margin: 0, fontSize: 28 }}>react-zmage SSR demo</h1>
        <p style={{ marginTop: 12, color: '#475569', lineHeight: 1.6 }}>
          这页 HTML 由 Express + renderToString 在服务端生成, 下一步浏览器接管做 hydration.
          点击图片应当能正常进入查看模式.
        </p>
        <div style={galleryStyle}>
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/1.jpg" alt="A" style={cellImgStyle} />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/2.jpg" alt="B" style={cellImgStyle} />
          <Zmage src="https://zmage.caldis.me/imgSet/childsDream/3.jpg" alt="C" style={cellImgStyle} />
        </div>
      </div>
    </>
  )
}
