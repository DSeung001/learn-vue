<template>
  <h5>영화</h5>
  <DetailContent :content="content"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailReviews :reviews="reviews"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailVideos :videos="content.videos.results"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :list="similar" :media="media" @goDetail="goDetail">
    <h5>유사한 영화</h5>
  </DetailLinkList>
  <DetailLinkList :list="recommendation" :media="media" @goDetail="goDetail">
    <h5>추천 영화</h5>
  </DetailLinkList>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :list="keywords" :media="media" @goDetail="setKeywordMovies">
    <h5>키워드</h5>
  </DetailLinkList>

  <div
      v-if="keywordPopup"
      style="max-width: 1280px; height: 680px; margin : 0 auto; border: 1px solid;
  background-color: #111; position: fixed; top: 100px; overflow: scroll">
    <button @click.prevent="keywordPopupClose" style="left: 1230px;position: relative">
      x
    </button>
    <div v-if="keywordMovies">
      <SmallList :list="keywordMovies" @goDetail="goDetail" col-class="col-2"/>
    </div>
  </div>

</template>

<script setup>
import {ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  getKeywordMovies,
  getMovieDetail,
  getMovieKeywords,
  getMovieReviews,
  getRecommendationMovies,
  getSimilarMovies
} from "@/api/movie";
import DetailContent from "@/components/DetailContent.vue";
import DetailReviews from "@/components/DetailReviews.vue";
import DetailVideos from "@/components/DetailVideos.vue";
import DetailLinkList from "@/components/DetailLinkList.vue";
import SmallList from "@/components/SmallList.vue";

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
const keywords = ref();
const keywordMovies = ref([]);
const keywordPopup = ref(false);

const setContent = async () => {
  const {data} = await getMovieDetail(route.params.id)
  content.value = data;
  // console.log((data));
}

const setReview = async () => {
  const {data} = await getMovieReviews(route.params.id)
  reviews.value = data
  // console.log(data);
}


const setSimilar = async () => {
  const {data} = await getSimilarMovies(route.params.id)
  similar.value = data.results;
  // console.log((data))
}

const setRecommendation = async () => {
  const {data} = await getRecommendationMovies(route.params.id)
  recommendation.value = data.results;
  // console.log((data))
}

const setMovieKeywords = async () => {
  const {data} = await getMovieKeywords(route.params.id);
  keywords.value = data.keywords;
  // console.log(data.keywords);
}

watchEffect(setSimilar)
watchEffect(setContent);
watchEffect(setReview);
watchEffect(setRecommendation);
watchEffect(setMovieKeywords);

watch(content, () => {
  window.scrollTo(0, 0);
  keywordPopup.value = false;
});

const router = useRouter();

const goDetail = id => {
  router.push({
    name: "MovieDetail",
    params: {
      id
    }
  })
}

const setKeywordMovies = async id => {
  const {data} = await getKeywordMovies(id);
  keywordMovies.value = data.results;
  keywordPopup.value = true;
  console.log(data.results);
}

const keywordPopupClose = () => {
  keywordPopup.value = false;
}

</script>

<style scoped>

</style>