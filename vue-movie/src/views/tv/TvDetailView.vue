<template>
  <DetailContent :content="content"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailReviews :reviews="reviews"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailVideos :videos="content.videos.results"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailSimilars :similar="similar" media="tv"/>

</template>

<script setup>
import {ref, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {getSimilarTv, getTvDetail, getTvReviews} from "@/api/movie";
import DetailContent from "@/components/DetailContent.vue";
import DetailSimilars from "@/components/DetailSimilars.vue";
import DetailVideos from "@/components/DetailVideos.vue";
import DetailReviews from "@/components/DetailReviews.vue";

const route = useRoute();
const content = ref({
  videos: {
    results: []
  },
  genres: []
})

const similar = ref(null)
const reviews = ref(null)

const setContent = async () => {
  const {data} = await getTvDetail(route.params.id)
  content.value = data
}

const getSimilar = async () => {
  const {data} = await getSimilarTv(route.params.id)
  similar.value = data.results;
  console.log((data.results))
}

const getReview = async () => {
  const {data} = await getTvReviews(route.params.id)
  reviews.value = data
  console.log(data);
}

watchEffect(getSimilar)
watchEffect(setContent);
watchEffect(getReview);

watch(content, () => {
  window.scrollTo(0, 0);
});

</script>

<style scoped>

</style>