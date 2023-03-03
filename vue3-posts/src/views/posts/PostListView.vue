<template>
  <div>
    <h2>게시글 목록</h2>

    <hr class="my-4">

    <div class="row g-4">

      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
        ></PostItem>
      </div>
    </div>

    <div class="my-4"></div>
    <AppCard>
      <PostDetailView :id="1"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import AppCard from "@/components/AppCard.vue";
import { getPosts } from "@/api/posts";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const posts = ref([]);

const fetchPosts = async () => {
  // getPosts의 값은 Promise

  try {
    const { data } = await getPosts();
    // ({ data : posts.value } = await getPosts());
    posts.value = data;
  } catch (error) {
    console.log(error);
  }
};
fetchPosts();

const goPage = (id) => {
  // router.push("/posts/${id}");
  router.push({
    name: "PostDetail",
    params: {
      id
    }
    // query:{
    //   searchText : 'hello'
    // },
    // hash: '#world'
  });
};
</script>

<style scoped></style>
