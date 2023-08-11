import React from 'react';
import { StyleSheet, View } from 'react-native';
import R from '../res/R';
const Triangle = ({ }) => {
      return (
        <View style={[styles.triangle]} />
      )
    }
  

  const styles = StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        top: -1,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: R.colors.colorRed,
        alignSelf: 'center',
        transform: [
            {rotate: '180deg'}
          ]
      }
  })
  
  export default Triangle;