<template>
  <div v-if="content">
    <h2>
      {{ content.title === undefined ? content.name : content.title }}
      {{ content.original_name === undefined ? "" : "(" + content.original_name + ")" }}
      {{ content.original_title === undefined ? "" : "(" + content.original_title + ")" }}
    </h2>
    <h5 style="margin-top: 12px; margin-bottom: 12px">
      {{ content.tagline }}
    </h5>
    <span class="p-1"
          v-for="item in content.genres"
          :key="item.id"
          style="border: 1px solid #444; border-radius: 10%; margin-right: 10px">
      {{ item.name }}
  </span>
    <p class="mt-3" v-if="content.release_date">
      {{ content.release_date }} 작품
    </p>

    <p class="mt-3">
      <span v-if="content.first_air_date">
      {{ content.first_air_date }} 부터
    </span>
      <span class="mt-3" v-if="content.last_air_date">
      {{ content.last_air_date }} 까지
    </span>
    </p>

    <hr style="margin-bottom:50px; margin-top: 30px" />
    <div style="width:800px;margin:0 auto">
      <p class="pd-3" style="margin-bottom: 60px; text-align: center">
        {{ content.overview }}
      </p>
      <img class="card-img-top" style="width: 500px; margin:0 auto 20px; display: block"
           :src="`https://image.tmdb.org/t/p/w500/${content.poster_path}`" alt="Card image cap">
    </div>
  </div>
</template>


<script setup>
defineProps({
  content: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>

</style>