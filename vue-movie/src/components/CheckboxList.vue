<template>
  <div v-if="list.size > 0" style="margin-bottom: 10px">
    <div
        v-for="[key, value] in list"
        :key="key"
        class="form-check" style="display: inline-block"
    >

      <input
        @click="$emit('setCheckbox', key)"
          class="form-check-input" type="checkbox" :name="name" :id="`${name}-${key}`">
      <label class="form-check-label" :for="`${name}-${key}`" style="margin-right: 15px">
        {{ value }}
      </label>

    </div>
  </div>

</template>

<script setup>
defineProps({
  list: {
    type: Map,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});


defineEmits(['setCheckbox']);
</script>

<style scoped>

</style>