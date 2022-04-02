// import firebase from 'react-native-firebase'
// import { AppEventsLogger } from 'react-native-fbsdk'
// import appsFlyer from 'react-native-appsflyer';

// const FirebaseLogEvent = (eventName, eventParams) => {
//     try {
//         firebase.analytics().logEvent(eventName, eventParams);
//     } catch (error) {
//         console.log(`Unable to log firebase event: ${error}`)
//     }
// }

// const FbLogEvent = (eventName, eventParams) => {
//     try {
//         if (eventName == 'PaymentCompleted') {
//             AppEventsLogger.logPurchase(parseInt(eventParams.Price), 'PKR', eventParams);
//         } else {
//             AppEventsLogger.logEvent(eventName, eventParams);
//         }
//     } catch (error) {
//         console.log(`Unable to log facebook event: ${error}`)
//     }
// }

// const AppsFlyerSetup = () => {
//     return appsFlyer.initSdk(
//         {
//             devKey: 'vifVPYrYLiuh7dF6KhFdTd',
//             isDebug: true
//         },
//         (result) => {
//             // console.log(result);
//         },
//         (error) => {
//             // console.error(error);
//         }
//     );
// }

// const AppSFlyerTrackEvent = (eventName, eventParams) => {
//     try {
//         appsFlyer.trackEvent(eventName, eventParams,
//             (sc) => {
//                 // console.log(`Event is logged ${sc}`);
//             },
//             (error) => {
//                 // console.error(error);
//             })
//     } catch (error) {
//         console.log(`Unable to log AppsFlyer event: ${error}`)
//     }
// }

// export { FirebaseLogEvent, FbLogEvent, AppSFlyerTrackEvent, AppsFlyerSetup };

import analytics from '@segment/analytics-react-native'


export const segmentSetup = async () => {
    await analytics.setup('zFZjnGhcMX5JoDNWLQzsPtzRs5H5BJp9', {
        // Record screen views automatically!
        recordScreenViews: true,
        // Record certain application events automatically!
        trackAppLifecycleEvents: true
    })
    // .then(sc => console.log({sc}))
    // .catch(er => console.log({er}))
}

export const trackSegmentEvent = async (eventName, eventParams) => {
    analytics.track(eventName, eventParams);
}