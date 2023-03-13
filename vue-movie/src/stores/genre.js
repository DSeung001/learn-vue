import { defineStore } from "pinia";
import { getGenreList } from "@/api/movie";

export const useGenreStore = defineStore("genre", {
  state: () => {
    return {
      movieGenres: new Map(),
      tvGenres: new Map()
    };
  },
  getters: {
    getMovieGenres(state) {
      return state.movieGenres;
    },
    getTvGenres(state) {
      return state.tvGenres;
    }
  },
  actions: {
    async fetchMovieGenres() {
      try {
        const { data } = await getGenreList("movie");
        this.movieGenres = data;
        let genreMap;
        genreMap = new Map();
        data.genres.forEach((genre) => {
          genreMap.set(genre.id, genre.name);
        });
        this.movieGenres = genreMap;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchTvGenres() {
      try {
        const { data } = await getGenreList("tv");
        this.tvGenres = data;
        let genreMap;
        genreMap = new Map();
        data.genres.forEach((genre) => {
          genreMap.set(genre.id, genre.name);
        });
        this.tvGenres = genreMap;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});