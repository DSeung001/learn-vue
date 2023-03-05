<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />

    <AppError v-if="error" :message="error.message" />
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
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </template>
          <template v-else> 저장</template>
        </button>
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
import AppError from '@/components/app/AppError.vue';

const { vSuccess } = useAlert();
const router = useRouter();
const error = ref(null);
const loading = ref(false);
const form = ref({
  title: null,
  content: null,
});

const save = async () => {
  try {
    loading.value = true;
    await createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    router.push({ name: 'PostList' });
    vSuccess('등록이 완료되었습니다');
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const goListPage = () => router.push({ name: 'PostList' });
const visibleForm = ref(true);
</script>

<style scoped></style>
