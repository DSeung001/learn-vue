<template>
  <div>
    <MovieGrid :items="movieList">
      <template v-slot="{item}">
        <MovieItem
            :item="item"
            @click="goMovieDetail(item.id)"/>
      </template>

    </MovieGrid>

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
import {computed, ref, watch, watchEffect} from "vue";
import {getDiscoverList} from "@/api/movie";
import {useGenreStore} from "@/stores/genre";
import MoviePagination from "@/components/movile/MoviePagination.vue";
import {useRouter} from "vue-router";
import MovieGrid from "@/components/movile/MovieGrid.vue";
import MovieItem from "@/components/movile/MovieItem.vue";

const router = useRouter();

const movieList = ref([]);
const genreStore = useGenreStore();

const totalPages = ref(1);
const currentPage = ref(1);
const startPage = computed(() => currentPage.value - 2 <= 1 ? 1 : currentPage.value - 2);
const lastPage = computed(() => currentPage.value + 2 <= totalPages.value ? currentPage.value + 2 : totalPages.value);

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

const goMovieDetail = id => {
  router.push({
    name: "MovieDetail",
    params: {
      id
    }
  })
}

watchEffect(setList);
watch(currentPage, () => {
  window.scrollTo(0, 0);
});

</script>

<style lang="sass">

</style>