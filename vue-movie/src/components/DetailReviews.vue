<template>
  <div v-if="reviews">
    <h5>
      리뷰
    </h5>
    <div class="card" v-for="item in reviews" :key="item.id">
      <div class="card-body">
        <h5 class="card-title">
          {{ item.author }}
        </h5>
        <div>
          <h6 class="card-subtitle mb-2 text-muted">
            {{ item.created_at !== undefined ? item.created_at.substring(0, 10) : "" }}
          </h6>
          <p class="card-text">
            {{ item.content }}
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reviews : {
    type : Array,
    required : true
  }
})
</script>

<style scoped>

</style>