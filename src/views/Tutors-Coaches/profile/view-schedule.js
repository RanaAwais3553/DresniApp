import React, { useRef, useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from "react-redux";
import { GetTutorSchedule } from "../../../redux/actions/tutor-coach";
import moment from 'moment'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { DeleteIcon, Editprofile1 } from '../../../assets/Images/index'
import { useIsMountedRef } from '../../../utilities/mounted-ref'
import { keyboardListeners } from '../../../utilities/keyboard-listeners'
import { validateFields } from '../../../utilities/validate-fields'
import validator from '../../../validation/validator'
import { ModalContainer, DropDownModal, LoaderModal } from '../../../modals'
import { useDebouncedEffect } from '../../../utilities/handle-debounce'
import { AsyncStorageService } from '../../../services';

const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timings = ['9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm',
    '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm', '12:00 am'];

const ViewSchedule = (props) => {
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const [weeklySchedule, setWeeklySchedule] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [daysState, setDaysState] = useState({
        isModal: false,
        day: null
    });

    const [stTimeState, setSTState] = useState({
        isModal: false,
        startTime: null
    });

    const [etTimeState, setETState] = useState({
        isModal: false,
        endTime: null
    });

    useEffect(() => {
        let tutorSchedule = props?.route?.params?.tutorSchedule;

        if (!tutorSchedule) {
            _getTutorSchedule()
        } else {
            tutorSchedule = tutorSchedule && JSON.parse(tutorSchedule);
            setWeeklySchedule(tutorSchedule?.weeklySchedule);
            setIsLoading(false)
        }
    }, [])

    const _getTutorSchedule = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const resp = await dispatch(GetTutorSchedule({ tutorId: user?.userId }));

        if (resp) {
            const tutorSchedule = resp?.data;
            setWeeklySchedule(tutorSchedule?.weeklySchedule);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    const _updateDetails = async () => {
        if (weeklySchedule?.length) props?.route?.params?._updateDetails(weeklySchedule);
    }

    const cleanDropdownState = () => {
        // clean dropdown state
        setDaysState({ day: null })
        setSTState({ startTime: null })
        setETState({ endTime: null })
    }

    const _addSlot = () => {
        const day = daysState?.day;
        const startTime = stTimeState?.startTime;
        const endTime = etTimeState?.endTime;

        if (weeklySchedule.length) {
            const addedSlot = weeklySchedule.find(x => x.day == day);

            if (!addedSlot) {
                weeklySchedule.push({ day, startTime, endTime });
                cleanDropdownState();
            } else {
                alert(`You have already set ${day} shedule.`)
            }
        } else {
            if (day && startTime && endTime) {
                weeklySchedule.push({ day, startTime, endTime });
                cleanDropdownState();
            }
        }
    }

    const _removeSlot = (day) => setweeklySchedule(weeklySchedule.filter(x => x?.day != day));
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
                isVisible={daysState.isModal}
                items={days}
                _closeModal={() => _closeModal(daysState, setDaysState, 'isModal', false)}
                onSelect={day => setDaysState({ ...daysState, isModal: false, day })} />

            <ModalWrapper
                height={0.65}
                isVisible={stTimeState.isModal}
                items={timings}
                _closeModal={() => _closeModal(stTimeState, setSTState, 'isModal', false)}
                onSelect={startTime => setSTState({ ...stTimeState, isModal: false, startTime })} />

            <ModalWrapper
                height={0.45}
                isVisible={etTimeState.isModal}
                items={timings}
                _closeModal={() => _closeModal(etTimeState, setETState, 'isModal', false)}
                onSelect={endTime => setETState({ ...etTimeState, isModal: false, endTime })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>VIEW MY <Text style={styles.title1}>SCHEDULE</Text></Text>
                }
                hideMenus={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <View style={styles.slDayContainer}>
                    <TouchableOpacity onPress={() => setDaysState({ ...daysState, isModal: true })} style={[styles.inputGroup, styles.smInputGroup, { width: (_width * 0.3) }]}>
                        <Text style={styles.slDayTxt}>{daysState.day ? daysState.day : 'Select Days'}</Text>

                        <AntDesign name="down" size={moderateScale(10)} color="#011E41" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSTState({ ...stTimeState, isModal: true })} style={[styles.inputGroup, styles.smInputGroup]}>
                        <Text style={styles.slDayTxt}>{stTimeState.startTime ? stTimeState.startTime : 'Start Time'}</Text>

                        <AntDesign name="down" size={moderateScale(10)} color="#011E41" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setETState({ ...etTimeState, isModal: true })} style={[styles.inputGroup, styles.smInputGroup]}>
                        <Text style={styles.slDayTxt}>{etTimeState.endTime ? etTimeState.endTime : 'End Time'}</Text>

                        <AntDesign name="down" size={moderateScale(10)} color="#011E41" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={_addSlot} style={{ width: moderateScale(30), height: moderateScale(30), borderRadius: moderateScale(15), backgroundColor: "#001E41", alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name="plus" color="#fff" size={moderateScale(20)} />
                    </TouchableOpacity>
                </View>

                {
                    weeklySchedule?.map((item, i) => {
                        return (
                            <View key={i} style={[styles.bookingDetailsActive, { marginTop: (i == 0 ? moderateScale(30) : moderateScale(10)) }]}>
                                <View>
                                    <Text style={styles.subject}>{item?.day}</Text>
                                    <Text style={styles.timing}>Start Time {item?.startTime} - End Time {item?.endTime}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Editprofile1 width={moderateScale(23)} height={moderateScale(23)} />
                                    <DeleteIcon onPress={() => _removeSlot(item?.day)} width={moderateScale(23)} height={moderateScale(23)} />
                                </View>
                            </View>
                        );
                    })
                }

                {/* 
                <View style={[styles.bookingDetailsActive, { backgroundColor: '#001E41' }]}>
                    <View>
                        <Text style={styles.date}>September 16, 2021</Text>
                        <Text style={styles.subject}>TUESDAY</Text>
                        <Text style={styles.timing}>Start Time 9:00 am - End Time 10:00 am</Text>
                        <Text style={styles.sessionType}>Digital Session - Via Zoom</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Editprofile1 width={moderateScale(23)} height={moderateScale(23)} />
                        <DeleteIcon width={moderateScale(23)} height={moderateScale(23)} />
                    </View>
                </View>

                <View style={[styles.bookingDetailsActive, { backgroundColor: '#001E41' }]}>
                    <View>
                        <Text style={styles.date}>September 17, 2021</Text>
                        <Text style={styles.subject}>WEDNESDAY</Text>
                        <Text style={styles.timing}>Start Time 9:00 am - End Time 10:00 am</Text>
                        <Text style={styles.sessionType}>Digital Session - Via Zoom</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Editprofile1 width={moderateScale(23)} height={moderateScale(23)} />
                        <DeleteIcon width={moderateScale(23)} height={moderateScale(23)} />
                    </View>
                </View> */}
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
        alignSelf: 'center',
        marginBottom: moderateScale(80),
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
    bookingDetailsActive: { flexDirection: 'row', justifyContent: 'space-between', width: (_width * 0.86), height: moderateScale(90), marginTop: moderateScale(15), alignSelf: 'center', borderRadius: moderateScale(20), backgroundColor: '#9F172E', paddingTop: moderateScale(10), paddingHorizontal: moderateScale(20) },
    date: { color: '#fff', fontSize: moderateScale(12), fontFamily: 'Barlow-Regular' },
    subject: { color: '#fff', fontSize: moderateScale(24), fontFamily: 'Barlow-Bold' },
    timing: { color: '#fff', fontSize: moderateScale(14), fontFamily: 'BarlowCondensed-Bold', marginTop: moderateScale(4) },
    sessionType: { color: '#fff', fontSize: moderateScale(11), fontFamily: 'Barlow-Regular' },
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
    slDayContainer: { width: (_width * 0.9), alignSelf: 'center', marginTop: moderateScale(23), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    slDayTxt: { color: '#C6C7C9', fontSize: moderateScale(12), fontFamily: 'Barlow-Regular' },

    footer: {
        position: 'absolute',
        bottom: moderateScale(20),
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
    updBtn: { height: moderateScale(50), width: (_width * 0.86), marginTop: moderateScale(5), borderRadius: moderateScale(25), alignItems: 'center', justifyContent: 'center', backgroundColor: '#9C182F' },
    updTxt: { fontSize: moderateScale(16), fontFamily: 'Barlow-Bold', color: '#fff' },
})

export default ViewSchedule;