import { defineStore } from 'pinia'

type State = {
  animateTargetList: AnimationTarget[]
}

export type AnimationTarget = {
  className?: string
  top: number
  width: number
  height: number
  type: 'enter' | 'leave'
}

export const useTransitionStore = defineStore('transition', {
  state: (): State => {
    return {
      animateTargetList: []
    }
  },
  actions: {
    loadAnimationPosition(className: string) {
      return this.animateTargetList.find((animateTarget) => animateTarget.className === className)
    },
    clearAnimationPosition(animationClass: string) {
      this.animateTargetList.filter((animateTarget) => animateTarget.className !== animationClass)
    },
    saveAnimationPosition(animationTarget: AnimationTarget) {
      const targetIndex = this.animateTargetList.findIndex(
        (animateTarget) => animateTarget.className === animationTarget.className
      )
      if (targetIndex !== -1) {
        this.animateTargetList[targetIndex] = animationTarget
      } else {
        this.animateTargetList.push(animationTarget)
      }
    }
  }
})
