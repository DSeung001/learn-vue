<template>
  <div class="row g-4">
    <div :class="colClass"
         v-for="(item, index ) in items"
         :key="index"
         style="cursor: pointer"
    >
      <slot :index="index" :item="item"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  colClass: {
    type: String,
    default: 'col-12 col-md-6 col-lg-3',
  },
});
</script>

<style scoped>

</style>