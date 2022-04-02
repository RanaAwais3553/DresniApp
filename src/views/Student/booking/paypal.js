import React, { Component } from "react";
import { Text, View, TouchableHighlight, KeyboardAvoidingView, Platform, Alert } from "react-native";
import ApiUrls from "../../../config/api-urls";
import { WebView } from 'react-native-webview';
import { CommonActions } from '@react-navigation/native';
import { AsyncStorageService } from '../../../services';


export default class Paypal extends Component {
    state = {
        studentId: null,
        studentName: null,
        studentEmail: null,
        tutorId: null,
        sessionFee: null,
        sessionType: null,
        sessionDate: null,
        sessionTiming: null,
        subjects: null,
    }

    componentDidMount = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const studentId = user?.userId;
        const studentName = user?.userData?.fullname;
        const studentEmail = user?.userData?.email;
        const tutorId = 'testingtutorId';
        const sessionFee = 100;
        const sessionType = 'digital';
        const sessionDate = new Date().toISOString();
        const sessionTiming = [new Date().toLocaleString(), new Date().toLocaleString()];
        const subjects = ['technology'];

        this.setState({ studentId, studentName, studentEmail, tutorId, sessionFee, sessionType, sessionDate, sessionTiming, subjects })
    }

    _onNavigationStateChange = async (webViewState) => {
        // const { studentId, studentName, studentEmail, tutorId, sessionFee } = this.state;

        if (webViewState.url.includes('success')) {
            this.props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "BookingConfirmation", params: {} }] }));
        } else if (webViewState.url.includes('cancel')) {
            Alert.alert(
                'Daresni App',
                `Error in payment, Please contact customer support!`,
                [
                    {
                        text: 'Ok',
                        onPress: () => (
                            this.props.navigation.navigate("PaymentMethod", {})
                        )
                    },
                ],
                { cancelable: false },
            )
        }
    }

    render() {
        const { studentId, studentName, studentEmail, tutorId, sessionFee, sessionType, sessionDate, sessionTiming, subjects } = this.state;

        const obj = JSON.stringify({ studentId, studentName, studentEmail, tutorId, sessionFee, sessionType, sessionDate, sessionTiming, subjects });

        return (
            <KeyboardAvoidingView
                style={{ height: '100%', flex: 1 }}
                behavior="padding"
                enabled={Platform.OS === "android"}>
                <WebView
                    style={{ flex: 1 }}
                    source={{
                        uri: `${ApiUrls.baseUrl + ApiUrls.paypal}?data=${obj}`, method: 'GET'
                    }}
                    ref={(webView) => this.webView = webView}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                />
            </KeyboardAvoidingView>
        );
    }
}