import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {SendOTP} from '../../redux/actions/auth';
import {GetCountryCodes, SearchCountryCodes} from '../../redux/actions/setup';
import {useDebouncedEffect} from '../../utilities/handle-debounce';

// local imports
import {Header} from '../../components';
import {moderateScale, _width} from '../../utilities';
import {validateFields} from '../../utilities/validate-fields';
import validator from '../../validation/validator';
import {ModalContainer, CountryListModal} from '../../modals';
import {useIsMountedRef} from '../../utilities/mounted-ref';

const EnterMobileNumber = props => {
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [loadmore, setLoadMore] = useState(false);
  const [country, setCountry] = useState(null);
  const [searchCountryCodes, setSearchCountryCodes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [countryName, setCountryName] = useState(null);
  const [isCLModal, setIsCLModal] = useState(false);
  const [contactNumber, setContactNumber] = useState(null);
  const [contactNumberError, setContactNumberError] = useState(null);

  useEffect(() => {
    getCountryCodes();
  }, []);

  useDebouncedEffect(
    async () => {
      if (countryName) {
        const response = await dispatch(
          SearchCountryCodes({name: countryName, lang: 'en'}),
        );

        if (response?.data) {
          setSearchCountryCodes(response.data);
          console.log(
            'country code in otp entrer mobile number component is:',
            response.data,
          );
          setLoadMore(false);
        }
      }
    },
    1000,
    [countryName],
  );

  const getCountryCodes = async isLoadMore => {
    if (isLoadMore) setLoadMore(true);

    const response = await dispatch(GetCountryCodes({page}));
    if (isMountedRef.current) {
      if (countryCodes.length) {
        setPage(page + 1);
        setLoadMore(false);
        setCountryCodes(countryCodes.concat(response?.data));
      } else {
        setPage(page + 1);
        setLoadMore(false);
        setCountry(response?.data?.find(x => x.dial_code == '+355'));
        setCountryCodes(response?.data);
      }
    }
  };

  const onSendOTP = async () => {
    const contactNumberError = await validator('contactNumber', contactNumber);

    if (!contactNumberError) {
      const resp = await dispatch(
        SendOTP({contactNumber: country?.dial_code + contactNumber}),
      );

      if (resp?.statusCode == 200) {
        props.navigation.navigate('EnterOTP', {
          contactNumber: country?.dial_code + contactNumber,
        });
      }
    } else {
      setContactNumberError(contactNumberError);
    }
  };

  return (
    <View style={styles.container}>
      <ModalContainer
        isVisible={isCLModal}
        modalName={'country-list'}
        closeModal={() => setIsCLModal(false)}
        style={{
          position: 'absolute',
          top: moderateScale(80),
        }}
        modalContent={() =>
          CountryListModal({
            countryCodes,
            searchCountryCodes,
            loadmore,
            countryName,
            onSelect: country => {
              setCountry(country);
              setIsCLModal(false);
            },
            getCountryCodes,
            searchCountry: name => setCountryName(name),
          })
        }
      />

      <Header navigation={props.navigation} hideMenus={true} />

      <View style={styles.wrapper}>
        <Text style={styles.label}>
          Select your country and provide your number.
        </Text>

        <View style={[styles.inputGroup, {marginTop: moderateScale(20)}]}>
          <TouchableOpacity
            onPress={() => setIsCLModal(true)}
            style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={{uri: ApiUrls.countryflags + `${country?.code}.png`}}
            />
          </TouchableOpacity>

          <View style={styles.verLine} />

          <Text style={styles.isocode}>{country?.dial_code}</Text>
          <TextInput
            style={styles.input}
            value={contactNumber}
            placeholder="mobile number"
            placeholderTextColor={'#C6C7C9'}
            returnKeyType={'done'}
            onFocus={() => setContactNumberError(null)}
            onBlur={() =>
              validateFields(contactNumber, 'contactNumber', error =>
                setContactNumberError(error),
              )
            }
            onChangeText={contactNumber =>
              setContactNumber(contactNumber.replace(/[^0-9]/g, '').trim())
            }
          />
        </View>
        <Text style={styles.errTxt}>{contactNumberError}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={onSendOTP} style={styles.nextBtn}>
          <AntDesign name="arrowright" style={styles.icon1} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  wrapper: {
    width: _width * 0.8,
    alignSelf: 'center',
    paddingTop: moderateScale(40),
    flex: 0.9,
  },
  label: {
    fontSize: moderateScale(22),
    color: '#9C182F',
    textAlign: 'center',
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
  iconContainer: {
    width: moderateScale(30),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label1: {
    fontSize: moderateScale(18),
    color: '#9C182F',
    marginTop: moderateScale(17),
  },
  icon: {
    width: moderateScale(26),
    height: moderateScale(16),
  },
  errTxt: {
    fontSize: moderateScale(14),
    color: 'red',
  },
  verLine: {
    width: moderateScale(1),
    height: moderateScale(40),
    marginHorizontal: moderateScale(7),
    backgroundColor: '#fff',
  },
  isocode: {
    marginRight: moderateScale(5),
    color: '#C6C7C9',
  },
  input: {
    width: moderateScale(170),
    height: moderateScale(50),
    fontSize: moderateScale(14),
    color: '#000',
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

export default EnterMobileNumber;
