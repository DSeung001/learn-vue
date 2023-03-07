import { defineStore } from "pinia";
import { getGenreList } from "@/api/movie";

export const useGenreStore = defineStore("genre", {
  state: () => ({
    genres: new Map()
  }),
  getters: {
    getGenres(state) {
      return state.genres;
    }
  },
  actions: {
    async fetchGenres() {
      try {
        const { data } = await getGenreList();
        this.genres = data;
        let genreMap;
        genreMap = new Map();
        data.genres.forEach((genre) => {
          genreMap.set(genre.id, genre.name);
        });
        this.genres = genreMap;

      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  }
});