import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Stars from 'react-native-stars'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { prf, verify, locationGray } from '../../../assets/Images'


const ViewMyCalendar = (props) => {
    const [stars, setStars] = useState(4.5);
    const [bookingSlots, setBookingSlots] = useState([{ date: '2021-08-09', slotStatus: 'booked' }, { date: '2021-08-22', slotStatus: 'available' }]);
    const [timeSlots, setTimeSlots] = useState(['08:00 am', '08:30 am', '09:00 am', '09:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am']);
    const [selectSlot, setSelectSlot] = useState('08:30 am');
    // const [bookingSlots, setBookingSlots] = useState({ booked: ['2021-08-08', '2021-08-13'], available: ['2021-08-02', '2021-08-18', '2021-08-23'] });

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>VIEW MY <Text style={styles.title1}>SCHEDULE</Text></Text>
                }
            />

            <View style={styles.wrapper}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} style={{ width: (_width * 0.84) }} contentContainerStyle={{ alignItems: 'center' }}>
                    <Calendar
                        style={{ width: (_width * 0.9), height: moderateScale(290), borderRadius: moderateScale(30), alignSelf: 'center' }}
                        dayComponent={({ date, state }) => {
                            const bookedDates = bookingSlots.find(x => (x.slotStatus == 'booked' && moment(date.dateString, 'YYYY-MM-DD').isSame(x.date, 'YYYY-MM-DD')) && x);
                            const availableDates = bookingSlots.find(x => (x.slotStatus == 'available' && moment(date.dateString, 'YYYY-MM-DD').isSame(x.date, 'YYYY-MM-DD')) && x);

                            return (
                                <Text style={{
                                    textAlign: 'center', textAlignVertical: 'center', width: moderateScale(30), height: moderateScale(30), borderRadius: moderateScale(15), backgroundColor: availableDates ? '#001E41' : bookedDates ? '#9F172E' : '#fff', color: (bookedDates || availableDates) ? '#fff' : moment(date.dateString).isAfter(new Date().toISOString().slice(0, 10), 'month') ? 'silver' : '#000'
                                }}>
                                    {
                                        bookedDates ?
                                            (<Fontisto name="close-a" size={moderateScale(10)} />) :
                                            availableDates ?
                                                date.day :
                                                date.day
                                    }
                                </Text>
                            )
                        }}
                    />

                    <View style={styles.daySlots_C}>
                        <View style={styles.dayTime_C}>
                            <Text style={styles.dayTime}>Morning</Text>
                            <Text style={styles.time}>08:00-11:30am</Text>
                        </View>

                        <View style={styles.slots_C}>
                            {
                                timeSlots?.map((x, i) => {
                                    return (
                                        <TouchableOpacity onPress={() => setSelectSlot(x)} style={(x == selectSlot ? styles.slotActive : styles.slot)} key={i}>
                                            <Text style={(x == selectSlot ? styles.slotTxtActive : styles.slotTxt)}>{x}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    </View>

                    <View style={{ width: (_width * 0.78), marginTop: moderateScale(20), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={styles.status}><View style={[styles.dot, { backgroundColor: '#9F172E' }]} /> Completed</Text>
                        <Text style={styles.status1}><View style={[styles.dot, { backgroundColor: '#001E41' }]} />  Upcoming</Text>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate("MyProfile")} style={styles.fBtn}>
                        <Text style={styles.fBtnTxt}>Update Details</Text>
                    </TouchableOpacity>
                </ScrollView>
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
        fontFamily: 'Barlow-Regular',
        marginTop: moderateScale(35),
    },
    title1: {
        color: '#fff',
        fontFamily: 'Barlow-Bold'
    },
    status: { color: '#9F172E', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12) },
    status1: { color: '#001E41', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12), marginLeft: moderateScale(10) },
    dot: { width: moderateScale(10), height: moderateScale(10), borderRadius: moderateScale(5), backgroundColor: '#9F172E' },

    daySlots_C: { width: (_width * 0.84), marginTop: moderateScale(20) },
    dayTime_C: { flexDirection: 'row', alignItems: 'center' },
    dayTime: { fontSize: moderateScale(18), fontFamily: 'Barlow-Bold', color: '#9F172E' },
    time: { marginLeft: moderateScale(5), fontSize: moderateScale(12), fontFamily: 'Barlow-Regular', color: '#B1B1B0' },
    slots_C: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: moderateScale(10) },
    slot: { marginLeft: moderateScale(5), marginTop: moderateScale(10), width: moderateScale(65), height: moderateScale(25), alignItems: 'center', justifyContent: 'center' },
    slotTxt: { fontSize: moderateScale(12), fontFamily: 'Barlow-Regular', color: '#474747' },
    slotActive: { marginLeft: moderateScale(5), marginTop: moderateScale(12), width: moderateScale(65), height: moderateScale(25), borderRadius: moderateScale(12.5), alignItems: 'center', justifyContent: 'center', backgroundColor: '#001E41' },
    slotTxtActive: { fontSize: moderateScale(12), fontFamily: 'Barlow-Regular', color: '#fff' },

    fBtn: {
        width: (_width * 0.84),
        height: moderateScale(50),
        borderRadius: moderateScale(30),
        marginTop: moderateScale(35),
        backgroundColor: '#9F172E',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fBtnTxt: {
        color: '#fff',
        fontSize: moderateScale(18),
        fontFamily: 'Barlow-Bold'
    },
})

export default ViewMyCalendar;