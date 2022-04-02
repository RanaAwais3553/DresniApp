import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Stars from 'react-native-stars';
import {getTutorAndCoachList} from '../../redux/actions/tutor-coach';
import {useDispatch, useSelector} from 'react-redux';
// local imports
import {Header} from '../../components';
import {moderateScale, _width} from '../../utilities';
import {prf, verify, locationGray} from '../../assets/Images';

const TCProfiles = props => {
  const dispatch = useDispatch();
  const [stars, setStars] = useState(4.5);
  const {tutorList} = useSelector(state => state.tutorList);
  // console.log('tutoe list is:!...', tutorList.data);
  useEffect(() => {
    (async () => {
      await dispatch(getTutorAndCoachList(1));
    })();
  }, []);
  const renderItem = item => {
    console.log('itemData is:!......', item.item.acc_name);
    return (
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate('TCProfile')}>
          <View style={styles.card}>
            <Image source={{uri: item.item.banner}} style={styles.pic} />

            <View>
              <View style={styles.cardDetails}>
                <View style={styles.cardLeft}>
                  <View>
                    <Text style={styles.name}>
                      {item.item.acc_name}{' '}
                      <Image source={verify} style={styles.verifyImg} />
                    </Text>

                    <Text style={styles.expertize}>
                      Expertise: Web Development
                    </Text>
                  </View>

                  <View style={styles.locationCont}>
                    <Image source={locationGray} style={styles.locationImg} />
                    <Text style={styles.location}>Kingdom of Bahrain</Text>
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <Stars
                    half={true}
                    default={stars}
                    update={val => setStars(val)}
                    spacing={moderateScale(2)}
                    starSize={moderateScale(12)}
                    count={5}
                    fullStar={require('../../assets/Images/full-star.png')}
                    emptyStar={require('../../assets/Images/empty-star.png')}
                    halfStar={require('../../assets/Images/half-star.png')}
                  />

                  <View style={styles.currency}>
                    <Text style={styles.cText}>BHD 9</Text>
                  </View>

                  <View style={styles.viewProfile}>
                    <Text style={styles.vpText}>View Profile</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.hzLine} />
      </View>
    );
  };
  const emptyScreenMessage = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#121212'}}>Data not Found</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        title={
          <View style={styles.hBtn}>
            <Text style={styles.title}>
              Available <Text style={styles.title1}>Tutors and Coaches</Text>
            </Text>
          </View>
        }
      />
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        //     ListHeaderComponent={headerComponent}
        initialNumToRender={10}
        maxToRenderPerBatch={60}
        //     getItemLayout={getItemLayout}
        //     showsVerticalScrollIndicator={false}
        data={tutorList?.data}
        ListEmptyComponent={emptyScreenMessage}
        renderItem={renderItem}
        keyExtractor={item => item.acc_id}
        // onEndReached={() =>
        //  getVideosByScrollingEndReached()
        // }
        //    windowSize={30}
      />
      {/* <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        style={styles.wrapper}> */}

      {/* <View style={[styles.card, {marginTop: moderateScale(15)}]}>
          <TouchableOpacity>
            <Image source={prf} style={styles.pic} />
          </TouchableOpacity>

          <View>
            <View style={styles.cardDetails}>
              <View style={styles.cardLeft}>
                <View>
                  <Text style={styles.name}>
                    Mohd Siddique{' '}
                    <Image source={verify} style={styles.verifyImg} />
                  </Text>

                  <Text style={styles.expertize}>
                    Expertise: Web Development
                  </Text>
                </View>

                <View style={styles.locationCont}>
                  <Image source={locationGray} style={styles.locationImg} />
                  <Text style={styles.location}>Kingdom of Bahrain</Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Stars
                  half={true}
                  default={stars}
                  update={val => setStars(val)}
                  spacing={moderateScale(2)}
                  starSize={moderateScale(12)}
                  count={5}
                  fullStar={require('../../assets/Images/full-star.png')}
                  emptyStar={require('../../assets/Images/empty-star.png')}
                  halfStar={require('../../assets/Images/half-star.png')}
                />

                <View style={styles.currency}>
                  <Text style={styles.cText}>BHD 9</Text>
                </View>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('TCProfile')}
                  style={styles.viewProfile}>
                  <Text style={styles.vpText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.hzLine} />

        <View style={[styles.card, {marginTop: moderateScale(15)}]}>
          <TouchableOpacity>
            <Image source={prf} style={styles.pic} />
          </TouchableOpacity>

          <View>
            <View style={styles.cardDetails}>
              <View style={styles.cardLeft}>
                <View>
                  <Text style={styles.name}>
                    Mohd Siddique{' '}
                    <Image source={verify} style={styles.verifyImg} />
                  </Text>

                  <Text style={styles.expertize}>
                    Expertise: Web Development
                  </Text>
                </View>

                <View style={styles.locationCont}>
                  <Image source={locationGray} style={styles.locationImg} />
                  <Text style={styles.location}>Kingdom of Bahrain</Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Stars
                  half={true}
                  default={stars}
                  update={val => setStars(val)}
                  spacing={moderateScale(2)}
                  starSize={moderateScale(12)}
                  count={5}
                  fullStar={require('../../assets/Images/full-star.png')}
                  emptyStar={require('../../assets/Images/empty-star.png')}
                  halfStar={require('../../assets/Images/half-star.png')}
                />

                <View style={styles.currency}>
                  <Text style={styles.cText}>BHD 9</Text>
                </View>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('TCProfile')}
                  style={styles.viewProfile}>
                  <Text style={styles.vpText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.hzLine} />

        <View style={[styles.card, {marginTop: moderateScale(15)}]}>
          <TouchableOpacity>
            <Image source={prf} style={styles.pic} />
          </TouchableOpacity>

          <View>
            <View style={styles.cardDetails}>
              <View style={styles.cardLeft}>
                <View>
                  <Text style={styles.name}>
                    Mohd Siddique{' '}
                    <Image source={verify} style={styles.verifyImg} />
                  </Text>

                  <Text style={styles.expertize}>
                    Expertise: Web Development
                  </Text>
                </View>

                <View style={styles.locationCont}>
                  <Image source={locationGray} style={styles.locationImg} />
                  <Text style={styles.location}>Kingdom of Bahrain</Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Stars
                  half={true}
                  default={stars}
                  update={val => setStars(val)}
                  spacing={moderateScale(2)}
                  starSize={moderateScale(12)}
                  count={5}
                  fullStar={require('../../assets/Images/full-star.png')}
                  emptyStar={require('../../assets/Images/empty-star.png')}
                  halfStar={require('../../assets/Images/half-star.png')}
                />

                <View style={styles.currency}>
                  <Text style={styles.cText}>BHD 9</Text>
                </View>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('TCProfile')}
                  style={styles.viewProfile}>
                  <Text style={styles.vpText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.hzLine} />

        <View style={[styles.card, {marginTop: moderateScale(15)}]}>
          <TouchableOpacity>
            <Image source={prf} style={styles.pic} />
          </TouchableOpacity>

          <View>
            <View style={styles.cardDetails}>
              <View style={styles.cardLeft}>
                <View>
                  <Text style={styles.name}>
                    Mohd Siddique{' '}
                    <Image source={verify} style={styles.verifyImg} />
                  </Text>

                  <Text style={styles.expertize}>
                    Expertise: Web Development
                  </Text>
                </View>

                <View style={styles.locationCont}>
                  <Image source={locationGray} style={styles.locationImg} />
                  <Text style={styles.location}>Kingdom of Bahrain</Text>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Stars
                  half={true}
                  default={stars}
                  update={val => setStars(val)}
                  spacing={moderateScale(2)}
                  starSize={moderateScale(12)}
                  count={5}
                  fullStar={require('../../assets/Images/full-star.png')}
                  emptyStar={require('../../assets/Images/empty-star.png')}
                  halfStar={require('../../assets/Images/half-star.png')}
                />

                <View style={styles.currency}>
                  <Text style={styles.cText}>BHD 9</Text>
                </View>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('TCProfile')}
                  style={styles.viewProfile}>
                  <Text style={styles.vpText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View> */}

      {/* <View style={styles.hzLine} /> */}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  wrapper: {
    width: _width * 0.84,
    alignSelf: 'center',
    paddingTop: moderateScale(40),
    flex: 1.2,
  },
  hBtn: {
    width: _width * 0.8,
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: moderateScale(20),
  },
  title: {
    color: '#011E41',
    fontSize: moderateScale(15),
    fontFamily: 'Barlow-Regular',
  },
  title1: {
    color: '#011E41',
    fontFamily: 'Barlow-Bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: _width * 0.62,
    justifyContent: 'space-between',
  },
  cardLeft: {},
  locationCont: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: moderateScale(7),
  },
  locationImg: {width: moderateScale(9), height: moderateScale(12)},
  location: {
    color: '#AEAEAE',
    fontFamily: 'Barlow-Regular',
    fontSize: moderateScale(12),
    marginLeft: moderateScale(5),
  },
  name: {
    fontSize: moderateScale(16),
    fontFamily: 'Barlow-Bold',
    color: '#000',
  },
  verifyImg: {
    width: moderateScale(12),
    height: moderateScale(12),
    marginLeft: moderateScale(6),
  },
  expertize: {
    fontSize: moderateScale(12),
    marginTop: moderateScale(2),
    fontFamily: 'Barlow-Regular',
    color: '#000',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  currency: {
    width: moderateScale(60),
    height: moderateScale(16),
    backgroundColor: '#9C182F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    marginTop: moderateScale(7),
  },
  cText: {
    color: '#fff',
    fontSize: moderateScale(10),
    fontFamily: 'Barlow-Bold',
  },
  viewProfile: {
    width: moderateScale(60),
    height: moderateScale(16),
    backgroundColor: '#8A8A8A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    marginTop: moderateScale(7),
  },
  vpText: {
    color: '#fff',
    fontSize: moderateScale(9),
    fontFamily: 'Barlow-Regular',
  },
  hzLine: {
    width: _width * 0.84,
    height: moderateScale(1),
    backgroundColor: '#8A8A8A',
    marginTop: moderateScale(15),
  },
  icon: {
    color: '#7E7E7E',
    fontSize: moderateScale(30),
    width: moderateScale(20),
  },
  footer: {
    flex: 0.3,
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
    color: '#fff',
  },
});

export default TCProfiles;
