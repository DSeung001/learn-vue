<template>

  <h3>
    트랜드
  </h3>

  <hr/>

  <h5>미디어 선택</h5>
  <RadioList name="media" :list="mediaList" :selected="currentMedia">

  </RadioList>

  <h5>시간대 선택 선택</h5>
  <RadioList name="time_window" :list="timeList" :selected="currentTime">

  </RadioList>

  <div v-for="(item, index) in trendMovies"
       :key="index"
       class="card bg-dark text-white col-2" style="display: inline-block;">
    <img class="card-img" :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`" alt="Card image">
    <div class="card-img-overlay">
      <h5 class="card-title p-1" style="background-color: rgba(68,68,68,0.9)">
        {{ item.title !== undefined ? item.title : item.name }}
      </h5>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getDiscoverList, getTrendingList} from "@/api/movie";
import RadioList from "@/components/RadioList.vue";

const popularMovies = ref(null)
const trendMovies = ref(null)

const mediaList = new Map([
  ['all', '전체'],
  ['movie', '영화'],
  ['tv', '티비'],
  ['person', '개인']
]);

const timeList = new Map([['week', '주간'],

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
    const {data} = await getTrendingList();
    trendMovies.value = data.results;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
setPopularMovies();
setTrendMovies();
// watchEffect(setTrendMovies);
</script>

<style>
</style>