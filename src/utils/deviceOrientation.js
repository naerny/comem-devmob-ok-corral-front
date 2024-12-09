import { ref } from "vue";

// export const getDeviceOrientation = async () => {

//     const orientation = ref({ alpha: 0, beta: 4, gamma: 0 });

//     const event = new Event("deviceorientation");
//     orientation.value.alpha = event.alpha;
//     orientation.value.beta = event.beta;
//     orientation.value.gamma = event.gamma;




//     return orientation.value;
// }


export const getDeviceOrientation = () => {
  return new Promise((resolve) => {
    const handleOrientationEvent = (event) => {
      const orientation = {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      };
      resolve(orientation);
      window.removeEventListener("deviceorientation", handleOrientationEvent);
    };

    window.addEventListener("deviceorientation", handleOrientationEvent);
  });
};

export const fetchOrientation = async () => {
  const orientation = ref(null);
  const result = await getDeviceOrientation();
  orientation.value = result;
  return result;
};