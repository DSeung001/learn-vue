import { defineStore } from 'pinia';

// Store도 composables과 같이 use로 시작하는게 관례
export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCount: state => state.counter * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },
  actions: {
    // 화살표 함수는 상위 스코프에 영향을 받기 때문에 그냥 함수로 작성하여 this 접근이 가능하게 사용
    increment() {
      this.counter++;
    },
  },
});
