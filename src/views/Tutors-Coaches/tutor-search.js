import React, { useRef } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

// local imports
import { Header } from '../../components'
import { moderateScale, _width } from '../../utilities'


const TutorSearch = (props) => {
    const inpRef = useRef();

    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <View style={styles.hBtn}>
                        <View style={styles.search}>
                            <Feather style={styles.sIcon} name="search" />
                        </View>

                        <Text style={styles.title}>Daresni Behrain - </Text><TextInput style={{ color: '#000' }} placeholderTextColor={"#000"} placeholder={'Search here'} />
                    </View>
                }
            />

            <View style={styles.wrapper}>
                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Tutors and Coaches"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Subject and Courses"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Countries"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Languages"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Available Tutors"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Weekend Courses"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={styles.input}
                        placeholderTextColor={"#000"}
                        placeholder="Sort by"
                    />
                </View>

                <View style={[styles.inputGroup, { marginTop: moderateScale(10) }]}>
                    <Feather style={styles.icon} name="search" />

                    <TextInput
                        // ref={x => }
                        style={[styles.input, { fontWeight: 'bold' }]}
                        placeholderTextColor={"#000"}
                        placeholder="Advance search..."
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    wrapper: {
        width: (_width * 0.8),
        alignSelf: 'center',
        paddingTop: moderateScale(10),
        flex: 1.2,
    },
    hBtn: {
        width: (_width * 0.8),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: moderateScale(20),
        paddingHorizontal: moderateScale(6),
    },
    search: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(18),
        backgroundColor: '#F1F1F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sIcon: {
        fontSize: moderateScale(20),
        color: '#9C182F',
    },
    hInput: {
        color: '#BFBFBF'
    },
    title: {
        color: '#011E41',
        fontSize: moderateScale(15),
        marginLeft: moderateScale(10)
    },
    label: {
        fontSize: moderateScale(22),
        color: '#9C182F',
        textAlign: 'center'
    },
    inputGroup: {
        width: (_width * 0.8),
        height: moderateScale(50),
        // backgroundColor: '#E5E5E6',
        borderWidth: moderateScale(2),
        borderColor: '#011E41',
        borderRadius: moderateScale(25),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: moderateScale(15)
    },
    input: {
        width: moderateScale(200),
        height: moderateScale(50),
        fontSize: moderateScale(14),
        marginLeft: moderateScale(10),
        color: '#000'
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
        width: (_width * 0.7),
        height: moderateScale(2),
        backgroundColor: '#9C182F'
    },
    circleActive: {
        width: moderateScale(22),
        height: moderateScale(22),
        borderRadius: moderateScale(11),
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
    icon: {
        fontSize: moderateScale(20),
        color: '#000',
        marginLeft: moderateScale(5)
    },
})

export default TutorSearch;