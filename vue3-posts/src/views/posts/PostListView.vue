<template>
  <div>
    <h2>게시글 목록</h2>

    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
      @update:limit="changeLimit"
    ></PostFilter>

    <hr class="my-4" />

    <AppLoading v-if="loading" />
    <AppError v-else-if="error" :message="error.message" />
    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">No Results</p>
    </template>
    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :created-at="item.createdAt"
            @click="goPage(item.id)"
            @modal="openModal(item)"
            @preview="selectPreview(item.id)"
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

    <template v-if="previewId">
      <div class="my-4"></div>
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
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
const previewId = ref(null);
const selectPreview = id => {
  previewId.value = id;
};
const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: '',
});
const changeLimit = value => {
  params.value._limit = value;
  params.value._page = 1;
};
// data => posts로 할당
const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { params });

const isExist = computed(() => posts.valueOf() && posts.value.length > 0);
// pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);
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
