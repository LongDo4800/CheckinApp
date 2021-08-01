import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import mushroom, { DEVICE_NOTIFICATION_SERVICE_ENUM } from "../Api/siten-assistant.api";
export let requestPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'ios') return true
    const status = await messaging().requestPermission();
    console.log(status, 'status');

    return status === messaging.AuthorizationStatus.AUTHORIZED
}

export let saveFirebaseToken = async (): Promise<void> => {
    try {
        if (Platform.OS === 'ios' && messaging().registerDeviceForRemoteMessages) {
            let register = await messaging().registerDeviceForRemoteMessages();
        }
        console.log('begin get firebase token');
        let token = await messaging().getToken();
        console.log(token, 'token');
        let response = await mushroom.device.createAsync({
            notification: {
                service: DEVICE_NOTIFICATION_SERVICE_ENUM.FIREBASE,
                token: token
            }
        });
        
    } catch (error) {
        console.log(error, 'error');
    }
}