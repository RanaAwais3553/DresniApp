import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Stars from 'react-native-stars'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { SetupBooking } from '../../../redux/actions/app-local'
import { ModalContainer, DropDownModal } from '../../../modals'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { prf, verify, locationGray } from '../../../assets/Images'


const BookingDate = (props) => {
    const dispatch = useDispatch()
    const appLocalState = useSelector(state => state.appLocal)
    const [stars, setStars] = useState(4.5);
    const [bookingSlots, setBookingSlots] = useState([{ date: '2021-10-08', slotStatus: 'booked' }, { date: '2021-10-13', slotStatus: 'booked' }, { date: '2021-10-02', slotStatus: 'available' }, { date: '2021-10-18', slotStatus: 'available' }, { date: '2021-10-23', slotStatus: 'available' }]);

    // session timing state
    const [sessionTimingState, setSessionTimingState] = useState({
        isModal: false,
        sessionTiming: null
    });

    const onSetupBooking = (sessionDate) => {
        dispatch(SetupBooking({ sessionDate }));
    }

    const ModalWrapper = (props) => {
        return <ModalContainer
            isVisible={props.isVisible}
            modalName={"dropdown"}
            modalContent={() => DropDownModal(props)}
            closeModal={props._closeModal} />
    }

    const _closeModal = (state, setState, type, value) => setState({ ...state, [type]: value });
    const onSelectDateAndTiming = (date) => {
        onSetupBooking(date.dateString)
        setSessionTimingState({ ...sessionTimingState, isModal: true })
    }

    return (
        <View style={styles.container}>
            <ModalWrapper
                height={0.65}
                isVisible={sessionTimingState.isModal}
                items={['12pm - 01pm', '02pm - 03pm', '03pm - 04pm', '04pm - 05pm', '05pm - 06pm', '06pm - 07pm']}
                _closeModal={() => _closeModal(sessionTimingState, setSessionTimingState, 'isModal', false)}
                onSelect={sessionTiming => setSessionTimingState({ ...sessionTimingState, isModal: false, sessionTiming })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>BOOK YOUR DATE</Text>
                }
                backIcon={true}
            />

            <View style={styles.wrapper}>
                <View style={styles.sec1}>
                    <View style={styles.nameCont}>
                        <Text style={styles.name}>Mohd Siddiqui</Text>
                        <Image source={verify} style={styles.verifyImg} />
                    </View>

                    <View style={styles.ratingCont}>
                        <Text style={styles.rating}>Rating {stars}</Text>

                        <Stars
                            half={true}
                            default={stars}
                            update={(val) => setStars(val)}
                            spacing={moderateScale(2)}
                            starSize={moderateScale(12)}
                            count={5}
                            fullStar={require('../../../assets/Images/full-star.png')}
                            emptyStar={require('../../../assets/Images/empty-star.png')}
                            halfStar={require('../../../assets/Images/half-star.png')} />
                    </View>
                </View>

                <View style={styles.sec2}>
                    <View style={styles.locationCont}>
                        <Image source={locationGray} style={styles.locationImg} />
                        <Text style={styles.location}>Kingdom of Bahrain</Text>
                    </View>

                    <View style={styles.commentsCont}>
                        <Text style={styles.comment}>See all comments</Text>
                    </View>
                </View>

                <View style={styles.hLine} />

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} style={{ width: (_width * 0.84) }} contentContainerStyle={{ alignItems: 'center' }}>
                    <Calendar
                        style={{ width: (_width * 0.9), height: moderateScale(350), borderRadius: moderateScale(30), alignSelf: 'center' }}
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
                                                (
                                                    <TouchableOpacity onPress={() => onSelectDateAndTiming(date)} style={{ width: moderateScale(30), height: moderateScale(30), borderRadius: moderateScale(15), alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={{ color: (bookedDates || availableDates) ? '#fff' : moment(date.dateString).isAfter(new Date().toISOString().slice(0, 10), 'month') ? 'silver' : '#000' }}>
                                                            {date.day}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ) :
                                                date.day

                                    }
                                </Text>
                            )
                        }}
                    />

                    <View style={{ width: (_width * 0.78), marginTop: moderateScale(15), flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={styles.status}><View style={[styles.dot, { backgroundColor: '#9F172E' }]} /> Occupied</Text>
                        <Text style={styles.status1}><View style={[styles.dot, { backgroundColor: '#001E41' }]} />  Available</Text>
                    </View>

                    <View style={{ marginTop: moderateScale(30), alignSelf: 'center' }}>
                        <View style={styles.progressCont}>
                            <View style={styles.circleCont}>
                                <View style={styles.circleActive} />
                                <View style={styles.circleActive} />
                                <View style={styles.circle} />
                                <View style={styles.circle} />
                                <View style={styles.circle} />
                            </View>

                            <View style={styles.hLine1} />
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('BookingOrderReview')} style={styles.nextBtn}>
                                <AntDesign name='arrowright' style={styles.icon1} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
        fontFamily: 'Barlow-Bold',
        marginTop: moderateScale(35),
    },
    sec1: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: moderateScale(15) },
    nameCont: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: moderateScale(20), fontFamily: 'BarlowCondensed-Bold', color: '#4B4D4F' },
    verifyImg: { width: moderateScale(20), height: moderateScale(20), marginLeft: moderateScale(5) },
    ratingCont: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' },
    rating: { fontSize: moderateScale(12), fontFamily: 'Barlow-Regular', color: '#9C182F', marginRight: moderateScale(7) },
    sec2: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: moderateScale(10) },
    locationCont: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    locationImg: { width: moderateScale(9), height: moderateScale(12) },
    location: { color: '#AEAEAE', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12), marginLeft: moderateScale(5) },
    commentsCont: { flexDirection: 'row', alignSelf: 'flex-end' },
    comment: { color: '#B3B3B1', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12) },
    hLine: { height: moderateScale(1), backgroundColor: '#BABBBD', marginVertical: moderateScale(10) },
    status: { color: '#9F172E', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12) },
    status1: { color: '#001E41', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12), marginLeft: moderateScale(10) },
    dot: { width: moderateScale(10), height: moderateScale(10), borderRadius: moderateScale(5), backgroundColor: '#9F172E' },

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
        width: moderateScale(240),
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
        marginTop: moderateScale(10)
    },
    nextBtn: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        backgroundColor: '#011E41',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon1: {
        fontSize: moderateScale(30),
        color: '#fff'
    },
})

export default BookingDate;