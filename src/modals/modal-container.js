import React, { useState } from 'react';
import { Button, Text, View, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale } from '../utilities';

const ModalContainer = props => {
    return (
        props.modalContent() && <Modal
            animationIn={props?.modalName == 'uncloseable' ? 'flash' : 'slideInUp'}
            // animationOut={'flash'}
            isVisible={props.isVisible}
            onSwipeCancel={props?.modalName == 'uncloseable' ? null : props.closeModal}
            // swipeDirection={'down'}
            onBackdropPress={props?.modalName == 'uncloseable' ? null : props.closeModal}
            onBackButtonPress={props?.modalName == 'uncloseable' ? null : props.closeModal}
            // backdropColor={'black'}
            style={{
                ...props.style,
                margin: 0,
                alignItems: undefined,
                justifyContent: 'flex-end',
            }}>
            {props.modalContent()}
        </Modal>
    );
}

export default ModalContainer;