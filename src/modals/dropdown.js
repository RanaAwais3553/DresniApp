import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import { moderateScale, _width, _height } from '../utilities'


const DropDownModal = (props) => {
    return (
        <View style={[styles.modal1, { height: (_height * props?.height), }]}>
            <View style={styles.m_bar} />

            <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} style={styles.select_container}>
                {
                    props?.items?.map((item, i) => {
                        return (
                            <TouchableOpacity key={i} onPress={() => props?.onSelect(item)} style={styles.select_item}>
                                <Text style={{ color: '#000' }}>{item}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
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
        overflow: 'hidden'
    },
    m_bar: { width: moderateScale(50), height: moderateScale(8), borderRadius: moderateScale(5), backgroundColor: '#D8D8D8', borderColor: '#D8D8D8', alignSelf: 'center' },
    select_container: { marginTop: moderateScale(40), },
    select_item: { width: (_width * 0.8), height: moderateScale(40), justifyContent: "center", alignSelf: 'center', borderBottomColor: '#011E41', borderBottomWidth: moderateScale(2), marginTop: moderateScale(10), }
})

export default DropDownModal;