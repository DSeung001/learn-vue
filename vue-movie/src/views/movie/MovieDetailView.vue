<template>
  <h3>
    detail
  </h3>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {getMovieDetail} from "@/api/movie";

const route = useRoute();
const content = ref(null)
const setDetail = async () => {
  const {data} = await getMovieDetail(route.params.id)

  console.log(data)
  content.value = data;
}

watchEffect(setDetail);
</script>

<style scoped>

</style>