<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="edit"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="goDetailPage"
        >
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>

    <!--    <AppAlert
      :show="showAlert"
      :message="alertMessage"
      :type="alertType"
    ></AppAlert>-->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getPostById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
  title: null,
  content: null,
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    console.log(data);
    setForm(data);
  } catch (error) {
    console.log(error);
  }
};

const setForm = ({ title, content }) => {
  form.value.title = title;
  form.value.content = content;
};

const edit = async () => {
  try {
    await updatePost(id, { ...form.value });
    vSuccess('수정이 완료되었습니다.');
    router.push({ name: 'PostDetail', params: { id } });
  } catch (error) {
    vAlert(error.message);
    console.log(error);
  }
};

fetchPost();

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style scoped></style>
