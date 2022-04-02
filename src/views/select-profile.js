import React, { useState, useRef } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

// local imports
import { Header } from '../components'
import { moderateScale, _width } from '../utilities'


const SelectProfile = (props) => {
    const [selectedProfile, setSelectedProfile] = useState(null)

    const _navigate = () => {
        if (selectedProfile) {
            if (selectedProfile == 'student') {
                props.navigation.navigate('Student')
            } else if (selectedProfile == 'tutor') {
                props.navigation.navigate('Tutor')
            } else if (selectedProfile == 'institute') {
                alert('Under Development')
            }
        }
    }

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                hideMenus={true} />

            <View style={styles.wrapper}>
                <Text style={styles.label}>Here you go!</Text>

                <Text style={[styles.label1, styles.label1_ext]}>Choose your account type to proceed</Text>

                <View style={[styles.sCard, { marginTop: moderateScale(15) }]}>
                    <Text style={styles.label1}>USERS &  <Text style={{ color: '#011E41', fontWeight: 'bold' }}>STUDENTS</Text></Text>

                    <ToggleSwitch
                        isOn={selectedProfile == 'student'}
                        onColor="#011E41"
                        offColor="#9C182F"
                        size="medium"
                        onToggle={() => setSelectedProfile('student')}
                    />
                </View>

                <View style={styles.sCard}>
                    <Text style={styles.label1}>TUTORS & <Text style={{ color: '#011E41', fontWeight: 'bold' }}>COACHES</Text></Text>

                    <ToggleSwitch
                        isOn={selectedProfile == 'tutor'}
                        onColor="#011E41"
                        offColor="#9C182F"
                        size="medium"
                        onToggle={() => setSelectedProfile('tutor')}
                    />
                </View>

                <View style={styles.sCard}>
                    <Text style={styles.label1}>INSTITUTES &  <Text style={{ color: '#011E41', fontWeight: 'bold' }}>COURSES</Text></Text>

                    <ToggleSwitch
                        isOn={selectedProfile == 'institute'}
                        onColor="#011E41"
                        offColor="#9C182F"
                        size="medium"
                        onToggle={() => setSelectedProfile('institute')}
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={_navigate} style={styles.nextBtn}>
                    <AntDesign name='arrowright' style={styles.icon1} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        alignSelf: 'center',
        paddingTop: moderateScale(40),
        flex: 1,
    },
    label: {
        fontSize: moderateScale(22),
        color: '#9C182F',
        textAlign: 'center'
    },
    label1: {
        fontSize: moderateScale(20),
        color: '#011E41',
    },
    label1_ext: {
        textAlign: 'center',
        width: (_width * 0.5),
        alignSelf: 'center',
        fontSize: moderateScale(22),
        marginTop: moderateScale(15)
    },
    sCard: {
        width: (_width * 1),
        height: moderateScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(30),
        backgroundColor: '#BABBBD',
        marginTop: moderateScale(3)
    },
    icon: {
        fontSize: moderateScale(20)
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

export default SelectProfile;