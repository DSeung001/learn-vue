import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import funcPlugins from '@/plugins/func';
import objPlugins from '@/plugins/obj';

const app = createApp(App);
app.use(router);
app.use(funcPlugins);
app.use(objPlugins, { name: '짐코딩' });
app.use(person, { name: '홍길동' });
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
import person from '@/plugins/person';

/*
console.log("MODE : ", import.meta.env.MODE)
console.log("BASE_URL : ", import.meta.env.BASE_URL)
console.log("PROUD : ", import.meta.env.PROUD)
console.log("DEV : ", import.meta.env.DEV)
// VITE를 Prefix로 붙여야지만 접근이 가능, 이것도 envPrefix 옵션 수정으로 바꿀 수 있음
console.log("VITE_APP_API_URL : ", import.meta.env.VITE_APP_API_URL)*/
