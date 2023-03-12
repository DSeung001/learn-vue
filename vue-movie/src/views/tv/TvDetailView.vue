<template>
  <DetailContent :content="content"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailReviews :reviews="reviews"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailVideos :videos="content.videos.results"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :similar="similar" :media="media" @goDetail="goDetail">
    <h5>유사한 TV 프로그램</h5>
  </DetailLinkList>
  <DetailLinkList :similar="recommendation" :media="media" @goDetail="goDetail">
    <h5>추천 TV 프로그램</h5>
  </DetailLinkList>

</template>

<script setup>
import {ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getRecommendationTv, getSimilarTv, getTvDetail, getTvReviews} from "@/api/movie";
import DetailContent from "@/components/DetailContent.vue";
import DetailLinkList from "@/components/DetailLinkList.vue";
import DetailVideos from "@/components/DetailVideos.vue";
import DetailReviews from "@/components/DetailReviews.vue";

const route = useRoute();
const content = ref({
  videos: {
    results: []
  },
  genres: []
})

const media = 'tv';

const reviews = ref(null)
const similar = ref(null)
const recommendation = ref();

const setContent = async () => {
  const {data} = await getTvDetail(route.params.id)
  content.value = data
}

const getSimilar = async () => {
  const {data} = await getSimilarTv(route.params.id)
  similar.value = data.results;
  // console.log((data.results))
}

const getReview = async () => {
  const {data} = await getTvReviews(route.params.id)
  reviews.value = data
  console.log(data);
}

const getRecommendation = async () => {
  const {data} = await getRecommendationTv(route.params.id)
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

const router = useRouter();

const goDetail = id => {
  router.push({
    name: "TvDetail",
    params: {
      id
    }
  })
}


</script>

<style scoped>

</style>