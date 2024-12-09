import { reactive, watch } from "vue";

export const storeWs = reactive({
    orientation: {
        alpha: 0,
        beta: 0,
        gamma: 0
    },
});

watch(() => storeWs, (newValue, oldValue) => {
    console.log('Changes detected in storeWs');
    // console.log('New value:', newValue);
    console.log('updated value:', oldValue);
  }, { deep: true });
