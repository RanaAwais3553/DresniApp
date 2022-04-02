import { Platform, Linking } from 'react-native'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import * as RootNavigation from '../navigation/RootNavigation';
import { parseParams } from '../utils/text-formatter';
import AsyncStorageService from './storage-service';


export async function buildLink(page, doctorId) {
    const link = await dynamicLinks().buildShortLink({
        link: `https://dakters.page.link?page=${page}&doctorId=${doctorId}`,
        // domainUriPrefix is created in your Firebase console
        domainUriPrefix: 'https://dakters.page.link',
        ios: {
            bundleId: 'com.dakters.patient',
            appStoreId: '1492303341',
            fallbackUrl: 'https://apps.apple.com/us/app/tabeeby/id1492303341',
        },
        android: {
            packageName: 'com.dakters.patient',
            fallbackUrl: 'https://play.google.com/store/apps/details?id=com.dakters.patient&hl=en&gl=US',
        },
        navigation: {
            forcedRedirectEnabled: true,
        }
    });

    return link;
}

const handleDynamicLink = async link => {
    if (link.url) {
        let paramsUrl = link.url.substring(link.url?.indexOf('?') + 1);
        let params = parseParams(paramsUrl.split('&'));

        if (params?.page == 'doctorprofile') {
            const currentPatient = await AsyncStorageService.getObject("@currentPatient");

            if(currentPatient) {
                RootNavigation.navigate('ViewDoctor', { doctorId: params?.doctorId });
            } else {
                AsyncStorageService.storeObject("@dynamicLink", { page: 'ViewDoctor', doctorId: params?.doctorId });
            }
        }
    }
}

export const dynamicLinksListeners = async () => {
    // on foreground listener 
    dynamicLinks().onLink(handleDynamicLink);

    // on background listener
    if (Platform.OS == 'android') {
        dynamicLinks()
            .getInitialLink()
            .then(handleDynamicLink);
    }

    if (Platform.OS == 'ios') {
        Linking.getInitialURL()
            .then(res => {
                if(res){
                    dynamicLinks()
                        .resolveLink(res)
                        .then(handleDynamicLink)
                }
            })
    }
}