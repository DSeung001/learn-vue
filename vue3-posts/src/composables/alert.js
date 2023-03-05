// Composables는 use로 시작하는 게 관례
import { ref } from 'vue';
import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

/*
컴포저블은 이렇게 상태 관리 코드를 재사용할 수 있게하는 것을 의미함
* */

// 모듈 단위로 alerts을 올려서 전체에서 사용할 수 있게
// 실무에서는 상태 관리 모듈을 사용하지만 아직 안 배웠으니 사용안함

export function useAlert() {
  const { alerts } = storeToRefs(useAlertStore());
  const { vAlert, vSuccess } = useAlertStore();

  return {
    alerts,
    vAlert,
    vSuccess,
  };
}
