import React, { useRef, useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch } from 'react-redux'
import { SetupWalkthrough } from '../redux/actions/setup'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// local imports
import { moderateScale, _height, _width } from '../utilities'

const SelectLocation = (props) => {
    const dispatch = useDispatch();
    const onNavigate = () => {
        dispatch(SetupWalkthrough());
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                mapType={"terrain"}
            >
            </MapView>

            <View style={{ position: 'absolute', height: (_height * 0.96), width: (_width * 1) }}>
                <TouchableOpacity
                    style={{ alignSelf: 'flex-end', width: moderateScale(70), height: moderateScale(30), marginTop: moderateScale(10), marginRight: moderateScale(10), borderRadius: moderateScale(10), backgroundColor: '#001E41', alignItems: 'center', justifyContent: 'center' }}
                    onPress={onNavigate}>
                    <Text style={{ color: '#fff' }}>Next</Text>
                </TouchableOpacity>

                <View style={[styles.inputGroup, { justifyContent: 'space-evenly' }]}>
                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Search"
                    />

                    <Feather style={styles.icon} name="search" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // container: { flex: 1, backgroundColor: '#fff' },
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    inputGroup: {
        position: 'absolute',
        bottom: moderateScale(50),
        width: (_width * 0.86),
        height: moderateScale(50),
        borderWidth: moderateScale(2),
        borderColor: '#CED3DA',
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: moderateScale(15)
    },
    input: {
        width: (_width * 0.72),
        height: moderateScale(50),
        fontSize: moderateScale(14),
        color: '#000',
        fontFamily: 'Barlow-Regular'
    },
    inTxt: {
        color: '#000',
        fontSize: moderateScale(11)
    },
    icon: {
        fontSize: moderateScale(20),
        color: '#000',
        marginLeft: moderateScale(5)
    },
})

export default SelectLocation;