/**
 * /full-bleed 路由 — 三列等分自然尺寸布局
 * 用于复现 Zmage 在无尺寸约束下大屏铺满时的行为
 */
import { FullBleedGallery } from '../../components/galleries/FullBleedGallery'

export default function Page () {
  return <FullBleedGallery />
}
