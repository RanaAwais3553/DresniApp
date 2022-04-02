import React, { useEffect, useRef } from 'react'
import NetInfo from "@react-native-community/netinfo";

export function InternetConnection() {
    var isConnected = useRef(false);

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            return isConnected = state.isConnected;
        });

        console.log(isConnected)
        return () => isMountedRef.current = isConnected;
    }, [])

    return isConnected;
}