import { Platform } from 'react-native'
import RNCallKeep from 'react-native-callkeep';
import * as RootNavigation from '../navigation/RootNavigation';
import AsyncStorageService from './storage-service';

export const setupCall = () => {
    const options = {
        ios: {
            appName: 'Dakters',
            supportsVideo: false,
            imageName: 'callkit-icon',
        },
        android: {
            alertTitle: 'Permissions Required',
            alertDescription: 'This application needs to access your phone calling accounts to make calls',
            cancelButton: 'Cancel',
            okButton: 'ok'
        },
    };

    RNCallKeep.setAvailable(true);
    RNCallKeep.setup(options);
    // RNCallKeep.backToForeground();
}

export const backToForeground = () => RNCallKeep.backToForeground();
export const checkConnectionService = () => RNCallKeep.setAvailable(true);
export const supportConnectionService = () => RNCallKeep.supportConnectionService();
export const disableMultipleCalls = () => RNCallKeep.canMakeMultipleCalls(false);
export const displayIncomingCall = (uuid, handle, localizedCallerName) => RNCallKeep.displayIncomingCall(uuid, handle, localizedCallerName);
// export const answerIncomingCall = (uuid) => RNCallKeep.answerIncomingCall(uuid);
export const startCallIOS = (uuid, handle, contactIdentifier, handleType, hasVideo) => RNCallKeep.startCall(uuid, handle, contactIdentifier, handleType, hasVideo);
export const updateDisplay = (uuid, displayName, handle) => RNCallKeep.updateDisplay(uuid, displayName, handle);
export const rejectCall = (uuid) => RNCallKeep.rejectCall(uuid);
// export const reportEndCallWithUUID = (uuid, reason) => RNCallKeep.reportEndCallWithUUID(uuid, reason);


export const answerIncomingCall = (uuid) => RNCallKeep.answerIncomingCall(uuid);

const answerCall = (event) => {
    // RNCallKeep.endCall(event.callUUID)
    // console.log(event)
    if(Platform.OS == 'android'){
        // RNCallKeep.endCall(event.callUUID);
        RNCallKeep.backToForeground();
    }
    Platform.OS == 'ios' && AsyncStorageService.storeObject("@callUUID", event);
    RootNavigation.navigate('VideoCall');
};

const didLoadWithEvents = (events) => {
    if (events?.length) {
        events.map(x => {
            if (x.name == 'RNCallKeepDidDisplayIncomingCall') {
                Platform.OS == 'ios' && AsyncStorageService.storeObject("@callUUID", { callUUID: x.data.callUUID });
                // setTimeout(() => RootNavigation.navigate('VideoCall'), 2000);
                RootNavigation.navigate('VideoCall');
            }
        })
    }
}

export const endCall = (event) => {
    if (event.callUUID) RNCallKeep.endCall(event.callUUID);
    RNCallKeep.endAllCalls();

    // remove showCall Id
    Platform.OS == 'android' && AsyncStorageService.removeString("@showCall");
    // RootNavigation.navigate('GetStarted');
}

const startCall = ({ handle, localizedCallerName }) => {
    console.log('startCall')
    // Your normal start call action
    // RNCallKeep.startCall(this.getCurrentCallId(), handle, localizedCallerName);
};

const reportEndCallWithUUID = (callUUID, reason) => {
    console.log('reportEndCallWithUUID')
    RNCallKeep.reportEndCallWithUUID(callUUID, reason);
}

// Event Listener Callbacks

const didReceiveStartCallAction = (data) => {
    console.log('didReceiveStartCallAction')
    let { handle, callUUID, name } = data;
    // Get this event after the system decides you can start a call
    // You can now start a call from within your app
};

// Currently iOS only
const onIncomingCallDisplayed = (data) => {
    console.log('onIncomingCallDisplayed')
    let { error } = data;
    // You will get this event after RNCallKeep finishes showing incoming call UI
    // You can check if there was an error while displaying
};

const onToggleMute = (data) => {
    console.log('onToggleMute')
    let { muted, callUUID } = data;
    // Called when the system or user mutes a call
};

const onToggleHold = (data) => {
    console.log('onToggleHold')
    let { hold, callUUID } = data;
    // Called when the system or user holds a call
};

const onDTMFAction = (data) => {
    console.log('onDTMFAction')
    let { digits, callUUID } = data;
    // Called when the system or user performs a DTMF action
};

const audioSessionActivated = (data) => {
    console.log('audioSessionActivated')
    // you might want to do following things when receiving this event:
    // - Start playing ringback if it is an outgoing call
};

export const registerCallKeep = () => {
    RNCallKeep.addEventListener('answerCall', answerCall);
    RNCallKeep.addEventListener('endCall', endCall);
    // RNCallKeep.addEventListener('didReceiveStartCallAction', didReceiveStartCallAction);
    // RNCallKeep.addEventListener('didDisplayIncomingCall', onIncomingCallDisplayed);
    // RNCallKeep.addEventListener('didPerformSetMutedCallAction', onToggleMute);
    // RNCallKeep.addEventListener('didToggleHoldCallAction', onToggleHold);
    // RNCallKeep.addEventListener('didPerformDTMFAction', onDTMFAction);
    // RNCallKeep.addEventListener('didActivateAudioSession', audioSessionActivated);
    RNCallKeep.addEventListener('didLoadWithEvents', didLoadWithEvents);
}


export const unregisterCallKeep = () => {
    // RNCallKeep.endAllCalls();
    // RNCallKeep.setAvailable(false);

    RNCallKeep.removeEventListener('answerCall', answerCall);
    RNCallKeep.removeEventListener('endCall', endCall);
    // RNCallKeep.removeEventListener('didPerformSetMutedCallAction');
    // RNCallKeep.removeEventListener('didToggleHoldCallAction');
    // RNCallKeep.removeEventListener('didPerformDTMFAction');

    return false;
};