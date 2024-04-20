<script setup lang="ts">
import { ref } from 'vue';
import RollComponent from './components/RollComponent.vue';
export interface Li {
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
  speed.value = Number(value) || 1
}
</script>

<template>
  <input type="number" :value="speed" @input="changeSpeed">
  <div class="content">
    <RollComponent :speed="speed">
      <div v-for="li in list" :key="li.key">
        {{ li.name }}-{{ li.title }}
      </div>
    </RollComponent>
  </div>
  <div class="content">
    <RollComponent :speed="speed" direction="column-reverse">
      <div v-for="li in list2" :key="li.key">
        {{ li.name }}-{{ li.title }}
      </div>
    </RollComponent>
  </div>
  <div class="content">
    <RollComponent :speed="speed" direction="row">
      <div v-for="li in list2" :key="li.key" style="width: 50px;">
          {{ li.name }}-{{ li.title }}
        </div>
    </RollComponent>
  </div>
  <div class="content">
    <RollComponent :speed="speed" direction="row-reverse">
      <div v-for="li in list2" :key="li.key">
        {{ li.name }}-{{ li.title }}
      </div>
    </RollComponent>
  </div>
</template>

<style scoped>
.content {
  height: 200px;
  width: 350px;
  border: dashed green 1px;
}
</style>
