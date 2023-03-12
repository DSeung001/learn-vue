<template>

  <DetailContent :content="content"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailReviews :reviews="reviews"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailVideos :videos="content.videos.results"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :similar="similar" :media="media">
    <h5>유사한 영화</h5>
  </DetailLinkList>
  <DetailLinkList :similar="recommendation" :media="media">
    <h5>추천 영화</h5>
  </DetailLinkList>

</template>

<script setup>
import {ref, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {getMovieDetail, getMovieReviews, getRecommendationMovies, getSimilarMovies} from "@/api/movie";
import DetailContent from "@/components/DetailContent.vue";
import DetailReviews from "@/components/DetailReviews.vue";
import DetailVideos from "@/components/DetailVideos.vue";
import DetailLinkList from "@/components/DetailLinkList.vue";

const route = useRoute();
const content = ref({
  videos: {
    results: []
  },
  genres: []
})

const media = 'movie';

const reviews = ref(null)
const similar = ref()
const recommendation = ref();

const setContent = async () => {
  const {data} = await getMovieDetail(route.params.id)
  content.value = data;
  console.log((data))
}

const getReview = async () => {
  const {data} = await getMovieReviews(route.params.id)
  reviews.value = data
  // console.log(data);
}


const getSimilar = async () => {
  const {data} = await getSimilarMovies(route.params.id)
  similar.value = data.results;
  // console.log((data))
}

const getRecommendation = async () => {
  const {data} = await getRecommendationMovies(route.params.id)
  recommendation.value = data.results;
  console.log((data))
}

watchEffect(getSimilar)
watchEffect(setContent);
watchEffect(getReview);
watchEffect(getRecommendation);

watch(content, () => {
  window.scrollTo(0, 0);
});

</script>

<style scoped>

</style>