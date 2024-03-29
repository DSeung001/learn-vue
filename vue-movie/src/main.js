import { createApp } from "vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/scss/common.scss';
import '@/assets/scss/star-rating.scss';

import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import dayjs from '@/plugins/dayjs';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(dayjs);
app.mount("#app");
