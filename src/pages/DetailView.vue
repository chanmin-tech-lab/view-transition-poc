<script setup lang="ts">
import { AnimationStatus, executeAnimation } from '@/types/Animation'
import { onUpdated } from 'vue'

const emit = defineEmits<{ (e: 'exit', animationStatusList: Array<AnimationStatus>) }>()

const props = defineProps<{
  index: number
  show: boolean
  animationStatusList: Array<AnimationStatus>
}>()

onUpdated(() => {
  if (props.animationStatusList) {
    executeAnimation(props.animationStatusList)
  }
})

const handleExit = () => {
  // 이전 페이지 요소가 갖는 정보
  const previoutAnimationStatus = props.animationStatusList.find(
    (animationStatus) => animationStatus.className === `detail-thumbnail-${props.index}`
  )

  // 애니메이션을 부여할 페이지의 정보
  const exitAnimationList = [
    {
      className: `thumbnail-${props.index}`,
      duration: 150,
      from: {
        transform: `translate(0px, 0px)`,
        width: '100%',
        borderRadius: 0
      },
      to: previoutAnimationStatus.from
    }
  ]
  emit('exit', exitAnimationList)
}
</script>

<template>
  <div class="detail-view-container" v-if="show">
    <button @click="handleExit">닫기</button>
    <div class="image-container">
      <img :class="`image detail-thumbnail-${index}`" src="https://picsum.photos/200" />
    </div>
    <div class="content-container">
      <p :class="`description description-${index}`">
        '아이스 카페 아메리카노 T 2잔 + 마스카포네 티라미수'
      </p>
    </div>
    <!-- <div class="button-container"> -->
    <button @click="handleExit" :class="`detail-button detail-button-${index}`">응모하기</button>
    <!-- </div> -->
  </div>
</template>

<style scoped lang="scss">
.detail-view-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 1;
  background-color: #fff;
}

.image-container {
  min-height: 400px;
  position: relative;
}

.image {
  position: absolute;
  border-radius: 20px;
}

.content-container {
  padding: 0 24px;
}

.detail-button {
  width: calc(100% - 48px);
  padding: 12px 16px;
  border-radius: 20px;
  position: fixed;
  left: 24px;
}
</style>
