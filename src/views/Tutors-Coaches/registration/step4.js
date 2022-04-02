import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from "react-redux";
import { StackActions } from '@react-navigation/native';
import { RegisterTutorAndCoach } from "../../../redux/actions/tutor-coach";

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { useIsMountedRef } from '../../../utilities/mounted-ref'
import { keyboardListeners } from '../../../utilities/keyboard-listeners'
import { validateFields } from '../../../utilities/validate-fields'
import validator from '../../../validation/validator'
import { ModalContainer, DropDownModal } from '../../../modals'
import { AsyncStorageService } from '../../../services';


const TutorRegStep4 = (props) => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        areaOfServicesError: '',
        biography: '',
        biographyError: '',
        personalBio: '',
        personalBioError: '',
        agreeTAndC: '',
        agreeTAndCError: '',
    });

    // dropdowns state
    const [areaOfServicesState, setAreaOfServicesState] = useState({
        isModal: false,
        areaOfServices: null
    });

    const onRegister = async () => {
        const { biography, personalBio, agreeTAndC } = state;
        const areaOfServicesError = await validator('areaOfServices', areaOfServicesState.areaOfServices);
        const biographyError = await validator('biography', biography);
        const personalBioError = await validator('personalBio', personalBio);

        if (!agreeTAndC) {
            alert('Please agree terms and conditions')
        } else if (!areaOfServicesError && !biographyError && !personalBioError) {
            const contactNumber = await AsyncStorageService.getString("@contactNumber")
            var registrationObj = JSON.parse(props.route.params?.registrationObj);

            registrationObj = { ...registrationObj, biography, personalBio, contactNumber, agreeTAndC, areaOfServices: areaOfServicesState.areaOfServices };

            console.log('registrationObj', registrationObj)
            const data = await dispatch(RegisterTutorAndCoach(registrationObj));

            if (data?.statusCode == 200) props.navigation.dispatch(StackActions.replace('TutorRegStep5', { params: {} }));
        } else {
            setState({ ...state, areaOfServicesError, biographyError, personalBioError })
        }
    }

    const changeHandler = (type, value) => setState({ ...state, [type]: value });
    const _closeModal = (state, setState, type, value) => setState({ ...state, [type]: value });

    const ModalWrapper = (props) => {
        return <ModalContainer
            isVisible={props.isVisible}
            modalName={"dropdown"}
            modalContent={() => DropDownModal(props)}
            closeModal={props._closeModal} />
    }

    return (
        <View style={styles.container}>
            <ModalWrapper
                height={0.7}
                isVisible={areaOfServicesState.isModal}
                items={[
                    'Everyone (Children and Adult Males & Females)',
                    'Children Only',
                    'Adult Males Only',
                    'Adult Females Only',
                    'Adult Females and Children Only'
                ]}
                _closeModal={() => _closeModal(areaOfServicesState, setAreaOfServicesState, 'isModal', false)}
                onSelect={areaOfServices => setAreaOfServicesState({ ...areaOfServicesState, isModal: false, areaOfServices })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}><Text style={styles.title1}>TUTORS AND COACHES</Text> REGISTRATION</Text>
                }
                hideMenus={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <TouchableOpacity onPress={() => setAreaOfServicesState({ ...areaOfServicesState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(40) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{areaOfServicesState.areaOfServices ? areaOfServicesState.areaOfServices : 'You like to offer your service to*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.areaOfServicesError}</Text>

                <View style={[styles.textareaGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        value={state.biography}
                        style={styles.textarea}
                        multiline={true}
                        returnKeyType={'next'}
                        placeholder={`Brief Biography –${'\n'}Please describe yourself.`}
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'biographyError': '' })}
                        onBlur={() => validateFields(state.biography, 'biography', error => setState({ ...state, 'biographyError': error }))}
                        onChangeText={biography => changeHandler('biography', biography.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.biographyError}</Text>

                <View style={[styles.textareaGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        value={state.personalBio}
                        style={styles.textarea}
                        returnKeyType={'next'}
                        multiline={true}
                        numberOfLines={4}
                        placeholder={`Describe yourself.${'\n'}Anything else you would like a Students/Users to know`}
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'personalBioError': '' })}
                        onBlur={() => validateFields(state.personalBio, 'personalBio', error => setState({ ...state, 'personalBioError': error }))}
                        onChangeText={personalBio => changeHandler('personalBio', personalBio.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.personalBioError}</Text>

                <Text style={{ fontSize: moderateScale(9), width: (_width * 0.8), alignSelf: 'center', marginTop: moderateScale(10), color: '#001E41' }}>
                    Please tick here to acknowledge and agree you have read Daresni’s
                    <Text style={{ color: '#99182E' }}> Pricing Policy and Terms and conditions *</Text>

                    {'\n'} {'\n'}
                    <View style={styles.checkBox}>
                        <TouchableOpacity style={{ marginTop: moderateScale(2) }} onPress={() => setState({ ...state, agreeTAndC: !state.agreeTAndC })}>
                            <MaterialIcons
                                size={moderateScale(12)}
                                color={'#001E41'}
                                name={state.agreeTAndC ? 'check-box' : 'check-box-outline-blank'}
                            />
                        </TouchableOpacity>

                        <Text style={{ fontSize: moderateScale(9), color: '#001E41', width: (_width * 0.8), marginLeft: moderateScale(3) }}>
                            By ticking this box, you agree to potentially share your basic prole to
                            include name, photo, activity, advertised price and a short brief on our
                            Daresni social media accounts*
                        </Text>
                    </View>

                    {'\n'} {'\n'}
                    <Text>
                        Daresni offers a home service and you will be provided with the location
                        after a booking is made. You will be expected to go to the appointment
                        at the scheduled date and time.
                    </Text>
                </Text>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={onRegister} style={styles.registerBtn}>
                        <Text style={styles.regTxt}>Register Now!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        width: (_width * 0.9),
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
    label: {
        fontSize: moderateScale(22),
        color: '#9C182F',
        textAlign: 'center'
    },
    inputGroup: {
        width: (_width * 0.9),
        height: moderateScale(40),
        // backgroundColor: '#E5E5E6',
        borderWidth: moderateScale(2),
        borderColor: '#011E41',
        borderRadius: moderateScale(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingHorizontal: moderateScale(15)
    },
    input: {
        width: moderateScale(_width * 0.8),
        height: moderateScale(50),
        fontSize: moderateScale(14),
        color: '#000'
    },
    errtxt: {
        color: 'red'
    },
    textareaGroup: {
        width: (_width * 0.9),
        height: moderateScale(100),
        // backgroundColor: '#E5E5E6',
        borderWidth: moderateScale(2),
        borderColor: '#011E41',
        borderRadius: moderateScale(20),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: moderateScale(15)
    },
    textarea: {
        width: moderateScale(_width * 0.8),
        height: moderateScale(120),
        fontSize: moderateScale(14),
        color: '#000'
    },
    checkBox: {
        flexDirection: 'row',
        // alignItems: 'center'
    },
    progressCont: {
        marginTop: moderateScale(10),
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
    hLine: {
        width: (_width * 0.7),
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
        marginVertical: moderateScale(40)
    },
    registerBtn: {
        width: (_width * 0.8),
        height: moderateScale(50),
        borderRadius: moderateScale(10),
        backgroundColor: '#99182E',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    regTxt: {
        fontSize: moderateScale(18),
        color: '#fff'
    },
})

export default TutorRegStep4;