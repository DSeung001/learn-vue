<template>
  <div class="card p-1">

    <img class="card-img-top" v-if="!(simplificationStore.getSimply)"
         :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
         alt="Card image cap"
    >
    <div class="card-body">
      <h5 class="card-title text-truncate">{{ item.title }}</h5>
      <p class="card-text text-truncate" style="max-height: 30px; min-height: 30px">
        {{ item.overview }}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        Vote :
        <div class="star-rating" :style="`--rating: ${item.vote_average/2};`">
        </div>
      </li>
      <li class="list-group-item">
        Genre :
        {{ item.genre_text }}
      </li>
      <li class="list-group-item">
        Language : {{ item.original_language }}
        <span v-if="item.adult">
                 / adult
              </span>
      </li>
    </ul>
  </div>
</template>

<script setup>

import {useSimplificationStore} from "@/stores/simplification";

const simplificationStore = useSimplificationStore();

defineProps({
  item: {
    type: Object,
    required: true
  }
});

defineEmits(['modal', 'preview']);
</script>

<style scoped>
</style>