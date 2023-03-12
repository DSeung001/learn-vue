<template>
  <div v-if="similar">
    <h5>
      이 영화가 좋다면?
    </h5>
    <ul>
      <li v-for="item in similar" :key="item.id">
        <a @click.prevent="goDetail(item.id)" style="cursor:pointer" href="#">
          {{ item.title === undefined ? item.name : item.title }}
        </a>
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