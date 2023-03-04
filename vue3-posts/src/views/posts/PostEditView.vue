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

    <AppAlert
      :show="showAlert"
      :message="alertMessage"
      :type="alertType"
    ></AppAlert>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getPostById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import AppAlert from '@/components/AppAlert.vue';

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
    vAlert('수정이 완료되었습니다.', 'success');
    // router.push({name: "PostDetail", params: {id}});
  } catch (error) {
    vAlert('네트워크 오류');
    console.log(error);
  }
};

fetchPost();

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');

// Alert은 이미 쓰는 네이밍이니까
const vAlert = (message, type = 'error') => {
  showAlert.value = true;
  alertMessage.value = message;
  alertType.value = type;
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
</script>

<style scoped></style>
