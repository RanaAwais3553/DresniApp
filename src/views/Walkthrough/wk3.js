import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

// local imports
import {moderateScale, _width} from '../../utilities';
import {intro3, logo} from '../../assets/Images';
import {useDispatch} from 'react-redux';
import {SetupWalkthrough} from '../../redux/actions/setup';
const Walkthrough3 = props => {
  const dispatch = useDispatch();
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onNavigate = () => {
    dispatch(SetupWalkthrough());
  };
  return (
    <View style={styles.container}>
      <View style={styles.sk_btn}>
        {/* <Text onPress={() => props.navigation.navigate('SelectLocation')} style={styles.sk_txt}> */}
        <Text onPress={onNavigate} style={styles.sk_txt}>
          Skip
        </Text>
      </View>

      <GestureRecognizer
        onSwipeLeft={() => props.navigation.navigate('SelectLocation')}
        onSwipeRight={() => props.navigation.navigate('Walkthrough2')}
        config={config}
        style={{
          flex: 1,
        }}>
        <Image source={logo} style={styles.logo} />

        <View>
          <Image style={styles.wk_image} source={intro3} />

          <View style={styles.wk_info}>
            <Text style={styles.wk_txt1}>NEED HELP RIGHT</Text>

            <Text style={styles.wk_txt2}>
              We strive to spread knowledge and create jobs by providing a
              network of accessible resources, available to everyone,
              everywhere, and at any time.
            </Text>
          </View>

          <View style={styles.pgPattern}>
            <View style={styles.pt} />
            <View style={[styles.pt, {marginLeft: moderateScale(5)}]} />
            <View style={[styles.ptActive, {marginLeft: moderateScale(5)}]} />
          </View>
        </View>
      </GestureRecognizer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  wrapper: {
    width: _width * 0.8,
    alignSelf: 'center',
    flex: 1.2,
  },
  sk_btn: {
    width: _width * 0.92,
    alignItems: 'flex-end',
    marginTop: moderateScale(25),
  },
  sk_txt: {
    fontSize: moderateScale(20),
    fontFamily: 'Barlow-Regular',
    color: '#4D4E50',
  },
  logo: {
    width: moderateScale(130),
    height: moderateScale(130),
    alignSelf: 'center',
  },
  wk_image: {
    width: moderateScale(295),
    height: moderateScale(270),
    alignSelf: 'center',
    marginTop: moderateScale(40),
  },
  wk_info: {
    width: _width * 0.92,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  wk_txt1: {
    fontSize: moderateScale(20),
    color: '#9F172E',
    fontFamily: 'Barlow-Bold',
  },
  wk_txt2: {
    fontSize: moderateScale(15),
    color: '#001E41',
    fontFamily: 'Barlow-Regular',
    textAlign: 'center',
    marginTop: moderateScale(20),
  },
  pgPattern: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(20),
  },
  pt: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: '#DBD8D5',
  },
  ptActive: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: '#001E41',
  },
});

export default Walkthrough3;
