<template>
  <h5>TV 프로그램</h5>
  <DetailContent :content="content"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailReviews :reviews="reviews"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailVideos :videos="content.videos.results"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :list="similar" :media="media" @goDetail="goDetail">
    <h5>유사한 TV 프로그램</h5>
  </DetailLinkList>
  <DetailLinkList :list="recommendation" :media="media" @goDetail="goDetail">
    <h5>추천 TV 프로그램</h5>
  </DetailLinkList>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :list="keywords" :media="media" @goDetail="setKeywordTv">
    <h5>키워드</h5>
  </DetailLinkList>

  <div
    v-if="keywordPopup"
    style="max-width: 1280px; height: 680px; margin : 0 auto; border: 1px solid;
  background-color: #111; position: fixed; top: 100px; overflow: scroll">
    <button @click.prevent="keywordPopupClose" style="left: 1230px;position: relative">
      x
    </button>
    <div v-if="keywordTv">
      <SmallList :list="keywordTv" @goDetail="goDetail" col-class="col-2"/>
    </div>
  </div>

</template>

<script setup>
import {ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  getDiscoverTv,
  getRecommendationTv,
  getSimilarTv,
  getTvDetail,
  getTvKeywords,
  getTvReviews
} from "@/api/movie";
import DetailContent from "@/components/DetailContent.vue";
import DetailLinkList from "@/components/DetailLinkList.vue";
import DetailVideos from "@/components/DetailVideos.vue";
import DetailReviews from "@/components/DetailReviews.vue";
import SmallList from "@/components/SmallList.vue";

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
const keywords = ref();
const keywordTv = ref([]);
const keywordPopup = ref(false);


const setContent = async () => {
  const {data} = await getTvDetail(route.params.id)
  content.value = data
  // console.log(data);
}

const setSimilar = async () => {
  const {data} = await getSimilarTv(route.params.id)
  similar.value = data.results;
  // console.log((data.results))
}

const setReview = async () => {
  const {data} = await getTvReviews(route.params.id)
  reviews.value = data
  // console.log(data);
}

const setRecommendation = async () => {
  const {data} = await getRecommendationTv(route.params.id)
  recommendation.value = data.results;
  // console.log((data))
}

const setTvKeywords = async () => {
  const {data} = await getTvKeywords(route.params.id);
  keywords.value = data.results;
}

watchEffect(setSimilar)
watchEffect(setContent);
watchEffect(setReview);
watchEffect(setRecommendation);
watchEffect(setTvKeywords);

watch(content, () => {
  window.scrollTo(0, 0);
  keywordPopup.value = false;
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

const setKeywordTv= async id => {
  const {data} = await getDiscoverTv({
    with_keywords : id
  });
  keywordTv.value = data.results;
  keywordPopup.value = true;
  console.log(data.results);
}

const keywordPopupClose = () => {
  keywordPopup.value = false;
}

</script>

<style scoped>

</style>