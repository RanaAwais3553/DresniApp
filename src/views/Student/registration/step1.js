import React, { useRef, useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { RegisterStudent } from "../../../redux/actions/student";
import moment from 'moment'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { useIsMountedRef } from '../../../utilities/mounted-ref'
import { keyboardListeners } from '../../../utilities/keyboard-listeners'
import { useDispatch, useSelector } from "react-redux";
import { validateFields } from '../../../utilities/validate-fields'
import validator from '../../../validation/validator'
import { ModalContainer, DropDownModal, CountryListModal, DatePickerModal } from '../../../modals'
import { GetCountryCodes, SearchCountryCodes } from "../../../redux/actions/setup";
import { useDebouncedEffect } from '../../../utilities/handle-debounce'
import { AsyncStorageService } from '../../../services';
import { StackActions } from '@react-navigation/native';


const StudentRegStep1 = (props) => {
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const inputRefs = {
        'fullname': useRef(null),
        'email': useRef(null),
        'password': useRef(null),
        'nationality': useRef(null),
        'gender': useRef(null),
        'dateOfBirth': useRef(null),
    };

    const [page, setPage] = useState(0);
    const [loadmore, setLoadMore] = useState(false);
    const [country, setCountry] = useState(null);
    const [searchCountryCodes, setSearchCountryCodes] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [countryName, setCountryName] = useState(null);
    const [isCLModal, setIsCLModal] = useState(false);
    const [isDOBModal, setIsDOBModal] = useState(false);

    const [state, setState] = useState({
        fullname: '',
        fullnameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        nationalityError: '',
        genderError: '',
        dateOfBirth: new Date(),
        dateOfBirthError: '',
    });

    // dropdowns state
    const [genderState, setGenderState] = useState({
        isModal: false,
        gender: null
    });

    useEffect(() => {
        getCountryCodes();
    }, [])

    useDebouncedEffect(async () => {
        if (countryName) {
            const response = await dispatch(SearchCountryCodes({ name: countryName, lang: 'en' }));

            if (response?.data) {
                setSearchCountryCodes(response.data);
                setLoadMore(false);
            }
        }
    }, 1000, [countryName]);

    const getCountryCodes = async (isLoadMore) => {
        if (isLoadMore) setLoadMore(true);

        const response = await dispatch(GetCountryCodes({ page }));
        if (isMountedRef.current) {
            if (countryCodes.length) {
                setPage(page + 1);
                setLoadMore(false);
                setCountryCodes(countryCodes.concat(response?.data))
            } else {
                setPage(page + 1);
                setLoadMore(false);
                setCountryCodes(response?.data)
            }
        }
    }

    const onRegister = async () => {
        const { fullname, email, password, dateOfBirth } = state;
        const fullnameError = await validator('fullname', fullname);
        const emailError = await validator('email', email);
        const passwordError = await validator('password', password);
        const nationalityError = await validator('nationality', country?.name);
        const genderError = await validator('gender', genderState.gender);
        const dateOfBirthError = await validator('dateOfBirth', dateOfBirth);

        if (!fullnameError && !emailError && !passwordError && !nationalityError && !genderError && !dateOfBirthError) {
            const contactNumber = await AsyncStorageService.getString("@contactNumber");
            if (!contactNumber) return alert("Please verify your device with otp.");
            const registrationObj = { fullname, email, password, contactNumber, nationality: country?.name, gender: genderState.gender, dateOfBirth };
            const data = await dispatch(RegisterStudent(registrationObj));

            if (data?.statusCode == 200) props.navigation.dispatch(StackActions.replace('StudentRegSuccess', { params: {} }));
        } else {
            setState({ ...state, fullnameError, emailError, passwordError, nationalityError, genderError, dateOfBirthError })
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
                height={0.35}
                isVisible={genderState.isModal}
                items={['MALE', 'FEMALE', 'Any/No Preferences']}
                _closeModal={() => _closeModal(genderState, setGenderState, 'isModal', false)}
                onSelect={gender => setGenderState({ ...genderState, isModal: false, gender })} />

            <ModalContainer
                isVisible={isCLModal}
                modalName={"country-list"}
                closeModal={() => setIsCLModal(false)}
                style={{
                    position: 'absolute',
                    top: moderateScale(80),
                }}
                modalContent={() => CountryListModal({
                    countryCodes,
                    searchCountryCodes,
                    loadmore,
                    countryName,
                    onSelect: country => {
                        setCountry(country);
                        setIsCLModal(false);
                    },
                    getCountryCodes,
                    searchCountry: name => setCountryName(name),
                })} />

            <ModalContainer
                isVisible={isDOBModal}
                modalName={"dob-modal"}
                closeModal={() => setIsDOBModal(false)}
                modalContent={() => DatePickerModal({
                    height: 0.45,
                    dateOfBirth: state?.dateOfBirth,
                    closeModal: () => setIsDOBModal(false),
                    dobHandler: date => setState({ ...state, dateOfBirth: date }),
                })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}><Text style={styles.title1}>STUDENT AND USERS</Text> REGISTRATION</Text>
                }
                hideMenus={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <View style={[styles.inputGroup, { marginTop: moderateScale(40) }]}>
                    <TextInput
                        ref={inputRefs.fullname}
                        value={state.fullname}
                        style={styles.input}
                        returnKeyType={'next'}
                        placeholder="Full Name*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'fullnameError': '' })}
                        onBlur={() => validateFields(state.fullname, 'fullname', error => setState({ ...state, 'fullnameError': error }))}
                        onSubmitEditing={() => inputRefs['email'].current.focus()}
                        onChangeText={fullname => changeHandler('fullname', fullname.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.fullnameError}</Text>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        ref={inputRefs.email}
                        value={state.email}
                        style={styles.input}
                        returnKeyType={'next'}
                        placeholder="Email*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'emailError': '' })}
                        onBlur={() => validateFields(state.email, 'email', error => setState({ ...state, 'emailError': error }))}
                        onSubmitEditing={() => inputRefs['password'].current.focus()}
                        onChangeText={email => changeHandler('email', email.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.emailError}</Text>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        ref={inputRefs.password}
                        value={state.password}
                        style={styles.input}
                        returnKeyType={'done'}
                        placeholder="Password*"
                        placeholderTextColor={'#C6C7C9'}
                        secureTextEntry={true}
                        onFocus={() => setState({ ...state, 'passwordError': '' })}
                        onBlur={() => validateFields(state.password, 'password', error => setState({ ...state, 'passwordError': error }))}
                        onChangeText={password => changeHandler('password', password.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.passwordError}</Text>

                <TouchableOpacity onPress={() => setIsCLModal(true)} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{country?.name ? country?.name : 'Nationality*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.nationalityError}</Text>

                <TouchableOpacity onPress={() => setGenderState({ ...genderState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{genderState.gender ? genderState.gender : 'Gender*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.genderError}</Text>

                <TouchableOpacity onPress={() => setIsDOBModal(true)} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{new Date().toDateString() == new Date(state.dateOfBirth).toDateString() ? 'Date of birth*' : moment(state.dateOfBirth).format('DD/MM/YYYY')}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.dateOfBirthError}</Text>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={onRegister} style={styles.registerBtn}>
                        <Text style={styles.regTxt}>Register Now!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        fontFamily: 'Barlow-Regular',
        fontSize: moderateScale(15),
        marginTop: moderateScale(40),
    },
    title1: {
        color: '#fff',
        fontFamily: 'Barlow-Bold'
    },
    label: {
        fontSize: moderateScale(22),
        color: '#9C182F',
        textAlign: 'center'
    },
    inputGroup: {
        width: (_width * 0.8),
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
        width: (_width * 0.8),
        height: moderateScale(40),
        fontSize: moderateScale(14),
        color: '#000'
    },
    errtxt: {
        color: 'red'
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
        width: moderateScale(150),
        height: moderateScale(1),
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

export default StudentRegStep1;