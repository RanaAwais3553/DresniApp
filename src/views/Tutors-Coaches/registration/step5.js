import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from "react-redux";
import { RegisterTutorAndCoach } from "../../../redux/actions/tutor-coach";

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { useIsMountedRef } from '../../../utilities/mounted-ref'
import { keyboardListeners } from '../../../utilities/keyboard-listeners'
import { validateFields } from '../../../utilities/validate-fields'
import validator from '../../../validation/validator'
import { sucessTick } from '../../../assets/Images'


const TutorRegStep5 = (props) => {
    const dispatch = useDispatch();
    const inputRefs = {
        'firstname': useRef(null),
        'lastname': useRef(null),
        'email': useRef(null),
        'password': useRef(null),
        'nationality': useRef(null),
        'gender': useRef(null),
        'dateOfBirth': useRef(null),
        'contactNumber': useRef(null),
    };

    const [state, setState] = useState({
        firstname: '',
        firstnameError: '',
        lastname: '',
        lastnameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        nationality: '',
        nationalityError: '',
        gender: '',
        genderError: '',
        dateOfBirth: '',
        dateOfBirthError: '',
        contactNumber: '',
        contactNumberError: '',
    });

    const onRegister = async () => {
        const { firstname, lastname, email, password, nationality, gender, dateOfBirth, contactNumber } = state;
        const firstnameError = await validator('firstname', firstname);
        const lastnameError = await validator('lastname', lastname);
        const emailError = await validator('email', email);
        const passwordError = await validator('password', password);
        const nationalityError = await validator('nationality', nationality);
        const genderError = await validator('gender', gender);
        const dateOfBirthError = await validator('dateOfBirth', dateOfBirth);
        const contactNumberError = await validator('contactNumber', contactNumber);

        if (!firstnameError && !lastnameError && !emailError && !passwordError && !nationalityError && !genderError && !dateOfBirthError && !contactNumberError) {
            const data = await dispatch(RegisterTutorAndCoach({ firstname, lastname, email, password, nationality, gender, dateOfBirth, contactNumber }));

            if (data?.statusCode == 200) props.navigation.navigate('Login')
        } else {
            setState({ ...state, firstnameError, lastnameError, emailError, passwordError, nationalityError, genderError, dateOfBirthError, contactNumberError })
        }
    }

    const changeHandler = (type, value) => setState({ ...state, [type]: value });

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}><Text style={styles.title1}>TUTORS AND COACHES</Text> REGISTRATION</Text>
                }
                hideMenus={true}
            />

            <View>
                <Image style={styles.sc_image} source={sucessTick} />

                <View style={styles.sc_info}>
                    <Text style={styles.sc_txt1}>Thank you for registering Daresni.</Text>
                    <Text style={styles.sc_txt2}>
                        You will receive a confirmation in the email or SMS after
                        approve your account ...
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        width: (_width * 0.8),
        alignSelf: 'center',
        flex: 1.2,
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(15),
        marginTop: moderateScale(40),
    },
    title1: {
        color: '#fff',
        fontWeight: 'bold'
    },
    sc_image: {
        width: moderateScale(170),
        height: moderateScale(170),
        alignSelf: 'center',
        marginVertical: moderateScale(60)
    },
    sc_info: {
        alignSelf: 'center',
        width: (_width * 0.85)
    },
    sc_txt1: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#001E41',
        textAlign: 'center'
    },
    sc_txt2: {
        fontSize: moderateScale(12),
        color: '#9F172E',
        textAlign: 'center',
        marginTop: moderateScale(20)
    },
})

export default TutorRegStep5;