<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type DirectionRow = 'row' | 'row-reverse'
type DirectionColumn = 'column' | 'column-reverse'
type Direction = DirectionRow | DirectionColumn

const isDirectionRow = (direction: Direction): direction is DirectionRow => {
  return direction === 'row' || direction === 'row-reverse';
}

const props = withDefaults(defineProps<{
  speed?: number,
  direction?: Direction,
  hoverStop?: boolean
}>(), {
  speed: 1,
  direction: "column",
  hoverStop: false
})

const content = ref<HTMLElement>()
const firstOne = ref<typeof content.value>()
const isRolling = ref<boolean>(false)
const firstOneLength = ref<number>(0)
const contentLength = ref<number>(0)


const getReverse = computed(() => props.direction.includes('reverse'))
const getClass = computed(() => {
  const classList = ['roll']
  if (isRolling.value) {
    classList.push(isDirectionRow(props.direction) ? 'roll-play-x' : 'roll-play-y')
    if (getReverse.value) classList.push('reverse')
  }
  if (props.hoverStop) {
    classList.push('hover-paused')
  }
  return classList.join(' ')
})

const getStyle = computed(() => {
  const cardinal = 0.1
  const speedCardinal = cardinal / props.speed
  const runTime = firstOneLength.value * speedCardinal
  const style: { '--time': string, display?: 'flex' } = {
    '--time': runTime + 's',
  }
  if (isDirectionRow(props.direction)) {
    style.display = 'flex'
  }
  return style
})
onMounted(() => {
  const contentDom = content.value
  const firstDom = firstOne.value
  const field = isDirectionRow(props.direction) ? "clientWidth" : 'clientHeight'
  contentLength.value = contentDom?.[field] || 0
  firstOneLength.value = firstDom?.[field] || 0
  isRolling.value = firstOneLength.value > contentLength.value
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

.roll-content:hover .hover-paused{
  animation-play-state: paused;
}
</style>
