<template>
  <div class="container">
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
              Popularity :
              <div class="star-rating" :style="`--rating: ${item.popularity/1000};`">
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


    <nav style="margin-top: 40px">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <span class="page-link">&larr;</span>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active">
            <span class="page-link">
              2
              <span class="sr-only"></span>
            </span>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">&rarr;</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { getDiscoverList, getGenreList } from "@/api/movie";
import { useGenreStore } from "@/stores/genre";


const movieList = ref(null);
const genreList = ref(null);
const genreStroe = useGenreStore();

onMounted(() => {
  if (genreStroe.genres.size === 0) {
    genreStroe.fetchGenres();
  }
});

const setList = async () => {

  try {
    const { data: discoverData } = await getDiscoverList();
    let { data: genreData } = await getGenreList();

    // 장르는 스토어로 처리할 듯 => 상세 페이지 및 쓰는 곳이 많다


    let discoverList = discoverData.results;
    discoverList.forEach((item, index) => {
      discoverList[index].genre_text = "";

      item.genre_ids.forEach((id) => {
        discoverList[index].genre_text = discoverList[index].genre_text + genreStroe.genres.get(id) + " ";
      });
    });

    movieList.value = discoverList;
    genreList.value = genreData;

  } catch (error) {
    console.log(error);
  }
};

watchEffect(setList);

</script>

<style lang="sass">

</style>