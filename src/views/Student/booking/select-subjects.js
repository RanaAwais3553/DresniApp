import React, { useRef, useState } from 'react'
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from "react-redux";
import { SetupBooking } from "../../../redux/actions/app-local";

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { Accounts, Computer, Study1, Technology } from '../../../assets/Images'


const SelectSubjects = (props) => {
    const dispatch = useDispatch();
    const appLocalState = useSelector(state => state.appLocal);

    const onSetupBooking = (subject) => {
        dispatch(SetupBooking({ subject }));
        props.navigation.navigate('SelectSession')
    }

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}>SELECT YOUR SUBJECTS</Text>
                }
                backIcon={true}
            />

            <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.wrapper}>
                <View style={styles.sCardContainer}>
                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('GCSEs')} style={styles.sCard}>
                            <Study1 width={moderateScale(55)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>GCSEs</Text>
                    </View>

                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('Computer')} style={styles.sCard}>
                            <Computer width={moderateScale(60)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>Computer</Text>
                    </View>

                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('Technology')} style={styles.sCard}>
                            <Technology width={moderateScale(60)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>Technology</Text>
                    </View>

                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('Accounts')} style={styles.sCard}>
                            <Accounts width={moderateScale(60)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>Accounts</Text>
                    </View>

                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('GCSEs')} style={styles.sCard}>
                            <Study1 width={moderateScale(55)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>GCSEs</Text>
                    </View>

                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('Computer')} style={styles.sCard}>
                            <Computer width={moderateScale(60)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>Computer</Text>
                    </View>

                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('Technology')} style={styles.sCard}>
                            <Technology width={moderateScale(60)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>Technology</Text>
                    </View>

                    <View style={styles.sCardWrapper}>
                        <TouchableOpacity onPress={() => onSetupBooking('Accounts')} style={styles.sCard}>
                            <Accounts width={moderateScale(60)} height={moderateScale(60)} />
                        </TouchableOpacity>

                        <Text style={styles.sTxt}>Accounts</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Feather style={styles.icon} name="search" />

                        <TextInput
                            // ref={x => }
                            style={[styles.input, { fontWeight: 'bold' }]}
                            placeholderTextColor={"#666666"}
                            placeholder="Advance search..."
                        />
                    </View>
                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        width: (_width * 0.84),
        alignSelf: 'center',
        marginTop: moderateScale(20),
        flex: 1.2,
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(18),
        fontFamily: 'Barlow-Bold',
        marginTop: moderateScale(35),
    },
    sCardContainer: { width: (_width * 0.84), flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    sCardWrapper: { alignItems: 'center', marginTop: moderateScale(10), },
    sCard: { width: moderateScale(64), height: moderateScale(66), borderRadius: moderateScale(7), alignItems: 'center', justifyContent: 'center', backgroundColor: '#BFBFBF' },
    sTxt: { fontSize: moderateScale(10), color: '#8A8A8A', fontFamily: 'Barlow-Regular', marginTop: moderateScale(2) },

    inputGroup: {
        width: (_width * 0.84),
        height: moderateScale(60),
        borderWidth: moderateScale(1),
        borderColor: '#E5E5E6',
        borderRadius: moderateScale(30),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: moderateScale(15),
        marginTop: moderateScale(60),
    },
    input: {
        width: moderateScale(200),
        height: moderateScale(50),
        fontSize: moderateScale(14),
        marginLeft: moderateScale(10),
        color: '#666666'
    },
    icon: {
        fontSize: moderateScale(20),
        color: '#666666',
        marginLeft: moderateScale(5)
    },
})

export default SelectSubjects;