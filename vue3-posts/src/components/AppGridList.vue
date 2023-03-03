<template>
  <div class="row g-4">
    <div v-for="(item, index) in items" :key="index" :class="colClass">
      <slot :index="index" :item="item"></slot>
    </div>
  </div>
</template>

<script setup>
// Props 설정을 해주지 않은건 None props로 자동 루트 태그에 적용 => div_
defineProps({
  items: {
    type: Array,
    required: true,
  },
  colClass: {
    type: String,
    default: 'col-4',
  },
});
</script>

<style scoped></style>