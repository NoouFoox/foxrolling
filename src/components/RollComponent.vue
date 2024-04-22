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
  direction?: Direction
}>(), {
  speed: 1,
  direction: "column"
})

const content = ref<HTMLElement>()
const firstOne = ref<typeof content.value>()
const copyDom = ref<string>()
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
  return classList.join(' ')
})

const getStyle = computed(() => {
  const cardinal = 0.1
  const speedCardinal = cardinal / props.speed
  const runTime = firstOneLength.value * speedCardinal
  return {
    '--time': runTime + 's',
  }
})

onMounted(() => {
  const contentDom = content.value
  const firstOneDom = firstOne.value
  const field = isDirectionRow(props.direction) ? "clientWidth" : 'clientHeight'
  contentLength.value = contentDom?.[field] || 0
  firstOneLength.value = firstOneDom?.[field] || 0
  if (firstOneLength.value > contentLength.value) {
    copyDom.value = firstOneDom?.innerHTML
    isRolling.value = true
  } else {
    isRolling.value = false
  }
})
</script>

<template>
  <div ref="content" class="roll-content" :style="getStyle">
    <div ref="firstOne" :class="getClass">
      <slot />
    </div>
    <div v-html="copyDom" v-if="isRolling" :class="getClass" />
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
</style>
