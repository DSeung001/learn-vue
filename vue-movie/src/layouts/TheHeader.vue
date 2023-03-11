<template>
  <header>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Movie</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <RouterLink
                to="/"
                active-class="active"
                class="nav-link"
              >
                상영작
              </RouterLink>
            </li>

          </ul>
        </div>

        간략화 <input type="checkbox" checked data-toggle="toggle" data-size="sm">
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>
