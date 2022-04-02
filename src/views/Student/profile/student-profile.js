import React, {useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {moderateScale, _width} from '../../../utilities';
import {prf, verify, locationGray, DrawerMenu} from '../../../assets/Images';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Stars from 'react-native-stars';

const StudentProfile = props => {
  const [stars, setStars] = useState(4.5);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={prf}
        borderBottomLeftRadius={moderateScale(30)}
        borderBottomRightRadius={moderateScale(30)}
        resizeMode="cover"
        style={styles.imgBackground}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TutorDrawer')}>
          <DrawerMenu style={styles.drawerMenu} />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TutorSearch')}>
            <Feather
              style={[styles.icon, {marginRight: moderateScale(-5)}]}
              name="search"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather style={styles.icon} name="more-vertical" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.body}>
        <View style={styles.sec1}>
          <View style={styles.nameCont}>
            <Text style={[styles.name, {fontSize: moderateScale(20)}]}>
              Dur-e-Ali
            </Text>
          </View>

          <View style={styles.ratingCont}>
            <Text style={styles.rating}>See all my comments</Text>
          </View>
        </View>

        <View style={styles.sec2}>
          <View style={styles.locationCont}>
            <Image source={locationGray} style={styles.locationImg} />
            <Text style={styles.location}>Kingdom of Bahrain</Text>
          </View>
        </View>

        <View style={styles.hLine} />

        <View style={styles.expertise}>
          <View style={styles.expCont}>
            <Text style={styles.expTxt1}>Nationality</Text>
            <Text style={styles.expTxt2}>Pakistani</Text>
          </View>

          <View style={styles.vLine} />

          <TouchableOpacity
            onPress={() => props.navigation.navigate('StudentBookingHistory')}
            style={styles.expCont}>
            <Text style={styles.expTxt1}>My</Text>
            <Text style={styles.expTxt2}>Bookings</Text>
          </TouchableOpacity>

          <View style={styles.vLine} />

          <View style={styles.expCont}>
            <Text style={styles.expTxt1}>Language</Text>
            <Text style={styles.expTxt2}>English</Text>
          </View>

          <View style={styles.vLine} />

          <View style={styles.expCont}>
            <Text style={styles.expTxt1}>Update</Text>
            <Text style={styles.expTxt2}>Location</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.scsBtn}>
          <Text style={styles.scsTxt}>Book again</Text>
        </TouchableOpacity>

        <View style={{width: _width * 0.9, marginTop: moderateScale(20)}}>
          <View style={styles.card}>
            <TouchableOpacity onPress={() => alert('txt')}>
              <Image source={prf} style={styles.pic} />
            </TouchableOpacity>

            <View>
              <View style={styles.cardDetails}>
                <View style={styles.cardLeft}>
                  <Text style={styles.name}>Mohd Siddique</Text>
                  <Text style={styles.expertize}>
                    Expertise: Web Development
                  </Text>
                </View>

                <View
                  style={[styles.cardRight, {marginLeft: moderateScale(40)}]}>
                  <Feather style={styles.icon} name="more-vertical" />
                </View>
              </View>

              <View
                style={[
                  styles.cardDetails,
                  {marginTop: moderateScale(5), alignItems: 'center'},
                ]}>
                <View style={styles.cardLeft}>
                  <Stars
                    half={true}
                    default={stars}
                    update={val => setStars(val)}
                    spacing={moderateScale(2)}
                    starSize={moderateScale(12)}
                    count={5}
                    fullStar={require('../../../assets/Images/full-star.png')}
                    emptyStar={require('../../../assets/Images/empty-star.png')}
                    halfStar={require('../../../assets/Images/half-star.png')}
                  />
                </View>

                <View style={styles.cardRight}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.currency}>
                      <Text style={styles.cText}>BHD 9</Text>
                    </View>

                    <TouchableOpacity style={styles.bookNow}>
                      <Text style={styles.bnText}>Book now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.hzLine} />

          <TouchableOpacity
            style={[styles.scsBtn, {backgroundColor: '#011E41'}]}>
            <Text style={styles.scsTxt}>Recommended Tutors and Coaches</Text>
          </TouchableOpacity>

          <View style={[styles.card, {marginTop: moderateScale(15)}]}>
            <TouchableOpacity onPress={() => alert('txt')}>
              <Image source={prf} style={styles.pic} />
            </TouchableOpacity>

            <View>
              <View style={styles.cardDetails}>
                <View style={styles.cardLeft}>
                  <Text style={styles.name}>Mohd Siddique</Text>
                  <Text style={styles.expertize}>
                    Expertise: Web Development
                  </Text>
                </View>

                <View
                  style={[styles.cardRight, {marginLeft: moderateScale(40)}]}>
                  <Feather style={styles.icon} name="more-vertical" />
                </View>
              </View>

              <View
                style={[
                  styles.cardDetails,
                  {marginTop: moderateScale(5), alignItems: 'center'},
                ]}>
                <View style={styles.cardLeft}>
                  <Stars
                    half={true}
                    default={stars}
                    update={val => setStars(val)}
                    spacing={moderateScale(2)}
                    starSize={moderateScale(12)}
                    count={5}
                    fullStar={require('../../../assets/Images/full-star.png')}
                    emptyStar={require('../../../assets/Images/empty-star.png')}
                    halfStar={require('../../../assets/Images/half-star.png')}
                  />
                </View>

                <View style={styles.cardRight}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.currency}>
                      <Text style={styles.cText}>BHD 9</Text>
                    </View>

                    <TouchableOpacity style={styles.bookNow}>
                      <Text style={styles.bnText}>Book now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgBackground: {
    width: _width * 1,
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
    width: _width * 0.9,
    alignSelf: 'center',
  },
  sec1: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(15),
  },
  nameCont: {flexDirection: 'row', alignItems: 'center'},
  verifyImg: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginLeft: moderateScale(10),
  },
  ratingCont: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  rating: {
    fontSize: moderateScale(12),
    fontFamily: 'Barlow-Regular',
    color: '#AEAEAE',
    marginRight: moderateScale(7),
  },
  sec2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  locationImg: {width: moderateScale(9), height: moderateScale(12)},
  location: {
    color: '#AEAEAE',
    fontFamily: 'Barlow-Regular',
    fontSize: moderateScale(12),
    marginLeft: moderateScale(5),
  },
  commentsCont: {flexDirection: 'row', alignSelf: 'flex-end'},
  comment: {color: '#B3B3B1', fontSize: moderateScale(12)},
  hLine: {
    height: moderateScale(1),
    backgroundColor: '#BABBBD',
    marginVertical: moderateScale(10),
  },
  bio: {
    color: '#8A8A8A',
    fontFamily: 'Barlow-Regular',
    fontSize: moderateScale(14),
  },
  expertise: {
    flexDirection: 'row',
    width: _width * 0.9,
    justifyContent: 'center',
  },
  expCont: {marginTop: moderateScale(10)},
  expTxt1: {
    fontSize: moderateScale(11),
    fontFamily: 'Barlow-Regular',
    textAlign: 'center',
    color: '#4B4D4F',
  },
  expTxt2: {
    fontSize: moderateScale(15),
    fontFamily: 'Barlow-Bold',
    color: '#9C182F',
  },
  vLine: {
    width: moderateScale(1),
    height: moderateScale(46),
    backgroundColor: '#BABBBD',
    marginHorizontal: moderateScale(10),
  },
  scsBtn: {
    width: _width * 0.9,
    height: moderateScale(60),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9C182F',
  },
  scsTxt: {
    fontSize: moderateScale(18),
    fontFamily: 'Barlow-Bold',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: _width * 0.84,
  },
  pic: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32),
    borderWidth: moderateScale(4),
    borderColor: '#9C182F',
  },
  cardDetails: {
    flexDirection: 'row',
    width: _width * 0.6,
    justifyContent: 'space-between',
  },
  cardLeft: {},
  name: {
    fontSize: moderateScale(16),
    fontFamily: 'Barlow-Bold',
    color: '#000',
  },
  expertize: {
    fontSize: moderateScale(12),
    fontFamily: 'Barlow-Regular',
    color: '#000',
  },
  cardRight: {},
  logo: {
    width: moderateScale(80),
    height: moderateScale(80),
    marginTop: moderateScale(20),
  },
  midContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: moderateScale(20),
  },
  currency: {
    width: moderateScale(45),
    height: moderateScale(25),
    backgroundColor: '#9C182F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    marginRight: moderateScale(3),
  },
  cText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontFamily: 'Barlow-Bold',
  },
  bookNow: {
    width: moderateScale(60),
    height: moderateScale(25),
    backgroundColor: '#8A8A8A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
  },
  bnText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontFamily: 'Barlow-Bold',
  },
  hzLine: {
    width: _width * 0.84,
    height: moderateScale(1),
    backgroundColor: '#8A8A8A',
    marginTop: moderateScale(15),
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    color: '#8A8A8A',
    fontSize: moderateScale(30),
  },
  heartIcon: {
    color: '#99182E',
    fontSize: moderateScale(14),
  },
});

export default StudentProfile;
