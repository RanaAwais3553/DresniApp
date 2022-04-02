import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Stars from 'react-native-stars'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { prf, verify, locationGray } from '../../../assets/Images'


const BookingOrderReview = (props) => {
    const [stars, setStars] = useState(4.5);

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>YOUR BOOKING ORDER REVIEW</Text>
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

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} style={{ marginTop: moderateScale(20), }}>
                    <View style={styles.timingCardContainer}>
                        <TouchableOpacity style={styles.timingCardActive}>
                            <Text style={styles.tcDay}>MON</Text>
                            <Text style={styles.tcDate}>13</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.timingCard}>
                            <Text style={styles.tcDay}>TUE</Text>
                            <Text style={styles.tcDate}>14</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.timingCard}>
                            <Text style={styles.tcDay}>WEN</Text>
                            <Text style={styles.tcDate}>15</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bookingDetailsActive}>
                        <FontAwesome style={styles.closeIcon} size={moderateScale(30)} color="#fff" name="close" />

                        <Text style={styles.subject}>SUBJECT XYZ</Text>
                        <Text style={styles.timing}>9:00 am</Text>
                        <Text style={styles.sessionType}>Digital Session - Via Zoom</Text>
                    </View>

                    <View style={styles.bookingDetails}>
                        <FontAwesome style={styles.closeIcon} size={moderateScale(30)} color="#fff" name="close" />

                        <Text style={styles.subject}>SUBJECT ABC</Text>
                        <Text style={styles.timing}>10:00 am</Text>
                        <Text style={styles.sessionType}>Physical Session - Home / Office / Coffee Shop</Text>
                    </View>

                    <View style={{ marginTop: moderateScale(10), backgroundColor: '#fff', alignSelf: 'center' }}>
                        <View style={styles.progressCont}>
                            <View style={styles.circleCont}>
                                <View style={styles.circleActive} />
                                <View style={styles.circleActive} />
                                <View style={styles.circleActive} />
                                <View style={styles.circle} />
                                <View style={styles.circle} />
                            </View>

                            <View style={styles.hLine1} />
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('PaymentMethod')} style={styles.submitBtn}>
                                <Text style={styles.sbTxt}>Confirm Booking</Text>
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

    timingCardContainer: { width: (_width * 0.8), alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    timingCard: { width: moderateScale(80), height: moderateScale(100), borderRadius: moderateScale(17), backgroundColor: '#001E41', alignItems: 'center', justifyContent: 'center' },
    timingCardActive: { width: moderateScale(80), height: moderateScale(100), borderRadius: moderateScale(17), backgroundColor: '#9F172E', alignItems: 'center', justifyContent: 'center' },
    tcDay: { color: '#fff', fontSize: moderateScale(14), fontFamily: 'Barlow-Regular' },
    tcDate: { color: '#fff', fontSize: moderateScale(60), fontFamily: 'Barlow-Extra Bold', lineHeight: moderateScale(60) },
    bookingDetails: { width: '100%', height: moderateScale(110), marginTop: moderateScale(15), borderRadius: moderateScale(20), backgroundColor: '#001E41', justifyContent: 'center', paddingLeft: moderateScale(20) },
    bookingDetailsActive: { width: '100%', height: moderateScale(110), marginTop: moderateScale(15), borderRadius: moderateScale(20), backgroundColor: '#9F172E', justifyContent: 'center', paddingLeft: moderateScale(20) },
    closeIcon: { position: 'absolute', right: moderateScale(14), top: moderateScale(4) },
    subject: { color: '#fff', fontSize: moderateScale(22), fontFamily: 'Barlow-BoldItalic' },
    timing: { color: '#fff', fontSize: moderateScale(17), fontFamily: 'Barlow-Bold' },
    sessionType: { color: '#fff', fontSize: moderateScale(11), fontFamily: 'Barlow-Bold' },

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
        marginTop: moderateScale(10),
        marginBottom: moderateScale(15)
    },
    submitBtn: {
        width: moderateScale(_width * 0.82),
        height: moderateScale(50),
        borderRadius: moderateScale(10),
        backgroundColor: '#011E41',
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

export default BookingOrderReview;