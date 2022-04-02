import React, { useRef, useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from "react-redux";
import { SaveTutorSubject, SaveRequestedSubject, GetTutorSubjects, UpdateSubjectAndLanguage, DeleteSubject } from "../../../redux/actions/tutor-coach";
import moment from 'moment'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { useIsMountedRef } from '../../../utilities/mounted-ref'
import { keyboardListeners } from '../../../utilities/keyboard-listeners'
import { validateFields } from '../../../utilities/validate-fields'
import validator from '../../../validation/validator'
import { ModalContainer, DropDownModal, LoaderModal } from '../../../modals'
import { useDebouncedEffect } from '../../../utilities/handle-debounce'
import ToggleSwitch from 'toggle-switch-react-native'
import { Study1, Computer, Technology, Accounts, Addsubjects, Editprofile, DeleteIcon1 } from '../../../assets/Images/index'
import { AsyncStorageService } from '../../../services';

const subjects = ['English', 'Physics', 'Math', 'Accounts', 'Chemistry', 'Computer Science', 'Botany', 'Zoology', 'Arabic']

const Subjects = (props) => {
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const reduxState = useSelector(state => state?.tutorAndCoach);

    const [state, setState] = useState({
        subjectError: '',
        language: '',
        languageError: '',
        requestSubject: '',
        subjectId: null,
        isSubjectAdded: false,
        isCrudIcons: false
    });
    const [isLoading, setIsLoading] = useState(true);

    // dropdowns state
    const [subjectState, setSubjectState] = useState({
        isModal: false,
        subject: null
    });

    useEffect(() => {
        _getTutorSubjects();
    }, [state.isSubjectAdded])

    const _getTutorSubjects = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const resp = await dispatch(GetTutorSubjects({ tutorId: user?.userId }))

        if (resp) {
            setState({ ...state, isSubjectAdded: false })
            setIsLoading(false)
        }
        else setIsLoading(false)
    }

    const _updateDetails = async () => {
        const user = await AsyncStorageService.getObject('@user');

        if (state?.language && subjectState?.subject) {
            setIsLoading(true)
            const resp = await dispatch(SaveTutorSubject({ tutorId: user?.userId, subject: subjectState?.subject, language: state?.language }))

            if (resp) {
                setState({ ...state, language: '', isSubjectAdded: true })
                setSubjectState({ ...subjectState, subject: null })
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        } else {
            alert('Please add language and subject');
            setIsLoading(false)
        }
    }

    const _requestSubject = async () => {
        const user = await AsyncStorageService.getObject('@user');

        if (state?.requestSubject) {
            const resp = await dispatch(SaveRequestedSubject({ userId: user?.userId, subject: state?.requestSubject }))
            if (resp) setState({ ...state, requestSubject: '' })
        } else {
            alert('Please add requested subject');
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

    const _selectSubject = (item, i) => {
        setState({ ...state, language: item?.language, subjectId: i, isCrudIcons: true })
        setSubjectState({ ...subjectState, subject: item?.subjectName })
    }

    const _updateSubjectAndLanguage = async () => {
        const user = await AsyncStorageService.getObject('@user');

        const resp = await dispatch(UpdateSubjectAndLanguage({ tutorId: user?.userId, subject: subjectState?.subject, language: state?.language, subjectId: state?.subjectId }))

        if (resp) {
            setState({ ...state, language: '', subjectId: null, isSubjectAdded: true, isCrudIcons: false })
            setSubjectState({ ...subjectState, subject: null })
        }
    }

    const _deleteSubject = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const resp = await dispatch(DeleteSubject({ tutorId: user?.userId, subject: subjectState?.subject, isCrudIcons: false }))
        if (resp) {
            setState({ ...state, language: '', subjectId: null, isSubjectAdded: true, isCrudIcons: false })
            setSubjectState({ ...subjectState, subject: null })
        }
    }

    return (
        <View style={styles.container}>
            <ModalContainer
                isVisible={isLoading}
                modalName={"uncloseable"}
                modalContent={() => LoaderModal()} />

            <ModalWrapper
                height={0.65}
                isVisible={subjectState.isModal}
                items={subjects}
                _closeModal={() => _closeModal(subjectState, setSubjectState, 'isModal', false)}
                onSelect={subject => setSubjectState({ ...subjectState, isModal: false, subject })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>ADD MY <Text style={styles.title1}>SCHEDULE</Text></Text>
                }
                hideMenus={true}
                backIcon={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <View style={[styles.sCardContainer, { marginTop: moderateScale(20) }]}>
                    {
                        reduxState?.tutorSubjects?.subjects?.map((item, i) => {
                            return (
                                <TouchableOpacity onPress={() => _selectSubject(item, i)} key={i} style={styles.sCardWrapper}>
                                    <View style={styles.sCard}>
                                        <Study1 width={moderateScale(55)} height={moderateScale(60)} />
                                    </View>

                                    <Text style={styles.sTxt}>{item?.subjectName}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>

                <TouchableOpacity onPress={() => setSubjectState({ ...subjectState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(30) }]}>
                    <Text style={{ color: subjectState?.subject ? '#000' : '#C6C7C9' }}>{subjectState.subject ? subjectState.subject : 'What can you teach?'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                {/* <Text style={styles.errtxt}>{state.subjectError}</Text> */}

                <View style={[styles.inputGroup, { justifyContent: 'space-evenly', marginTop: moderateScale(10) }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Languages"
                        placeholderTextColor={'#C6C7C9'}
                        value={state?.language}
                        // onFocus={() => setState({ ...state, 'languageError': '' })}
                        // onBlur={() => validateFields(state.language, 'language', error => setState({ ...state, 'languageError': error }))}
                        onChangeText={language => changeHandler('language', language.trim())}
                        autoCapitalize={'none'}
                    />

                    <Feather style={styles.icon} name="search" />
                </View>
                {/* <Text style={styles.errtxt}>{state.languageError}</Text> */}

                <View style={[styles.inputGroup, { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-evenly', height: moderateScale(110), marginTop: moderateScale(20) }]}>
                    <TextInput
                        style={[styles.input, { textAlignVertical: 'top' }]}
                        placeholderTextColor={"#C6C7C9"}
                        multiline={true}
                        value={state?.requestSubject}
                        placeholder={`What are you looking for? ${'\n'} Request to add a new subject HERE`}
                        onChangeText={requestSubject => changeHandler('requestSubject', requestSubject.trim())}
                        autoCapitalize={'none'}
                    />

                    <Text style={styles.inTxt} onPress={_requestSubject}>Send Request</Text>
                </View>

                {
                    state?.isCrudIcons ? (
                        <View style={styles.crudIconsContainer}>
                            {/* <Addsubjects style={styles.crudIcon} /> */}
                            <Editprofile onPress={_updateSubjectAndLanguage} style={styles.crudIcon} />
                            <DeleteIcon1 onPress={_deleteSubject} style={styles.crudIcon} />
                        </View>
                    ) : null
                }

                <View style={styles.footer}>
                    <TouchableOpacity onPress={_updateDetails} style={[styles.updBtn, { marginTop: state?.isCrudIcons ? moderateScale(20) : moderateScale(50) }]}>
                        <Text style={styles.updTxt}>Update Details</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        width: (_width * 0.86),
        alignSelf: 'center',
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
    sCardContainer: { width: (_width * 0.86), flexDirection: 'row', flexWrap: 'wrap' },
    sCardWrapper: { alignItems: 'center', marginTop: moderateScale(10), marginHorizontal: moderateScale(5) },
    sCard: { width: moderateScale(64), height: moderateScale(66), borderRadius: moderateScale(7), alignItems: 'center', justifyContent: 'center', backgroundColor: '#4D4E50' },
    sTxt: { fontSize: moderateScale(10), color: '#8A8A8A', fontFamily: 'Barlow-Regular', marginTop: moderateScale(2) },

    inputGroup: {
        width: (_width * 0.86),
        height: moderateScale(50),
        // backgroundColor: '#E5E5E6',
        borderWidth: moderateScale(2),
        borderColor: '#011E41',
        borderRadius: moderateScale(25),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingHorizontal: moderateScale(15)
    },
    smInputGroup: { width: (_width * 0.23), height: moderateScale(30), paddingHorizontal: moderateScale(5) },
    slDayContainer: { marginTop: moderateScale(13), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    slDayTxt: { color: '#C6C7C9', fontSize: moderateScale(12), fontFamily: 'Barlow-Regular' },
    input: {
        width: (_width * 0.72),
        height: moderateScale(50),
        fontSize: moderateScale(14),
        color: '#000',
        fontFamily: 'Barlow-Regular'
    },
    inTxt: {
        color: '#000',
        fontSize: moderateScale(11)
    },
    icon: {
        fontSize: moderateScale(20),
        color: '#000',
        marginLeft: moderateScale(5)
    },

    crudIconsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: moderateScale(100),
        height: moderateScale(40),
        marginTop: moderateScale(40)
    },
    crudIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
        marginHorizontal: moderateScale(10)
    },

    errtxt: {
        color: 'red'
    },
    footer: {
        alignSelf: 'center',
        marginBottom: moderateScale(10)
    },
    updBtn: { height: moderateScale(50), width: (_width * 0.86), borderRadius: moderateScale(25), alignItems: 'center', justifyContent: 'center', backgroundColor: '#9C182F' },
    updTxt: { fontSize: moderateScale(16), fontFamily: 'Barlow-Bold', color: '#fff' },
})

export default Subjects;