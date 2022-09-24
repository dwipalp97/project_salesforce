import Toast from 'react-native-simple-toast';


export const showShortToast = (msg) => {
    Toast.show(msg);
}

export const showLongToast = (msg) => {
    Toast.show(msg, Toast.LONG);
}