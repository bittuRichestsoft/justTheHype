import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import R from '../res/R';
import Modal from "react-native-modal";


const CustomDialog = props => {
    let {
      show,
      ...attributes
    } = props;

    return (
      <Modal
        isVisible = {show}
        onBackdropPress = {() => { show = false} }
        onBackButtonPress = {() => { show = false } }
        >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            
          <View style={[styles.box1]}>
        {/* Profile Image  */}
        <Image source = {require('../../app/assets/images/back_arrow.png') }
           style = {{ 
            height: 100,
            width: 100,
            borderRadius: 100/2,
            alignSelf: 'center',
            }} />
        {/* Edit Profile Image */}
        <TouchableOpacity style = {{  
    borderRadius: 30/2, 
    bottom: 30,
    right: 10,
    height: 30,
    width: 30,
    alignSelf: 'flex-end',  
    }}
    activeOpacity = {0.7} >
      <Image 
      source = {require('../../app/assets/images/back_arrow.png')}
      style={{
          height: 20,
          width: 20,
          margin: 10,
          alignSelf: 'center',
          tintColor: R.colors.whiteSmoke,
       }} 
       />
</TouchableOpacity>
        </View>
        {/*Edit Company Name */}
        <View 
        style={{
        flex: 1,
        flexDirection: 'row',
        borderColor: 'transparent',
        backgroundColor: R.colors.bckgrdComment,
        padding: 0,
        marginLeft: 0,
        marginBottom: 10,
        borderRadius: 50,
        borderWidth: 1,
        
      }}
    >
    <TextInput
    style={{
        flex: 1, 
        paddingLeft: 25,
        paddingRight: 25, 
        fontSize: 11, 
        color: 'black',
        //minHeight: 30,
        alignSelf: 'center',
    }}
    placeholder = 'Company Name'
    underlineColorAndroid = 'transparent'
    /> 
     
      </View>

        {/*Edit Address */}
        <View 
        style={{
        flex: 1,
        flexDirection: 'row',
        borderColor: 'transparent',
        backgroundColor: R.colors.bckgrdComment,
        padding: 0,
        marginLeft: 0,
        marginBottom: 10,
        borderRadius: 50,
        borderWidth: 1,
        
      }}
    //behavior="position"
    >
    <TextInput
    style={{
        flex: 1, 
        paddingLeft: 25,
        paddingRight: 25, 
        fontSize: 11, 
        color: 'black',
        //minHeight: 30,
        alignSelf: 'center',
    }}
    placeholder = 'Address'
    underlineColorAndroid = 'transparent'
    /> 
     
      </View>

        {/*Edit Phone Number */}
        <View 
        style={{
        flex: 1,
        flexDirection: 'row',
        borderColor: 'transparent',
        backgroundColor: R.colors.bckgrdComment,
        padding: 0,
        marginLeft: 0,
        marginBottom: 10,
        borderRadius: 50,
        borderWidth: 1,
        
      }}
    //behavior="position"
    >
    <TextInput
    style={{
        flex: 1, 
        paddingLeft: 25,
        paddingRight: 25, 
        fontSize: 11, 
        color: 'black',
        //minHeight: 30,
        alignSelf: 'center',
    }}
    keyboardType = 'phone-pad'
    placeholder = 'Phone Number'
    underlineColorAndroid = 'transparent'
    /> 
     
      </View>

      {/*Edit Website Name */}
      <View 
        style={{
        flex: 1,
        flexDirection: 'row',
        borderColor: 'transparent',
        backgroundColor: R.colors.bckgrdComment,
        padding: 0,
        marginLeft: 0,
        marginBottom: 10,
        borderRadius: 50,
        borderWidth: 1,
        
      }}
    //behavior="position"
    >
    <TextInput
    style={{
        flex: 1, 
        paddingLeft: 25,
        paddingRight: 25, 
        fontSize: 11, 
        color: 'black',
        //minHeight: 30,
        alignSelf: 'center',
    }}
    placeholder = 'Website Name'
    underlineColorAndroid = 'transparent'
    /> 
     
    </View>


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
        backgroundColor: '#FFFFFF',
        width: '80%',
        borderRadius: 20,
        padding: 20,
        borderColor: R.colors.LightGreenColor,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      box1: {
            width: 120,
            height: 120, // '35%'
            alignSelf: 'center',
            backgroundColor: 'transparent'
          }
  });

export default CustomDialog;