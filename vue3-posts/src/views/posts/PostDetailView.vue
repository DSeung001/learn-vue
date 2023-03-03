<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>
      {{ post.content }}
    </p>
    <p class="text-muted">
      {{ post.createdAt }}
    </p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">
          이전글
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">
          다음글
        </button>
      </div>

      <div class="col-auto me-auto" />

      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">
          목록
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger" @click="remove">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { getPostById, deletePost } from "@/api/posts";
import { ref } from "vue";

const props = defineProps({
  id: [String, Number]
});

const router = useRouter();
// const id = route.params.id;

/*
* 객체 생성
* ref :
* - 한꺼번에 객체 할당이 가능
* - .value로 접근
* - 일관성 있게 개발이 가능, 기존 회사의 컨밴션을 따름
*
* reactive :
* - 한번에 하나 씩 할당
* - 객체할당 할 시 반응형 클래스가 아닌 Object로 됨
* - .value로 안하고 바로 접근ㄱ 가능
* */
const post = ref({
  title: null,
  content: null,
  createdAt: null
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id);
    setPost(data);
  } catch (error) {
    console.log(error);
  }
};

const setPost = ({ title, content, createdAt }) => {
  post.value.title = title;
  post.value.content = content;
  post.value.createdAt = createdAt;
};

fetchPost();
const remove = async () => {
  try {
    if (confirm("삭제하시겠습니까?") == false) {
      return;
    }
    await deletePost(props.id);
    router.push({ name: "PostList" });
  } catch (error) {
    console.log(error);
  }
};
const goListPage = () => router.push({ name: "PostList" });
const goEditPage = () =>
  router.push({ name: "PostEdit", params: { id: props.id } });

</script>

<style scoped></style>
