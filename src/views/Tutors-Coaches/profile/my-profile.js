import React, { useState, useEffect } from 'react'
import { View, Image, ImageBackground, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { moderateScale, _width } from '../../../utilities'
import { prf, verify, locationGray, DrawerMenu, Languages, Myprices, Nationality, Experience, Addsubjects, Services, Editprofile, Bankdetails, Totaljob, Totaltime, Eye, Myschedules, } from '../../../assets/Images'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SaveTutorSchedule, GetTutorDetail } from "../../../redux/actions/tutor-coach";
import Stars from 'react-native-stars'
import { useDispatch, useSelector } from "react-redux";
import { AsyncStorageService } from '../../../services'
import { LoaderModal, ModalContainer } from '../../../modals'
import { useIsMountedRef } from '../../../utilities/mounted-ref'

const MyProfile = (props) => {
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const [stars, setStars] = useState(4.5);
    const [isLoading, setIsLoading] = useState(true);
    const tutorDetail = useSelector(state => state?.tutorAndCoach?.tutorDetail);

    useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        const user = await AsyncStorageService.getObject('@user');
        const resp = await dispatch(GetTutorDetail({ tutorId: user?.userId }));

        if (isMountedRef.current) {
            if (resp) {
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        }
    }

    const _updateDetails = async (weeklySchedule) => {
        const user = await AsyncStorageService.getObject('@user');

        if (weeklySchedule?.length) {
            dispatch(SaveTutorSchedule({
                tutorId: user?.userId,
                weeklySchedule
            }));
        }
    }

    return (
        <ScrollView style={styles.container}>
            <ModalContainer
                isVisible={isLoading}
                modalName={"uncloseable"}
                modalContent={() => LoaderModal()} />

            <ImageBackground
                source={prf}
                borderBottomLeftRadius={moderateScale(30)}
                borderBottomRightRadius={moderateScale(30)}
                resizeMode="cover"
                style={styles.imgBackground}>
                <TouchableOpacity onPress={() => props.navigation.navigate("TutorDrawer")}>
                    <DrawerMenu style={styles.drawerMenu} />
                </TouchableOpacity>

                <View style={styles.midContainer} />

                <View style={styles.iconContainer} />
            </ImageBackground>

            <View style={styles.body}>
                <View style={styles.sec1}>
                    <View style={styles.nameCont}>
                        <Text style={styles.name}>{tutorDetail?.tutorAccount?.fullname}</Text>
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
                            fullStar={require('../../../assets/Images/full-star.png')}
                            emptyStar={require('../../../assets/Images/empty-star.png')}
                            halfStar={require('../../../assets/Images/half-star.png')} />
                    </View>
                </View>

                <View style={styles.sec2}>
                    <View style={styles.locationCont}>
                        <Image source={locationGray} style={styles.locationImg} />
                        <Text style={styles.location}>{tutorDetail?.tutorAccount?.country}</Text>
                    </View>

                    <View style={styles.commentsCont}>
                        <Text style={styles.comment}>See all comments</Text>
                    </View>
                </View>

                <View style={styles.hLine} />

                <Text style={styles.bio}>
                    {tutorDetail?.tutorAccount?.biography}
                </Text>

                <View style={styles.hLine} />

                <View style={styles.expertise}>
                    <View style={styles.expCont}>
                        <Nationality style={styles.icon1} />
                        <Text style={styles.expTxt1}>Nationality</Text>
                        <Text style={styles.expTxt2}>{tutorDetail?.tutorAccount?.nationality}</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Experience style={styles.icon1} />
                        <Text style={styles.expTxt1}>Experience</Text>
                        <Text style={styles.expTxt2}>{tutorDetail?.tutorAccount?.workExperience} Years</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Languages style={styles.icon1} />
                        <Text style={styles.expTxt1}>Language</Text>
                        <Text style={styles.expTxt2}>{tutorDetail?.tutorAccount?.language}</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Services style={styles.icon1} />
                        <Text style={styles.expTxt1}>Services</Text>
                        <Text style={styles.expTxt2}>{tutorDetail?.tutorAccount?.areaOfServices}</Text>
                    </View>
                </View>

                <View style={styles.hLine} />

                <View style={styles.expertise}>
                    <View style={styles.expCont}>
                        <Totaljob style={styles.icon1} />
                        <Text style={styles.expTxt1}>Total Jobs</Text>
                        <Text style={styles.expTxt2}>06</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Totaltime style={styles.icon1} />
                        <Text style={styles.expTxt1}>Total Time</Text>
                        <Text style={styles.expTxt2}>60 Hours</Text>
                    </View>

                    <View style={styles.vLine} />

                    <View style={styles.expCont}>
                        <Myprices style={styles.icon1} />
                        <Text style={styles.expTxt1}>My Price</Text>
                        <Text style={styles.expTxt2}>BD {tutorDetail?.tutorAccount?.pricing}</Text>
                    </View>

                    <View style={styles.vLine} />

                    <TouchableOpacity onPress={() => props.navigation.navigate("ViewSchedule", { _updateDetails })} style={styles.expCont}>
                        <Eye style={styles.icon1} />
                        <Text style={styles.expTxt1}>View</Text>
                        <Text style={styles.expTxt2}>Schedule</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => alert('screen missing')} style={styles.scsBtn}>
                    <Text style={styles.scsTxt}>View my Bookings</Text>
                </TouchableOpacity>

                <View style={[styles.hLine, { marginTop: moderateScale(15) }]} />

                <View style={styles.expertise}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("EditProfile1")} style={styles.expCont}>
                        <Editprofile style={styles.icon1} />
                        <Text style={styles.expTxt1}>Edit</Text>
                        <Text style={styles.expTxt3}>Profile</Text>
                    </TouchableOpacity>

                    <View style={styles.vLine} />

                    <TouchableOpacity onPress={() => props.navigation.navigate("Subjects")} style={styles.expCont}>
                        <Addsubjects style={styles.icon1} />
                        <Text style={styles.expTxt1}>Add my</Text>
                        <Text style={styles.expTxt3}>Subjects</Text>
                    </TouchableOpacity>

                    <View style={styles.vLine} />

                    <TouchableOpacity onPress={() => props.navigation.navigate("AddSchedule")} style={styles.expCont}>
                        <Myschedules style={styles.icon1} />
                        <Text style={styles.expTxt1}>Add my</Text>
                        <Text style={styles.expTxt3}>Schedule</Text>
                    </TouchableOpacity>

                    <View style={styles.vLine} />

                    <TouchableOpacity onPress={() => props.navigation.navigate("BankDetails")} style={styles.expCont}>
                        <Bankdetails style={styles.icon2} />
                        <Text style={[styles.expTxt1, { marginTop: moderateScale(-6) }]}>Add my</Text>
                        <Text style={styles.expTxt3}>Bank Details</Text>
                    </TouchableOpacity>
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
    drawerMenu: {
        width: moderateScale(40),
        height: moderateScale(40),
    },
    body: {
        width: (_width * 0.9),
        alignSelf: 'center'
    },
    sec1: { flexDirection: 'row', alignItems: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: moderateScale(15) },
    nameCont: { flexDirection: 'row', alignItems: 'center' },
    name: { fontSize: moderateScale(20), fontFamily: 'BarlowCondensed-Bold', color: '#4B4D4F', textTransform: 'capitalize' },
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
    bio: { color: '#8A8A8A', fontFamily: 'Barlow-Regular', fontSize: moderateScale(11) },
    expertise: { flexDirection: 'row' },
    expCont: { width: moderateScale(70), alignItems: 'center' },
    icon1: { width: moderateScale(35), height: moderateScale(35), marginTop: moderateScale(-5) },
    icon2: { width: moderateScale(45), height: moderateScale(45), marginTop: moderateScale(-7) },
    expTxt1: { fontSize: moderateScale(10), fontFamily: 'Barlow-Regular', color: '#4B4D4F' },
    expTxt2: { fontSize: moderateScale(15), fontFamily: 'BarlowCondensed-Bold', color: '#4D4D4D' },
    expTxt3: { fontSize: moderateScale(15), fontFamily: 'BarlowCondensed-Bold', color: '#9C182F' },
    vLine: { width: moderateScale(1), height: moderateScale(62), backgroundColor: '#BABBBD', marginHorizontal: moderateScale(6) },
    scsBtn: { width: (_width * 0.9), height: moderateScale(60), marginTop: moderateScale(20), borderRadius: moderateScale(30), alignItems: 'center', justifyContent: 'center', backgroundColor: '#9C182F' },
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
    cType: { fontSize: moderateScale(12), fontFamily: 'Barlow-Regular', },
    cPercent: { fontSize: moderateScale(8), fontFamily: 'Barlow-Regular', },
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

export default MyProfile;