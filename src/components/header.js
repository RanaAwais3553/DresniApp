import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { moderateScale, _width } from '../utilities'
import { logo, DrawerMenu } from '../assets/Images'
import Feather from 'react-native-vector-icons/Feather'

const Header = (props) => {
    const headerLeftIcon = (props) => {

        if (props.backIcon) {
            return (
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Feather style={styles.icon} name="chevron-left" />
                </TouchableOpacity>
            );
        } else if (props.hideMenus) {
            return (null);
        } else {
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate("TutorDrawer")}>
                    <DrawerMenu style={styles.drawerMenu} />
                </TouchableOpacity>
            );
        }
    }

    return (
        <View style={styles.container}>
            {headerLeftIcon(props)}

            <View style={styles.midContainer}>
                <Image source={logo} style={styles.logo} />
                {props?.title}
            </View>

            {
                props.hideMenus ? (null) : (
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("TutorSearch")}>
                            <Feather style={[styles.icon, { marginRight: moderateScale(-5) }]} name="search" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Feather style={styles.icon} name="more-vertical" />
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: (_width * 1),
        height: moderateScale(200),
        borderBottomLeftRadius: moderateScale(40),
        borderBottomRightRadius: moderateScale(40),
        backgroundColor: '#011E41',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(20),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(5),
    },
    drawerMenu: {
        width: moderateScale(40),
        height: moderateScale(40),
    },
    logo: {
        width: moderateScale(80),
        height: moderateScale(80),
        marginTop: moderateScale(20)
    },
    midContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        left: 0,
        top: moderateScale(20)
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        color: '#fff',
        fontSize: moderateScale(30)
    }
})

export default Header;