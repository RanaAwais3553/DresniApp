import VoipPushNotification from 'react-native-voip-push-notification';
import { AsyncStorageService } from './index';

export const registerVoip = () => {
    VoipPushNotification.requestPermissions(); // --- optional, you can use another library to request permissions
        // VoipPushNotification.registerVoipToken(); // --- required
      
        VoipPushNotification.addEventListener('register', (token) => {
          AsyncStorageService.storeString("@voipToken", token);
          // --- send token to your apn provider server
        });
    
        VoipPushNotification.addEventListener('localNotification', (notification) => {
          // console.log('hheeeeheeelllooooo')
          // --- when user click local push
        });
    
        VoipPushNotification.addEventListener('notification', (notification) => {
          // console.log(notification?._data?.items)
          AsyncStorageService.storeObject('@notificationPayload', notification?._data?.items);
          // --- when receive remote voip push, register your VoIP client, show local notification ... etc
          //this.doRegisterOrSomething();
          // const _uuid = uuid.v4();
          // RNCallKeep.displayIncomingCall(_uuid, '2134124', 'Amin shah');
          // console.log(notification)
          
           // --- This  is a boolean constant exported by this module
           // --- you can use this constant to distinguish the app is launched by VoIP push notification or not
           if (VoipPushNotification.wakeupByPush) {
            // console.log('nottttttinnnnn2')
            AsyncStorageService.storeString('@voip_background', 'receive');
             // this.doSomething()
    
             // --- remember to set this static variable back to false
             // --- since the constant are exported only at initialization time, and it will keep the same in the whole app
             VoipPushNotification.wakeupByPush = false;
           }
    
    
           // --- optionally, if you `addCompletionHandler` from the native side, once you have done the js jobs to initiate a call, call `completion()`
          //  VoipPushNotification.onVoipNotificationCompleted(notification.getData().uuid);
    
    
          /**
           * Local Notification Payload
           *
           * - `alertBody` : The message displayed in the notification alert.
           * - `alertAction` : The "action" displayed beneath an actionable notification. Defaults to "view";
           * - `soundName` : The sound played when the notification is fired (optional).
           * - `category`  : The category of this notification, required for actionable notifications (optional).
           * - `userInfo`  : An optional object containing additional notification data.
           */

          // VoipPushNotification.presentLocalNotification({
          //     alertBody: notification.getMessage()
          // });
        });    
}