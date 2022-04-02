import { Alert, PermissionsAndroid, } from 'react-native';


export const permissionForWriteFile = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: "message...",
            message:
                "message...",
            buttonNeutral: "message..",
            buttonNegative: "No",
            buttonPositive: "Yes"
        }
    );

    return granted;
}