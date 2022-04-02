import React, { useState } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { moderateScale, _width } from '../../utilities'
import { prf, verify, locationGray } from '../../assets/Images'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Stars from 'react-native-stars'

const TutorProfile = (props) => {
    const [stars, setStars] = useState(4.5);

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={prf}
                borderBottomLeftRadius={moderateScale(30)}
                borderBottomRightRadius={moderateScale(30)}
                resizeMode="cover"
                style={styles.imgBackground}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Feather style={styles.icon} name="chevron-left" />
                </TouchableOpacity>

                <View style={styles.midContainer}>
                    <View style={styles.currency}>
                        <Text style={styles.cText}>BHD 9</Text>
                    </View>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("TutorSearch")}>
                        <Feather style={[styles.icon, { marginRight: moderateScale(-5) }]} name="search" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Feather style={styles.icon} name="more-vertical" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.body}>
                <View style={styles.sec1}>
                    <View style={styles.nameCont}>
                        <Text style={styles.name}>Mohd Siddique</Text>
                        <Image source={verify} style={styles.verifyImg} />
                    </View>

                    <View style={styles.ratingCont}>
                        <Text style={styles.rating}>Rating {stars}</Text>

                        <Stars
                            half={true}
                            default={stars}
                            update={(val) => setStars(val)}
                            spacing={moderateScale(2)}
                            starSize={moderateScale(12)}
                            count={5}
                            fullStar={require('../../assets/Images/full-star.png')}
                            emptyStar={require('../../assets/Images/empty-star.png')}
                            halfStar={require('../../assets/Images/half-star.png')} />
                    </View>
                </View>

                <View style={styles.sec2}>
                    <View style={styles.locationCont}>
                        <Image source={locationGray} style={styles.locationImg} />
                        <Text style={styles.location}>Kingdom of Bahrain</Text>
                    </View>

                    <View style={styles.commentsCont}>
                        <Text style={styles.comment}>See all comments</Text>
                    </View>
                </View>

                <View style={styles.hLine} />

                <Text style={styles.bio}>
                    Specialist Computer tutor with a bachelor in technology degree
                    and Java certified professional. Any Programming language
                    with specialization in core Java, advance java and HTML.
                </Text>

                <View style={styles.hLine} />

                <View style={styles.expertise}>
                    <View style={styles.expCont}>
                        <Text style={styles.expTxt1}>Nationality</Text>
                        <Text style={styles.expTxt2}>Pakistani</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Text style={styles.expTxt1}>Experience</Text>
                        <Text style={styles.expTxt2}>9 Years</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Text style={styles.expTxt1}>Language</Text>
                        <Text style={styles.expTxt2}>Experience</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Text style={styles.expTxt1}>Services</Text>
                        <Text style={styles.expTxt2}>Engineering</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate("SelectSubjects")} style={styles.scsBtn}>
                    <Text style={styles.scsTxt}>Book Now</Text>
                </TouchableOpacity>

                <View style={{ width: (_width * 0.9), flexDirection: 'row', marginTop: moderateScale(20) }}>
                    <View style={{ width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(20), marginRight: moderateScale(6), backgroundColor: '#F1F1F1' }}>
                        <View style={{ position: 'absolute', top: moderateScale(10), left: moderateScale(10) }}>
                            <Text style={styles.cName}>English</Text>
                            <Text style={styles.cType}>Featured</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: moderateScale(6), right: moderateScale(10) }}>
                            <Text style={styles.cPercent}>43%</Text>
                            <AntDesign style={styles.heartIcon} name="heart" />
                        </View>
                    </View>

                    <View style={{ width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(20), marginRight: moderateScale(6), backgroundColor: '#F1F1F1' }}>
                        <View style={{ position: 'absolute', top: moderateScale(10), left: moderateScale(10) }}>
                            <Text style={styles.cName}>Engineering</Text>
                            <Text style={styles.cType}>Featured</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: moderateScale(6), right: moderateScale(10) }}>
                            <Text style={styles.cPercent}>83%</Text>
                            <AntDesign style={styles.heartIcon} name="heart" />
                        </View>
                    </View>

                    <View style={{ width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(20), marginRight: moderateScale(6), backgroundColor: '#F1F1F1' }}>
                        <View style={{ position: 'absolute', top: moderateScale(10), left: moderateScale(10) }}>
                            <Text style={styles.cName}>Chemical Engineering</Text>
                            <Text style={styles.cType}>Featured</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: moderateScale(6), right: moderateScale(10) }}>
                            <Text style={styles.cPercent}>44%</Text>
                            <AntDesign style={styles.heartIcon} name="heart" />
                        </View>
                    </View>
                </View>

                <View style={{ width: (_width * 0.9), flexDirection: 'row', marginTop: moderateScale(20) }}>
                    <View style={{ width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(20), marginRight: moderateScale(6), backgroundColor: '#F1F1F1' }}>
                        <View style={{ position: 'absolute', top: moderateScale(10), left: moderateScale(10) }}>
                            <Text style={styles.cName}>English</Text>
                            <Text style={styles.cType}>Featured</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: moderateScale(6), right: moderateScale(10) }}>
                            <Text style={styles.cPercent}>43%</Text>
                            <AntDesign style={styles.heartIcon} name="heart" />
                        </View>
                    </View>

                    <View style={{ width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(20), marginRight: moderateScale(6), backgroundColor: '#F1F1F1' }}>
                        <View style={{ position: 'absolute', top: moderateScale(10), left: moderateScale(10) }}>
                            <Text style={styles.cName}>Engineering</Text>
                            <Text style={styles.cType}>Featured</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: moderateScale(6), right: moderateScale(10) }}>
                            <Text style={styles.cPercent}>83%</Text>
                            <AntDesign style={styles.heartIcon} name="heart" />
                        </View>
                    </View>

                    <View style={{ width: moderateScale(100), height: moderateScale(100), borderRadius: moderateScale(20), marginRight: moderateScale(6), backgroundColor: '#F1F1F1' }}>
                        <View style={{ position: 'absolute', top: moderateScale(10), left: moderateScale(10) }}>
                            <Text style={styles.cName}>Chemical Engineering</Text>
                            <Text style={styles.cType}>Featured</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: moderateScale(6), right: moderateScale(10) }}>
                            <Text style={styles.cPercent}>44%</Text>
                            <AntDesign style={styles.heartIcon} name="heart" />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imgBackground: {
        width: (_width * 1),
        height: moderateScale(200),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: moderateScale(20),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(5),
    },
    body: {
        width: (_width * 0.9),
        alignSelf: 'center'
    },
    sec1: { flexDirection: 'row', alignItems: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: moderateScale(15) },
    nameCont: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: moderateScale(20), fontFamily: 'BarlowCondensed-Bold', color: '#4B4D4F' },
    verifyImg: { width: moderateScale(20), height: moderateScale(20), marginLeft: moderateScale(10) },
    ratingCont: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' },
    rating: { fontSize: moderateScale(12), fontFamily: 'Barlow-Regular', color: '#9C182F', marginRight: moderateScale(7) },
    sec2: { flexDirection: 'row', alignItems: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: moderateScale(10) },
    locationCont: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    locationImg: { width: moderateScale(9), height: moderateScale(12) },
    location: { color: '#AEAEAE', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12), marginLeft: moderateScale(5) },
    commentsCont: { flexDirection: 'row', alignSelf: 'flex-end' },
    comment: { color: '#B3B3B1', fontFamily: 'Barlow-Regular', fontSize: moderateScale(12) },
    hLine: { height: moderateScale(1), backgroundColor: '#BABBBD', marginVertical: moderateScale(10) },
    bio: { color: '#8A8A8A', fontFamily: 'Barlow-Regular', fontSize: moderateScale(14) },
    expertise: { flexDirection: 'row' },
    expCont: { marginTop: moderateScale(10) },
    expTxt1: { fontSize: moderateScale(11), fontFamily: 'Barlow-Regular', color: '#4B4D4F' },
    expTxt2: { fontSize: moderateScale(15), fontFamily: 'Barlow-Bold', color: '#9C182F' },
    vLine: { width: moderateScale(1), height: moderateScale(46), backgroundColor: '#BABBBD', marginHorizontal: moderateScale(6) },
    scsBtn: { width: (_width * 0.9), height: moderateScale(60), marginTop: moderateScale(20), borderRadius: moderateScale(10), alignItems: 'center', justifyContent: 'center', backgroundColor: '#9C182F' },
    scsTxt: { fontSize: moderateScale(24), fontFamily: 'Barlow-Bold', color: '#fff' },
    logo: {
        width: moderateScale(80),
        height: moderateScale(80),
        marginTop: moderateScale(20)
    },
    midContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: moderateScale(15)
    },
    currency: {
        width: moderateScale(90),
        height: moderateScale(35),
        backgroundColor: '#001E40',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(8),
        marginRight: moderateScale(3)
    },
    cText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontFamily: 'Barlow-Extra Bold',
    },
    cName: { color: '#99182E', fontSize: moderateScale(14), fontFamily: 'Barlow-Regular', },
    cType: { fontSize: moderateScale(12), fontFamily: 'Barlow-Regular', color: '#001E41' },
    cPercent: { fontSize: moderateScale(8), fontFamily: 'Barlow-Regular', color: '#000' },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        color: '#fff',
        fontSize: moderateScale(30)
    },
    heartIcon: {
        color: '#99182E',
        fontSize: moderateScale(14)
    }
})

export default TutorProfile;