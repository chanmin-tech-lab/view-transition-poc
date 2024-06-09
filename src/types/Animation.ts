export type AnimationStatus = {
  className: string
  duration?: number
  from?: Keyframe
  to?: Keyframe
}

export const executeAnimation = (animationList: AnimationStatus[]) => {
  animationList.forEach((animationStatus) => {
    console.log(animationStatus.from)
    const targetEl = document.querySelector(`.${animationStatus.className}`)
    if (!targetEl) return
    targetEl.animate([animationStatus.from, animationStatus.to], {
      duration: animationStatus.duration,
      fill: 'forwards',
      easing: 'ease-in-out'
    })
  })
}

export const addSuffix = (value: number, suffix: string) => {
  return `${value}${suffix}`
}
