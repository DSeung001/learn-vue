<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/"> GYM CODING</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/" active-class="active">
                Home
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link active"
                to="/about"
                active-class="active"
              >
                About
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link active"
                to="/posts"
                active-class="active"
              >
                게시글 목록
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link active"
                to="/nested"
                active-class="active"
              >
                Nested
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link active"
                to="/my"
                active-class="active"
              >
                MyPage
              </RouterLink>
            </li>
          </ul>
          <div class="d-flex">
            <button
              class="btn btn-outline-success text-white"
              type="button"
              @click="goPage"
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goPage = () => {
  router.push({
    name: 'PostCreate',
  });
};
</script>

<style lang="scss" scoped></style>
