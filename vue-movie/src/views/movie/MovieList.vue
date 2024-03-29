<template>
  <div>
    <MovieGrid :items="movieList">
      <template v-slot="{ item }">
        <MovieItem :item="item" @click="goMovieDetail(item.id)" />
      </template>
    </MovieGrid>

    <ListPagination
      :current-page="currentPage"
      @setPage="(page) => (currentPage = page)"
      :start-page="startPage"
      :last-page="lastPage"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { getDiscoverMovies } from '@/api/tmdb/movie'
import { useGenreStore } from '@/stores/genre'
import ListPagination from '@/components/ListPagination.vue'
import { useRoute, useRouter } from 'vue-router'
import MovieGrid from '@/components/movie/MovieGrid.vue'
import MovieItem from '@/components/movie/MovieItem.vue'

const router = useRouter()
const route = useRoute()

const movieList = ref([])
const genreStore = useGenreStore()

const totalPages = ref(1)
const currentPage = ref(route.query.currentPage === undefined ? 1 : route.query.currentPage / 1)
const startPage = computed(() => (currentPage.value - 2 <= 1 ? 1 : currentPage.value - 2))
const lastPage = computed(() =>
  currentPage.value + 2 <= totalPages.value ? currentPage.value + 2 : totalPages.value
)

const setList = async () => {
  if (genreStore.movieGenres.size === 0) {
    await genreStore.fetchMovieGenres()
  }

  try {
    const { data: discoverData } = await getDiscoverMovies({
      page: currentPage.value
    })

    totalPages.value = discoverData.total_pages

    let discoverList = discoverData.results
    discoverList.forEach((item, index) => {
      discoverList[index].genre_text = ''

      item.genre_ids.forEach((id) => {
        let genre = genreStore.movieGenres.get(id)
        discoverList[index].genre_text =
          discoverList[index].genre_text + (genre === undefined ? '' : genre) + ' '
      })
    })

    movieList.value = discoverList
  } catch (error) {
    console.log(error)
  }
}

const goMovieDetail = (id) => {
  router.push({
    name: 'MovieDetail',
    params: {
      id
    },
    query: {
      currentPage: currentPage.value,
      type: 'movie'
    }
  })
}

watchEffect(setList)
watch(currentPage, () => {
  router.push({
    query: {
      currentPage: currentPage.value,
      type: 'movie'
    }
  })
  window.scrollTo(0, 0)
})
</script>

<style lang="sass"></style>
