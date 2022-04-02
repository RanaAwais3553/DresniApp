/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppRoutes from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/index';
// import configureStore from './src/redux'
// import {loginUser} from './src/redux/actions/auth';
// let store = configureStore();

const App = () => {
  // store.dispatch(loginUser());
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;

    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;

    View.defaultProps = View.defaultProps || {};
    View.defaultProps.allowFontScaling = false;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
