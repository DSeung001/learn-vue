<template>
  <h5>
    {{ props.media == "tv" ? "TV 프로그램" : "" }}
    {{ props.media == "movie" ? "영화" : "" }}
  </h5>
  <DetailContent :content="content"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>

  <CreateForm
      @save="save"
      v-model:author="form.author"
      v-model:content="form.content"
  />

  <DetailReviews :reviews="newReviews" v-if="newReviews"/>
  <DetailReviews :reviews="reviews.results" v-if="reviews.results.length > 0"/>

  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailVideos :videos="content.videos.results"/>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :list="similar" :media="media" @goDetail="goDetail">
    <h5>
      {{ props.media == "tv" ? "유사한 TV 프로그램" : "" }}
      {{ props.media == "movie" ? "유사한 영화" : "" }}
    </h5>
  </DetailLinkList>
  <DetailLinkList :list="recommendation" :media="media" @goDetail="goDetail">
    <h5>
      {{ props.media == "tv" ? "추천 TV 프로그램" : "" }}
      {{ props.media == "movie" ? "추천 영화" : "" }}
    </h5>
  </DetailLinkList>
  <hr style="margin-top: 30px; margin-bottom: 30px;"/>
  <DetailLinkList :list="keywords" :media="media" @goDetail="setKeywordMovies">
    <h5>키워드</h5>
  </DetailLinkList>

  <div
      v-if="keywordPopup"
      style="max-width: 1280px; height: 680px; margin : 0 auto; border: 1px solid;
  background-color: #111; position: fixed; top: 100px; overflow: scroll">
    <button @click.prevent="keywordPopupClose" style="position: relative">
      x
    </button>
    <div v-if="keywordMovies">
      <SmallList :list="keywordMovies" @goDetail="goDetail" col-class="col-2"/>
    </div>
  </div>

</template>

<script setup>
import {inject, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  getKeywordMovies,
  getMovieDetail,
  getMovieKeywords,
  getMovieReviews,
  getRecommendationMovies,
  getSimilarMovies
} from "@/api/tmdb/movie";
import DetailContent from "@/components/DetailContent.vue";
import DetailReviews from "@/components/DetailReviews.vue";
import DetailVideos from "@/components/DetailVideos.vue";
import DetailLinkList from "@/components/DetailLinkList.vue";
import SmallList from "@/components/SmallList.vue";
import CreateForm from "@/components/CreateForm.vue";
import {createReview, getReviews} from "@/api/local/reviews";
import {getRecommendationTv, getSimilarTv, getTvDetail, getTvKeywords, getTvReviews} from "@/api/tmdb/tv";

const props = defineProps({
  media: {
    type: String,
    required: true
  }
});

const route = useRoute();
const content = ref({
  videos: {
    results: []
  },
  genres: []
})

const reviews = ref({
  results: []
})
const similar = ref()
const recommendation = ref();
const keywords = ref();
const keywordMovies = ref([]);
const keywordPopup = ref(false);

const setContent = async () => {
  if (props.media === "tv") {
    const {data} = await getTvDetail(route.params.id);
    content.value = data;
  } else if (props.media === "movie") {
    const {data} = await getMovieDetail(route.params.id)
    content.value = data;
  }
  // console.log((data));
}

const setReview = async () => {
  if (props.media === "tv") {
    const {data} = await getTvReviews(route.params.id);
    reviews.value = data;
  } else if (props.media === "movie") {
    const {data} = await getMovieReviews(route.params.id)
    reviews.value = data
  }
  // console.log(data);
}


const setSimilar = async () => {
  if (props.media === "tv") {
    const {data} = await getSimilarTv(route.params.id);
    similar.value = data.results;
  } else if (props.media === "movie") {
    const {data} = await getSimilarMovies(route.params.id)
    similar.value = data.results;
  }
  // console.log((data))
}

const setRecommendation = async () => {
  if (props.media === "tv") {
    const {data} = await getRecommendationTv(route.params.id);
    recommendation.value = data.results;
  } else if (props.media === "movie") {
    const {data} = await getRecommendationMovies(route.params.id)
    recommendation.value = data.results;
  }
  // console.log((data))
}

const setKeywords = async () => {
  if (props.media === "tv") {
    const {data} = await getTvKeywords(route.params.id);
    keywords.value = data.results;
  } else if (props.media === "movie") {
    const {data} = await getMovieKeywords(route.params.id);
    keywords.value = data.keywords;
  }
  // console.log(data.keywords);
}

const setNewReviews = async () => {
  const {data} = await getReviews({
    target: route.params.id,
    type: props.media
  });
  newReviews.value = data;
}

watchEffect(setSimilar)
watchEffect(setContent);
watchEffect(setReview);
watchEffect(setRecommendation);
watchEffect(setKeywords);
watchEffect(setNewReviews);

watch(content, () => {
  window.scrollTo(0, 0);
  keywordPopup.value = false;
});

const router = useRouter();

const goDetail = id => {

  if (props.media === "tv") {
    router.push({
      name: "TvDetail",
      params: {
        id
      }
    })
  } else if (props.media === "movie") {
    router.push({
      name: "MovieDetail",
      params: {
        id
      }
    })
  }
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

const form = ref({
  type: props.media,
  target: route.params.id,
  author: null,
  content: null,
  created_at: null,
});

const newReviews = ref([]);

const dayjs = inject('dayjs');

const save = async () => {
  form.value.created_at = dayjs(Date.now()).format('YYYY-MM-DD');
  // console.log(dayjs(Date.now()).format('YYYY-MM-DD'));
  // console.log(form.value);
  const {data, status} = await createReview(form.value);
  if (status === 201) {
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