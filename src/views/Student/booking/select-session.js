import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Stars from 'react-native-stars'
import { useDispatch, useSelector } from 'react-redux'
import { SetupBooking } from '../../../redux/actions/app-local'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { prf, verify, locationGray, HomeSession, DigitalSession, BothSession } from '../../../assets/Images'


const SelectSession = (props) => {
    const dispatch = useDispatch()
    const appLocalState = useSelector(state => state.appLocal)
    const [stars, setStars] = useState(4.5);

    const onSetupBooking = (sessionType) => {
        dispatch(SetupBooking({ sessionType }));
    }

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>SELECT YOUR SESSION</Text>
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

                <View style={styles.sessionTypeContainer}>
                    <TouchableOpacity onPress={() => onSetupBooking('DIGITAL')} style={styles.sessionType}>
                        <Text style={styles.stTxt}>DIGITAL</Text>

                        <DigitalSession width={moderateScale(120)} height={moderateScale(90)} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSetupBooking('HOME')} style={styles.sessionType}>
                        <Text style={styles.stTxt}>HOME</Text>

                        <HomeSession width={moderateScale(120)} height={moderateScale(90)} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSetupBooking('BOTH')} style={styles.sessionType}>
                        <Text style={styles.stTxt}>BOTH</Text>

                        <BothSession width={moderateScale(120)} height={moderateScale(90)} />
                    </TouchableOpacity>
                </View>

                <View style={{ position: 'absolute', bottom: moderateScale(10), alignSelf: 'center' }}>
                    <View style={styles.progressCont}>
                        <View style={styles.circleCont}>
                            <View style={styles.circleActive} />
                            <View style={styles.circle} />
                            <View style={styles.circle} />
                            <View style={styles.circle} />
                            <View style={styles.circle} />
                        </View>

                        <View style={styles.hLine1} />
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('BookingDate')} style={styles.nextBtn}>
                            <AntDesign name='arrowright' style={styles.icon1} />
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

    sessionTypeContainer: { marginTop: moderateScale(90), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    sessionType: { width: moderateScale(90), height: moderateScale(120), borderRadius: moderateScale(17), backgroundColor: '#001E41', alignItems: 'center', justifyContent: 'space-around' },
    stTxt: { color: '#fff', fontSize: moderateScale(12), fontFamily: 'Barlow-Bold', marginTop: moderateScale(10) },

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

export default SelectSession;