import Toast from "react-native-root-toast";

export const onSucess = (msg) => {
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    backgroundColor: "green",
    opacity:1
  });
};

export const onError = (msg) => {
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    backgroundColor: "red",
    opacity:1
  });
};

 
