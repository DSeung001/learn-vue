import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

/*
 *
 * VueUse 사이트 또는 Vue use axios 키워드로 검색하면 다양한 자료들이 나옴\
 * hook 폴더에 넣었지만 Composables 임
 *
 * Composables 처리는 Ref를 주로 쓰나 Ref 아닐 때도 처리하기 위해 unref 사용을 추천
 * vue에서는 구조분해로 재할당이 가능한 ref 사용을 권장
 * */

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: 'get',
};

const defaultOptions = {
  immediate: true,
};

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null);
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const { onSuccess, onError, immediate } = {
    ...defaultOptions,
    ...options,
  };

  const { params } = config;
  const execute = body => {
    data.value = null;
    error.value = null;
    loading.value = true;
    axios(url, {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {},
    })
      .then(res => {
        response.value = res;
        data.value = res.data;
        if (onSuccess) {
          onSuccess(res);
        }
      })
      .catch(err => {
        error.value = err;
        if (onError) {
          onError(err);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  if (isRef(params)) {
    watchEffect(execute);
  } else {
    if (immediate) {
      execute();
    }
  }

  return {
    data,
    error,
    loading,
    response,
    execute,
  };
};
