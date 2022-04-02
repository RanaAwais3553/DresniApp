import React, {useEffect} from 'react';
import {View, Image, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AuthNavigation from './Auth-Navigation';
import AppNavigation from './App-Navigation';
import {Walkthrough} from './Auth-Navigation';

import {navigationRef} from './root-navigate';
import {NavigationContainer} from '@react-navigation/native';
import {loginUser} from '../redux/actions/auth';
import {CheckWalkthrough} from '../redux/actions/setup';
import {moderateScale} from '../utilities';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const {token, loading} = useSelector(state => state.auth);
  const {loadings, wScreens} = useSelector(state => state.setup);
  console.log('startup screen :!...', token, loading);
  useEffect(() => {
    dispatch(loginUser());
  }, []);

  useEffect(() => {
    dispatch(CheckWalkthrough());
  }, [token]);

  if (loading || loadings) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F9F8FA',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: moderateScale(200),
            height: moderateScale(200),
            borderRadius: moderateScale(100),
          }}
          source={require('../assets/Images/loader.gif')}
        />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {!wScreens ? (
        <Walkthrough />
      ) : token ? (
        <AppNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default AppRoutes;
