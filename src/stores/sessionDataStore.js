import { reactive, watch } from "vue";

const storeSessionData = reactive({
    session_id: '1234',
});


watch(() => storeSessionData, (newValue, oldValue) => {
    console.log('Changes detected in storeSessionData');
    console.log('New value:', newValue);
    console.log('Old value:', oldValue);
  }, { deep: true });


export default storeSessionData;