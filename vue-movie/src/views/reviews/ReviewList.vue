<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">미디어 타입</th>
      <th scope="col">미디어 아이디</th>
      <th scope="col">저자</th>
      <th scope="col">내용</th>
      <th scope="col">생성일</th>
    </tr>
    </thead>
    <tbody>
        <tableRow
            v-for="review in reviews"
            :review="review"
            :key="review.id"/>
    </tbody>
  </table>
  <ListPagination
      :current-page="currentPage"
      @setPage="page => (
       currentPage = page
    )"
      :start-page="startPage"
      :last-page="lastPage"
  />
</template>

<script setup>
import {getReviews} from "@/api/local/reviews";
import {computed, ref, watchEffect} from "vue";
import TableRow from "@/components/tableRow.vue";

const reviews = ref()

const totalPages = ref(1);
const currentPage = ref(1);
const startPage = computed(() =>
    currentPage.value - 2 <= 1 ? 1 : currentPage.value - 2
);
const lastPage = computed(() =>
    currentPage.value + 2 <= totalPages.value ? currentPage.value + 2 : totalPages.value
);

const setReviews = async () => {
  const {data} = await getReviews(
      {
        _sort: 'createdAt',
        _order: 'desc',
        _page: currentPage.value,
        _limit: 15,
      }
  );
  reviews.value = data;
  console.log(data);
}

watchEffect(setReviews);
</script>

<style scoped>

</style>