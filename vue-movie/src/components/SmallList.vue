<template>
  <div v-for="(item, index) in list"
       :key="index"
       :class="colClass"
       class="card bg-dark text-white"
       style="display: inline-block;cursor: pointer;"
       @click="$emit('goDetail',item.id, (item.media_type === undefined ? null : item.media_type))"
  >
    <img class="card-img" :src="`https://image.tmdb.org/t/p/w220_and_h330_face/${item.poster_path}`" alt="Card image">
    <div class="card-img-overlay">
      <p class="card-title p-1 " style="background-color: rgba(68,68,68,0.9)">
        {{ item.title !== undefined ? item.title : item.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  colClass : {
    type: String,
    required : false
  }
})

console.log(props.colClass);

defineEmits(['goDetail']);
</script>

<style scoped>

</style>