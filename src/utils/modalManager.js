import { ref, reactive } from 'vue';

const message = ref('Howdy, partner!');
message.value = 'Howdy, partner!';

const showModal = (content) => {
  message.value = content;
  return content;
};

export {
  //   state,
  showModal,
  message

};