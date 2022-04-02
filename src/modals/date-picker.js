import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import { _width, _height, moderateScale } from '../utilities'
import DatePicker from 'react-native-date-picker'


const DatePickerModal = (props) => {
    return (
        <View style={[styles.modal1, { height: (_height * props?.height) }]}>
            <View style={styles.m_bar} />

            <View style={{ justifyContent: 'center', height: '100%', alignItems: 'center' }}>
                <DatePicker
                    date={props?.dateOfBirth}
                    onDateChange={date => props?.dobHandler(date)}
                    mode={"date"}
                    maximumDate={new Date()}
                    style={{ width: (_width * 0.8) }}
                />

                <TouchableOpacity onPress={() => props?.closeModal('datepickerModal')} style={styles.m_btn2}>
                    <Text style={styles.m_btn2_txt}>{'Select'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal1: {
        height: '90%',
        backgroundColor: 'white',
        // justifyContent: 'space-around',
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        borderColor: 'rgba(0, 0, 0, 0.1)',
        padding: moderateScale(15),
        overflow: 'hidden',
    },
    m_btn2: { width: _width * 0.3, height: moderateScale(34), marginTop: 10, borderRadius: moderateScale(17), alignSelf: 'flex-end', backgroundColor: '#9F172E', alignItems: 'center', justifyContent: 'center' },
    m_btn2_txt: { color: '#fff', fontSize: moderateScale(16), fontFamily: 'Lato-Bold' },
    m_webview: { height: _height * 0.3, marginHorizontal: 10, marginBottom: 15, marginTop: 10 },
    m_bar: { width: moderateScale(50), height: moderateScale(8), borderRadius: moderateScale(5), backgroundColor: '#D8D8D8', borderColor: '#D8D8D8', alignSelf: 'center' },

    card1: { width: '80%', alignSelf: 'center', borderWidth: 1, borderColor: '#F0F0F0', borderRadius: moderateScale(10), flexDirection: 'row', justifyContent: 'flex-start', alignItems: "center", padding: moderateScale(20), height: moderateScale(60), marginTop: moderateScale(10) },
    rowstartcenter: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', },
    button1: { flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", backgroundColor: '#9F172E', borderRadius: moderateScale(40), height: moderateScale(60), width: '80%' },
    button2: { flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", backgroundColor: '#fff', borderRadius: moderateScale(40), height: moderateScale(60), width: '80%' },
})

export default DatePickerModal;