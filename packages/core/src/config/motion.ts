import { animationDuration, animationFunction, animationTransition, getBrowsingAnimationDuration } from './anim'
import type { Animate } from '../types/global'

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

export const isSlowMotionEnabled = (animate?: boolean | Pick<Animate, 'slowMotion'> | null) => (
  animate !== false && typeof animate === 'object' && animate.slowMotion === true
)

export const normalizeMotionDurationMultiplier = (durationMultiplier?: number) => {
  return durationMultiplier && durationMultiplier > motionDefaultDurationMultiplier
    ? durationMultiplier
    : motionDefaultDurationMultiplier
}

export const getMotionDurationMultiplierFromEvent = (event?: MotionTriggerEvent | null, slowMotion = false) => (
  event?.shiftKey && slowMotion
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
