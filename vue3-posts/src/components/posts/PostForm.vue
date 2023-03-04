<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>

      <!--      v-focus 사용 가능
       기존 autofocus와 다르게 동적으로 사용 가능
       -->
      <input
        v-focus
        v-color="'blue'"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        type="text"
        class="form-control"
        id="title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        :value="content"
        @input="$emit('update:content', $event.target.value)"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
    </div>

    <div class="d-flex gap-2 mt-4">
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<script setup>
// v로 시작하면 커스텀 디렉티브로 인식
const vFocus = {
  mounted: el => {
    el.focus();
  },
};
defineProps({
  title: String,
  content: String,
});

defineEmits(['update:title', 'update:content']);
</script>

<style scoped></style>
