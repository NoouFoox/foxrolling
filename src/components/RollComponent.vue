<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

type DirectionRow = 'row' | 'row-reverse'
type DirectionColumn = 'column' | 'column-reverse'
type Direction = DirectionRow | DirectionColumn

const props = withDefaults(defineProps<{
  speed?: number,
  direction?: Direction,
  hoverStop?: boolean
}>(), {
  speed: 1,
  direction: "column",
  hoverStop: false
})

const isDirectionRow = (): boolean => props.direction === 'row' || props.direction === 'row-reverse'

const content = ref<HTMLElement>()
const firstOne = ref<typeof content.value>()
const isRolling = ref<boolean>(false)
const firstOneLength = ref<number>(0)
const contentLength = ref<number>(0)

const getReverse = computed(() => props.direction.includes('reverse'))

const getClass = computed(() => {
  if (!isRolling.value) return ''
  const classList = ['roll']
  classList.push(isDirectionRow() ? 'roll-play-x' : 'roll-play-y')
  if (getReverse.value) classList.push('reverse')
  if (props.hoverStop) classList.push('hover-paused')
  return classList.join(' ')
})

const runTime = ref(0)

const setLength = () => {
  const contentDom = content.value
  const firstDom = firstOne.value
  const field = isDirectionRow() ? "clientWidth" : 'clientHeight'
  contentLength.value = contentDom?.[field] || 0
  firstOneLength.value = firstDom?.[field] || 0
  return { firstOneLength, contentLength }
}

const setTime = () => {
  if (!isRolling.value) return 0
  setLength()
  const cardinal = 0.1
  const speedCardinal = cardinal / props.speed
  runTime.value = firstOneLength.value * speedCardinal
}

const getStyle = computed(() => {
  setTime()
  const style: { '--time': string, } = {
    '--time': runTime.value + 's',
  }
  return isDirectionRow()
    ? {
      ...style,
      display: 'flex'
    } : style
})

const obv = ref<MutationObserver>(new MutationObserver(setTime))

onMounted(() => {
  const { firstOneLength, contentLength } = setLength()
  isRolling.value = firstOneLength.value > contentLength.value
  obv.value.observe(<Node>firstOne.value, {
    subtree: true,
    attributes: true,
    childList: true
  })
})

onUnmounted(()=>{
  obv.value?.disconnect()
})
</script>

<template>
  <div ref="content" class="roll-content" :style="getStyle">
    <div ref="firstOne" :class="getClass">
      <slot name="default" />
    </div>
    <div v-if="isRolling" :class="getClass">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped>
.roll-content {
  overflow: hidden;
  height: 100%;
  width: 100%;
  white-space: nowrap;
}

.roll-play-y {
  animation: roll-y var(--time) linear forwards infinite;
}

.roll-play-x {
  animation: roll-x var(--time) linear forwards infinite;
}

.reverse {
  animation-direction: reverse;
}

@keyframes roll-y {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-100%);
  }
}

@keyframes roll-x {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(-100%);
  }
}

.roll-content:hover .hover-paused {
  animation-play-state: paused;
}
</style>
