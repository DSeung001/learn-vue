<template>
  <h2>
    {{ content.title }}({{ content.original_title }})
  </h2>
  <h5 style="margin-top: 12px; margin-bottom: 12px">
    {{ content.tagline }}
  </h5>
  <span class="p-1" v-for="item in content.genres"
        style="border: 1px solid #444; border-radius: 10%; margin-right: 10px">
      {{ item.name }}
  </span>
  <hr style="margin-bottom:50px; margin-top: 30px"/>
  <div style="width:800px;margin:0 auto">
    <p class="pd-3" style="margin-bottom: 60px; text-align: center">
      {{ content.overview }}
    </p>
    <img class="card-img-top" style="width: 500px; margin:0 auto 20px; display: block"
         :src="`https://image.tmdb.org/t/p/w500/${content.poster_path}`" alt="Card image cap">
  </div>

  <div class="row g-4" v-if="content.videos">
    <div v-for="video in content.videos.results" class="col-12 col-md-9 col-lg-6" style="min-height: 450px">
      <p style="height: 20px">
        {{ video.name }}
      </p>
      <iframe
          style="min-height: 400px"
          width="100%"
          :src="`https://www.youtube.com/embed/${video.key}?rel=0`" allowfullscreen></iframe>
    </div>
  </div>

  <hr style="margin-top: 30px; margin-bottom: 30px;"/>

  <h5>
    이 영화가 좋다면?
  </h5>
  <div v-if="similars">
    <ul>
      <li v-for="item in similars.results">
        <a @click.prevent="goMovieDetail(item.id)" style="cursor:pointer" href="#">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>

</template>

<script setup>
import {ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getMovieDetail, getSimilarMovies} from "@/api/movie";

const route = useRoute();
const content = ref({
  videos: {
    results: []
  },
  genres: []
})

const similars = ref(null)

const setContent = async () => {
  const {data} = await getMovieDetail(route.params.id)
  content.value = data;
  console.log((data))
}

const getSimilar = async () => {
  const {data} = await getSimilarMovies(route.params.id)
  similars.value = data;
  console.log((data))
}

watchEffect(getSimilar)
watchEffect(setContent);

watch(content, () => {
  window.scrollTo(0, 0);
});


const router = useRouter();

const goMovieDetail = id => {
  router.push({
    name: "MovieDetail",
    params: {
      id
    }
  })
}
</script>

<style scoped>

</style>