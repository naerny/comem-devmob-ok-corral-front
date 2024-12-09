import { reactive, watch } from "vue";

const storePlayer1 = reactive({    
    name: 'John',
        orientation_start: {
            alpha: 0,
            beta: 0,
            gamma: 0
        },
        orientation_end: {
            alpha: 0,
            beta: 0,
            gamma: 0
        }
});

const storePlayer2 = reactive({    
    name: 'John',
    orientation_start: {
        alpha: 0,
        beta: 0,
        gamma: 0
    },
    orientation_end: {
        alpha: 0,
        beta: 0,
        gamma: 0
    }
});


watch(() => storePlayer1, (newValue, oldValue) => {
    console.log('Changes detected in storePlayer2');
    console.log('New value:', newValue);    
  }, { deep: true });

  watch(() => storePlayer2, (newValue, oldValue) => {
    console.log('Changes detected in storePlayer2');
    console.log('New value:', newValue);    
  }, { deep: true });


export default {storePlayer1, storePlayer2};