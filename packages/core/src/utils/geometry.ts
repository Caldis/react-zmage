export interface ViewportSize {
  width: number
  height: number
}

export interface FitGeometryOptions {
  naturalWidth: number
  naturalHeight: number
  edge?: number
  viewport: ViewportSize
  rotate?: number
}

export interface FitGeometry {
  scale: number
  canZoom: boolean
  visualWidth: number
  visualHeight: number
  fittedWidth: number
  fittedHeight: number
  marginX: number
  marginY: number
}

export interface ZoomPanBoundsOptions {
  naturalWidth: number
  naturalHeight: number
  viewport: ViewportSize
  scale?: number
  edge?: number
  rotate?: number
}

export interface ZoomPanBounds {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

const FIT_CAN_ZOOM_EPSILON = 0.0001

const normalizePositive = (value: number | undefined): number => (
  Number.isFinite(value) && (value ?? 0) > 0 ? value as number : 0
)

export const normalizeEdge = (edge = 0): number => normalizePositive(edge)

const isQuarterTurn = (rotate = 0) => {
  const normalized = ((rotate % 360) + 360) % 360
  return normalized === 90 || normalized === 270
}

export const getVisualNaturalSize = (naturalWidth: number, naturalHeight: number, rotate = 0): ViewportSize => {
  const width = normalizePositive(naturalWidth)
  const height = normalizePositive(naturalHeight)
  return isQuarterTurn(rotate)
    ? { width: height, height: width }
    : { width, height }
}

export const calcFitGeometry = ({
  naturalWidth,
  naturalHeight,
  edge = 0,
  viewport,
  rotate = 0,
}: FitGeometryOptions): FitGeometry => {
  const safeViewportWidth = normalizePositive(viewport.width)
  const safeViewportHeight = normalizePositive(viewport.height)
  const safeEdge = normalizeEdge(edge)
  const { width: visualWidth, height: visualHeight } = getVisualNaturalSize(naturalWidth, naturalHeight, rotate)

  if (!safeViewportWidth || !safeViewportHeight || !visualWidth || !visualHeight) {
    return {
      scale: 1,
      canZoom: false,
      visualWidth,
      visualHeight,
      fittedWidth: visualWidth,
      fittedHeight: visualHeight,
      marginX: Math.max(0, (safeViewportWidth - visualWidth) / 2),
      marginY: Math.max(0, (safeViewportHeight - visualHeight) / 2),
    }
  }

  const availableWidth = Math.max(1, safeViewportWidth - safeEdge * 2)
  const availableHeight = Math.max(1, safeViewportHeight - safeEdge * 2)
  const scaleX = visualWidth > availableWidth ? availableWidth / visualWidth : 1
  const scaleY = visualHeight > availableHeight ? availableHeight / visualHeight : 1
  const scale = Math.min(scaleX, scaleY)
  const fittedWidth = visualWidth * scale
  const fittedHeight = visualHeight * scale

  return {
    scale,
    canZoom: scale < 1 - FIT_CAN_ZOOM_EPSILON,
    visualWidth,
    visualHeight,
    fittedWidth,
    fittedHeight,
    marginX: (safeViewportWidth - fittedWidth) / 2,
    marginY: (safeViewportHeight - fittedHeight) / 2,
  }
}

export const calcFitScale = (
  naturalWidth: number,
  naturalHeight: number,
  edge = 0,
  viewport: ViewportSize,
  rotate = 0,
): number => (
  calcFitGeometry({ naturalWidth, naturalHeight, edge, viewport, rotate }).scale
)

export const calcZoomPanBounds = ({
  naturalWidth,
  naturalHeight,
  viewport,
  scale = 1,
  edge = 0,
  rotate = 0,
}: ZoomPanBoundsOptions): ZoomPanBounds => {
  const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1
  const safeEdge = normalizeEdge(edge)
  const safeViewportWidth = normalizePositive(viewport.width)
  const safeViewportHeight = normalizePositive(viewport.height)
  const { width: visualWidth, height: visualHeight } = getVisualNaturalSize(naturalWidth, naturalHeight, rotate)
  const scaledWidth = visualWidth * safeScale
  const scaledHeight = visualHeight * safeScale
  const maxX = scaledWidth > safeViewportWidth ? (scaledWidth - safeViewportWidth) / 2 + safeEdge : 0
  const maxY = scaledHeight > safeViewportHeight ? (scaledHeight - safeViewportHeight) / 2 + safeEdge : 0

  return {
    minX: -maxX,
    maxX,
    minY: -maxY,
    maxY,
  }
}
