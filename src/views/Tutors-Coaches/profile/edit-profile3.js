import React, { useEffect, useState } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import { RegisterTutorAndCoach } from "../../../redux/actions/tutor-coach";

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { useIsMountedRef } from '../../../utilities/mounted-ref'
import { keyboardListeners } from '../../../utilities/keyboard-listeners'
import { validateFields } from '../../../utilities/validate-fields'
import validator from '../../../validation/validator'
import { ModalContainer, DropDownModal } from '../../../modals'


const TutorRegStep3 = (props) => {
    const tutorAccount = useSelector(state => state?.tutorAndCoach?.tutorAccount);
    const dispatch = useDispatch();

    const [profilePhoto, setProfilePhoto] = useState(null)
    const [state, setState] = useState({
        pricing: '',
        tlanuagesError: '',
        expertiseError: '',
        teachingSubjectsError: '',
        teachModeError: '',
        pricingError: '',
        profilePhotoError: '',
    });

    // dropdowns state
    const [tlanguagesState, setTlanguagesState] = useState({
        isModal: false,
        tlanguages: null
    });
    const [expertiseState, setExpertiseState] = useState({
        isModal: false,
        expertise: null
    });
    const [teachingSubjectsState, setTeachingSubjectsState] = useState({
        isModal: false,
        teachingSubjects: null
    });
    const [teachModeState, setTeachModeState] = useState({
        isModal: false,
        teachMode: null
    });

    useEffect(() => {
        if (tutorAccount) {
            setTlanguagesState({ ...tlanguagesState, tlanguages: tutorAccount?.tlanguages });
            setExpertiseState({ ...expertiseState, expertise: tutorAccount?.expertise });
            setTeachingSubjectsState({ ...teachingSubjectsState, teachingSubjects: tutorAccount?.teachingSubjects })
            setTeachModeState({ ...teachModeState, teachMode: tutorAccount?.teachMode });
            setState({
                ...state,
                pricing: tutorAccount?.pricing,
            })
        }
    }, [])

    const _navigate = async () => {
        const { pricing } = state;
        const tlanuagesError = await validator('tlanguages', tlanguagesState.tlanguages);
        const expertiseError = await validator('expertise', expertiseState.expertise);
        const teachingSubjectsError = await validator('teachingSubjects', teachingSubjectsState.teachingSubjects);
        const teachModeError = await validator('teachMode', teachModeState.teachMode);
        const pricingError = await validator('pricing', pricing);
        // const profilePhotoError = await validator('profilePhoto', profilePhoto);

        if (!tlanuagesError && !expertiseError && !teachingSubjectsError && !teachModeError && !pricingError) {
            var registrationObj = JSON.parse(props.route.params?.registrationObj);
            registrationObj = JSON.stringify({ ...registrationObj, pricing, tlanguages: tlanguagesState.tlanguages, expertise: expertiseState.expertise, teachingSubjects: teachingSubjectsState.teachingSubjects, teachMode: teachModeState.teachMode });

            props.navigation.navigate("EditProfile4", { registrationObj })
            setState({ ...state, tlanuagesError: '', expertiseError: '', teachingSubjectsError: '', teachModeError: '', pricingError: '', profilePhotoError: '' })
        } else {
            setState({ ...state, tlanuagesError, expertiseError, teachingSubjectsError, teachModeError, pricingError, profilePhotoError })
        }
    }

    const _pickProfileImage = () => {
        const options = {
            width: moderateScale(100),
            height: moderateScale(100),
            multiple: false,
            includeBase64: true,
            compressImageQuality: 0.1,
            mediaType: 'photo'
        };

        ImagePicker.openPicker(options)
            .then(profilePhoto => {
                setProfilePhoto({ _name: 'profilePhoto', filename: 'profilePhoto', data: profilePhoto.data, path: profilePhoto.path })
            })
            .catch(err => console.log(err));
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
                isVisible={tlanguagesState.isModal}
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
                _closeModal={() => _closeModal(tlanguagesState, setTlanguagesState, 'isModal', false)}
                onSelect={tlanguages => setTlanguagesState({ ...tlanguagesState, isModal: false, tlanguages })} />

            <ModalWrapper
                height={0.6}
                isVisible={expertiseState.isModal}
                items={[
                    'Economics',
                    'Engineering',
                    'Extra Curricular',
                    'Geography',
                    'History',
                    'Information Technology (IT)',
                    'Mathematics',
                    'Physical Education/Sports',
                    'Religious Education',
                    'Social Studies',
                    'Study Support & Resources'
                ]}
                _closeModal={() => _closeModal(expertiseState, setExpertiseState, 'isModal', false)}
                onSelect={expertise => setExpertiseState({ ...expertiseState, isModal: false, expertise })} />

            <ModalWrapper
                height={0.6}
                isVisible={teachingSubjectsState.isModal}
                items={[
                    'Economics',
                    'Engineering',
                    'Extra Curricular',
                    'Geography',
                    'History',
                    'Information Technology (IT)',
                    'Mathematics',
                    'Physical Education/Sports',
                    'Religious Education',
                    'Social Studies',
                    'Study Support & Resources'
                ]}
                _closeModal={() => _closeModal(teachingSubjectsState, setTeachingSubjectsState, 'isModal', false)}
                onSelect={teachingSubjects => setTeachingSubjectsState({ ...teachingSubjectsState, isModal: false, teachingSubjects })} />

            <ModalWrapper
                height={0.35}
                isVisible={teachModeState.isModal}
                items={['HOME / Private Session', ' Online Session', 'Both']}
                _closeModal={() => _closeModal(teachModeState, setTeachModeState, 'isModal', false)}
                onSelect={teachMode => setTeachModeState({ ...teachModeState, isModal: false, teachMode })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}><Text style={styles.title1}>EDIT MY</Text> PROFILE</Text>
                }
                backIcon={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <TouchableOpacity onPress={() => setTlanguagesState({ ...tlanguagesState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(40) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{tlanguagesState.tlanguages ? tlanguagesState.tlanguages : 'In which language you can teach?*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.tlanuagesError}</Text>

                <TouchableOpacity onPress={() => setExpertiseState({ ...expertiseState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{expertiseState.expertise ? expertiseState.expertise : 'Select of expertise?*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.expertiseError}</Text>

                <TouchableOpacity onPress={() => setTeachingSubjectsState({ ...teachingSubjectsState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{teachingSubjectsState.teachingSubjects ? teachingSubjectsState.teachingSubjects : 'What can you teach?*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.teachingSubjectsError}</Text>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <TextInput
                        value={state.pricing}
                        style={styles.input}
                        returnKeyType={'done'}
                        placeholder="Pricing(Per Hour)*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'pricingError': '' })}
                        onBlur={() => validateFields(state.pricing, 'pricing', error => setState({ ...state, 'pricingError': error }))}
                        onChangeText={pricing => changeHandler('pricing', pricing.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.pricingError}</Text>

                <TouchableOpacity onPress={() => setTeachModeState({ ...teachModeState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{teachModeState.teachMode ? teachModeState.teachMode : 'How can you teach?*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.teachModeError}</Text>

                <TouchableOpacity onPress={_pickProfileImage} style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{profilePhoto ? profilePhoto?.path?.substring(0, 30) + '...' : 'Profile Photo*'}</Text>

                    <SimpleLineIcons name="camera" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.profilePhotoError}</Text>

                <View style={styles.progressCont}>
                    <View style={styles.circleCont}>
                        <View style={styles.circle} />
                        <View style={styles.circle} />
                        <View style={styles.circleActive} />
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

export default TutorRegStep3;