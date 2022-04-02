import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Stars from 'react-native-stars'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { check, checked, verify, locationGray } from '../../../assets/Images'


const PaymentMethod = (props) => {
    const [stars, setStars] = useState(4.5);
    const [paymentMethod, setPaymentMethod] = useState(null);

    const _navigate = () => {
        if (paymentMethod == 'tappayment') {
            props.navigation.navigate('TapPayment');
        } else if (paymentMethod == 'paypal') {
            props.navigation.navigate('Paypal');
        }
    }

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>SELECT YOUR PAYMENT METHOD</Text>
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

                <View style={{ marginTop: moderateScale(20), }}>
                    <View style={styles.paymentMethodContainer}>
                        <TouchableOpacity onPress={() => setPaymentMethod('cashOnSession')} style={styles.checkboxContainer}>
                            <Image source={paymentMethod == 'cashOnSession' ? (checked) : (check)} style={{ height: moderateScale(30), width: moderateScale(30) }} />
                            <Text style={styles.cTxt}>COC (Cash on Session)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPaymentMethod('tappayment')} style={styles.checkboxContainer}>
                            <Image source={paymentMethod == 'tappayment' ? (checked) : (check)} style={{ height: moderateScale(30), width: moderateScale(30) }} />
                            <Text style={styles.cTxt}>Tappayment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPaymentMethod('paypal')} style={styles.checkboxContainer}>
                            <Image source={paymentMethod == 'paypal' ? (checked) : (check)} style={{ height: moderateScale(30), width: moderateScale(30) }} />
                            <Text style={styles.cTxt}>Paypal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPaymentMethod('credit_debit_card')} style={styles.checkboxContainer}>
                            <Image source={paymentMethod == 'credit_debit_card' ? (checked) : (check)} style={{ height: moderateScale(30), width: moderateScale(30) }} />
                            <Text style={styles.cTxt}>Pay with Credit/Debit card</Text>
                        </TouchableOpacity>
                    </View>
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
                        <TouchableOpacity onPress={_navigate} style={styles.submitBtn}>
                            <Text style={styles.sbTxt}>Continue</Text>
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

    paymentMethodContainer: { width: (_width * 0.8), alignSelf: 'center', },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20) },
    checkbox: {},
    cTxt: { marginLeft: moderateScale(15), color: '#323A48', fontSize: moderateScale(16), fontFamily: 'Barlow-Bold' },

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

export default PaymentMethod;