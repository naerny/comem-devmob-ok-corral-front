<template>
    <div v-if="isVisible" class="modal">
        <div class="modal__content">
            <p>{{ message }}</p>
            <div class="modal__progressBar"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true,
        default: 'Welcome'
    },
    duration: {
        type: Number,
        default: 5000 // Default duration is 3 seconds
    }
});

const progressBarAnim = () => {
   for (let i = 100; i > 0; i--) {
       setTimeout(() => {
           document.querySelector('.modal__progressBar').style.width = `${i}%`;           
       }, i*props.duration/100);       
   }   
};

// Watch for changes in the message prop
watch(() => props.message, (newMessage) => {
    if (newMessage) {
        // showModal(newMessage, props.duration);
        props.message = newMessage;
        isVisible.value = true;
        progressBarAnim();        

        setTimeout(() => {
            isVisible.value = false;
        }, props.duration);
    }
});

const isVisible = ref(false);

// progressBarAnim();
// setTimeout(() => {
//     isVisible.value = false;   
// }, props.duration);
</script>

<style scoped lang="scss">
.modal {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: .5rem;

    @media(max-width: 768px) {
        width: calc(100% - 2rem);
    }

    &__content {
        position: relative;
        text-align: center;
        padding: 20px;
    }

    &__progressBar {
        position: absolute;
        top: 0;
        left: 0;
        height: 5px;
        width: 100%;
        background: var(--orange);
    }
}

@keyframes progressBarAnimation {
    from {
        width: 100%;
    }

    to {
        width: 0%;
    }
}
</style>