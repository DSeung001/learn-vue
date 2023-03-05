<template>
  <div>
    <h2>Home View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>

    <hr class="my-4" />

    <AppGrid v-slot="{ item }" :items="items" col-class="col-6">
      <AppCard>
        {{ item }}
      </AppCard>
    </AppGrid>

    <hr class="my-4" />

    <h2>
      {{ position }}
      {{ x }}
      {{ y }}
    </h2>
  </div>
</template>

<script>
export default {
  // created hook 에 사용
  created() {
    // console.log(this.$person);
    // this.$person.say();
  },
};
</script>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, toRef, toRefs } from 'vue';
// inject 또는 import로 가져올 수 있음
// import person from '@/plugins/person';

const router = useRouter();
const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};

const items = ref(['사과', '딸기', '포도']);

// const person = inject('person');
// console.log('person.name', person.name);

const position = reactive({
  x: 100,
  y: 1000,
});
// Q x의 값을 반응형을 잃지 않고 뽑기 => 동기화를 유지한채 뽑아내기
/*const x = toRef(position, 'x');
const y = toRef(position, 'y');*/
const { x, y } = toRefs(position);
</script>

<style scoped></style>
