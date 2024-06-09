<script setup lang="ts">
import { addSuffix, AnimationStatus } from '@/types/Animation'
import { ref } from 'vue'
import DetailView from './DetailView.vue'

const showDetailView = ref<boolean>()
const dataList = [
  {
    imageUrl: 'https://picsum.photos/200',
    description: '아이스 카페 아메리카노 T 2잔 + 마스카포네 티라미수'
  },
  {
    imageUrl: 'https://picsum.photos/200',
    description: '아이스 카페 아메리카노 T 2잔 + 마스카포네 티라미수'
  },
  {
    imageUrl: 'https://picsum.photos/200',
    description: '아이스 카페 아메리카노 T 2잔 + 마스카포네 티라미수'
  },
  {
    imageUrl: 'https://picsum.photos/200',
    description: '아이스 카페 아메리카노 T 2잔 + 마스카포네 티라미수'
  },
  {
    imageUrl: 'https://picsum.photos/200',
    description: '아이스 카페 아메리카노 T 2잔 + 마스카포네 티라미수'
  }
]

const animationStatusList = ref<Array<AnimationStatus>>()
const selectedIndex = ref()

const handleClick = (e: Event, index: number) => {
  selectedIndex.value = index

  // 현재 페이지 요소가 갖는 정보
  const thumbnailEl = document.querySelector(`.thumbnail-${index}`)
  const thumbnailElClientRect = thumbnailEl.getBoundingClientRect()

  const buttonEl = document.querySelector(`.button-${index}`)
  const buttonElClientRect = buttonEl.getBoundingClientRect()
  console.log(buttonElClientRect)
  // 애니메이션을 부여할 페이지의 정보
  animationStatusList.value = [
    {
      className: `detail-thumbnail-${index}`,
      duration: 150,
      from: {
        transform: `translate(${addSuffix(thumbnailElClientRect.left, 'px')}, ${addSuffix(thumbnailElClientRect.top, 'px')})`,
        width: `${addSuffix(thumbnailElClientRect.width, 'px')}`,
        borderRadius: 20
      },
      to: {
        transform: `translate(0px, 0px)`,
        width: '100%',
        borderRadius: 0
      }
    },
    {
      className: `detail-button-${index}`,
      duration: 200,
      from: {
        opacity: 0,
        bottom: `${addSuffix(innerHeight - buttonElClientRect.bottom, 'px')}`
      },
      to: {
        opacity: 1,
        bottom: `24px`
      }
    }
  ]

  showDetailView.value = true
}

const closeDetailView = (animationStatusList: Array<AnimationStatus>) => {
  showDetailView.value = false
  // executeAnimation(animationStatusList)
}
</script>

<template>
  <main :aria-hidden="showDetailView ? 'true' : 'false'">
    <ul :style="{ padding: '20px 24px' }">
      <li
        :style="{ listStyle: 'none', marginBottom: '36px' }"
        v-for="(data, index) in dataList"
        :key="index"
        @click="(e) => handleClick(e, index)"
      >
        <div>
          <div class="thumbnail-container">
            <img
              :class="`thumbnail-${index}`"
              :style="{
                display: 'inline-block',
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden'
              }"
              :src="data.imageUrl"
            />
          </div>
          <p :class="`description-${index}`">{{ data.description }}</p>
        </div>
        <button :class="`button-register button-${index}`">응모하기</button>
      </li>
    </ul>
  </main>
  <DetailView
    :index="selectedIndex"
    :animationStatusList="animationStatusList"
    :show="showDetailView"
    @exit="closeDetailView"
  />
</template>

<style scoped lang="scss">
.thumbnail-container {
  position: relative;
}

.button-register {
  width: 100%;
  padding: 12px 16px;
  border-radius: 20px;
}
</style>
