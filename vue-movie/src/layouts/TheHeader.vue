<template>
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <RouterLink to="/home" active-class="active" class="nav-link"> 메인</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/movie" active-class="active" class="nav-link"> 상영작</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/topRate" active-class="active" class="nav-link"> 인기작</RouterLink>
            </li>

            <li>
              <RouterLink to="/recommend" active-class="active" class="nav-link">
                추천작
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/reviews" active-class="active" class="nav-link"> 리뷰들</RouterLink>
            </li>
          </ul>
        </div>

        <div class="mx-3">
          간략화
          <input
            v-model="newSimply"
            type="checkbox"
            checked
            data-toggle="toggle"
            data-size="sm"
            @input="updateSimply()"
          />
        </div>

        <ul class="navbar-nav mr-auto">
          <li>
            <RouterLink to="/login" active-class="active" class="nav-link"> Sign in</RouterLink>
          </li>
          <li>
            <span class="nav-link"> / </span>
          </li>
          <li>
            <RouterLink to="/join" active-class="active" class="nav-link"> Sign up</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useSimplificationStore } from '@/stores/simplification'
import { ref } from 'vue'

const simplificationStore = useSimplificationStore()
const newSimply = ref(false)

const updateSimply = () => {
  simplificationStore.setSimply(!newSimply.value)
}
</script>

<style lang="scss" scoped></style>
