import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

// local imports
import { Header } from '../../../components'
import { moderateScale, _height, _width } from '../../../utilities'
import { Thankyou } from '../../../assets/Images'


const BookingConfirmation = (props) => {

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>THANK YOU</Text>
                }
                backIcon={true}
            />

            <View style={styles.wrapper}>
                <View style={{ marginTop: moderateScale(50), }}>
                    <Thankyou style={styles.orderConfirmImg} />

                    <Text style={styles.info}>Your order has been placed successfully</Text>
                    <Text style={styles.info1}>You will receive a confirmation in the email or SMS</Text>
                </View>

                <View style={{ position: 'absolute', bottom: moderateScale(10), alignSelf: 'center' }}>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('TCProfiles')} style={styles.submitBtn}>
                            <Text style={styles.sbTxt}>Tutors and Coaches</Text>
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

    orderConfirmImg: { width: moderateScale(264), height: moderateScale(260), alignSelf: 'center' },

    info: { color: '#323A48', fontSize: moderateScale(14), textAlign: 'center', fontFamily: 'Barlow-Bold', marginTop: moderateScale(30) },
    info1: { color: '#9F172E', fontSize: moderateScale(10), textAlign: 'center', fontFamily: 'Barlow-Regular' },

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

export default BookingConfirmation;