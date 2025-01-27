import { ref } from 'vue';

const countdown = ref(3);
const countdownOver = ref(false);

const startCountdown = () => {
    const interval = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--;
      } else {
        // countdownDisplay.value = 'BANG BANG!';
        countdownOver.value = true;
        clearInterval(interval);
      }
    }, 1000);
  };

  export { countdownOver, countdown, startCountdown };