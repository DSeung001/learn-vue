<template>
  <h5>TV 프로그램</h5>
  <DetailContent :content="content"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>

  <CreateForm
      @save="save"
      v-model:author="form.author"
      v-model:content="form.content"
  />

  <DetailReviews :reviews="newReviews"/>
  <DetailReviews :reviews="reviews.results"/>

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
import {inject, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  getDiscoverTv
} from "@/api/tmdb/movie";
import DetailContent from "@/components/DetailContent.vue";
import DetailLinkList from "@/components/DetailLinkList.vue";
import DetailVideos from "@/components/DetailVideos.vue";
import DetailReviews from "@/components/DetailReviews.vue";
import SmallList from "@/components/SmallList.vue";
import {getRecommendationTv, getSimilarTv, getTvDetail, getTvKeywords, getTvReviews} from "@/api/tmdb/tv";
import {createReview, getReviews} from "@/api/local/reviews";
import CreateForm from "@/components/CreateForm.vue";

const route = useRoute();
const content = ref({
  videos: {
    results: []
  },
  genres: []
});

const media = "tv";

const reviews = ref({
  results: []
});
const similar = ref(null);
const recommendation = ref();
const keywords = ref();
const keywordTv = ref([]);
const keywordPopup = ref(false);


const setContent = async () => {
  const {data} = await getTvDetail(route.params.id);
  content.value = data;
  // console.log(data);
};

const setSimilar = async () => {
  const {data} = await getSimilarTv(route.params.id);
  similar.value = data.results;
  // console.log((data.results))
};

const setReview = async () => {
  const {data} = await getTvReviews(route.params.id);
  reviews.value = data;
  // console.log(data);
};

const setRecommendation = async () => {
  const {data} = await getRecommendationTv(route.params.id);
  recommendation.value = data.results;
  // console.log((data))
};

const setTvKeywords = async () => {
  const {data} = await getTvKeywords(route.params.id);
  keywords.value = data.results;
};

const setNewReviews = async () => {
  const {data} = await getReviews({
    target : route.params.id,
    type : 'tv'
  });
  newReviews.value = data;
}

watchEffect(setSimilar);
watchEffect(setContent);
watchEffect(setReview);
watchEffect(setRecommendation);
watchEffect(setTvKeywords);
setNewReviews();

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
  });
};

const setKeywordTv = async id => {
  const {data} = await getDiscoverTv({
    with_keywords: id
  });
  keywordTv.value = data.results;
  keywordPopup.value = true;
  console.log(data.results);
};

const keywordPopupClose = () => {
  keywordPopup.value = false;
};

const form = ref({
  type : 'tv',
  target : route.params.id,
  author: null,
  content: null,
  created_at : null,
});

const newReviews = ref([]);

const dayjs = inject('dayjs');

const save = async () => {
  form.value.created_at = dayjs(Date.now()).format('YYYY-MM-DD');
  // console.log(dayjs(Date.now()).format('YYYY-MM-DD'));
  // console.log(form.value);
  const {data, status} = await createReview(form.value);
  if(status === 201){
    alert("성공적으로 추가했습니다.");
    form.value.author = null;
    form.value.content = null;
    newReviews.value.push(data)
  }
  console.log(data);
}

</script>

<style scoped>

</style>