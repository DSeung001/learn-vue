<template>
  <div>
    <h2>게시글 목록</h2>

    <PostFilter
        v-model:title="params.title_like"
        v-model:limit="params._limit"
    ></PostFilter>

    <hr class="my-4">

    <AppGridList :items="posts">
      <template v-slot="{item}">
        <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
        ></PostItem>
      </template>
    </AppGridList>

    <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => params._page = page"/>


    <template v-if="posts && posts.length > 0">
      <div class="my-4"></div>
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>

  </div>
</template>

<script setup>
import PostItem from "@/components/posts/PostItem.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import AppCard from "@/components/AppCard.vue";
import {getPosts} from "@/api/posts";
import {ref, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {computed} from "@vue/reactivity";
import AppPagination from "@/components/AppPagination.vue";
import AppGridList from "@/components/AppGridList.vue";
import PostFilter from "@/components/posts/PostFilter.vue";

const router = useRouter();
const posts = ref([]);
const params = ref({
  _sort: "createdAt",
  _order: "desc",
  _page: 1,
  _limit: 3,
  title_like: ""
});

// pagination
const totalCount = ref(0);
const pageCount = computed(() => Math.ceil(totalCount.value / params.value._limit));
console.log(pageCount);


const fetchPosts = async () => {
  // getPosts의 값은 Promise

  try {
    const {data, headers} = await getPosts(params.value);
    // ({ data : posts.value } = await getPosts());
    posts.value = data;
    totalCount.value = headers["x-total-count"];
  } catch (error) {
    console.log(error);
  }
};

// fetchPosts();
// watchEffect 안에 반응형 데이터가 콜백함수 호출함
// watch와 다르게 초기에 한번 실행 해줌
watchEffect(fetchPosts);

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
