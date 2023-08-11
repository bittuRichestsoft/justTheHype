import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import R from '../res/R';
var Spinner = require('react-native-spinkit');

const Loader = props => {
    const {
      loading,
      ...attributes
    } = props;
  
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            {/* <ActivityIndicator
              animating={loading} /> */}
              <Spinner isVisible={loading} size={50} type={'9CubeGrid'} color={R.colors.PrimaryColor}/>

          </View>
        </View>
      </Modal>
    )
  }

  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: 'transparent',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });

export default Loader;