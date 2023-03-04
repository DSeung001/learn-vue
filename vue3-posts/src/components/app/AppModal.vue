<template>
  <Transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show"></div>

      <!-- Modal -->
      <div
        class="modal fade show d-block"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                <button
                  type="button"
                  class="btn-close"
                  @click="$emit('update:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body">
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: String,
});

defineEmits(['close', 'update:modelValue']);
</script>

<style scoped>
/* 트랜지션의 기본이 v-이고, 이름이 있으면 이름- 으로 대체*/
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
