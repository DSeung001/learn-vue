<template>
  <h2>About View</h2>
  <p>{{ $route.path }}</p>
  <p>{{ $route.name }}</p>
  <button class="btn btn-primary" @click="$router.push('/')">
    Home으로 이동
  </button>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route);
</script>

<style scoped></style>
