import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, } from 'react-native'
import { _width, _height, moderateScale } from '../utilities'


const LoaderModal = () => {
    return (
        <View style={styles.loader}>
            <View style={styles.loaderimageContainer}>
                <Image
                    style={styles.loaderimage}
                    source={require("../assets/Images/loader.gif")} />
            </View>

            <Text style={styles.loaderTxt}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loader: { width: _width, height: _height, alignItems: 'center', justifyContent: 'center' },
    loaderimageContainer: { width: moderateScale(120), height: moderateScale(120), zIndex: 1, backgroundColor: '#fff', borderRadius: moderateScale(6), alignItems: 'center', justifyContent: 'center' },
    loaderimage: { width: moderateScale(110), height: moderateScale(110), borderRadius: moderateScale(55) },
    loaderTxt: { zIndex: 1, marginTop: moderateScale(-30), fontFamily: 'Barlow-Bold', fontSize: moderateScale(16) }
})

export default LoaderModal;