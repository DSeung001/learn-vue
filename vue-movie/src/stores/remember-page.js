import { defineStore } from 'pinia'

export const useRememberPageStore = defineStore('page', {
  state: () => ({
    currentPage: 1
  }),
  getters: {
    getPage(state) {
      console.log(state)
      return state.currentPage
    }
  },
  actions: {
    setPage(data) {
      this.currentPage = data
    }
  }
})
