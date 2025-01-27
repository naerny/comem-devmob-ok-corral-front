import { ref, computed, watchEffect } from 'vue';
import { userToken } from '@/utils/localStorage.js';

const token = ref(null);

watchEffect(() => {
  token.value = userToken.getUserToken();
});

const isLoggedIn = computed(() => token.value);

const setToken = (newToken) => {
  token.value = newToken;
  if (newToken) {
    userToken.setUserToken(newToken);    
  } else {
    userToken.removeUserToken();
  }
};

export const useLogInStore = () => {
  return {
    token,
    isLoggedIn,
    setToken,
  };
};