<template>
  <tr>
    <td>
      {{ review.id }}
    </td>
    <td>
      {{ review.type }}
    </td>
    <td>
      {{ review.media_id }}
    </td>
    <td>
      <input :value="review.author" @blur="dataUpdate('author', $event.target.value)" />
    </td>
    <td>
      <input :value="review.content" @blur="dataUpdate('content', $event.target.value)" />
    </td>
    <td>
      {{ review.created_at }}
    </td>
  </tr>
</template>

<script setup>
import { setReviewWhereId } from '@/api/local/reviews'

const props = defineProps({
  review: {
    type: Object,
    required: true
  }
})

const dataUpdate = async (type, value) => {
  let content = {}
  content[type] = value
  await setReviewWhereId(props.review.id, content)
}
</script>

<style scoped></style>
