import ReactNativeBiometrics from 'react-native-biometrics'
import AsyncStorageService from './storage-service';


export const IsBiometryAvailable = async () => {
    var biometricType = null;

    let resultObject = await ReactNativeBiometrics.isSensorAvailable()
    const { available, biometryType } = resultObject;

    if (available && biometryType === ReactNativeBiometrics.TouchID) {
        biometricType = 'TouchID';
        // console.log('TouchID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
        biometricType = 'FaceID';
        // console.log('FaceID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
        biometricType = 'Biometrics';
        // console.log('Biometrics is supported')
    } else {
        biometricType = null;
        // alert('Biometrics not supported')
    }
    return biometricType;
}

export const generateKeys = async () => {
    try {
        const { publicKey } = await ReactNativeBiometrics.createKeys();
        return publicKey;
    } catch (error) {
        console.log(error)
    }
}

export const generateSignature = async () => {
    let userId = await AsyncStorageService.getString('@userId')
    let payload = userId;

    try {
        const resultObject = await ReactNativeBiometrics.createSignature({
            promptMessage: 'Sign in',
            payload: payload,
            cancelButtonText: 'Cancel'
        })
        const { success, signature, error } = resultObject;

        if (success) {
            return { signature, userId };
            // verifySignatureWithServer(signature, payload)
        }
    } catch (error) {
        alert(error);
        // console.log('error', error)
    }
}