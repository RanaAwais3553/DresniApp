import { Keyboard } from 'react-native'

export function keyboardListeners(showCallback, hideCallback) {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', showCallback);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', hideCallback);

    return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
    };
}