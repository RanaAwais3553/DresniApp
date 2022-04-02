import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale, _width} from '../../utilities';
import {useDispatch} from 'react-redux';
import {logoutHandler} from '../../redux/actions/auth';
import {
  eng,
  UserAccount,
  Alarm,
  Notification,
  Setting,
  Logout,
  Cart,
  Visa,
  MasterCard,
  COD,
  Paypal,
  WhatsappChat,
  Home,
  Statement,
  MyBookings,
  Institutions,
  FreeResources,
} from '../../assets/Images/index';

const DrawerScreen = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={[styles.alignHz, styles.header]}>
        <Ionicons
          onPress={() => props.navigation.goBack()}
          name="md-chevron-back-outline"
          color={'#fff'}
          size={moderateScale(30)}
        />

        <View style={[styles.alignHz]}>
          <View style={[styles.alignHz]}>
            <Image style={styles.flag} source={eng} />
            <Text style={styles.fName}>English</Text>
            <Ionicons
              name="chevron-down-outline"
              color={'#fff'}
              size={moderateScale(20)}
            />
          </View>

          <Feather
            name="more-vertical"
            color={'#fff'}
            size={moderateScale(22)}
          />
        </View>
      </View>

      <View style={styles.hLine} />
      {/* 
            <View style={[styles.alignHz, styles.sbHeader]}>
                <UserAccount style={styles.icon} />
                <Alarm style={styles.icon} />
                <Notification style={styles.icon} />
                <Setting style={styles.icon} />
                <Cart style={styles.icon} />
            </View> */}

      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => props.navigation?.navigate('MyProfile')}
          style={[styles.navItem, styles.niActiveColor]}>
          <View style={[styles.navBlock, styles.nbActiveColor]} />
          <Home style={[styles.icon1, {marginLeft: moderateScale(24)}]} />
          <Text style={[styles.navTxt, {marginLeft: moderateScale(7)}]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation?.navigate('EditProfile1')}
          style={[styles.navItem, styles.niColor]}>
          <View style={[styles.navBlock, styles.nbColor]} />
          <UserAccount
            style={[styles.icon1, {marginLeft: moderateScale(24)}]}
          />
          <Text style={[styles.navTxt, {marginLeft: moderateScale(7)}]}>
            My Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation?.navigate('Subjects')}
          style={[styles.navItem, styles.niColor]}>
          <View style={[styles.navBlock, styles.nbColor]} />
          <Institutions
            style={[styles.icon1, {marginLeft: moderateScale(24)}]}
          />
          <Text style={[styles.navTxt, {marginLeft: moderateScale(7)}]}>
            Subjects
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation?.navigate('AddSchedule')}
          style={[styles.navItem, styles.niColor]}>
          <View style={[styles.navBlock, styles.nbColor]} />
          <MyBookings style={[styles.icon1, {marginLeft: moderateScale(24)}]} />
          <Text style={[styles.navTxt, {marginLeft: moderateScale(7)}]}>
            Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation?.navigate('BankDetails')}
          style={[styles.navItem, styles.niColor]}>
          <View style={[styles.navBlock, styles.nbColor]} />
          <Statement style={[styles.icon1, {marginLeft: moderateScale(24)}]} />
          <Text style={[styles.navTxt, {marginLeft: moderateScale(7)}]}>
            Bank Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => dispatch(logoutHandler())}
          style={[styles.navItem, styles.niColor]}>
          <View style={[styles.navBlock, styles.nbColor]} />
          <Logout style={[styles.icon1, {marginLeft: moderateScale(24)}]} />
          <Text style={[styles.navTxt, {marginLeft: moderateScale(7)}]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.appInfo}>
        <Text style={styles.infoTxt}>Terms and conditions</Text>
        <Text style={styles.infoTxt}>Privacy Policy</Text>
        <Text style={styles.infoTxt}>Pricing Policy</Text>
        <Text style={styles.infoTxt}>Faq's</Text>
        <Text style={styles.infoTxt}>Contact Us</Text>
        <Text style={styles.infoTxt}>About Us</Text>

        <View style={[styles.alignHz, {justifyContent: 'space-between'}]}>
          <View>
            <Text style={styles.infoTxt}>Copyright © 2021</Text>
            <Text style={styles.infoTxt}>Daresni - All Rights Reserved.</Text>

            <View style={[styles.alignHz, {marginLeft: moderateScale(10)}]}>
              <COD style={styles.icon2} />
              <Paypal style={styles.icon2} />
              <Visa style={styles.icon2} />
              <MasterCard style={styles.icon2} />
            </View>
          </View>

          <WhatsappChat style={styles.icon3} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001E41',
  },

  alignHz: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  header: {
    width: _width * 0.94,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(13),
  },
  flag: {
    width: moderateScale(27),
    height: moderateScale(13),
  },
  fName: {
    fontSize: moderateScale(13),
    fontFamily: 'Barlow-Regular',
    color: '#fff',
    marginHorizontal: moderateScale(3),
  },

  hLine: {
    width: _width * 1,
    height: moderateScale(3),
    backgroundColor: '#7B8A9C',
    marginTop: moderateScale(5),
  },

  sbHeader: {
    width: _width * 0.94,
    justifyContent: 'flex-end',
    marginTop: moderateScale(10),
  },
  icon: {width: moderateScale(30), height: moderateScale(30)},

  nav: {marginTop: moderateScale(10)},
  navItem: {
    width: _width * 1,
    height: moderateScale(40),
    marginTop: moderateScale(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  niColor: {backgroundColor: '#163152'},
  niActiveColor: {backgroundColor: '#9F172E'},
  navBlock: {height: moderateScale(40), width: moderateScale(10)},
  nbColor: {backgroundColor: '#9F172E'},
  nbActiveColor: {backgroundColor: '#fff'},
  navTxt: {
    fontSize: moderateScale(12),
    fontFamily: 'Barlow-Regular',
    color: '#fff',
  },
  icon1: {width: moderateScale(24), height: moderateScale(24)},

  appInfo: {
    position: 'absolute',
    bottom: moderateScale(30),
    width: _width * 0.94,
    paddingLeft: moderateScale(50),
  },
  infoTxt: {
    fontSize: moderateScale(12),
    fontFamily: 'Barlow-Regular',
    color: '#fff',
    marginTop: moderateScale(8),
  },
  icon2: {
    width: moderateScale(70),
    height: moderateScale(60),
    marginLeft: moderateScale(-30),
  },
  icon3: {width: moderateScale(100), height: moderateScale(100)},
});

export default DrawerScreen;
