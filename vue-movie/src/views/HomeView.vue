<template>
  <div class="container">
    <div class="row g-4">
      <div class="col-3" v-for="(item, index ) in list" :key="index">
        <div class="card p-1">
          <img class="card-img-top" :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title text-truncate">{{ item.title }}</h5>
            <p class="card-text text-truncate" style="max-height: 30px; min-height: 30px">
              {{ item.overview }}
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Popularity :
              <div class="star-rating" :style="`--rating: ${item.popularity/1000};`">
              </div>
            </li>
            <li class="list-group-item">
              Language : {{ item.original_language }}
              <span v-if="item.adult">
                 / adult
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div>

    </div>


  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { getList } from "@/api/discover";

const list = ref(null);

const setList = async () => {
  try {
    const { data } = await getList();
    console.log(data.results);
    list.value = data.results;
  } catch (error) {
    console.log(error);
  }
};

const genreList = () => {

};

watchEffect(setList);
</script>

<style lang="sass">

</style>