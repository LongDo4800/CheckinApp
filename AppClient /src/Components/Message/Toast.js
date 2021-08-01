import { showMessage, hideMessage } from "react-native-flash-message";
const ShowMessage = (text, type, time, position) => {
    showMessage({
        message: text,
        type: type,
        duration: time ?? 3000,
        position: position ?? 'top',
        textStyle: {fontSize: 100 },
        
    });
}
const HideMessage = () => {
    hideMessage();
}

export { ShowMessage, HideMessage };