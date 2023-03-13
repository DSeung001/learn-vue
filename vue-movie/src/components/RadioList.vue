<template>
  <div v-if="list.size > 0" style="margin-bottom: 10px">
    <div
        v-for="[key, value] in list"
        :key="key"
        class="form-check" style="display: inline-block"
    >

      <input
        @click="$emit('setRadio', key)"
          class="form-check-input" type="radio" :name="name" :id="`${name}-${key}`" v-bind:checked="selected==key">
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
  selected: {
    type: String,
    required: true
  }
});


defineEmits(['setRadio']);
</script>

<style scoped>

</style>