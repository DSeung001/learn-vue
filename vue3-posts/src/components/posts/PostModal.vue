<template>
  <AppModal v-model="show" title="게시글">
    <template #default>
      <div class="row g-3">
        <div class="col-3">제목</div>
        <div class="col-9">{{ title }}</div>
        <div class="col-3">내용</div>
        <div class="col-9">{{ content }}</div>
        <div class="col-3">등록일</div>
        <div class="col-9">{{ createdAt }}</div>
      </div>
    </template>

    <template #actions>
      <button type="button" class="btn btn-secondary" @click="closeModal">
        닫기
      </button>
    </template>
  </AppModal>
</template>

<script setup>
import AppModal from '@/components/AppModal.vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  content: String,
  createdAt: [String, Number],
});

const emit = defineEmits(['update:modelValue']);

// computed는 그냥 쓰면 읽기지만 get/set로 확장 가능
const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log(value);
    emit('update:modelValue', value);
  },
});

const closeModal = () => {
  show.value = false;
};
</script>

<style scoped></style>
