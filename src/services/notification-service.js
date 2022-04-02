import { Platform } from 'react-native'
import messaging from "@react-native-firebase/messaging";
import { alertPopup } from '../views/modals/popup-modal'
import AsyncStorageService from "./storage-service";
import * as RootNavigation from '../navigation/RootNavigation';
import RNCallKeep from 'react-native-callkeep';
import GLOBAL from '../utils/global.js'

const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        getFcmToken();
        refreshFcmToken();
    }
}

const refreshFcmToken = async () => {
    let fcmToken = await AsyncStorageService.getString('@fcmToken');

    messaging().onTokenRefresh(refreshFcmToken => {
        if (fcmToken != refreshFcmToken) {
            console.log('refreshFcmToken:', refreshFcmToken);
            AsyncStorageService.storeString('@fcmToken', refreshFcmToken);
        }
    });
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorageService.getString('@fcmToken');

    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
            // user has a refresh device token
            console.log('fcmToken:', fcmToken);
            AsyncStorageService.storeString('@fcmToken', fcmToken);
        } else {
            console.log("Failed", "No fcm token received");
        }
    }
}

const notificationSubscriber = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        const { data, notification } = remoteMessage;
        // const { route, callInfo, doctorData, patientData, appointmentData, message, notificationType } = data;

        // console.log(
        //     'Notification caused app to open from background state:',
        //     remoteMessage,
        // );
        RootNavigation.navigate(data.route, { data })
        // alertPopup(data)
    });

    messaging().onMessage(remoteMessage => {
        const { data, notification } = remoteMessage;
        // const { route, callInfo, doctorData, patientData, appointmentData, message, notificationType } = data;

        if (Platform.OS == 'android' && data?.route == "VideoCall") {
            AsyncStorageService.storeObject("@notificationPayload", data);
            const doctorData = (data && JSON.parse(data.doctorData));

            // display call
            RNCallKeep.displayIncomingCall('6baf8cee-21ba-4fb4-9379-33c1bfd21a05', '111111', doctorData?.name);
        } else if (data.message == 'isChatReceived') {
            GLOBAL.videoScr.setState({
                isChatReceived: true
            });
        } else {
            alertPopup(data)
        }
        // console.log(
        //     'onMessage handler:',
        //     remoteMessage,
        // );
    });

    // Check whether an initial notification is available
    messaging().getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                const { data, notification } = remoteMessage;
                // const { route, callInfo, doctorData, patientData, appointmentData, message, notificationType } = data;

                alertPopup(data)
                // console.log(
                //     'Notification caused app to open from quit state:',
                //     remoteMessage,
                // );
                // RootNavigation.navigate(data.route, { data })
            }
        });
}

export { requestUserPermission, notificationSubscriber };