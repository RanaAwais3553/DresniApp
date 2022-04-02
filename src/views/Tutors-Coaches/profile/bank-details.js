import React, { useRef, useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Keyboard } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from "react-redux";
import { SaveBankDetail, GetBankDetail } from "../../../redux/actions/tutor-coach";
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
import { AsyncStorageService } from '../../../services';


const BankDetails = (props) => {
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const reduxState = useSelector(state => state?.tutorAndCoach);
    const inputRefs = {
        'bank': useRef(null),
        'currency': useRef(null),
        'accHolderName': useRef(null),
        'accNumber': useRef(null),
        'ibanCode': useRef(null),
        'swiftCode': useRef(null),
    };

    const [state, setState] = useState({
        accHolderName: '',
        accHolderNameError: '',
        accNumber: '',
        accNumberError: '',
        ibanCode: '',
        ibanCodeError: '',
        swiftCode: '',
        swiftCodeError: '',
        utilityBill: '',
        utilityBillError: '',
        bankError: '',
        currencyError: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    // dropdowns state
    const [bankState, setBankState] = useState({
        isModal: false,
        bank: null
    });

    const [currencyState, setCurrencyState] = useState({
        isModal: false,
        currency: null
    });

    useEffect(() => {
        _getBankDetail();
    }, [])

    const _getBankDetail = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const bankDetail = await dispatch(GetBankDetail({ tutorId: user?.userId }));

        if (bankDetail) {
            const data = bankDetail?.data;
            setBankState({ ...bankState, bank: data?.bank })
            setCurrencyState({ ...currencyState, currency: data?.currency })
            setState({
                ...state,
                accHolderName: data?.accHolderName,
                accNumber: data?.accNumber,
                ibanCode: data?.ibanCode,
                swiftCode: data?.swiftCode,
                utilityBill: data?.utilityBill
            })
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    const _updateDetails = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const bankError = await validator('bank', bankState?.bank);
        const currencyError = await validator('currency', currencyState?.currency);
        const accHolderNameError = await validator('accHolderName', state?.accHolderName);
        const accNumberError = await validator('accNumber', state?.accNumber);
        const ibanCodeError = await validator('ibanCode', state?.ibanCode);
        const swiftCodeError = await validator('swiftCode', state?.swiftCode);

        if (!bankError && !currencyError && !accHolderNameError && !accNumberError && !ibanCodeError && !swiftCodeError) {
            setIsLoading(true);
            const resp = await dispatch(SaveBankDetail({
                tutorId: user?.userId,
                bank: bankState?.bank,
                currency: currencyState?.currency,
                accHolderName: state?.accHolderName,
                accNumber: state?.accNumber,
                ibanCode: state?.ibanCode,
                swiftCode: state?.swiftCode,
            }));

            if (resp) setIsLoading(false)
        } else {
            setState({ ...state, bankError, currencyError, accHolderNameError, accNumberError, ibanCodeError, swiftCodeError })
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
            <ModalContainer
                isVisible={isLoading}
                modalName={"uncloseable"}
                modalContent={() => LoaderModal()} />

            <ModalWrapper
                height={0.35}
                isVisible={bankState.isModal}
                items={['XYZ Bank', 'ABC Bank']}
                _closeModal={() => _closeModal(bankState, setBankState, 'isModal', false)}
                onSelect={bank => setBankState({ ...bankState, isModal: false, bank })} />

            <ModalWrapper
                height={0.45}
                isVisible={currencyState.isModal}
                items={['PKR', 'BHD', 'USD']}
                _closeModal={() => _closeModal(currencyState, setCurrencyState, 'isModal', false)}
                onSelect={currency => setCurrencyState({ ...currencyState, isModal: false, currency })} />

            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}><Text style={styles.title1}>BANK</Text> DETAILS</Text>
                }
                backIcon={true}
            />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"} style={styles.wrapper}>
                <TouchableOpacity onPress={() => setBankState({ ...bankState, isModal: true })} style={[styles.inputGroup, { marginTop: moderateScale(40) }]}>
                    <Text style={{ color: '#C6C7C9' }}>{bankState.bank ? bankState.bank : 'Bank*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.bankError}</Text>

                <TouchableOpacity onPress={() => setCurrencyState({ ...currencyState, isModal: true })} style={[styles.inputGroup]}>
                    <Text style={{ color: '#C6C7C9' }}>{currencyState.currency ? currencyState.currency : 'Currency*'}</Text>

                    <AntDesign name="down" size={moderateScale(20)} color="#011E41" />
                </TouchableOpacity>
                <Text style={styles.errtxt}>{state.currencyError}</Text>

                <View style={[styles.inputGroup]}>
                    <TextInput
                        ref={inputRefs.accHolderName}
                        value={state.accHolderName}
                        style={styles.input}
                        returnKeyType={'next'}
                        placeholder="Account Holder Name*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'accHolderNameError': '' })}
                        onBlur={() => validateFields(state.accHolderName, 'accHolderName', error => setState({ ...state, 'accHolderNameError': error }))}
                        onSubmitEditing={() => inputRefs['accNumber'].current.focus()}
                        onChangeText={accHolderName => changeHandler('accHolderName', accHolderName.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.accHolderNameError}</Text>

                <View style={[styles.inputGroup]}>
                    <TextInput
                        ref={inputRefs.accNumber}
                        value={state.accNumber}
                        style={styles.input}
                        returnKeyType={'next'}
                        placeholder="Account Number*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'accNumberError': '' })}
                        onBlur={() => validateFields(state.accNumber, 'accNumber', error => setState({ ...state, 'accNumberError': error }))}
                        onSubmitEditing={() => inputRefs['ibanCode'].current.focus()}
                        onChangeText={accNumber => changeHandler('accNumber', accNumber.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.accNumberError}</Text>

                <View style={[styles.inputGroup]}>
                    <TextInput
                        ref={inputRefs.ibanCode}
                        value={state.ibanCode}
                        style={styles.input}
                        returnKeyType={'next'}
                        placeholder="IBAN Code*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'ibanCodeError': '' })}
                        onBlur={() => validateFields(state.ibanCode, 'ibanCode', error => setState({ ...state, 'ibanCodeError': error }))}
                        onSubmitEditing={() => inputRefs['swiftCode'].current.focus()}
                        onChangeText={ibanCode => changeHandler('ibanCode', ibanCode.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.ibanCodeError}</Text>

                <View style={[styles.inputGroup]}>
                    <TextInput
                        ref={inputRefs.swiftCode}
                        value={state.swiftCode}
                        style={styles.input}
                        returnKeyType={'done'}
                        placeholder="(BIC)SWIFT Code*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'swiftCodeError': '' })}
                        onBlur={() => validateFields(state.swiftCode, 'swiftCode', error => setState({ ...state, 'swiftCodeError': error }))}
                        onChangeText={swiftCode => changeHandler('swiftCode', swiftCode.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                        onSubmitEditing={() => Keyboard.dismiss()}
                    />
                </View>
                <Text style={styles.errtxt}>{state.swiftCodeError}</Text>

                <View style={[styles.inputGroup]}>
                    <TextInput
                        value={state.utilityBill}
                        style={styles.input}
                        returnKeyType={'done'}
                        placeholder="Utility Bill Attachment*"
                        placeholderTextColor={'#C6C7C9'}
                        onFocus={() => setState({ ...state, 'utilityBillError': '' })}
                        onBlur={() => validateFields(state.utilityBill, 'utilityBill', error => setState({ ...state, 'utilityBillError': error }))}
                        onChangeText={utilityBill => changeHandler('utilityBill', utilityBill.trim())}
                        blurOnSubmit={false}
                        autoCapitalize={'none'}
                    />
                </View>
                <Text style={styles.errtxt}>{state.utilityBillError}</Text>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => _updateDetails()} style={styles.updBtn}>
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
        width: (_width * 0.72),
        height: moderateScale(40),
        fontSize: moderateScale(14),
        color: '#000'
    },
    errtxt: {
        color: 'red'
    },
    footer: {
        marginTop: moderateScale(10)
    },
    updBtn: { height: moderateScale(46), marginTop: moderateScale(5), borderRadius: moderateScale(30), alignItems: 'center', justifyContent: 'center', backgroundColor: '#9C182F' },
    updTxt: { fontSize: moderateScale(16), fontFamily: 'Barlow-Bold', color: '#fff' },
})

export default BankDetails;