<template>
  <div>
    <h2>게시글 목록</h2>

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    ></PostFilter>

    <hr class="my-4" />

    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />
    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>

    <template v-if="posts && posts.length > 0">
      <div class="my-4"></div>
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import AppError from '@/components/app/AppError.vue';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
});

// data => posts로 할당
const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { params });

// pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

/*const fetchPosts = async () => {
  // getPosts의 값은 Promise
  try {
    loading.value = true;
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    totalCount.value = headers['x-total-count'];
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};
// fetchPosts();
// watchEffect 안에 반응형 데이터가 콜백함수 호출함
// watch와 다르게 초기에 한번 실행 해줌
watchEffect(fetchPosts);
*/

const goPage = id => {
  // router.push("/posts/${id}");
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
  show.value = true;
};
</script>

<style scoped></style>
