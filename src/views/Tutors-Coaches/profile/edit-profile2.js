import React, { useRef, useState, useEffect } from 'react'
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
import { ModalContainer, DropDownModal, CountryListModal } from '../../../modals'
import { GetCountryCodes, SearchCountryCodes } from "../../../redux/actions/setup";
import { useDebouncedEffect } from '../../../utilities/handle-debounce'


const TutorRegStep2 = (props) => {
    const isMountedRef = useIsMountedRef();
    const tutorAccount = useSelector(state => state?.tutorAndCoach?.tutorAccount);
    const dispatch = useDispatch();
    const inputRefs = {
        'area': useRef(null),
        'workExperience': useRef(null),
        'nationalId': useRef(null),
    };

    const [page, setPage] = useState(0);
    const [loadmore, setLoadMore] = useState(false);
    const [country, setCountry] = useState(null);
    const [searchCountryCodes, setSearchCountryCodes] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [countryName, setCountryName] = useState(null);
    const [isCLModal, setIsCLModal] = useState(false);

    const [state, setState] = useState({
        qualificationError: '',
        workExperience: '',
        workExperienceError: '',
        languageError: '',
        area: '',
        areaError: '',
        countryError: '',
        nationalId: '',
        nationalIdError: '',
    });

    // dropdowns state
    const [qualificationState, setQualificationState] = useState({
        isModal: false,
        qualification: null
    });
    const [languageState, setLanguageState] = useState({
        isModal: false,
        language: null
    });

    useEffect(() => {
        getCountryCodes();

        if (tutorAccount) {
            setQualificationState({ ...qualificationState, qualification: tutorAccount?.qualification });
            setLanguageState({ ...languageState, language: tutorAccount?.language });
            setCountry({ name: tutorAccount?.country })
            setState({
                ...state,
                workExperience: tutorAccount?.workExperience,
                area: tutorAccount?.area,
                nationalId: tutorAccount?.nationalId
            })
        }
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

    const _navigate = async () => {
        const { workExperience, area, nationalId } = state;
        const workExperienceError = await validator('workExperience', workExperience);
        const areaError = await validator('area', area);
        const languageError = await validator('language', languageState.language);
        const qualificationError = await validator('qualification', qualificationState.qualification);
        const countryError = await validator('country', country);
        const nationalIdError = await validator('nationalId', nationalId);

        if (!workExperienceError && !areaError && !languageError && !qualificationError && !countryError && !nationalIdError) {
            var registrationObj = JSON.parse(props.route.params?.registrationObj);
            registrationObj = JSON.stringify({ ...registrationObj, workExperience, area, nationalId, qualification: qualificationState.qualification, language: languageState.language, country: country?.name, });

            props.navigation.navigate("EditProfile3", { registrationObj })
            setState({ ...state, workExperienceError: '', areaError: '', languageError: '', qualificationError: '', countryError: '', nationalIdError: '' })
        } else {
            setState({ ...state, workExperienceError, areaError, languageError, qualificationError, countryError, nationalIdError })
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
                isVisible={qualificationState.isModal}
                items={[
                    'None - Please refer to Daresni ratings',
                    'Primary Education only',
                    'Secondary Education only',
                    'Undergraduate - Associate (2 years)',
                    'Undergraduate - Bachelor’s Degree (4 years)',
                    'Graduate - Master’s Degree (1-2 years)',
                    'Graduate - Doctoral Degree (5-7 years)',
                    'Graduate - Professional Degree (5-7 years)',
                    'Professional Diploma'
                ]}
                _closeModal={() => _closeModal(qualificationState, setQualificationState, 'isModal', false)}
                onSelect={qualification => setQualificationState({ ...qualificationState, isModal: false, qualification })} />

            <ModalWrapper
                height={0.6}
                isVisible={languageState.isModal}
                items={[
                    'Bulgarian',
                    'Turkish',
                    'Afrikaans',
                    'Arabic',
                    'Chinese',
                    'English',
                    'Filipino',
                    'French',
                    'German',
                    'Hindi',
                    'Italian',
                    'Japanese',
                    'Korean',
                    'Russian',
                    'Thai',
                    'Urdu'
                ]}
                _closeModal={() => _closeModal(languageState, setLanguageState, 'isModal', false)}
                onSelect={language => setLanguageState({ ...languageState, isModal: false, language })} />

            <ModalContainer
                isVisible={isCLModal}
                modalName={"country-list"}
                style={{
                    position: 'absolute',
                    top: moderateScale(80),
                }}
                closeModal={() => setIsCLModal(false)}
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

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}><Text style={styles.title1}>EDIT MY</Text> PROFILE</Text>
                }
                backIcon={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <TouchableOpacity onPress={() => setQualificationState({ ...qualificationState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(40) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{qualificationState.qualification ? qualificationState.qualification : 'Choose Qualification*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.qualificationError}</Text>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        ref={inputRefs.workExperience}
                        value={state.workExperience}
                        style={styles.input}
                        returnKeyType={'next'}
                        placeholder="Work Experience*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'workExperienceError': '' })}
                        onBlur={() => validateFields(state.workExperience, 'workExperience', error => setState({ ...state, 'workExperienceError': error }))}
                        onSubmitEditing={() => inputRefs['area'].current.focus()}
                        onChangeText={workExperience => changeHandler('workExperience', workExperience.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                    {/* <AntDesign name="down" size={moderateScale(20)} color="#011E41" /> */}
                </View>
                <Text style={styles.errtxt}>{state.workExperienceError}</Text>

                <TouchableOpacity onPress={() => setLanguageState({ ...languageState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{languageState.language ? languageState.language : 'Language*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.emailError}</Text>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        ref={inputRefs.area}
                        value={state.area}
                        style={styles.input}
                        returnKeyType={'next'}
                        placeholder="Area*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'areaError': '' })}
                        onBlur={() => validateFields(state.area, 'area', error => setState({ ...state, 'areaError': error }))}
                        onSubmitEditing={() => inputRefs['nationalId'].current.focus()}
                        onChangeText={area => changeHandler('area', area.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.areaError}</Text>

                <TouchableOpacity onPress={() => setIsCLModal(true)} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{country?.name ? country.name : 'Country*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.countryError}</Text>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        ref={inputRefs.nationalId}
                        value={state.nationalId}
                        style={styles.input}
                        returnKeyType={'done'}
                        placeholder="National ID*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'nationalIdError': '' })}
                        onBlur={() => validateFields(state.nationalId, 'nationalId', error => setState({ ...state, 'nationalIdError': error }))}
                        onChangeText={nationalId => changeHandler('nationalId', nationalId.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.nationalIdError}</Text>

                <View style={styles.progressCont}>
                    <View style={styles.circleCont}>
                        <View style={styles.circle} />
                        <View style={styles.circleActive} />
                        <View style={styles.circle} />
                    </View>

                    <View style={styles.hLine} />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={_navigate} style={styles.nextBtn}>
                        <AntDesign name='arrowright' style={styles.icon1} />
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
        width: (_width * 0.72),
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

export default TutorRegStep2;