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
      <p v-if="isError.author" class="error">Error</p>
    </td>
    <td>
      <textarea :value="review.content" @blur="dataUpdate('content', $event.target.value)" />
      <p v-if="isError.content" class="error">Error</p>
    </td>
    <td>
      {{ review.created_at }}
    </td>
  </tr>
</template>

<script setup>
import { setReviewWhereId } from '@/api/local/reviews'
import { ref } from 'vue'

const isError = ref({
  author: false,
  content: false
})

const props = defineProps({
  review: {
    type: Object,
    required: true
  }
})

const dataUpdate = async (type, value) => {
  props.review[type] = value
  if (isValidation(type, value)) {
    let content = {}
    content[type] = value
    isError.value[type] = false
    await setReviewWhereId(props.review.id, content)
  } else {
    isError.value[type] = true
  }
}

const isValidation = (type, value) => {
  switch (type) {
    case 'author':
      const reg = /[\{\}\[\]\/?.,;|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
      return !reg.test(value)
    case 'content':
      return value.length < 200
  }
  return true
}
</script>

<style scoped>
.error {
  color: red;
  margin: 0px;
}
</style>
