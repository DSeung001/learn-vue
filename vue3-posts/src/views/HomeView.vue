<template>
  <h2>Home View</h2>
  <p>{{ $route.path }}</p>
  <p>{{ $route.name }}</p>
  <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};
</script>

<style scoped></style>
