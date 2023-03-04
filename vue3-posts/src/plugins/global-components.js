import AppAlert from '@/components/app/AppAlert.vue';
import AppCard from '@/components/app/AppCard.vue';
import AppGrid from '@/components/app/AppGrid.vue';
import AppList from '@/components/app/AppList.vue';
import AppModal from '@/components/app/AppModal.vue';
import AppPagination from '@/components/app/AppPagination.vue';

// App prefix 들은 전부 전체에서 사용 가능하게
export default {
  install(app) {
    app.component('AppAlert', AppAlert);
    app.component('AppCard', AppCard);
    app.component('AppGrid', AppGrid);
    app.component('AppList', AppList);
    app.component('AppModal', AppModal);
    app.component('AppPagination', AppPagination);
  },
};
