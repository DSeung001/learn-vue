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
    <!--    템플릿에서 전역 접근-->
    <h2>{{ $person.name }}</h2>
    <button class="btn btn-primary" @click="person.say">click person</button>
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
import { inject, ref } from 'vue';
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
// inject 또는 import로 가져올 수 있음
// import person from '@/plugins/person';

const router = useRouter();
const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};

const items = ref(['사과', '딸기', '포도']);

const person = inject('person');
console.log('person.name', person.name);
</script>

<style scoped></style>
