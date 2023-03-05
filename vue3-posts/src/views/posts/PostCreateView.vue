<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />

    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button type="button" class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>

    <AppAlert :items="alerts"></AppAlert>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import AppAlert from '@/components/app/AppAlert.vue';
import { useAlert } from '@/composables/alert';

const { vSuccess } = useAlert();
const router = useRouter();
const form = ref({
  title: null,
  content: null,
});

const save = () => {
  try {
    createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    router.push({ name: 'PostList' });
    vSuccess('등록이 완료되었습니다');
  } catch (error) {
    vSuccess(error.message);
    console.log(error);
  }
};

const goListPage = () => router.push({ name: 'PostList' });
const visibleForm = ref(true);
</script>

<style scoped></style>
