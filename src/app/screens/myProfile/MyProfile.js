import React, {Component} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image, Switch,AsyncStorage, RefreshControl,
Dimensions, Platform, ScrollView, ToastAndroid, Alert, StyleSheet, ActivityIndicator } from 'react-native';

import R from '../../res/R';
import Loader from '../../utils/Loader';
import ApiCalls from '../../utils/ApiCalls';
import DeviceInfo from 'react-native-device-info';
import Dialog from "react-native-dialog";

let CenterWidth = Platform.OS == 'android' ?
Dimensions.get('window').width/2-60 : Dimensions.get('screen').width/2-60 ;


let UserName='';
let userDp='';
let userEmail='';
let sessionId = '';
let userId = '';
let userPhone = '';
let userLocation = '';
let userLat = '';
let userLng = '';
let pushStatus = '';


class MyProfile extends Component<{}, State> {

  constructor(props){
    super(props);
    
    this.state = {
      loading: true,
      refreshing: false,
      userInfo: null,
      error: null,
      switchValue: false,
      dialogVisible: false,
      TextDialogOldPaswrd: '',
      TextDialogNewPaswrd: '',
      TextDialogNewConfirmPaswrd: '',
      loadingimage: true,
      data: {}
    }
}

toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    ApiCalls.EnablePushApi(this, value);
    //state changes according to switch
    //which will result in re-render the text
    this.setState({ switchValue: value })
   
  };

CallAsyncData = () => {
  ApiCalls.GetProfileApi(this);
}

setNotificationToggle= async () => {
  
    try {
      const value = await AsyncStorage.getItem('push');
      if (value != null) {
          // We have data!!
         // console.log(value);
          // let data =JSON.parse(value)
           this.setState({switchValue:value==1 ? true : false})
        
      }
  } catch (error) {
    console.log(error)
      // Error retrieving data
  }

}

componentDidMount(){
  this.setNotificationToggle()

  
this.CallAsyncData()
  

this.willFocusSubscription = this.props.navigation.addListener(
  'willFocus',
  () => {
    this.setState({ loading: true });
    this.CallAsyncData()
    
    // this.ProfileApiData();
  }
);

}

onRefreshApi = () => {
  this.setState({ refreshing: true });
  this.CallAsyncData()
}

handleCancel = () => {
  this.setState({ dialogVisible: false });
};

componentWillUnmount() {
  this.willFocusSubscription.remove();
}

    render() {
      const reactNativeModalProps = {
        onBackdropPress: this.handleCancel,
      };
        return (
            <SafeAreaView style={{
                flex: 1
            }}>
          <View style = {styles.Header} >
          <TouchableOpacity
          onPress={() => { this.props.navigation.goBack(null)  }}>
      <View style= {{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 5, }}>

          <Image
              style={{ width: 24, height: 24 }}
              source={ require('../../assets/images/back_arrow.png') }
          />
  </View>
  </TouchableOpacity>
       
  <View style= {{ flex: 1 }}> 
            <Text numberOfLines={1}
            style={styles.titlestyle}>{'My Profile'}</Text>
            

            </View>

            <View style= {{ height: 10, width: 30 }}/>   

          </View>

     
    <ScrollView
    refreshControl={
      <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefreshApi}
      />
  }
    >

    <View style = {{ height: 150, marginBottom: 120, backgroundColor: R.colors.PrimaryColor }} />

<View 
style={{
  left: CenterWidth,
  top: 150-(100/2),
  position: 'absolute'
}}
>


<View style = {{ 
  height: 100,
  width: 100,
  borderRadius: 100/2,
  borderWidth: 5,
  borderColor: 'white',
  backgroundColor: 'black',
  justifyContent: 'center', 
  alignItems: 'center',
  alignSelf: 'center',
  ...Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    android: {
        elevation: 2

    },
  })
  }} >


<TouchableOpacity activeOpacity={0.7}
onPress={() => { Object.keys(this.state.data).length === 0 ||
 this.state.data.image == undefined || this.state.data.image == null || this.state.data.image == '' ?
 Platform.OS == 'android' ? ToastAndroid.show('Reload the Screen', ToastAndroid.SHORT) : Alert.alert('Reload the Screen', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
 :this.props.navigation.navigate('imageViewer', {'imgurl': this.state.data.image } )
  } }>

<Image source = {{ uri: this.state.data.image } } 
      style = {{ 
       height: 95,
       width: 95,
       borderRadius: 100/2,
       }}
       onLoadEnd={this._onLoadEnd}
       onError={this._onLoadError}
       />
<ActivityIndicator
          style={styles.activityIndicator}
          animating={this.state.loadingimage}
          size="large"
          color={Platform.OS == 'android' ? "white" : "gray"}
        />
   </TouchableOpacity>

</View>

<View style={{ justifyContent: 'center' }} >
    <Text style= {{ color: 'black', textAlign: 'center', fontWeight: 'bold', 
    fontSize: 16 }}>{ Object.keys(this.state.data).length === 0 ? 'User Name' : this.state.data.username}</Text>

    <View style={{ marginTop: 5 }} >
    <Text style= {{ color: 'gray', textAlign: 'center', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '800', fontSize: 12, padding: 1 }}>
      { Object.keys(this.state.data).length === 0 ? 'example@gmail.com' : this.state.data.email}</Text>
    
    {/* <Text style= {{ color: 'gray', textAlign: 'center', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '800', fontSize: 12, padding: 1 }}>
      {Object.keys(this.state.data).length === 0 ? 'gender' : this.state.data.gender}</Text>

      <Text style= {{ color: 'gray', textAlign: 'center', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '800', fontSize: 12, padding: 1 }}>
      {Object.keys(this.state.data).length === 0 ? 'state' : this.state.data.state}</Text>
    
      <Text style= {{ color: 'gray', textAlign: 'center', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '800', fontSize: 12, padding: 1 }}>
      {Object.keys(this.state.data).length === 0 ? 'zipcode' : this.state.data.zipcode}</Text> */}

       

    </View>
    </View>
</View>



  <View style={{ padding: 20 }} >

    <View style={{height: 1, backgroundColor: R.colors.GlowColor}} /> 

    <TouchableOpacity activeOpacity={1}
    style={{ flexDirection: 'row', paddingLeft: 25, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} 
        onPress={() => { this.props.navigation.navigate('redeemhis')
    //         this.props.navigation.navigate(Routes.EditProfile,{ 'user2': true, 'showPaswrd': true,
    //    'SessionId': sessionId, 'UserId': userId,
    //    'userPhone': userPhone, 'userLocation': userLocation, 'userLat': userLat, 'userLng': userLng,
    //    'UserName': UserName,'userDp': userDp, 'userEmail':userEmail }) 
      
      }}>
      <Image source = {require('../../assets/images/ticket.png') } 
 style = {{ 
  height: 24,
  width: 24
  }} />

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 15, flexDirection: 'row' }} >
    <Text style= {{ color: 'black', textAlign: 'left', fontWeight: Platform.OS == 'android' ? 'bold' : '700', 
    fontSize: 15, }}>Redemption History</Text>

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} >

    <Image source={require('../../assets/images/next.png')}
    style = {{ height: 12, width: 12 }}
    />
</View>
    {/* <Text style= {{ color: '#e8e8e8', textAlign: 'left', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '500', fontSize: 12}}>a user can manage their account</Text> */}
    </View>
    </TouchableOpacity>
   

    <View style={{ height: 1, backgroundColor: R.colors.GlowColor}} /> 

    <TouchableOpacity activeOpacity={1}
    style={{ flexDirection: 'row', paddingLeft: 25, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} 
        onPress={() => { this.toggleSwitch(!this.state.switchValue) }}>
      <Image source = {require('../../assets/images/notification.png') } 
 style = {{ 
  height: 24,
  width: 24
  }} />

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 15, flexDirection: 'row' }} >
    <Text style= {{ color: 'black', textAlign: 'left', fontWeight: Platform.OS == 'android' ? 'bold' : '700', 
    fontSize: 15, }}>Notifications</Text>

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} >

<Switch
          style={{ marginTop: 0 }}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
          trackColor={{true: R.colors.PrimaryColor, false: Platform.OS=='android'?'#d3d3d3':'#fbfbfb' }}
          thumbColor={'#FFFFFF'}
          ios_backgroundColor="#fbfbfb"

        />
    
</View>
    {/* <Text style= {{ color: '#e8e8e8', textAlign: 'left', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '500', fontSize: 12}}>a user can manage their account</Text> */}
    </View>
    </TouchableOpacity>
   

    <View style={{ height: 1, backgroundColor: R.colors.GlowColor}} /> 

    <TouchableOpacity activeOpacity={1}
     style={{ flexDirection: 'row', paddingLeft: 25, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} 
        onPress={() => { 
       Object.keys(this.state.data).length === 0 ? Platform.OS == 'android' ? ToastAndroid.show('Reload the Screen', ToastAndroid.SHORT) : Alert.alert('Reload the Screen', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
       : this.props.navigation.navigate('editProfile',{ 'UserName': this.state.data.username,
       'userDp': this.state.data.image, 'userEmail': this.state.data.email, 'userGender': this.state.data.gender,
        'userState': this.state.data.state, 'userZipcode': this.state.data.zipcode,'age':this.state.data.age })
      }}>
      <Image source = {require('../../assets/images/myAccount.png') } 
 style = {{ 
  height: 24,
  width: 24
  }} />

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 15, flexDirection: 'row' }} >
    <Text style= {{ color: 'black', textAlign: 'left', fontWeight: Platform.OS == 'android' ? 'bold' : '700', 
    fontSize: 15, }}>Edit Profile</Text>

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} >

    <Image source={require('../../assets/images/next.png')}
    style = {{ height: 12, width: 12 }}
    />
</View>
    {/* <Text style= {{ color: '#e8e8e8', textAlign: 'left', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '500', fontSize: 12}}>a user can manage their account</Text> */}
    </View>
    </TouchableOpacity>
   
   
    <View style={{ height: 1, backgroundColor: R.colors.GlowColor}} /> 

    <TouchableOpacity activeOpacity={1}
    style={{ flexDirection: 'row', paddingLeft: 25, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} 
        onPress={() => { this.setState({ dialogVisible: true }) }}>
      <Image source = {require('../../assets/images/password.png') } 
 style = {{ 
  height: 24,
  width: 24
  }} />

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 15, flexDirection: 'row' }} >
    <Text style= {{ color: 'black', textAlign: 'left', fontWeight: Platform.OS == 'android' ? 'bold' : '700', 
    fontSize: 15, }}>Change Password</Text>

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} >

    <Image source={require('../../assets/images/next.png')}
    style = {{ height: 12, width: 12 }}
    />
</View>
    {/* <Text style= {{ color: '#e8e8e8', textAlign: 'left', 
    fontWeight: Platform.OS == 'android' ? 'normal' : '500', fontSize: 12}}>a user can manage their account</Text> */}
    </View>
    </TouchableOpacity>
   

    <View style={{ height: 1, backgroundColor: R.colors.GlowColor}} /> 


    </View>

    <View style={{ justifyContent: 'flex-end', height: Dimensions.get('screen').height / 4 }} >
  <Text style={{ textAlign: 'center', color: 'gray' }} >Build Version : V{''+DeviceInfo.getVersion()}</Text>
      </View>

    </ScrollView>
    <Loader loading={this.state.loading} />
    <Dialog.Container visible = { this.state.dialogVisible }  
        {...reactNativeModalProps} 
        >
                <Dialog.Title>Change Password</Dialog.Title> 
                <Dialog.Input
                placeholder = {R.strings.changePasswordScreen.hints.emptyOldPassword}
                keyboardType= 'default'
                onChangeText={TextDialogOldPaswrd => this.setState({TextDialogOldPaswrd})}
                underlineColorAndroid='black'
                style= {{ color: 'black',  }}
                />
                <Dialog.Input
                placeholder = {R.strings.changePasswordScreen.hints.emptyNewPassword}
                keyboardType= 'default'
                onChangeText={TextDialogNewPaswrd=> this.setState({TextDialogNewPaswrd})}
                underlineColorAndroid='black'
                style= {{ color: 'black',  }}
                />
                <Dialog.Input
                placeholder = {R.strings.changePasswordScreen.hints.emptyNewConfirmPaswrd}
                keyboardType= 'default'
                onChangeText={TextDialogNewConfirmPaswrd=> this.setState({TextDialogNewConfirmPaswrd})}
                underlineColorAndroid='black'
                style= {{ color: 'black',  }}
                />
                {/* <Dialog.Button label="Cancel" onPress={() => {ApiCalls.handleCancel(this)}} /> TextDialogNewConfirmPaswrd */}
                <Dialog.Button label="Submit" onPress={() => {
                    ApiCalls.ChangePassordValidations(this)
                    //this.props.navigation.navigate('login');

                    }} />
                </Dialog.Container>

    </SafeAreaView>
    );
    }


    showDiAlog = async () => {
      Alert.alert(
        'Are you sure you want to log out?',
        '',
        [
          
          {
            text: 'Cancel',
            onPress: () =>  console.log('Cancelled'),
            style: 'cancel',
          },
          {text: 'Log out', onPress: () => this._signOut()},
        ],
        {cancelable: true},
      );
    }

    _signOut = () => {
      
    };

    _onLoadEnd = () => {
      this.setState({
        loadingimage: false
      })
    }

    _onLoadError = () => {
      if(Platform.OS == 'android'){
        ToastAndroid.show('Network Fail Error', ToastAndroid.SHORT);
      }else{
        alert('Network Fail Error')
      }
      
      this.setState({
        loadingimage: false
      })
    }

}

export default MyProfile;

const styles = StyleSheet.create({
  Header:{
    height: 50,
    backgroundColor: R.colors.PrimaryColor,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    zIndex: 999,
    alignItems: 'center',
    paddingBottom: 5,
    ...Platform.select({
      ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
      },
      android: {
          elevation: 2

      },
    })
    },
    titlestyle:{
      fontSize: 15,
      fontWeight: Platform.OS == 'android' ? 'bold' : '500',
      color: 'white',
      textAlign: 'center',
      textTransform: 'capitalize'
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})