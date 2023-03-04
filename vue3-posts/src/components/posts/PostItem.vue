<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="test-muted">
      {{ createdAt }}
    </p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn px-1" @click.stop="$emit('modal')">
          <i class="bi bi-airplane-engines-fill"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import AppCard from '@/components/AppCard.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: [String, Date, Number],
  },
});

defineEmits(['modal']);
</script>

<style scoped></style>
