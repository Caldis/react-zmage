import { animationDuration, animationFunction, animationTransition, getBrowsingAnimationDuration } from './anim'

// 局部声明 process 仅为 TS 编译期识别; tsup production build 会把
// process.env.NODE_ENV 静态替换为 "production".
declare const process: { env: { NODE_ENV?: string } }

export type MotionTriggerEvent = { shiftKey?: boolean }

export interface MotionRuntime {
  durationMultiplier: number
  browsingDuration: number
  browsingTransition?: string
  controlTransition?: string
  controlItemTransition?: string
  backgroundTransition?: string
  backgroundShowDelay: string
  captionTransition?: string
}

export const motionDefaultDurationMultiplier = 1
export const motionDevSlowdownMultiplier = 10

const isProductionRuntime = () => process.env.NODE_ENV === 'production'

export const normalizeMotionDurationMultiplier = (durationMultiplier?: number) => {
  if (isProductionRuntime()) return motionDefaultDurationMultiplier
  return durationMultiplier && durationMultiplier > motionDefaultDurationMultiplier
    ? durationMultiplier
    : motionDefaultDurationMultiplier
}

export const getMotionDurationMultiplierFromEvent = (event?: MotionTriggerEvent | null) => (
  event?.shiftKey && !isProductionRuntime()
    ? motionDevSlowdownMultiplier
    : motionDefaultDurationMultiplier
)

export const createMotionRuntime = (durationMultiplier?: number): MotionRuntime => {
  const multiplier = normalizeMotionDurationMultiplier(durationMultiplier)
  const browsingDuration = getBrowsingAnimationDuration(true, multiplier)

  if (multiplier === motionDefaultDurationMultiplier) {
    return {
      durationMultiplier: multiplier,
      browsingDuration,
      backgroundShowDelay: '.15s',
    }
  }

  return {
    durationMultiplier: multiplier,
    browsingDuration,
    browsingTransition: animationTransition(multiplier),
    controlTransition: `transform ${animationDuration * multiplier}ms ${animationFunction}, opacity ${animationDuration * multiplier}ms ${animationFunction}`,
    controlItemTransition: `transform ${(animationDuration / 2) * multiplier}ms ${animationFunction}, opacity ${animationDuration * multiplier}ms ${animationFunction}`,
    backgroundTransition: `opacity ${200 * multiplier}ms`,
    backgroundShowDelay: `${150 * multiplier}ms`,
    captionTransition: `transform ${animationDuration * multiplier}ms ${animationFunction}, opacity ${animationDuration * multiplier}ms ${animationFunction}`,
  }
}

export const applyMotionTransition = (
  transition: string | undefined,
  motion: MotionRuntime,
) => transition ?? motion.browsingTransition
