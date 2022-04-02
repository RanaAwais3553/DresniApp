import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {moderateScale, _width, _height} from '../utilities';
import ApiUrls from '../config/api-urls';
import {Search} from '../assets/Images';

const CountryList = props => {
  const countriesList = props?.countryName
    ? props?.searchCountryCodes
    : props?.countryCodes;

  return (
    <View style={[styles.modal1, {height: _height * 0.9}]}>
      <View style={styles.m_bar} />

      <View style={styles.headerView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            borderWidth: 1,
            borderColor: '#E6E6E6',
            borderRadius: moderateScale(30),
            marginBottom: moderateScale(10),
          }}>
          <TextInput
            style={[
              {
                marginLeft: moderateScale(20),
                height: moderateScale(50),
                color: '#000',
                width: '70%',
                fontSize: moderateScale(16),
              },
            ]}
            placeholder={'Search country'}
            placeholderTextColor={'#000'}
            underlineColorAndroid={'transparent'}
            onChangeText={searchCountryName =>
              props?.searchCountry(searchCountryName)
            }
          />
          <Search
            width={moderateScale(15)}
            height={moderateScale(15)}
            marginRight={moderateScale(20)}
            opacity={0.5}
          />
        </View>
      </View>

      <FlatList
        style={{width: _width * 0.9}}
        data={countriesList}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          props?.countryName ? null : props.getCountryCodes(true)
        }
        initialNumToRender={10}
        removeClippedSubviews={true}
        maxToRenderPerBatch={60}
        windowSize={40}
        bounces={false}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        ListFooterComponent={() => {
          //it will show indicator at the bottom of the list when data is loading otherwise it returns null
          if (!props?.loadmore) return null;
          return (
            <View style={{height: moderateScale(90), justifyContent: 'center'}}>
              <ActivityIndicator size={moderateScale(50)} color={'#9F172E'} />
            </View>
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.textInput}>
              <TouchableOpacity
                onPress={() => props?.onSelect(item)}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: moderateScale(10),
                  height: moderateScale(50),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: _width * 0.6,
                  }}>
                  <Image
                    style={{
                      width: moderateScale(20),
                      height: moderateScale(13),
                    }}
                    source={{uri: ApiUrls.countryflags + `${item.code}.png`}}
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#000000',
                      textTransform: 'capitalize',
                      fontSize: moderateScale(16),
                      marginHorizontal: moderateScale(10),
                    }}>
                    {item.name}{' '}
                  </Text>
                </View>

                <Text style={{color: '#979797', fontSize: moderateScale(16)}}>
                  {item.dial_code}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  modal1: {
    backgroundColor: 'white',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: moderateScale(15),
  },
  m_bar: {
    width: moderateScale(50),
    height: moderateScale(8),
    borderRadius: moderateScale(5),
    backgroundColor: '#D8D8D8',
    borderColor: '#D8D8D8',
    alignSelf: 'center',
  },
  headerView: {alignItems: 'center', marginTop: moderateScale(40)},
  textInput: {
    marginTop: moderateScale(10),
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
    width: '90%',
    alignSelf: 'center',
  },
  headertxt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: moderateScale(30),
  },
  bodytxt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
  },
  searchinput: {marginHorizontal: moderateScale(10), width: '70%'},
});

export default CountryList;
