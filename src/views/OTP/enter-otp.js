import React, { useState, useEffect } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from "react-redux";
import { VerifyOTP, ResendOTP } from "../../redux/actions/auth";

// local imports
import { Header } from '../../components'
import { moderateScale, _width } from '../../utilities'
import { useSmsUserConsent } from '@eabdullazyanov/react-native-sms-user-consent';
import { AsyncStorageService } from '../../services';


const EnterOTP = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [otpCode, setOtpCode] = useState(null);
    const retrievedCode = useSmsUserConsent();

    useEffect(() => {
        if (retrievedCode) {
            setOtpCode(retrievedCode);

            setTimeout(() => verifyOtp(retrievedCode), 500);
        }
    }, [retrievedCode]);

    const verifyOtp = async (otpCode) => {
        if (otpCode && otpCode.length == 6) {
            const resp = await dispatch(VerifyOTP({ otpCode }))

            if (resp?.statusCode == 200) {
                const contactNumber = props.route.params?.contactNumber;
                console.log('contactNumber', contactNumber);

                AsyncStorageService.storeString("@contactNumber", contactNumber);
                props.navigation.navigate("SelectProfile");
            }
        }
    }

    const resendOtp = () => {
        dispatch(ResendOTP({ userId: authState.userId }))
    }

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                hideMenus={true} />

            <View style={styles.wrapper}>
                <Text style={styles.label}>Your verification (OTP) code</Text>

                <OTPInputView
                    style={{ height: moderateScale(70), width: '100%' }}
                    pinCount={6}
                    code={otpCode || ''} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged={code => setOtpCode(code)}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    onCodeFilled={(code => {
                        setOtpCode(code);
                        // console.log(`Code is ${code}, you are good to go!`)
                    })}
                />

                <View style={styles.txtCnt}>
                    <Text style={styles.label}>Not received code?</Text>
                    <Text onPress={resendOtp} style={styles.label1}> try again!</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => verifyOtp(otpCode)} style={styles.nextBtn}>
                    <AntDesign name='arrowright' style={styles.icon1} />
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
        alignItems: 'center',
        paddingTop: moderateScale(40),
        flex: 0.9,
    },
    label: {
        fontSize: moderateScale(18),
        color: '#9C182F',
        textAlign: 'center'
    },
    underlineStyleBase: {
        width: moderateScale(45),
        height: moderateScale(45),
        borderRadius: moderateScale(7),
        backgroundColor: "#E5E5E6",
        color: '#000'
    },
    txtCnt: {
        marginTop: moderateScale(120),
        flexDirection: 'row'
    },
    label1: {
        fontSize: moderateScale(18),
        color: '#011E41',
        textAlign: 'center'
    },
    footer: {
        flex: 0.3
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

export default EnterOTP;