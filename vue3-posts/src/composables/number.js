import { computed, reactive, toRefs, unref } from 'vue';

export const useNumber = number => {
  const isOdd = computed(() => unref(number) % 2 === 1);
  const isEven = computed(() => !isOdd.value);
  /*
      아래 방법도 가능  
      const state = reactive({
        x : 100,
        y: 1000,
      })
      
      return toRefs(state);*/

  return {
    isOdd,
    isEven,
  };
};
