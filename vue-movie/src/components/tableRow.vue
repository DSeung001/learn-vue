<template>
  <tr>
    <td>
      {{ review.id }}
    </td>
    <td>
      {{ review.type }}
    </td>
    <td>
      <input :value="review.media_id"/>
    </td>
    <td>
      <input :value="review.author"/>
    </td>
    <td>
      <input :value="review.content"/>
    </td>
    <td>
      {{ review.created_at }}
    </td>
  </tr>
</template>

<script setup>
defineProps({
  review: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

</style>