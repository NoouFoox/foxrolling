<script setup lang="ts">
import { onMounted, ref,onUnmounted } from 'vue';
import RollComponent from './components/RollComponent.vue';
import useDisplay from './utils/useDisplay';

interface Li {
  title: string
  name: string,
  key: number
}
type List = Array<Li>
const list = ref(<List>[])
const list2 = ref(<List>[])

list.value = new Array(10)
  .fill(undefined)
  .map((_, index) => ({
    name: `测试 ${index + 1}`,
    title: `标题 ${index + 1}`,
    key: index
  }))
list2.value = new Array(200)
  .fill(undefined)
  .map((_, index) => ({
    name: `测试 ${index + 1}`,
    title: `标题 ${index + 1}`,
    key: index
  }))

const speed = ref(1)
const changeSpeed = (event: Event) => {
  const value = (<HTMLInputElement>event.target)?.value
  speed.value = Number(value)
}

const display = useDisplay('.container', '.main')
onMounted(() => {
  console.log('大屏模式',display);
  
  // display.load()
})
onUnmounted(()=>{
  // display.unload()
})
const testValue = ref("")
</script>

<template>
  <div class="container">
    <div class="main">
      <input type="number" min="0" max="10000" :value="speed" @input="changeSpeed">
      <br>
      <input v-model="testValue">
      <div class="content">
        <RollComponent :speed="speed">
          <div v-for="li in list" :key="li.key">
            {{ li.name }}-{{ li.title }}
          </div>
        </RollComponent>
      </div>
      <div class="content">
        <RollComponent :hoverStop="true" :speed="speed" direction="column">
          <div v-for="li in list2" :key="li.key">
            {{ li.name }}-{{ li.title }}
          </div>
        </RollComponent>
      </div>
      <div class="content">
        <RollComponent :speed="speed" direction="row">
          <div style="display: flex;">
            <div v-for="li in list" :key="li.key">
              {{ li.name }}{{ testValue }}
            </div>
          </div>
        </RollComponent>
      </div>
      <div class="content">
        <RollComponent :speed="speed" direction="row-reverse" :hoverStop="true">
          <div style="display: flex;">
            <div v-for="li in list2" :key="li.key">
              {{ li.name }}-{{ li.title }}
            </div>
          </div>
        </RollComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 200px;
  width: 350px;
  border: dashed green 1px;
}
</style>
