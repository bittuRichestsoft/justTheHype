import React from 'react';
import { StyleSheet, View } from 'react-native';
import Triangle from './arrowUp';

const TriangleDown = ({ }) => {
      return (
        <Triangle style={styles.triangleDown}/>
      )
    }

const styles = StyleSheet.create({

    triangleDown: {
        transform: [
          {rotate: '180deg'}
        ]
      }

})

export default TriangleDown;