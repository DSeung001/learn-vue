<template>
  <div v-if="similar">
    <slot></slot>
    <ul>
      <li v-for="item in similar" :key="item.id" style="display: inline-block">
        <a @click.prevent="goDetail(item.id)" style="cursor:pointer" href="#">
          {{ item.title === undefined ? item.name : item.title }}
        </a>
        <span style="margin-right: 10px">
          ,
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const props = defineProps({
  similar : {
    type: Object,
    required: true,
  },
  media : {
    type : String,
    required : true
  }
});

const router = useRouter();

// emit으로 변경 => 키워드 리스트 추가
// 1. https://developers.themoviedb.org/3/movies/get-movie-keywords
// 2. https://developers.themoviedb.org/3/keywords/get-movies-by-keyword
const goDetail = id => {
  if(props.media === 'tv'){
    router.push({
      name: "TvDetail",
      params: {
        id
      }
    })
  }else if (props.media === "movie"){
    router.push({
      name: "MovieDetail",
      params: {
        id
      }
    })
  }

}
</script>

<style scoped>

</style>