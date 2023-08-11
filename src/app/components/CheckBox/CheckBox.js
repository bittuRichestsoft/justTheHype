import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import R from '../../res/R';

import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'

const CheckBox = ({ selected, onPress, style, textStyle, size = 24, color, text = '', ...props}) => (
    <TouchableOpacity activeOpacity={1} style={[{
        flexDirection: 'row',
        alignItems: 'center'
    }, style]} onPress={onPress} {...props}>
        <Icon
            size={size}
            color={color}
            name={ selected ? 'check-box' : 'check-box-outline-blank'}
        />
        <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
)

// const styles = StyleSheet.create({
//     checkBox: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     }
// })

export default CheckBox;