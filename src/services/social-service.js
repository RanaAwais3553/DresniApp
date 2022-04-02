import { GoogleSignin } from '@react-native-community/google-signin';

export const _configureGoogle = async () => {
    try {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '760381664621-2vu3lqu6pen19biog90dfg9g5rtbtkn6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    } catch (error) {
        console.log(error)
    }
}