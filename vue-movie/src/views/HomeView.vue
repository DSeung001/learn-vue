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

  <SmallList :list="trendMovies" @goDetail="goDetail" col-class="col-3"/>
</template>

<script setup>
import {ref, watchEffect} from "vue";
import {getDiscoverList, getTrendingList} from "@/api/movie";
import RadioList from "@/components/RadioList.vue";
import {useRouter} from "vue-router";
import SmallList from "@/components/SmallList.vue";

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
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const setTrendMovies = async () => {
  try {
    const {data} = await getTrendingList(currentMedia.value, currentTime.value);
    trendMovies.value = data.results;
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const goDetail = (id, type) => {
  if (type == "tv") {
    router.push({
      name: "TvDetail",
      params: {
        id
      }
    })
  } else if (type == "movie") {
    router.push({
      name: "MovieDetail",
      params: {
        id
      }
    })
  }

}

watchEffect(setPopularMovies);
watchEffect(setTrendMovies);
</script>

<style>
</style>