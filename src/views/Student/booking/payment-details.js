import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'


const PaymentDetails = (props) => {

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>ADD YOUR PAYMENT DETAILS</Text>
                }
                backIcon={true}
            />

            <View style={styles.wrapper}>
                <View style={{ marginTop: moderateScale(70), }}>
                    <Text style={styles.info}>Students or users will have{'\n'} Payment details submission here!</Text>
                </View>

                <View style={{ position: 'absolute', bottom: moderateScale(10), alignSelf: 'center' }}>
                    <View style={styles.progressCont}>
                        <View style={styles.circleCont}>
                            <View style={styles.circleActive} />
                            <View style={styles.circleActive} />
                            <View style={styles.circleActive} />
                            <View style={styles.circleActive} />
                            <View style={styles.circle} />
                        </View>

                        <View style={styles.hLine1} />
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('BookingConfirmation')} style={styles.submitBtn}>
                            <Text style={styles.sbTxt}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        width: (_width * 0.84),
        alignSelf: 'center',
        flex: 1.2,
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(18),
        fontFamily: 'Barlow-Bold',
        marginTop: moderateScale(35),
    },

    info: { marginLeft: moderateScale(15), color: '#323A48', fontSize: moderateScale(16), fontFamily: 'Barlow-Bold' },

    progressCont: {
        alignSelf: 'center',
        height: moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleCont: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        zIndex: 1
    },
    hLine1: {
        width: moderateScale(210),
        height: moderateScale(2),
        backgroundColor: '#9C182F'
    },
    circleActive: {
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: moderateScale(9),
        marginHorizontal: moderateScale(10),
        backgroundColor: '#9C182F',
    },
    circle: {
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        marginHorizontal: moderateScale(10),
        backgroundColor: '#011E41',
    },
    footer: {
        marginTop: moderateScale(10),
        marginBottom: moderateScale(15)
    },
    submitBtn: {
        width: moderateScale(_width * 0.82),
        height: moderateScale(50),
        borderRadius: moderateScale(10),
        backgroundColor: '#9F172E',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sbTxt: {
        fontSize: moderateScale(16),
        color: '#fff',
        fontFamily: 'Barlow-Regular'
    },
})

export default PaymentDetails;