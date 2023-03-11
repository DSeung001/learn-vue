<template>

  <h3>
    사람들은 요즘 뭐 볼까
  </h3>

  <hr/>

  <h5>미디어 선택</h5>
  <RadioList
      @setRadio="value => (currentMedia = value)"
      name="media" :list="mediaList" :selected="currentMedia">

  </RadioList>

  <h5>시간대 선택</h5>
  <RadioList
      @setRadio="value => (currentTime = value)"
      name="time_window"
      :list="timeList" :selected="currentTime">

  </RadioList>

  <div v-for="(item, index) in trendMovies"
       :key="index"
       class="card bg-dark text-white col-3"
       style="display: inline-block;cursor: pointer;"
       @click="goMovieDetail(item.id)"
  >
    <img class="card-img" :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`" alt="Card image">
    <div class="card-img-overlay">
      <p class="card-title p-1 " style="background-color: rgba(68,68,68,0.9)">
        {{ item.title !== undefined ? item.title : item.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import {getDiscoverList, getTrendingList} from "@/api/movie";
import RadioList from "@/components/RadioList.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const popularMovies = ref(null)
const trendMovies = ref(null)

const mediaList = new Map([
  ['all', '전체'],
  ['movie', '영화'],
  ['tv', '티비']
]);

const timeList = new Map([
  ['week', '주간'],
  ['day', '일일'],
])

const currentMedia = ref('all');
const currentTime = ref('week');

const setPopularMovies = async () => {
  try {
    const {data} = await getDiscoverList({
      sort_by: "popularity.desc"
    });
    popularMovies.value = data.results;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const setTrendMovies = async () => {
  try {
    const {data} = await getTrendingList(currentMedia.value, currentTime.value);
    trendMovies.value = data.results;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const goMovieDetail = id => {
  router.push({
    name: "MovieDetail",
    params: {
      id
    }
  })
}

watchEffect(setPopularMovies);
watchEffect(setTrendMovies);
</script>

<style>
</style>