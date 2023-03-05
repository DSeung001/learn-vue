<template>
  <h2>About View</h2>
  <p>{{ $route.path }}</p>
  <p>{{ $route.name }}</p>
  <button class="btn btn-primary" @click="$router.push('/')">
    Home으로 이동
  </button>
  <h2>Store</h2>
  <p>counter :{{ store.counter }}</p>
  <p>doubleCount : {{ store.doubleCount }}</p>
  <p>doubleCountPlusOne : {{ store.doubleCountPlusOne }}</p>
  <button @click="increment()">Click!!</button>

  <p>counter :{{ counter }}</p>
  <p>doubleCount : {{ doubleCount }}</p>
  <p>doubleCountPlusOne : {{ doubleCountPlusOne }}</p>
  <button @click="increment()">Click!!</button>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log(route);

const store = useCounterStore();
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
const { increment } = store;
console.log(store);
console.log(counter);

// vue2는 바로 대입 못했지만 vue3에서는 가능!
counter.value = 100;
</script>

<style scoped></style>
