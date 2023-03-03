import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js';

createApp(App).use(router).mount('#app');
import 'bootstrap/dist/js/bootstrap.js';

console.log("MODE : ", import.meta.env.MODE)
console.log("BASE_URL : ", import.meta.env.BASE_URL)
console.log("PROUD : ", import.meta.env.PROUD)
console.log("DEV : ", import.meta.env.DEV)
// VITE를 Prefix로 붙여야지만 접근이 가능, 이것도 envPrefix 옵션 수정으로 바꿀 수 있음
console.log("VITE_APP_API_URL : ", import.meta.env.VITE_APP_API_URL)