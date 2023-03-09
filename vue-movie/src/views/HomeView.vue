<template>
  <div>
    <div class="row g-4">
      <div class="col-12 col-md-6 col-lg-3" v-for="(item, index ) in movieList" :key="index">
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
      </div>
    </div>

  <MoviePagination
    :current-page="currentPage"
    @setPage="page => (
       currentPage = page
    )"
    :start-page="startPage"
    :last-page="lastPage"
  />
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { getDiscoverList } from "@/api/movie";
import { useGenreStore } from "@/stores/genre";

import MoviePagination from "@/components/movile/moviePagination.vue";

const movieList = ref(null);
const genreStore = useGenreStore();


const totalPages = ref(1);
const currentPage = ref(1);
const startPage = computed(()=>currentPage.value - 2 <= 1 ? 1 : currentPage.value-2);
const lastPage = computed(()=>currentPage.value + 2 <= totalPages.value  ? currentPage.value + 2 : totalPages.value );

const setList = async () => {

  if (genreStore.genres.size === 0) {
    genreStore.fetchGenres();
  }

  try {
    const { data: discoverData } = await getDiscoverList({
      page: currentPage.value
    });

    totalPages.value = discoverData.total_pages;

    let discoverList = discoverData.results;
    discoverList.forEach((item, index) => {
      discoverList[index].genre_text = "";

      item.genre_ids.forEach((id) => {
        let genre = genreStore.genres.get(id);
        discoverList[index].genre_text = discoverList[index].genre_text +
          (genre === undefined ? "" : genre) + " ";
      });
    });

    movieList.value = discoverList;

  } catch (error) {
    console.log(error);
  }
};

watchEffect(setList);
watch(currentPage, () => {
  window.scrollTo(0, 0);
});

</script>

<style lang="sass">

</style>