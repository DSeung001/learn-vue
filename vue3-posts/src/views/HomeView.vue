<template>
  <h2>Home View</h2>
  <p>{{ $route.path }}</p>
  <p>{{ $route.name }}</p>
  <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>

  <hr class="my-4">
  <div class="row g-4">
    <div v-for="(item, index) in items" :key="index" class="col-4">
      <AppCard>
        {{item}}
      </AppCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from "vue";
import AppCard from "@/components/AppCard.vue";

const router = useRouter();
const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};

const items = ref(['사과', '딸기', '포도'])
</script>

<style scoped></style>
