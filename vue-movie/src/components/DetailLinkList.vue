<template>
  <div v-if="list">
    <slot></slot>
    <ul>
      <li v-for="item in list" :key="item.id" style="display: inline-block">
        <a @click.prevent="$emit('goDetail',item.id)" style="cursor:pointer" href="#">
          {{ item.title === undefined ? item.name : item.title }}
        </a>
        <span style="margin-right: 10px">
          ,
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>

defineProps({
  list: {
    type: Object,
    required: true,
  },
  media: {
    type: String,
    required: true
  }
});

defineEmits(['goDetail']);

</script>

<style scoped>

</style>