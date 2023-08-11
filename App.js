/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ Component } from 'react';
import {
  SafeAreaView,
  StyleSheet, ActivityIndicator,
  ScrollView, Platform,
  View, TouchableOpacity, TouchableNativeFeedback,
  Text, Image, TextInput, Alert,
  StatusBar, ImageBackground, Dimensions, PermissionsAndroid, ToastAndroid, Linking
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import R from './src/app/res/R';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator, DrawerItems, createBottomTabNavigator } from 'react-navigation';
import Requests from './src/app/screens/Auth/apiUsingAxios';
import login from './src/app/screens/Auth/login';
import register from './src/app/screens/Auth/register';
import redeem from './src/app/screens/subscription/redeem';
import home from './src/app/screens/Home/home';
import { Home, Notifications, Search, Subscription, MyProfile, webViews, aboutApp } from './src/app/utils/screenNames';
import Notification from './src/app/screens/notification/Notification';
import NotificationSetting from './src/app/screens/notificationSetting/NotificationSetting';

import SearcH from './src/app/screens/search/Search';
import SubscriptioN from './src/app/screens/subscription/Subscription';
import MyProfilE from './src/app/screens/myProfile/MyProfile';
import AllwebView from './src/app/screens/webViews/AllwebView';
import ProductDesc from './src/app/screens/Home/ProductDesc';
import EditProfile from './src/app/screens/myProfile/EditProfile';
import RedeemHistory from './src/app/screens/myProfile/RedeemHistory';
import HowitWork from './src/app/screens/aboutApp/HowitWork';
import ForgotPassword from './src/app/screens/Auth/ForgotPaswrd';
import OrderPlaced from './src/app/screens/subscription/OrderPlaced';
import PaymentScreen from './src/app/screens/subscription/PaymentScreen';
import ApiCalls from './src/app/utils/ApiCalls';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationWithParams from './src/app/utils/NavigationWithParams';
import ImageViewer from './src/app/utils/ImageViewer';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import OfflineNotice from './src/app/utils/offlineNotice';
import firebase, { notifications } from 'react-native-firebase';

var {height, width} = Dimensions.get('screen');


class App extends Component {
  constructor(props){
    super(props);
    this._handleOpenURL = this._handleOpenURL.bind(this);
  }
  componentDidMount(){
    SplashScreen.hide();

    if(Platform.OS === 'android'){
      this.requestStoragePermission();

        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => {
          //ToastAndroid.show(data, ToastAndroid.LONG);
          console.log('Success', data)
        }).catch(err => {
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
          // codes : 
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
          //ToastAndroid.show("Error " + err.message + ", Code : " + err.code, ToastAndroid.LONG);
          console.log('Error', err)
        });
      

    }
     this.checkPermission();
     this.createNotificationListeners();
     Linking.addEventListener('url', this._handleOpenURL);

  }
  _handleOpenURL(event) {
    console.log('Url', event.url);
    
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  //========notification===================

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        console.log("notification>>>>>>>>>>>>>>")
        console.log(notification)
        //this.showAlert(title, body);
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true,
        })
        .setSound('default')
        .setNotificationId(notification.notificationId)
        .setTitle(title )
        .setSubtitle(title) //Changed Code Here
        .setBody(body)
        .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
        .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.Max)
        .android.setAutoCancel(true);
        firebase.notifications()
          .displayNotification(localNotification)
          .catch((err) =>{
            if (__DEV__) {
              console.error(err);
          } else {
          }
          });
    });
    const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', firebase.notifications.Android.Importance.Max)
    .setDescription('Demo app description')
    .setSound('default'); //nokiatone.mp3
  firebase.notifications().android.createChannel(channel);
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));

      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
      .setSound('default')
      .setNotificationId(message.messageId)
      .setTitle(message.data.title )
      //.setSubtitle(title) //Changed Code Here
      .setBody(message.data.body)
      .android.setChannelId('fcm_default_channel') // e.g. the id you chose above
      .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
      .android.setColor('#000000') // you can set a color here
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      .android.setAutoCancel(true);
      firebase.notifications()
        .displayNotification(localNotification)
        .catch((err) =>{
          if (__DEV__) {
            console.error(err);
        } else {
        }
        });

    });
  }
  componentWillUnmount() {
   // this.notificationListener();
   //this.notificationOpenedListener();
  }
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    //alert(fcmToken)
    // if (!fcmToken) {
      if (fcmToken==null) {
       
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken:', fcmToken);
        // user has a device token
        if (__DEV__) {
          console.log('fcmToken:', fcmToken);
        }
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    
  }
  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      if (__DEV__) {
        console.log('permission rejected', error);
      } else {
      }
    }
  }




  //=============notification end ================

  requestStoragePermission() {
    try {
      const granted = PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
         PermissionsAndroid.PERMISSIONS.CAMERA,
         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ],
        {
          title: 'Storage Read/Write Permission',
          message:
            'Allow App to access camera, photos, media and files on your device?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        if (__DEV__) {
          console.log('You can use the Storage, Camera');
      } else {
          
      }

        
      } else {
        if (__DEV__) {
          console.log('permissions denied', granted);
      } else {
          
      }
        
      }
    } catch (err) {
      if (__DEV__) {
        console.warn(err);
    } else {
        
    }
      
    }
  }

  NativeTouchable(props){
    if(Platform.OS == 'android'){
      return(
        <TouchableNativeFeedback onPress={() =>
          {
           
           props.navigation.closeDrawer();
           
             this.showDiAlog()
           
           }
         }>
         <View style={{
               height: 50,
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',
               paddingLeft: 20,
           }}>
           <Image
                       style={{ width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/logoutIcon.png') }
                   />
                 <Text style={{margin: 16, fontWeight: 'normal',color: 'black' }}>Logout</Text>
                     
                 </View>
               </TouchableNativeFeedback>
   
          
      )
    }else{
      return(
        <TouchableOpacity onPress={() =>
          {
           
           props.navigation.closeDrawer();
           
            this.showDiAlog()
           
           }
         }>
         <View style={{
               height: 50,
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',
               marginLeft: 20,
           }}>
           <Image
                       style={{ width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/logoutIcon.png') }
                   />
                 <Text style={{margin: 16, fontWeight: 'normal',color: 'black' }}>Logout</Text>
                     
                 </View>
               </TouchableOpacity>
   
          
      )
    }
  }

  render(){  
    console.disableYellowBox = true;

    const AuthStack = createStackNavigator(
      {
        login: login,
        register: register,
        forgotpaswrd: ForgotPassword
      },
      {
        headerMode: 'none',
      }
      )

      const HomeStack = createStackNavigator(
        { 
          home: {screen: home, path: 'home'},
          desc:{screen: ProductDesc, path: 'desc/:secondId'},
          redeem: redeem,
          sub: SubscriptioN,
          
        },
        {
          headerMode: 'none',
        }
        );

        const SearchStack = createStackNavigator(
          {
            search: SearcH,
            desc: ProductDesc,
            redeem: redeem
          },
          {
            headerMode: 'none',
          }
          );

        const SubScriptionStack = createStackNavigator(
          {
            sub: SubscriptioN,
            payment: PaymentScreen,
            orderplaced: OrderPlaced,
            webViews:AllwebView
            
          },
          {
            headerMode: 'none',
          }
          );  
            
      
          SubScriptionStack.navigationOptions = ({ navigation }) => {
          var name = (navigation.state.index !== undefined ? navigation.state.routes[navigation.state.index] : navigation.state.routeName)
          let drawerLockMode = 'locked-closed';
          //&& name.routeName != 'redeem'
          if (name.routeName != 'sub' && name.routeName != 'payment' && name.routeName != 'orderplaced' ) {
              drawerLockMode = 'unlocked'
          }
      
          return {
              drawerLockMode,
          };
          }

          const NotificationStack = createStackNavigator(
          {
            notificationSetting: NotificationSetting,
            notificationHistory: Notification,
          },
          {
            headerMode: 'none',
          }
          );

          const ProfileStack = createStackNavigator(
            {
              profile: MyProfilE,
              editProfile: EditProfile,
              redeemhis: RedeemHistory,
              imageViewer: ImageViewer
            },
            {
              headerMode: 'none',
            }
            );
            
            ProfileStack.navigationOptions = ({ navigation }) => {
              var name = (navigation.state.index !== undefined ? navigation.state.routes[navigation.state.index] : navigation.state.routeName)
              let drawerLockMode = 'locked-closed';
        
              if ( name.routeName != 'editProfile' ) {
                  drawerLockMode = 'unlocked'
              }
          
              return {
                  drawerLockMode,
              };
              }
              
              const HowitWorksStack = createStackNavigator(
                {
                  about: HowitWork
                },
                {
                  headerMode: 'none',
                }
                );  
              
                HowitWorksStack.navigationOptions = ({ navigation }) => {
                var name = (navigation.state.index !== undefined ? navigation.state.routes[navigation.state.index] : navigation.state.routeName)
                let drawerLockMode = 'locked-closed';
                //&& name.routeName != 'redeem'
                if (name.routeName != 'sub') {
                    drawerLockMode = 'unlocked'
                }
            
                return {
                    drawerLockMode,
                };
                }

    let routeConfigs = {
      Home: { 
        screen: HomeStack,
        path: 'drawerHome',
        navigationOptions: {
          drawerIcon:({ tintColor })=> null,
          drawerLabel:({tintColor, focused})=> null
        }
      },
      Notifications:{
        screen: NotificationStack,
        navigationOptions: {
          drawerIcon:({ tintColor })=> null,
          drawerLabel:({tintColor, focused})=> null
        }
      },
      
      Search:{
        screen: SearchStack,
        navigationOptions: {
          drawerIcon:({ tintColor })=> null,
          drawerLabel:({tintColor, focused})=> null
        }
      },
      Subscription:{
        screen: SubScriptionStack,
        navigationOptions: {
          drawerIcon:({ tintColor })=> null,
          drawerLabel:({tintColor, focused})=> null
        }
      },
      MyProfile:{
        screen: ProfileStack,
        navigationOptions: {
          drawerIcon:({ tintColor })=> null,
          drawerLabel:({tintColor, focused})=> null
        }
      },
      webViews:{
        screen: AllwebView,
        navigationOptions: {
          drawerIcon:({ tintColor })=> null,
          drawerLabel:({tintColor, focused})=> null
        }
      },
      aboutApp:{
        screen: HowitWorksStack,
        navigationOptions: {
          drawerIcon:({ tintColor })=> null,
          drawerLabel:({tintColor, focused})=> null
        }
      }

    };

    const CustomDrawerContentComponent = (props) => {

      return(
      <SafeAreaView style= {styles.drawercontainer}> 
          <View style={{ flex: 1 }} >
      
      <View style={[styles.HeaderStyle]}>

<TouchableOpacity
      onPress={() => { props.navigation.closeDrawer()  }}>
      <View style= {{ flexDirection: 'row', paddingLeft: 20 }}>
          <Image
              style={{ width: 24, height: 24 }}
              source={require('./src/app/assets/images/back_arrow.png')}
          />
  </View>
  </TouchableOpacity>

        </View>
      <View style={{ backgroundColor: R.colors.PrimaryColor, borderBottomRightRadius: 50, padding: 10 }} >
  <Image
          style = { [styles.imageStyle,{ width: 155, height: 156 }]}
          source = { require('./src/app/assets/images/logo.png') }
          />
  {/* <Text style={{ fontSize: 12, textAlign: 'center', color: 'white', fontWeight: '700', marginTop: 5 }}
   >Just The TAP</Text> */}

  </View>
  
  <View style={{ backgroundColor: R.colors.PrimaryColor, flex: 1 }} >
  <SafeAreaView style={{ flex: 1, backgroundColor: R.colors.white, borderTopLeftRadius: 50, paddingTop: 30}} >
          
          <ScrollView >
          <DrawerItems {...props} />
          {/* Home Screen Click */}
          {Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('Home',{ 
           'title': '',
           'desc': '',
           'event_Date': '',
           'event_Time': '',
           'user_id': ''
           })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'Home' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Home' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/homeIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'Home' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Home</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('Home',{ 
              'title': '',
              'desc': '',
              'event_Date': '',
              'event_Time': ''
              })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'Home' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Home' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/homeIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'Home' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Home</Text>
                     
                 </View>
               </TouchableOpacity>
}

{/* searchIcon.png */}
{Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('Search',{ 
           'title': '',
           'desc': '',
           'event_Date': '',
           'event_Time': '',
           'user_id': ''
           })
           props.navigation.closeDrawer();
           }
         }>
         <View style={
           props.activeItemKey == 'Search' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Search' ?
                       { width: 22, height: 22, marginRight: 16, tintColor: 'red' }:
                         { width: 22, height: 22, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/searchIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'Search' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Search</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('Search',{ 
              'title': '',
              'desc': '',
              'event_Date': '',
              'event_Time': ''
              })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'Search' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Search' ?
                       { width: 22, height: 22, marginRight: 16, tintColor: 'red' }:
                         { width: 22, height: 22, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/searchIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'Search' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Search</Text>
                     
                 </View>
               </TouchableOpacity>
}

          {/* Notifications Screen */}
          {Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('Notifications',{ 
           'title': '',
           'desc': '',
           'event_Date': '',
           'event_Time': '',
           'user_id': ''
           })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'Notifications' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Notifications' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/notification.png') }
                   />
                 <Text style={props.activeItemKey == 'Notifications' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Notifications</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('Notifications',{ 
              'title': '',
              'desc': '',
              'event_Date': '',
              'event_Time': ''
              })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'Notifications' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Notifications' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/notification.png') }
                   />
                 <Text style={props.activeItemKey == 'Notifications' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Notifications</Text>
                     
                 </View>
               </TouchableOpacity>
}
{/* dollarIcon.png */}
{Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('Subscription',{ 
           'title': '',
           'desc': '',
           'event_Date': '',
           'event_Time': '',
           'user_id': ''
           })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'Subscription' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Subscription' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/dollarIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'Subscription' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Buy A Plan</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('Subscription',{ 
              'title': '',
              'desc': '',
              'event_Date': '',
              'event_Time': ''
              })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'Subscription' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'Subscription' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/dollarIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'Subscription' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Buy A Plan</Text>
                     
                 </View>
               </TouchableOpacity>
}
{/* MyProfile */}
{Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('MyProfile',{ 
           'title': '',
           'desc': '',
           'event_Date': '',
           'event_Time': '',
           'user_id': ''
           })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'MyProfile' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'MyProfile' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/myAccount.png') }
                   />
                 <Text style={props.activeItemKey == 'MyProfile' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>My Profile</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('MyProfile',{ 
              'title': '',
              'desc': '',
              'event_Date': '',
              'event_Time': ''
              })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'MyProfile' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'MyProfile' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/myAccount.png') }
                   />
                 <Text style={props.activeItemKey == 'MyProfile' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>My Profile</Text>
                     
                 </View>
               </TouchableOpacity>
}
{/* How it's Works */}
{Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('aboutApp')
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'aboutApp' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'aboutApp' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/worksIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'aboutApp' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>How It Works</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('aboutApp')
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'aboutApp' ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'aboutApp' ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/worksIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'aboutApp' ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>How It Works</Text>
                     
                 </View>
               </TouchableOpacity>
}

{/* Contact Us */}
{Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('webViews',{ 'type': 1 })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'webViews' && props.items[5].params.type == 1 ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'webViews' && props.items[5].params.type == 1 ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/contactIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'webViews' && props.items[5].params.type == 1 ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Contact Us</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('webViews',{ 'type': 1 })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'webViews' && props.items[5].params.type == 1 ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'webViews' && props.items[5].params.type == 1 ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/contactIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'webViews' && props.items[5].params.type == 1 ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Contact Us</Text>
                     
                 </View>
               </TouchableOpacity>
}

{/* Privacy Policy */}
{Platform.OS == 'android' ? 
 <TouchableNativeFeedback
          onPress={() =>
          {
           props.navigation.navigate('webViews',{ 'type': 2 })
         // Linking.openURL('http://167.172.209.57/tap_brewery/api/v1/privacy-policy')
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'webViews' && props.items[5].params.type == 2 ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'webViews' && props.items[5].params.type == 2 ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={require('./src/app/assets/images/privacyIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'webViews' && props.items[5].params.type == 2 ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Privacy Policy</Text>
                     
                 </View>
               </TouchableNativeFeedback>
:
<TouchableOpacity activeOpacity={0.7}
          onPress={() =>
          {
            props.navigation.navigate('webViews',{ 'type': 2 })
           props.navigation.closeDrawer();
                       
           
           }
         }>
         <View style={
           props.activeItemKey == 'webViews' && props.items[5].params.type == 2 ?
           {
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 20,
            backgroundColor: 'transparent'
        }:{
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
}}>
           <Image
                       style={props.activeItemKey == 'webViews' && props.items[5].params.type == 2 ?
                       { width: 24, height: 24, marginRight: 16, tintColor: 'red' }:
                         { width: 24, height: 24, marginRight: 16, tintColor: 'black' }} 
                       source={ require('./src/app/assets/images/privacyIcon.png') }
                   />
                 <Text style={props.activeItemKey == 'webViews' && props.items[5].params.type == 2 ?
                 {margin: 16, fontWeight: 'normal',color: 'red' }:
                   {margin: 16, fontWeight: 'normal',color: 'black' }}>Privacy Policy</Text>
                     
                 </View>
               </TouchableOpacity>
}
{this.NativeTouchable(props)}
{/* footerImg.png */}
<View style={{ justifyContent: 'flex-end' }} >
<Image
          style = {[styles.imageStyle,{ bottom: 0, width: 79, height: 156 }]}
          source = { require('./src/app/assets/images/footerImg.png') }
          />
      </View>
          </ScrollView>
          </SafeAreaView>
  </View>
        </View>
      </SafeAreaView>
      );
      
    };

    this.showDiAlog = () => {
      Alert.alert(
        'Account Logout',
        'Do you want to Logout account?',
        [
          
          {
            text: 'No',
            onPress: () => { if(__DEV__){ console.log('No is Clicked') } } ,
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => ApiCalls.Logout(this)},
        ],
        {cancelable: true},
      );
    }

    let drawerNavigatorConfig = {    
      initialRouteName: Home,
      drawerWidth: width / 1.50,
      drawerPosition: 'left',
      contentComponent: CustomDrawerContentComponent,
      unmountInactiveRoutes: true,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      // overlayColor: '#00000040',
      contentOptions: {
          activeTintColor: 'red',
          activeBackgroundColor: 'transparent',
          inactiveTintColor: 'black',
          style: {
            backgroundColor: 'black',
            flex: 1
          },
      },
      order: [ Home, Search, Notifications, Subscription, MyProfile, webViews, aboutApp ]
    };
    
    
    
    const AppStack = createDrawerNavigator(routeConfigs, drawerNavigatorConfig)

      const SwitchStack = createSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          Auth: AuthStack,
          App: { screen: AppStack, path: 'AppStack' },
        },
        {
          initialRouteName: 'AuthLoading',
        }
      );

    const AppContainer = createAppContainer(SwitchStack); 
const pref = 'justTheTap://'
    return (
<>
      <StatusBar barStyle="dark-content" />
    
  <View style={styles.container}>
  <OfflineNotice />
  <AppContainer 
  uriPrefix={pref}

  ref={navigatorRef => {
    NavigationWithParams.setHomeNavigator(navigatorRef);
  }}
  />
  </View>
      </>
    )
  }

}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('session_id');
    if (__DEV__) {
      console.log(userToken);
  } else {
      
  }
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <ActivityIndicator color={R.colors.PrimaryColor} />
        <StatusBar barStyle="default" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: R.colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  background: {
    paddingBottom: 0,
    //paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
    height: Dimensions.get('window').height
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'contain',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: 128,
    marginTop: 350,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  container: {
    flex: 1,
    //paddingBottom: 100,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: R.colors.Viewbackgrnd
},
TextBold: {
    /*alignSelf: 'flex-end',*/
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000'
},
imageStyle: {
    height: 250,
    width: '50%',
    alignSelf: 'center',
    marginLeft: 0,
    //marginBottom: 30,
},
input: {
    paddingLeft: 25,
    height: 50,
    fontSize: 11,
    color: R.colors.hintColor, 
},
inputPassword: {
    paddingLeft: 25,
    height: 50,
    fontSize: 11,
    color: R.colors.hintColor,
},
buttonContainer: {
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: R.colors.PrimaryColor,
    paddingVertical: 10,
    justifyContent: 'center',
    ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
        },
        android: {
            elevation: 2,
            // bottomElevation:4,
            borderWidth: 0.2,
            borderColor:'#000'
    
        },
    })
},
buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize'
},
rowViewStyle: { 
     flex: 1,
     flexDirection: 'row',
     marginBottom: 10 ,
     marginLeft: 0,
     marginRight: 5
},
rowViewBottomStyle: { 
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15 ,
    marginLeft: 15,
    marginRight: 15
},
spinner: {
marginBottom: 50
},
SectionStyle: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#fff',
borderWidth: 1,
borderColor: '#000',
height: 50,
marginBottom: 10,
borderRadius: 50/2
},
IconStyle: {
padding: 10,
marginRight: 15,
height: 16,
width: 16,
resizeMode : 'stretch',
alignItems: 'center'
},
container2: {
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#F5FCFF',
},
drawercontainer:{
  flex: 1,
  backgroundColor: 'white',
},
HeaderStyle:{
  height: 25,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 999,
  marginTop: 40,
  backgroundColor: 'transparent'
}
});

export default App;
