<template>
  <div class="row g-4" v-if="videos">
    <h5>
      예고편
    </h5>
    <div v-for="video in videos"
         :key="video.id"
         class="col-12 col-md-9 col-lg-6" style="min-height: 450px">
      <p style="height: 20px">
        {{ video.name }}
      </p>
      <iframe
          style="min-height: 400px"
          width="100%"
          :src="`https://www.youtube.com/embed/${video.key}?rel=0`" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script setup>
defineProps({
  videos : {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>

</style>