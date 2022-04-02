import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {loginHandler} from '../redux/actions/auth';
import apiClient from '../config/axios';
import ApiUrls from '../config/api-urls';

// local imports
import {Header} from '../components';
import {moderateScale, _height, _width} from '../utilities';
import {useIsMountedRef} from '../utilities/mounted-ref';
import {keyboardListeners} from '../utilities/keyboard-listeners';
import {validateFields} from '../utilities/validate-fields';
import validator from '../validation/validator';

const Login = props => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };
  const isMountedRef = useIsMountedRef();
  const [isRemember, setIsRemember] = useState(false);
  const [isKeyboardShow, setKeyboardShow] = useState(false);
  const [state, setState] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });

  // useEffect(() => {
  //     if (authState.userId) {
  //         props.navigation.navigate("EnterOTP")
  //     }
  // }, [authState.userId])

  useEffect(() => {
    keyboardListeners(
      () => {
        if (isMountedRef.current) setKeyboardShow(true);
      },
      () => {
        if (isMountedRef.current) setKeyboardShow(false);
      },
    );
  }, []);

  const onLogin = async () => {
    const {email, password} = state;
    const emailError = await validator('email', email);
    const passwordError = await validator('password', password);

    if (!emailError && !passwordError) {
      let formData = new FormData();
      formData.append('acc_name', email);
      formData.append('acc_pass', password);
      dispatch(loginHandler(formData));
    } else {
      setState({...state, passwordError, emailError});
    }
  };

  const changeHandler = (type, value) => setState({...state, [type]: value});

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} hideMenus={true} />

      <View style={styles.wrapper}>
        <View style={{width: _width * 0.8, alignSelf: 'center'}}>
          <Text style={styles.label}>Sign in</Text>

          <View style={[styles.inputGroup, {marginTop: moderateScale(20)}]}>
            <Fontisto name="locked" style={styles.icon} />

            <View style={styles.verLine} />

            <TextInput
              ref={inputRefs.email}
              value={state.email}
              style={styles.input}
              returnKeyType={'next'}
              placeholder="Enter email"
              placeholderTextColor={'#000000'}
              onFocus={() => setState({...state, emailError: ''})}
              onBlur={() =>
                validateFields(state.email, 'email', error =>
                  setState({...state, emailError: error}),
                )
              }
              onSubmitEditing={() => inputRefs['password'].current.focus()}
              onChangeText={email => changeHandler('email', email.trim())}
              blurOnSubmit={false}
              autoCapitalize={'none'}
            />
          </View>
          <Text style={styles.errTxt}>{state.emailError}</Text>

          <View style={[styles.inputGroup, {marginTop: moderateScale(10)}]}>
            <FontAwesome5 name="user-alt" style={styles.icon} />

            <View style={styles.verLine} />

            <TextInput
              ref={inputRefs.password}
              value={state.password}
              placeholder="Enter password"
              placeholderTextColor={'#000000'}
              secureTextEntry={true}
              style={styles.input}
              returnKeyType={'done'}
              onFocus={() => setState({...state, passwordError: ''})}
              onBlur={() =>
                validateFields(state.password, 'password', error =>
                  setState({...state, passwordError: error}),
                )
              }
              onChangeText={password => changeHandler('password', password)}
            />
          </View>
          <Text style={styles.errTxt}>{state.passwordError}</Text>

          <Text style={styles.label1}>Forgot password?</Text>

          <TouchableOpacity onPress={onLogin} style={styles.priButton}>
            <Text style={styles?.priButtonText}>SIGN IN</Text>
          </TouchableOpacity>

          <View style={styles.remCont}>
            <Text style={styles.label2}>remember me</Text>

            <ToggleSwitch
              isOn={isRemember}
              onColor="#011E41"
              offColor="#9C182F"
              size="medium"
              onToggle={isOn => setIsRemember(isOn)}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.fLeft}>
            <Text style={styles.fText}>Not a member? Signup up now</Text>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('EnterMobileNumber')}
            style={styles.fRight}>
            <Ionicons name="chevron-forward" style={styles.icon1} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  wrapper: {
    height: _height * 0.7,
    width: _width * 1,
    alignSelf: 'center',
    paddingTop: moderateScale(40),
  },
  label: {
    fontSize: moderateScale(22),
    color: '#9C182F',
  },
  inputGroup: {
    width: _width * 0.8,
    height: moderateScale(45),
    backgroundColor: '#E5E5E6',
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
  },
  label1: {
    fontSize: moderateScale(15),
    color: '#9C182F',
    marginTop: moderateScale(17),
  },
  icon: {
    fontSize: moderateScale(20),
    color: '#000000',
  },
  errTxt: {
    fontSize: moderateScale(14),
    color: 'red',
  },
  verLine: {
    width: moderateScale(1),
    height: moderateScale(40),
    backgroundColor: '#fff',
  },
  input: {
    width: moderateScale(200),
    height: moderateScale(50),
    fontSize: moderateScale(14),
    color: '#000',
  },
  priButton: {
    width: _width * 0.8,
    height: moderateScale(45),
    borderRadius: moderateScale(10),
    backgroundColor: '#9C182F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(25),
  },
  priButtonText: {
    fontSize: moderateScale(22),
    color: '#fff',
  },
  remCont: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: moderateScale(10),
  },
  label2: {
    fontSize: moderateScale(15),
    color: '#9C182F',
    marginRight: moderateScale(10),
  },
  footer: {
    width: _width * 1,
    height: moderateScale(60),
    backgroundColor: '#9C182F',
    position: 'absolute',
    bottom: moderateScale(30),
    flexDirection: 'row',
    alignItems: 'center',
  },
  fLeft: {
    width: '85%',
    alignItems: 'center',
  },
  fText: {
    fontSize: moderateScale(18),
    color: '#fff',
  },
  fRight: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#011E41',
  },
  icon1: {
    fontSize: moderateScale(40),
    color: '#fff',
  },
});

export default Login;
