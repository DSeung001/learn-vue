<template>
  <h2>
    {{ content.title }}({{ content.original_title }})
  </h2>
  <h5 style="margin-top: 12px; margin-bottom: 12px">
    {{ content.tagline }}
  </h5>
  <span class="p-1" v-for="item in content.genres" style="border: 1px solid #444; border-radius: 10%; margin-right: 10px">
      {{item.name}}
  </span>
  <hr style="margin-bottom:50px; margin-top: 30px"/>
  <div style="width:800px;margin:0 auto">
    <p class="pd-3" style="margin-bottom: 60px; text-align: center">
      {{ content.overview }}
    </p>
    <img class="card-img-top" style="width: 500px; margin:0 auto 20px; display: block"
         :src="`https://image.tmdb.org/t/p/w500/${content.poster_path}`" alt="Card image cap">
  </div>

  <div class="row g-4" style="min-height: 450px">
    <div v-for="video in content.videos.results" class="col-12 col-md-9 col-lg-6">
      <p  style="height: 20px">
        {{ video.name }}
      </p>
      <iframe
          style="min-height: 400px"
          width="100%"
          :src="`https://www.youtube.com/embed/${video.key}?rel=0`" allowfullscreen></iframe>
    </div>
  </div>

</template>

<script setup>
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {getMovieDetail} from "@/api/movie";

const route = useRoute();
const content = ref({
  videos:{
    results :[]
  },
  genres : []
})
const setContent = async () => {
  const {data} = await getMovieDetail(route.params.id)
  content.value = data;
  console.log((data))
}

watchEffect(setContent);
</script>

<style scoped>

</style>