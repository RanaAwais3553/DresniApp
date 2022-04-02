import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

// local imports
import { Header } from '../../../components'
import { moderateScale, _width } from '../../../utilities'
import { sucessTick } from '../../../assets/Images'


const StudentRegSuccess = (props) => {
    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={
                    <Text style={styles.title}><Text style={styles.title1}>STUDENT AND USERS</Text> REGISTRATION</Text>
                }
                hideMenus={true}
            />

            <View>
                <Image style={styles.sc_image} source={sucessTick} />

                <View style={styles.sc_info}>
                    <Text style={styles.sc_txt1}>Thank you for registering Daresni.</Text>
                    <Text style={styles.sc_txt2}>
                        Your account has created sucessfully...
                    </Text>
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
    sc_image: {
        width: moderateScale(170),
        height: moderateScale(170),
        alignSelf: 'center',
        marginVertical: moderateScale(60)
    },
    sc_info: {
        alignSelf: 'center',
        width: (_width * 0.85)
    },
    sc_txt1: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: '#001E41',
        textAlign: 'center'
    },
    sc_txt2: {
        fontSize: moderateScale(12),
        color: '#9F172E',
        textAlign: 'center',
        marginTop: moderateScale(20)
    },
})

export default StudentRegSuccess;