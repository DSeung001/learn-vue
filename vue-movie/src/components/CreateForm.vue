<template>
  <div class="mb-5">
    <h5>
      리뷰쓰기
    </h5>

    <form>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">
          제목
        </span>
        </div>
        <input :value="author"
               @input="$emit('update:author', $event.target.value)"
                type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">내용</label>
        <textarea
            :value="content"
            @input="$emit('update:content', $event.target.value)"
            class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button @click.prevent="$emit('save')">
          저장
      </button>
    </form>
  </div>

</template>

<script setup>
defineProps({
  author: String,
  content: String,
});

defineEmits(['save', 'update:author', 'update:content'])
</script>

<style scoped>

</style>