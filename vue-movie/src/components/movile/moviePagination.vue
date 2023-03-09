<template>
  <nav style="margin-top: 40px">
    <ul class="pagination justify-content-center">
      <li class="page-item" @click="prevPage">
        <span class="page-link">&larr;</span>
      </li>

      <!--      <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active" @click="setPage(2)">
                  <span class="page-link">
                    2
                    <span class="sr-only"></span>
                  </span>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>-->


      {{ lastPage.value + 1 }}
      {{ startPage.value }}
      <li class="page-item"
          v-for="page in lastPage" :key="page">
        <a class="page-link" href="#">
          {{ page}}
        </a>
      </li>

      <li class="page-item" @click="nextPage">
        <span class="page-link">&rarr;</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
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
</script>

<style scoped>

</style>