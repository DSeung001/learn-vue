<template>
  <div class="app-alert">
    <TransitionGroup name="slide">
      <div
        v-for="({ message, type }, index) in items"
        :key="index"
        class="alert"
        :class="typeStyle(type)"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
defineProps({
  items: Array,
});

const typeStyle = type => (type === 'error' ? 'alert-danger' : 'alert-primary');
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}

/* 트랜지션의 기본이 v-이고, 이름이 있으면 이름- 으로 대체*/
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
