<template>

  <h2>
    나에게 맞는 작품 찾기
  </h2>

  <p> Q : 미디어 고르기</p>
  <RadioList
    @setRadio="value => (currentMedia = value)"
    name="media" :list="mediaList" :selected="currentMedia" />

  <!--  지웠을 때도 반응 추가-->
  <p v-if="currentMedia"> Q : 장르 구하기</p>
  <CheckboxList
    @setCheckbox="value => (currentGenres.push(value))"
    name="genre" :list="genreList" />

  <template v-if="currentMedia">
    <p>Q : 키워드 검색</p>
    <p>현재 키워드 :
      <span v-for="(value, key) in currentKeywords" :key="key">
        {{ value.name }},
      </span>
    </p>
    <input type="search" @input="setSearchKeyword($event.target.value)">
    <ul>
      <li v-for="item in keywordList" :key="item.id">
        <a href="#" @click.prevent="addKeywordList(item.id, item.name)">
          {{ item.name }}
        </a>
      </li>
    </ul>
    <checkbox-list name="keyword" :list="keywordList" />
  </template>

  <button @click="setList">
    검색
  </button>

  <div v-if="contentList.length > 0">
    <SmallList :list="contentList" @goDetail="goDetail" col-class="col-2" />
  </div>

</template>

<script setup>
import { ref, watch } from "vue";
import RadioList from "@/components/RadioList.vue";
import CheckboxList from "@/components/CheckboxList.vue";
import { useGenreStore } from "@/stores/genre";
import { getDiscoverMovies, getDiscoverTv, getSearchKeyword } from "@/api/movie";
import { useRouter } from "vue-router";
import SmallList from "@/components/SmallList.vue";

const genreStore = useGenreStore();

const mediaList = new Map([
  ["movie", "영화"],
  ["tv", "티비"]
]);

const genreList = ref([]);
const keywordList = ref([]);
const searchKeyword = ref("");

const currentMedia = ref();
const currentGenres = ref([]);
const currentKeywords = ref([]);

const contentList = ref([]);


const setupStore = async () => {
  /*console.log(genreStore.movieGenres);
  console.log(genreStore.tvGenres);*/

  if (genreStore.movieGenres.size === 0) {
    await genreStore.fetchMovieGenres();
  }
  if (genreStore.tvGenres.size === 0) {
    await genreStore.fetchTvGenres();
  }
};

const setSearchKeyword = async (search) => {
  searchKeyword.value = search;
};

const addKeywordList = (id, name) => {
  currentKeywords.value.push({ id: id, name: name });
};

const setList = async () => {
  let keywords = currentKeywords.value.map(item => item.id);

  console.log(currentGenres.value.toString());
  console.log(keywords.toString());

  if (currentMedia.value === "tv") {
    const { data } = await getDiscoverTv({
      with_genres: currentGenres.value.toString(),
      with_keywords: keywords.toString()
    });
    console.log(data.results);
    contentList.value = data.results;
  } else if (currentMedia.value === "movie") {
    const { data } = await getDiscoverMovies({
      with_genres: currentGenres.value.toString(),
      with_keywords: keywords.toString()
    });
    console.log(data.results);
    contentList.value = data.results;
  }
};

setupStore();

watch(currentMedia, () => {
  if (currentMedia.value === "movie") {
    genreList.value = genreStore.movieGenres;
  } else if (currentMedia.value === "tv") {
    genreList.value = genreStore.tvGenres;
  }
  // console.log(currentGenres.value);
  currentGenres.value = [];
  currentKeywords.value = [];
  searchKeyword.value = "";
});

watch(searchKeyword, async () => {
  const { data } = await getSearchKeyword({
      query: searchKeyword.value
    }
  );
  keywordList.value = data.results;
  // console.log(data);
});

const router = useRouter();
const goDetail = (id, type) => {
  if (type == "tv") {
    router.push({
      name: "TvDetail",
      params: {
        id
      }
    });
  } else {
    router.push({
      name: "MovieDetail",
      params: {
        id
      }
    });
  }
};


</script>

<style scoped>
</style>