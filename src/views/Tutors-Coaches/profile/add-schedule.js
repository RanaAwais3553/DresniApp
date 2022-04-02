import React, { useRef, useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from "react-redux";
import { GetTutorSchedule, SaveTutorSchedule } from "../../../redux/actions/tutor-coach";
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
import { AsyncStorageService } from '../../../services';


const gmtData = ['-1', '-2', '-3', '-4', '-5', '6', '-7', '-8', '-9', '-10', '-11', '-12',
    'Universal time 0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9', '+10', '+11', '+12'];
const bookingBreaks = ['10 minutes', '20 minutes', '30 minutes', '40 minutes', '50 minutes', '1 hour'];

const AddSchedule = (props) => {
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const tutorSchedule = useSelector(state => state?.tutorAndCoach?.tutorSchedule);

    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({
        gmtError: '',
        bookingBreakError: '',
    });

    const [scheduleStatus, setScheduleStatus] = useState(true)

    // dropdowns state
    const [gmtState, setGMTState] = useState({
        isModal: false,
        gmtOffset: null
    });

    const [bookingBreaksState, setBookingBreaksState] = useState({
        isModal: false,
        bookingBreak: null
    });

    useEffect(() => {
        if (tutorSchedule) {
            setGMTState({ ...state, gmtOffset: tutorSchedule?.gmtOffset });
            setBookingBreaksState({ ...state, bookingBreak: tutorSchedule?.bookingBreak });
            setIsLoading(false)
        } else {
            _getTutorSchedule();
        }
    }, [tutorSchedule])

    const _getTutorSchedule = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const resp = await dispatch(GetTutorSchedule({ tutorId: user?.userId }));

        if (resp) setIsLoading(false)
        else setIsLoading(false)
    }

    const _updateDetails = async (weeklySchedule) => {
        const user = await AsyncStorageService.getObject('@user');
        const gmtError = await validator('gmtOffset', gmtState?.gmtOffset);
        const bookingBreakError = await validator('bookingBreak', bookingBreaksState?.bookingBreak);

        if (weeklySchedule?.length) {
            setIsLoading(true);
            const resp = await dispatch(SaveTutorSchedule({
                tutorId: user?.userId,
                weeklySchedule
            }));

            if (resp) setIsLoading(false)
            else setIsLoading(false)
        } else {
            if (!gmtError && !bookingBreakError) {
                setIsLoading(true);
                const resp = await dispatch(SaveTutorSchedule({
                    tutorId: user?.userId,
                    gmtOffset: gmtState?.gmtOffset,
                    bookingBreak: bookingBreaksState?.bookingBreak
                }));

                if (resp) setIsLoading(false)
                else setIsLoading(false)
            } else {
                setState({ ...state, gmtError, bookingBreakError })
            }
        }
    }

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
            <ModalContainer
                isVisible={isLoading}
                modalName={"uncloseable"}
                modalContent={() => LoaderModal()} />

            <ModalWrapper
                height={0.65}
                isVisible={gmtState.isModal}
                items={gmtData}
                _closeModal={() => _closeModal(gmtState, setGMTState, 'isModal', false)}
                onSelect={gmtOffset => setGMTState({ ...gmtState, isModal: false, gmtOffset })} />

            <ModalWrapper
                height={0.55}
                isVisible={bookingBreaksState.isModal}
                items={bookingBreaks}
                _closeModal={() => _closeModal(bookingBreaksState, setBookingBreaksState, 'isModal', false)}
                onSelect={bookingBreak => setBookingBreaksState({ ...bookingBreaksState, isModal: false, bookingBreak })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>ADD MY <Text style={styles.title1}>SCHEDULE</Text></Text>
                }
                backIcon={true}
            />

            <View style={styles.statusContainer}>
                <Text style={styles.stTxt}>YOUR <Text style={styles.stTxt1}>STATUS</Text></Text>

                <ToggleSwitch
                    isOn={scheduleStatus == true}
                    onColor="#011E41"
                    offColor="#9C182F"
                    size="medium"
                    onToggle={() => setScheduleStatus(!scheduleStatus)}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <TouchableOpacity onPress={() => setGMTState({ ...gmtState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(40) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{gmtState.gmtOffset ? gmtState.gmtOffset : 'Your GMT?'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.gmtError}</Text>

                <TouchableOpacity onPress={() => setBookingBreaksState({ ...bookingBreaksState, isModal: true })} style={[styles.inputGroup]}>
                    <Text style={{ color: '#C6C7C9' }}>{bookingBreaksState.bookingBreak ? bookingBreaksState.bookingBreak : 'Add Breaks Between Bookings'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.bookingBreakError}</Text>

                {/* <TouchableOpacity onPress={() => setBookingBreaksState({ ...bookingBreaksState, isModal: true })} style={[styles.inputGroup]}>
                    <Text style={{ color: '#C6C7C9' }}>{bookingBreaksState.bookingBreak ? bookingBreaksState.bookingBreak : ''}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.bookingBreakError}</Text> */}

                <TouchableOpacity onPress={() => props.navigation.navigate("ViewSchedule", { _updateDetails })} style={[styles.updBtn, { marginTop: moderateScale(20) }]}>
                    <Text style={styles.updTxt}>Set Weekly Schedule</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={_updateDetails} style={styles.updBtn}>
                    <Text style={styles.updTxt}>Update Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        width: (_width * 0.8),
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
    statusContainer: { width: (_width * 1), height: moderateScale(50), backgroundColor: '#C6C7C9', marginTop: moderateScale(25), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
    stTxt: { fontSize: moderateScale(24), fontFamily: 'Barlow-Regular', color: '#001E41' },
    stTxt1: { fontFamily: 'Barlow-Bold', color: '#001E41' },
    inputGroup: {
        width: (_width * 0.8),
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
    errtxt: {
        color: 'red'
    },
    footer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: moderateScale(20)
    },
    updBtn: { height: moderateScale(50), width: (_width * 0.8), marginTop: moderateScale(5), borderRadius: moderateScale(25), alignItems: 'center', justifyContent: 'center', backgroundColor: '#9C182F' },
    updTxt: { fontSize: moderateScale(16), fontFamily: 'Barlow-Bold', color: '#fff' },
})

export default AddSchedule;