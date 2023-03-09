<template>
  <nav style="margin-top: 40px">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="isPrevPage">
        <a class="page-link"
           href="#"
           @click.prevent="$emit('setPage', currentPage-1)">
          &larr;
        </a>
      </li>

      <li class="page-item"
          :class="{ active: currentPage === (page + startPage -1) }"
          v-for="page in (lastPage-startPage+1)" :key="page"
      >
        <a @click.prevent="$emit('setPage', page + startPage -1)"
           class="page-link" href="#">
          {{ page + startPage -1 }}
          <span v-if="(props.currentPage == (page + startPage-1))" class="sr-only"></span>
        </a>
      </li>

      <li class="page-item" :class="isNextPage">
        <a class="page-link"
           href="#"
           @click.prevent="$emit('setPage', currentPage+1)">
          &rarr;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  startPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  }
});

defineEmits(['setPage']);

const isPrevPage = computed(() => ({
  disabled: !(props.currentPage > 1)
}));

const isNextPage = computed(() => ({
  disabled: !(props.currentPage < props.lastPage),
}));

</script>

<style scoped>

</style>