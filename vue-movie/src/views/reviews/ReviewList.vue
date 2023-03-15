<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">미디어 타입</th>
      <th scope="col">제목</th>
      <th scope="col">저자</th>
      <th scope="col">내용</th>
      <th scope="col">생성일</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row"></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import {getReviews} from "@/api/local/reviews";
import {ref, watchEffect} from "vue";

const reviews = ref()
const setReviews = async () => {
  const {data} = await getReviews();
  reviews.value = data;
  console.log(reviews.value);
}

watchEffect(setReviews);
</script>

<style scoped>

</style>