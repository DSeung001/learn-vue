import { createApp } from "vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/scss/common.scss';
import '@/assets/scss/star-rating.scss';

import App from "./App.vue";
import router from "@/router";

const app = createApp(App);

app.use(router);
app.mount("#app");
