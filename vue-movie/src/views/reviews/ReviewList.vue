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
      <tableRow v-for="review in reviews" :review="review" :key="review.id" />
    </tbody>
  </table>
  <AppLoading v-if="loading" />
  <AppError v-else-if="error" :message="error.message" />
  <ListPagination
    :current-page="params._page"
    @setPage="(page) => (params._page = page)"
    :start-page="startPage"
    :last-page="lastPage"
  />
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import TableRow from '@/components/tableRow.vue'
import { useAxios } from '@/composables/useAxios'
import AppLoading from '@/components/app/AppLoading.vue'
import AppError from '@/components/app/AppError.vue'
import { reviewPath } from '@/api/local'
import ListPagination from '@/components/ListPagination.vue'

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 10
})

const {
  data: reviews,
  error,
  loading,
  response
} = useAxios(reviewPath, {
  params
})

watchEffect(() => {
  console.log(params.value)
})

const totalCount = computed(() => {
  if (response.value !== null) {
    return Math.ceil(response.value.headers['x-total-count'] / params.value._limit)
  } else {
    return 1
  }
})
const startPage = computed(() => Math.max(params.value._page - 2, 1))
const lastPage = computed(() => Math.min(params.value._page + 2, totalCount.value))
</script>

<style scoped></style>
