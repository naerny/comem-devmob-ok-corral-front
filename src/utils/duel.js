import { getOrientation, fetchOrientation } from "./orientation";

const setStartOrientation = () => {
  fetchOrientation().then((result) => {
    ws.send('{ "orientation": ' + JSON.stringify(result) + "}");
  });
};
