import { ToastAndroid, Platform, Alert } from 'react-native'
import R from '../res/R'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import NavigationWithParams from './NavigationWithParams';
//import firebase from 'react-native-firebase';
import { BaseURL, BaseURL1 } from '../utils/Global';
import axios from 'axios';
const registerUrl = 'register';
const loginUrl = 'login';
const socialLogin = 'social_login';
const verify_Account = 'verify_email_with_otp';
const Forgot_Password = 'forgot_password';
const LogoutUrl = 'logout';
const HomeApi = 'app_content';
const GetProfile =  'get_profile';
const ChangePasUrl = 'change_password';
const editProfileURL = 'edit_profile';
const sendMessage = 'chat/send';
const sellProduct = 'ads/sell_product';
const product_list_by_city = 'ads/product_list';
const favoriteList = 'favourites';
const sellinglist = 'selling_list';
const soldlist = 'sold_list';
const markAsSold = 'ads/mark_as_sold';
const add_to_favourites = 'ads/add_to_favourites';
const product_by_category = 'ads/product_by_category';
const feature_products = 'ads/feature_product?';
const searchProducts = 'search';
const filterProducts = 'ads/filter?';
const ReportProduct = 'ads/report';
const ReceiveChat = 'chat/receive?session_id=';
const chatUersList = 'chat?session_id=';
const EditSellProduct = 'ads/edit_sell_product';
const getCarMakerModels = 'ads/get_car_makers_models';
const getExpireProducts = 'get_expiry_products';
const removeSinglePic = 'user/remove_pic';
const reactivateProduct = 'ads/reactive_expiry';
const enablePush = 'enable_notification';
const NotificationList = 'notifications';
const DeletePost = 'ads/delete_product';
const DeactivateAccount = 'user/deactivate_account';
const UserCity = 'cities';
const brewery_by_id = 'city_search';
const redeem_History_ = 'redeem_history';
// const productStyle = 'style_list',
const doPamentUrl = 'subscription_payment';

const UserCategoryList = 'category_list';
const TypeCategoryList = 'type_list';
const redeem_product = 'redeem_product';
const subscriptionPlanDetal = 'plans'
const cancel_subscription = 'cancel_subscription'




let configMultipart = {
  headers: {
  'Content-Type': 'multipart/form-data',
  'Accept': 'application/json'
  }
};

let configJson = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    }
};

const ApiCalls = {
 
    RegisterValidations: function( instance ){
        const {
          loading,
          TextInputName,
          TextInputPhoneNumber,  
          TextInputEmail,
          TextInputPassword,
          TextInputConfirmPassword,
          PickerValue,
          screenHeight,
          singlePickerVisible,
          unChecked,
          dialogVisible,
          TextDialogOTP,
          genderPickerValue,
          genderPickerVisible,
          termsAccepted
        } = instance.state;
        if(__DEV__){
          
          ['fullname', 'email', 'stateName', 'password', 'zipcode','age']
      .map((name) => ({ name, ref: instance[name] }))
      .forEach(({ name, ref }) => {
    
      

        // if (ref.isFocused()) {
        //   this.setState({ [name]: text });
        // }
      });
     }
        if(Platform.OS == 'android'){
            if(__DEV__){ }
        if(instance['fullname'].state.text == '' || instance['fullname'].state.text == undefined){
            ToastAndroid.show( R.strings.registerScreen.Toasts.emptyName, ToastAndroid.SHORT );             
        }else if(instance.state.stateName == '' || instance.state.stateName == undefined){
          ToastAndroid.show(R.strings.registerScreen.Toasts.emptyState, ToastAndroid.SHORT);
        }else if(instance.state.age == '' || instance.state.age == undefined){
          ToastAndroid.show(R.strings.registerScreen.Toasts.emptyAge, ToastAndroid.SHORT);
        }
        else if(instance['zipcode'].state.text == '' || instance['zipcode'].state.text == undefined ){
          ToastAndroid.show(R.strings.registerScreen.Toasts.emptyZipCode, ToastAndroid.SHORT);
        }
        else if(genderPickerValue == undefined){
          ToastAndroid.show(R.strings.registerScreen.Toasts.emptyGender, ToastAndroid.SHORT)
            
        }
        else if(instance['email'].state.text == '' || instance['email'].state.text == undefined){
            ToastAndroid.show(R.strings.LoginScreen.Toasts.emptyEmailid, ToastAndroid.SHORT);
        }
        else if( instance['password'].state.text == '' || instance['password'].state.text == undefined ){
            ToastAndroid.show( R.strings.LoginScreen.Toasts.emptyPassword , ToastAndroid.SHORT);
        }else if(!termsAccepted){
          ToastAndroid.show(R.strings.registerScreen.Toasts.CheckPrivacy, ToastAndroid.SHORT);
        }else{
            //instance.setState({ dialogVisible: true });
            NetInfo.fetch().then(res => {
               
                if(res.isConnected){
                    
                        instance.setState({
                            loading: true
                          });
                                        
                    
                  // AsyncStorage.getItem('fcmToken').then((token) => {
                     
                    axios.post( BaseURL + registerUrl, {
                    name: instance['fullname'].state.text,
                    password: instance['password'].state.text,
                    email: instance['email'].state.text,
                    state: instance.state.stateName,
                    age: instance.state.age,
                    zipcode: instance['zipcode'].state.text,
                    device_type: '1',
                    device_token: '7adsf8hjasg', //+token,
                   // device_id: DeviceInfo.getUniqueId(), 
                    gender: Platform.OS == 'android' ? instance.state.genderPickerValue : instance.state.genderPickerValue.value,
                    }).then((responseJson) => {
                        instance.setState({
                            loading: false,
                           })
                         
                           if(responseJson.data.status_code == 200 ){
                              
                            AsyncStorage.setItem('session_id', responseJson.data.session_id);
                            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
                            instance.props.navigation.goBack();
                            //this.showDialog(instance)
                            
                           }
                      })
                      .catch(function(error) {

                        instance.setState({
                          loading: false,
                       });
            
                       if(error.response.data.status_code == 400){
                          ToastAndroid.show(error.response.data.error_description, ToastAndroid.SHORT)
                        }else {
                          ToastAndroid.show(error.message, ToastAndroid.SHORT)
                      
                        // Something happened in setting up the request that triggered an Error
                     
                      }            
                        
                       
                        
                        //throw error;
                        
                        }.bind(instance));
        
                    //})
                }else{

                    // if(Platform.OS == 'ios'){
                    //     this.refs.toast.showBottom(R.strings.NoInernetConnection.text);
                        
                    // }else
                        ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)

                }
            });
        
        }
    }else{
      console.log("enter 1")
       
        if(instance['fullname'].state.text == '' || instance['fullname'].state.text == undefined){
            Alert.alert(R.strings.registerScreen.Toasts.emptyName, '',[
              { text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
        else if(instance.state.stateName == '' || instance.state.stateName == undefined){
          Alert.alert(R.strings.registerScreen.Toasts.emptyState, '',[
            { text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }else if(instance.state.age == '' || instance.state.age == undefined){
          Alert.alert(R.strings.registerScreen.Toasts.emptyAge, '',[
            { text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
        // else if(instance['stateName'].state.text == '' || instance['stateName'].state.text == undefined){
        //   Alert.alert(R.strings.registerScreen.Toasts.emptyState, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        // }
        else if(instance['zipcode'].state.text == '' || instance['zipcode'].state.text == undefined ){
          Alert.alert(R.strings.registerScreen.Toasts.emptyZipCode, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
        // else if(genderPickerValue == undefined){
        //   Alert.alert(R.strings.registerScreen.Toasts.emptyGender,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})            
        // }
        else if(instance['email'].state.text == '' || instance['email'].state.text == undefined){
            Alert.alert(R.strings.LoginScreen.Toasts.emptyEmailid,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})            
        }
        else if( instance['password'].state.text == '' || instance['password'].state.text == undefined ){
            Alert.alert(R.strings.LoginScreen.Toasts.emptyPassword,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})                   
        }else if(!termsAccepted){
          Alert.alert(R.strings.registerScreen.Toasts.CheckPrivacy,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})                   
        }else{
            //instance.setState({ dialogVisible: true });

            NetInfo.fetch().then(res => {
              
              if(res.isConnected){
                  
                      instance.setState({
                          loading: true
                        });
                                      
                  
                // AsyncStorage.getItem('fcmToken').then((token) => {
                     if(__DEV__){
                  //console.log( 'Register Values', instance.state.genderPickerValue );      
              }
                  axios.post( BaseURL + registerUrl, {
                  name: instance['fullname'].state.text,
                  password: instance['password'].state.text,
                  email: instance['email'].state.text,
                  state: instance.state.stateName,
                  age: instance.state.age,
                  zipcode: instance['zipcode'].state.text,
                  device_type: '2',
                  device_token: '7adsf8hjasg', //+token,
                 // device_id: DeviceInfo.getUniqueId(), 
                  gender: instance.state.genderPickerValue,
                  }).then((responseJson) => {
                      instance.setState({
                          loading: false,
                         })
                         console.log("enter 2")
       
                         if(responseJson.data.status_code == 200 ){
                             
                          AsyncStorage.setItem('session_id', responseJson.data.session_id);
                          setTimeout( () => {
                          Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})                   
                          }, 200)
                          instance.props.navigation.goBack();
                          //this.showDialog(instance)
                          
                         }
                    })
                    .catch(function(error) {

                      instance.setState({
                        loading: false,
                     });

                     if(error.response.data.status_code == 400){
                      setTimeout( () => {
                        Alert.alert(error.response.data.error_description, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      }, 200)
                  }else {
                    setTimeout( () => {
                        Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      }, 200)
                        // Something happened in setting up the request that triggered an Error
                     
                    } 
                      
                      //throw error;
                      
                      }.bind(instance));
      
                  //})
              }else{
                Alert.alert(R.strings.NoInernetConnection.text,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})                   

              }
          });
        
        }
     }

    },
    
    LoginValidations: function(instance){
        
        //instance.props.navigation.navigate('home'); 
        if( Platform.OS == 'android' ){
            if(instance['email'].state.text == '' || instance['email'].state.text == undefined){
                ToastAndroid.show( R.strings.LoginScreen.Toasts.emptyEmailid , ToastAndroid.SHORT );
            }else if(instance['password'].state.text == '' || instance['password'].state.text == undefined ){
                ToastAndroid.show( R.strings.LoginScreen.Toasts.emptyPassword , ToastAndroid.SHORT);
            }else{

                NetInfo.fetch().then(res => {
                    //console.log('Response of Internet', res )
                    if(res.isConnected){
    
                instance.setState({
                    loading: true
                  });
                  
                AsyncStorage.getItem('fcmToken').then((token) => { 
                  if( token == '' || token == null || token == undefined){
                    instance.setState({
                      loading: false
                    });
                    ToastAndroid.show( 'Check your Internet Connection or reload the App', ToastAndroid.SHORT);
                }else{
             //Login/Register  API Call
 
                axios.post( BaseURL + loginUrl, {
                email: instance['email'].state.text,
                password: instance['password'].state.text,
                device_type: '1',
                device_token: token//''+token
                },configJson).then((responseJson) => {
                    instance.setState({
                        loading: false,
                       })
                       console.log("responseJson user info")
                       console.log(responseJson)
                       if(responseJson.data.status_code == 200 ){
                         var age = (responseJson.data.profile.age).toString();
                        const items = [
                            ['session_id', responseJson.data.session_id],
                            ['user_id', ''+responseJson.data.profile.user_id],
                            ['username', responseJson.data.profile.username],
                            ['user_dp', responseJson.data.profile.image],
                            ['user_email', responseJson.data.profile.email],
                            ['user_location', responseJson.data.profile.state],
                            ['user_zipcode', responseJson.data.profile.zipcode],
                            ['age', age],
                            ['user_type', '0']
                            //['push', ''+responseJson.data.profile.push], 
                            //['user_phone', responseJson.data.profile.phone],
                            // ['user_lat', ''+responseJson.data.profile.latitude],
                            // ['user_lng', ''+responseJson.data.profile.longitude],
                        ]
                        AsyncStorage.multiSet(items, (error) => {
                            //to do something
                           
                            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
                            instance.props.navigation.navigate('home');                 
                        });
                        if(responseJson.data.profile.subscriptions.length!=0){
                          AsyncStorage.setItem("subscriptionInfo", JSON.stringify(responseJson.data.profile.subscriptions[0]), (err)=> {
                            if(err){
                               
                                throw err;
                            }
                           
                        }).catch((err)=> {
                           
                        });
                        }else{
                        
                        }

                       
                            
                       }
                  })
                  .catch(function(error) {
    
                    instance.setState({
                      loading: false
                     })
        
                     if(error.response.data.status_code == 400){
                      
                        ToastAndroid.show(error.response.data.error_description, ToastAndroid.SHORT)
                      
                  }else {
                    
                        ToastAndroid.show(error.message, ToastAndroid.SHORT)
                    
                      // Something happened in setting up the request that triggered an Error
                      
                    }          
                    //console.log('There has been a problem with your fetch operation: ' + error.message);
                    
                    //throw error;
                    
                    }.bind(instance));
                  }
                
                })
              
                    }else{
                          ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)
                    }
                });
    
            }
        }else {
          
            if(instance['email'].state.text == '' || instance['email'].state.text == undefined){
            Alert.alert(R.strings.LoginScreen.Toasts.emptyEmailid,'',[{ text: 'OK', onPress: () =>  {},style:'cancel', }],{cancelable: true})
            }else if(instance['password'].state.text == '' || instance['password'].state.text == undefined){
            Alert.alert(R.strings.LoginScreen.Toasts.emptyPassword,'',[{ text: 'OK', onPress: () =>  {},style:'cancel', }],{cancelable: true})
            }else{
                
              NetInfo.fetch().then(res => {
                //console.log('Response of Internet', res )
                if(res.isConnected){

            instance.setState({
                loading: true
              });
              
            AsyncStorage.getItem('fcmToken').then((token) => { 

            //   if( token == '' || token == null || token == undefined){
            //     instance.setState({
            //       loading: false
            //     });
            //    // alert()
            //     this.refs.toast.showBottom(R.strings.NoInernetConnection.text);
            //    // this.refs.toast.showBottom( 'Check your Internet Connection or reload the App', ToastAndroid.SHORT);
            // }else{
         //Login/Register  API Call
                  if(__DEV__){
              console.log('Value + Data Inside ', instance['email'].state.text+ ' '+ instance['password'].state.text );
            }
            axios.post( BaseURL + loginUrl, {
            email: instance['email'].state.text,
            password: instance['password'].state.text,
            device_type: '2',
            device_token: token
            }, configJson).then((responseJson) => {
                instance.setState({
                    loading: false,
                   })
                   console.log("ios>>>>>>",responseJson)
                   if(responseJson.data.status_code == 200 ){
                    if(responseJson.data.profile.subscriptions.length!=0){
                      AsyncStorage.setItem("subscriptionInfo", JSON.stringify(responseJson.data.profile.subscriptions[0]), (err)=> {
                        if(err){
                           
                            throw err;
                        }
                       
                    }).catch((err)=> {
                       
                    });
                    }else{
                    
                    }
                    console.log('subscriptionInfo>>>>>>',AsyncStorage.getItem("subscriptionInfo"))
                    const items = [
                        ['session_id', responseJson.data.session_id],
                        ['user_id', ''+responseJson.data.profile.user_id],
                        ['username', responseJson.data.profile.username],
                        ['user_dp', responseJson.data.profile.image],
                        ['user_email', responseJson.data.profile.email],
                        ['user_location', responseJson.data.profile.state],
                        ['user_zipcode', responseJson.data.profile.zipcode],
                        ['user_type', '0']
                    ]
                    AsyncStorage.multiSet(items, (error) => {
                        //to do something
                       
                        // Alert.alert(responseJson.data.message,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                        instance.props.navigation.navigate('home');                 
                    });
                  
                        
                   }
              }).catch(function(error) {

                instance.setState({
                  loading: false
                 })
    
                 if(error.response.data.status_code == 400){
                  setTimeout( () => {
                    Alert.alert(error.response.data.error_description, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                  }, 200)
                }else{
                  setTimeout( () => {
                    Alert.alert(error.message, '',[{ text: 'OK', onPress: () => {},style:'cancel', }],{cancelable: true})
                  }, 200)
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
                //throw error;
                
                }.bind(instance));
             // }
            
            })
       
                }else{

               Alert.alert(R.strings.NoInernetConnection.text,'',[{ text: 'OK', onPress: () => {},style:'cancel', }],{cancelable: true})

                }
            });
          
            }
        }

        
    },

//---------------------------=====================

redeem_History: function(instance){
        
  //instance.props.navigation.navigate('home'); 
  if( Platform.OS == 'android' ){
      

          NetInfo.fetch().then(res => {
              //console.log('Response of Internet', res )
              if(res.isConnected){

          instance.setState({
              loading: true
            });
            
          AsyncStorage.getItem('session_id').then((token) => { 
          
          axios.post( BaseURL + redeem_History_, {
            session_id: token,
      
         
          },configJson).then((responseJson) => {
              instance.setState({
                  loading: false,
                 })
                 
                  if(responseJson.data.status_code == 200 ){
                    instance.setState({redeemHistory:responseJson.data.details})

                      ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
                  
                 }
            })
            .catch(function(error) {

              instance.setState({
                loading: false
               })
  
               if(error.response.data.status_code == 400){
                
                  ToastAndroid.show(error.response.data.error_description, ToastAndroid.SHORT)
                
            }else {
              
                  ToastAndroid.show(error.message, ToastAndroid.SHORT)
              
                // Something happened in setting up the request that triggered an Error
               
              }          
              //console.log('There has been a problem with your fetch operation: ' + error.message);
              
              //throw error;
              
              }.bind(instance));
          
          })
     
              }else{
                    ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)
              }
          });

    
  }else {
    
      // if(instance['email'].state.text == '' || instance['email'].state.text == undefined){
      // Alert.alert(R.strings.LoginScreen.Toasts.emptyEmailid,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      // }else if(instance['password'].state.text == '' || instance['password'].state.text == undefined){
      // Alert.alert(R.strings.LoginScreen.Toasts.emptyPassword,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      // }else{
          
        NetInfo.fetch().then(res => {
          //console.log('Response of Internet', res )
          if(res.isConnected){

      instance.setState({
          loading: true
        });
        
      AsyncStorage.getItem('session_id').then((token) => { 
        let data = instance.state.breweryInfo;
        axios.post( BaseURL + redeem_History_, {
          session_id: token,
      
       
        },configJson).then((responseJson) => {
            instance.setState({
                loading: false,
               })
             
                if(responseJson.data.status_code == 200 ){
                  instance.setState({redeemHistory:responseJson.data.details})
                
               }
        }).catch(function(error) {

          instance.setState({
            loading: false
           })

           if(error.response.data.status_code == 400){
            setTimeout( () => {
              Alert.alert(error.response.data.error_description, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }, 200)
          }else{
            setTimeout( () => {
              Alert.alert(error.message, '',[{ text: 'OK', onPress: () => {},style:'cancel', }],{cancelable: true})
            }, 200)
            // Something happened in setting up the request that triggered an Error
           
          }
          //throw error;
          
          }.bind(instance));
      
      })
 
          }else{

         Alert.alert(R.strings.NoInernetConnection.text,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})

          }
      });
    
     // }
  }

  
},








//---------------------------------





redeem_Now: function(instance){
        
  //instance.props.navigation.navigate('home'); 
  if( Platform.OS == 'android' ){
      

          NetInfo.fetch().then(res => {
              //console.log('Response of Internet', res )
              if(res.isConnected){

          instance.setState({
              loading: true
            });
            
          AsyncStorage.getItem('session_id').then((token) => { 
            console.log(token)
            let data = instance.state.breweryInfo;
            instance.setState({
              loading: true,
             })
          axios.post( BaseURL + redeem_product, {
            session_id: token,
            bewery_id: data.breweryId,
            product_id: data.prod_id,
         
          },configJson).then((responseJson) => {
              instance.setState({
                  loading: false,
                 })
                 
                console.log(responseJson)
                  if(responseJson.data.status_code == 200 ){
                    //instance.setState({reedeemStatus:responseJson.data.redeem_status})


                    if(responseJson.data.redeem_status == 1){
                      instance.setState({
                         showRedeemModal: false ,
                         show:true
                       
                      })
                      //instance.props.navigation.goBack() 
                      // instance.props.navigation.navigate('redeem',{
                      //   breweryName:data.name,
                      //   brew_Image:data.image
                      // })
                    }else{
                     // console.log('this.state.reedeemStatus>>>>>>>>>'+this.state.reedeemStatus)
                    }

                      ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
                  
                 }
            })
            .catch(function(error) {

              instance.setState({
                loading: false
               })
  
               if(error.response.data.status_code == 400){
                
                  ToastAndroid.show(error.response.data.error_description, ToastAndroid.SHORT)
                
            }else {
              
                  ToastAndroid.show(error.message, ToastAndroid.SHORT)
              
                // Something happened in setting up the request that triggered an Error
              
              }          
              //console.log('There has been a problem with your fetch operation: ' + error.message);
              
              //throw error;
              
              }.bind(instance));
          
          })
     
              }else{
                    ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)
              }
          });

    
  }else {
    
      // if(instance['email'].state.text == '' || instance['email'].state.text == undefined){
      // Alert.alert(R.strings.LoginScreen.Toasts.emptyEmailid,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      // }else if(instance['password'].state.text == '' || instance['password'].state.text == undefined){
      // Alert.alert(R.strings.LoginScreen.Toasts.emptyPassword,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      // }else{
          
        NetInfo.fetch().then(res => {
          //console.log('Response of Internet', res )
          if(res.isConnected){

      instance.setState({
          loading: true
        });
        
      AsyncStorage.getItem('session_id').then((token) => { 
        let data = instance.state.breweryInfo;
        axios.post( BaseURL + redeem_product, {
          session_id: token,
          bewery_id: data.breweryId,
          product_id: data.prod_id,
       
        },configJson).then((responseJson) => {
            instance.setState({
                loading: false,
               })
              console.log("redeem press",responseJson)
                if(responseJson.data.status_code == 200 ){
                  //instance.setState({reedeemStatus:responseJson.data.redeem_status})


                  if(responseJson.data.redeem_status == 1){
                    instance.setState({
                       showRedeemModal: false ,
                      //breweryForShare:data.name,
                      //productImage:data.image
                      show:true
                    })
                    // instance.props.navigation.navigate('redeem',{
                    //   breweryName:data.name
                    // })
                  }else{
                   // console.log('this.state.reedeemStatus>>>>>>>>>'+this.state.reedeemStatus)
                  }
                  // alert(responseJson.data.message)
                   if(responseJson.data.message!= 'You can redeem now'){
  setTimeout( () => {
                    Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                  }, 200)
                   }
                 
                   // ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
                
               }
        }).catch(function(error) {

          instance.setState({
            loading: false
           })

           if(error.response.data.status_code == 400){
            setTimeout( () => {
              Alert.alert(error.response.data.error_description, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }, 200)
          }else{
            setTimeout( () => {
              Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }, 200)
            // Something happened in setting up the request that triggered an Error
          
          }
          //throw error;
          
          }.bind(instance));
      
      })
 
          }else{

         Alert.alert(R.strings.NoInernetConnection.text,'',[{ text: 'OK', onPress: () => {},style:'cancel', }],{cancelable: true})

          }
      });
    
     // }
  }

  
},












    socialLoginValidations: function(instance, status){
        const { userInfo } = instance.state;

        if( Platform.OS == 'android' ){
          
          NetInfo.fetch().then(res => {
            
            if(res.isConnected){

        instance.setState({
            loading: true
          });
          
         AsyncStorage.getItem('fcmToken').then((token) => {
           
          if( token == '' || token == null || token == undefined){
            console.log('1')
            instance.setState({
              loading: false
            });
            ToastAndroid.show( 'Check your Internet Connection or reload the App', ToastAndroid.SHORT);
        }else{
     //Login/Register  API Call

          if(__DEV__){
            console.log('Token Value', token);
          }
         
        fetch( BaseURL + socialLogin, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email:userInfo.email,
            login_social_id:userInfo.id,
            type:'1',
            name:userInfo.name,
            device_token: token//''+token

        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            instance.setState({
                loading: false,
               })
              console.log(responseJson)
               if(responseJson.status_code == 200 ){
               
                const items = [
                  ['session_id', responseJson.session_id],
                  ['user_id', ''+responseJson.profile.user_id],
                  ['username', responseJson.profile.username],
                  ['user_dp', responseJson.profile.image],
                  ['user_email', responseJson.profile.email],
                  // ['user_location', responseJson.data.profile.state],
                  // ['user_zipcode', responseJson.data.profile.zipcode],
                  ['user_type', '0']
                  
              ]
                 AsyncStorage.multiSet(items, (error) => {
                   //to do something
                    
                    ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
                     instance.props.navigation.navigate('home')                   
                });
                if(responseJson.profile.subscriptions.length!=0){
                  AsyncStorage.setItem("subscriptionInfo", JSON.stringify(responseJson.profile.subscriptions[0]), (err)=> {
                    if(err){

                        throw err;
                    }
                    
                }).catch((err)=> {
                    
                });
                }else{
                 
                }
                    
               }else if(responseJson.status == 400 ){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                //   if( responseJson.message instanceof Array ){
                //     alert(responseJson.message.join('\n'));
                // }else{
                //     alert(responseJson.message);
                // }
                   
               }else {
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
               }
          })
          .catch(function(error) {

            instance.setState({
              loading: false,
           });
           
           ToastAndroid.show(error.message, ToastAndroid.SHORT)

            
            //console.log('There has been a problem with your fetch operation: ' + error.message);
            
            //throw error;
            
            }.bind(instance));
          }
        
        })
   
            }else{
              console.log("fcmToken-------")

              ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)

            }
        });

        }else {
                     
                NetInfo.fetch().then(res => {
                    //console.log('Response of Internet', res )
                    if(res.isConnected){
    
                // instance.setState({
                //     loading: true
                //   });
                  
                  AsyncStorage.getItem('fcmToken').then((token) => { 
                    console.log(token)
                    
        //   if( token == '' || token == null || token == undefined){
        //     instance.setState({
        //       loading: false
        //     });
        //     console.log("ios")
        //     alert( 'Check your Internet Connection or reload the App')
        //     ToastAndroid.show( 'Check your Internet Connection or reload the App', ToastAndroid.SHORT);
        // }else{

                fetch( BaseURL + socialLogin, {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email:userInfo.email,
                  login_social_id:userInfo.id,
                  type:'2',
                  name:userInfo.name,
                  device_token: token//''+token
                }),
                }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson)
                    instance.setState({
                        loading: false,
                       })
                       
                       if(responseJson.status_code == 200 ){
                        const items = [
                          ['session_id', responseJson.session_id],
                          ['user_id', ''+responseJson.profile.user_id],
                          ['username', responseJson.profile.username],
                          ['user_dp', responseJson.profile.image],
                          ['user_email', responseJson.profile.email],
                          // ['user_location', responseJson.data.profile.state],
                          // ['user_zipcode', responseJson.data.profile.zipcode],
                          ['user_type', '0']
                          
                      ]

                        AsyncStorage.multiSet(items, (error) => {
                            //to do something
                           
                            //alert('Login Successfully');
                            instance.props.navigation.navigate('home')                   
                            });

                            if(responseJson.profile.subscriptions.length!=0){
                              AsyncStorage.setItem("subscriptionInfo", JSON.stringify(responseJson.profile.subscriptions[0]), (err)=> {
                                if(err){
            
                                    throw err;
                                }
                                
                            }).catch((err)=> {
                                
                            });
                            }else{
                             
                            }
                        // if(Platform.OS == 'ios'){
                        //      alert(responseJson.message);
                        //     }
                            
                            //NavigationWithParams.navigate('HomeEmployee', { type: userType, });
                            
                       }else if(responseJson.status == 400 ){
                           Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                        //   if( responseJson.message instanceof Array ){
                        //     alert(responseJson.message.join('\n'));
                        // }else{
                        //     alert(responseJson.message);
                        // }
                           
                       }else {
                        if(Platform.OS == 'ios'){
                            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})

                            // if( responseJson.message instanceof Array ){
                            //     alert(responseJson.message.join('\n'));
                            // }else{
                            //     alert(responseJson.message);
                            // }
                            
                        }
                       }
                  })
                  .catch(function(error) {
    
                    instance.setState({
                      loading: false,
                   });
                   
                    Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    
                    //console.log('There has been a problem with your fetch operation: ' + error.message);
                    
                    //throw error;
                    
                    }.bind(instance));
                 // }
                
               })
           
                    }else{
                        Alert.alert('', R.strings.NoInernetConnection.text,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    
                    }
                });

            
        }

        
    },
    showDialog: function(instance){
        instance.setState({ dialogVisible: true });
    },

    handleCancel: function(instance){
 
        instance.setState({ dialogVisible: false });
    },

    handleSubmit: function(instance) {

        const { TextDialogOTP } = instance.state;
        

        NetInfo.fetch().then(res => {
            //console.log('Response of Internet', res )
            if(res.isConnected){

            instance.setState({
                loading: true
              });
            AsyncStorage.getItem('session_id').then((token) => {
            fetch( BaseURL + verify_Account, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: ''+token,
            otp_num: TextDialogOTP,
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                instance.setState({
                    loading: false,
                   })
                   if(responseJson.status == 200 ){
                    if(Platform.OS == 'ios'){
                            Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                        }else if(Platform.OS == 'android'){
                            ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                        }
                        this.clearAllValues(instance);
                        instance.props.navigation.goBack();
                        
                   }else if( responseJson.status == 400 ){
                    if(Platform.OS == 'ios'){
                        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }else if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                    }
                   }
                    else{
                    if(Platform.OS == 'ios'){
                        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }else if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                    }
                   }
              })
              .catch(function(error) {

                instance.setState({
                  loading: false,
               });
    
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
                
                //console.log('There has been a problem with your fetch operation: ' + error.message);
                
                //throw error;
                
                }.bind(instance));
            })
            }else{

                if(Platform.OS == 'ios'){
                    Alert.alert('', R.strings.NoInernetConnection.text,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    
                }else if(Platform.OS == 'android'){
                    ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)
                }

            }
        });

        
      },
      clearAllValues: function(instance){
        instance.setState({
        TextInputName: '',
        TextInputPhoneNumber: '',  
        TextInputEmail: '',
        TextInputPassword: '',
        PlacesSearch: undefined,
        TextDialogOTP: '',
        dialogVisible: false
        })
    },
    handleForgetSubmit: function(instance) {

      if(__DEV__){
          
        ['email'].map((name) => ({ name, ref: instance[name] }))
    .forEach(({ name, ref }) => {
     
    });
   }
   if(instance['email'].state.text == '' || instance['email'].state.text == undefined){
    if( Platform.OS == 'android' ){
    ToastAndroid.show(R.strings.LoginScreen.Toasts.emptyEmailid, ToastAndroid.SHORT);
    }else{
      Alert.alert(R.strings.LoginScreen.Toasts.emptyEmailid, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})                   
    }
}else{

        NetInfo.fetch().then(res => {
            //console.log('Response of Internet', res )
            if(res.isConnected){

            instance.setState({
                loading: true
              });
           
            axios.post(BaseURL + Forgot_Password, {
            email: instance['email'].state.text,
            }).then((responseJson) => {
                instance.setState({
                    loading: false,
                   })
                   
                   if(responseJson.data.status_code == 200 ){
                    if(Platform.OS == 'ios'){
                            Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                        }else if(Platform.OS == 'android'){
                            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
                        }
                        instance.props.navigation.goBack();
                   }else if(responseJson.data.status_code == 400 ){
                    if(Platform.OS == 'ios'){
                        Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }else if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
                    }
                   }else if(responseJson.data.status_code == 403){
                    if(Platform.OS == 'ios'){
                        Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }else if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
                    }
                   }
              }).catch(function(error) {

                instance.setState({
                  loading: false,
                 })
    
                 if(error.response.data.status_code == 400){
                  if(Platform.OS == 'android'){
                    ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
                  }else{
                    setTimeout( () => {
                    Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                  }, 200)
                  }
              }else if(error.response.data.status_code == 403 ) {
                 
                  // Request made and server responded
                  if(Platform.OS == 'android'){
                  ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
                  }else{
                    setTimeout( () => {
                    Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                  }, 200)
                  }
                  
                }else {
                  if(Platform.OS == 'android'){
                    ToastAndroid.show(error.message, ToastAndroid.SHORT)
                }else {
                  setTimeout( () => {
                    Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                  }, 200)
                  }
                  // Something happened in setting up the request that triggered an Error
                 
                }

                
                //throw error;
                
                }.bind(instance));
            
            }else{

                if(Platform.OS == 'ios'){
                    Alert.alert(R.strings.NoInernetConnection.text, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    
                }else if(Platform.OS == 'android'){
                    ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)
                }

            }
        });
      }
        
      },

      Logout: function(instance){
        //NavigationWithParams.navigate('Auth', '');
      NetInfo.fetch().then(res => {
        //console.log('Response of Internet', res )
        if(res.isConnected){
        
      AsyncStorage.getItem('session_id').then((session_ID) => { 
  
      
        axios.post( BaseURL + LogoutUrl, {
        session_id: session_ID
        }).then((responseJson) => {
          
                      
               if(responseJson.data.status_code == 200 ){
                
                if(Platform.OS == 'android'){
                  instance.checkPermission()
                        ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
                    }else{
                      instance.checkPermission()
                        Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})

                    }
                   
        AsyncStorage.clear();
        NavigationWithParams.navigate('Auth', '');

        //instance.props.navigation.navigate('Auth')

               }
              
          })
          .catch(function(error) {

             if(error.response.data.status_code == 400){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert(error.response.data.error_description, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
             
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
         
            
            //throw error;
            
            }.bind(instance));
          })
          
        }else{
    
          if(Platform.OS == 'android'){
              ToastAndroid.show('Internet Not Connected', ToastAndroid.SHORT)
          }else{
              Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
      
      }
      });

      
      },
      HomeApiProductByCity: function(instance, name){
        NetInfo.fetch().then(res => {
            //console.log('Response of Internet', res )
          if(res.isConnected){
          AsyncStorage.getItem('session_id').then((session_ID) => { 

          fetch( BaseURL1 + product_list_by_city, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            city: name,
            session_id: session_ID
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
            if(responseJson.status == 200){
            instance.setState({
             loading: false,
             refreshing: false,
             dataSource: responseJson.product_list
            })
           
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
          })
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

      FeatureProducts: function(instance){
        NetInfo.fetch().then(res => {
            //console.log('Response of Internet', res )
          if(res.isConnected){
            AsyncStorage.multiGet([ "session_id", "user_lat", "user_lng"]).then(response => {

          fetch( BaseURL1 + feature_products + 'session_id=' + ''+response[0][1] +
           '&latitude=' + ''+response[1][1] + '&longitude=' + ''+response[2][1] + '&dist_pref=km', {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
            })
          .then(response => response.json())
          .then((responseJson)=> {
            if(responseJson.status == 200){
            instance.setState({
             loading: false,
             refreshing: false,
             FeaturedList: responseJson[ 'product list' ]
            })
            
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
          })
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

      FavoriteList: function(instance){
        NetInfo.fetch().then(res => {
            //console.log('Response of Internet', res )
            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL + favoriteList, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            limit: '',
            page: ''
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
            if(responseJson.status == 200){
            instance.setState({
             loading: false,
             refreshing: false,
             data: responseJson[ 'favourite List' ]
            })
           
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      //AddRemoveFavoriteApi: 
      AddFavoriteApi: function(instance, advt_id, status){
        NetInfo.fetch().then(res => {
            
            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL1 + add_to_favourites, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            advertisement_id: ''+advt_id,
            add: status
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
              
            if(responseJson.status == 200){
                var foundIndex = instance.state.data.findIndex(items =>  items.advertisement_id == advt_id )
                
                 if(foundIndex == null || foundIndex == undefined || foundIndex == -1 ){
                    if(Platform.OS == 'android'){
                        ToastAndroid.show('Out of Index Error', ToastAndroid.SHORT);
                      }else{
                   Alert.alert('', 'Out of Index Error',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      }
                 }else{
                
                  instance.state.data[foundIndex].is_favourite = status == '0' ? 0 : 1;
                  
                    instance.setState({ 
                      data: instance.state.data,
                     })
                    
                     if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                      }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      } 

                    }           
            
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  //refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              //refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                //refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            //refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      //AddRemoveFavorite2Api: 
      AddFavorite2Api: function(instance, advt_id, status){
        NetInfo.fetch().then(res => {

            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL1 + add_to_favourites, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            advertisement_id: ''+advt_id,
            add: status
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
             
            if(responseJson.status == 200){
                var foundIndex = instance.state.dataSource.findIndex(items =>  items.advertisement_id == advt_id )
                
                 if(foundIndex == null || foundIndex == undefined || foundIndex == -1 ){
                    if(Platform.OS == 'android'){
                        ToastAndroid.show('Out of Index Error', ToastAndroid.SHORT);
                      }else{
                   Alert.alert('', 'Out of Index Error',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      }
                 }else{
                
                  instance.state.dataSource[foundIndex].is_favourite = status == '0' ? 0 : 1;
                  
                    instance.setState({ 
                      dataSource: instance.state.dataSource,
                     })
                    
                     if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                      }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      } 

                    }           
            
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  //refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              //refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                //refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            //refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      //AddRemoveFavoriteSingleUpdateApi: 
      AddRemoveFavoriteSingleUpdateApi: function(instance, advt_id, status){
        NetInfo.fetch().then(res => {
           
            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL1 + add_to_favourites, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            advertisement_id: ''+advt_id,
            add: status
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
             
            if(responseJson.status == 200){
                
                    
                     if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                      }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      } 
                               
            
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  //refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              //refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                //refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            //refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

//AddRemoveFavoriteApi: 
AddFavoriteFeatureApi: function(instance, advt_id, status){
  NetInfo.fetch().then(res => {
    
      if(res.isConnected){
      AsyncStorage.getItem('session_id').then((session_ID) => { 

    fetch( BaseURL1 + add_to_favourites, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      session_id: session_ID,
      advertisement_id: ''+advt_id,
      add: status
      })
      })
    .then(response => response.json())
    .then((responseJson)=> {
        
      if(responseJson.status == 200){
          var foundIndex = instance.state.FeaturedList.findIndex(items =>  items.advertisement_id == advt_id )
          
           if(foundIndex == null || foundIndex == undefined || foundIndex == -1 ){
              if(Platform.OS == 'android'){
                  ToastAndroid.show('Out of Index Error', ToastAndroid.SHORT);
                }else{
             Alert.alert('', 'Out of Index Error',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                }
           }else{
          
            instance.state.FeaturedList[foundIndex].is_favourite = status == '0' ? 0 : 1;
            
              instance.setState({ 
                FeaturedList: instance.state.FeaturedList,
               })
              
               if(Platform.OS == 'android'){
                  ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                }else{
                  Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                } 

              }           
      
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch((error) => {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }) //to catch the errors if any
  })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
},

      //Remove Favorite API
      RemoveFavoriteApi: function(instance, advt_id){
        NetInfo.fetch().then(res => {
         
            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL1 + add_to_favourites, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            advertisement_id: ''+advt_id,
            add: '0'
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
             
            if(responseJson.status == 200){
                instance.setState({
                    data: instance.state.data.filter(item => item.advertisement_id != advt_id)
                  })
                                      
                     if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
                      }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      } 

                               
            
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  //refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              //refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }else{
            if(Platform.OS == 'ios'){
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                //refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            //refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      //Selling List Api
      SellingListApi: function(instance){
        NetInfo.fetch().then(res => {
            //console.log('Response of Internet', res )
            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL + sellinglist, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            limit: '',
            page: ''
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
            if(responseJson.status == 200){
            instance.setState({
             loading: false,
             refreshing: false,
             data: responseJson.products_list
            })
           
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      //Mark As Sold Api
      MarkAsSoldApi: function(instance, advt_id){
        NetInfo.fetch().then(res => {
           
            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL1 + markAsSold, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            advertisement_id: ''+advt_id
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
             
            if(responseJson.status == 200){
            instance.setState({
                data: instance.state.data.filter(item => item.advertisement_id != advt_id)
              })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
              }else{
              Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
            
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  //refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              //refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                //refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            //refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      
      //Sold Product API
      SoldListApi: function(instance){
        NetInfo.fetch().then(res => {
            //console.log('Response of Internet', res )
            if(res.isConnected){
            AsyncStorage.getItem('session_id').then((session_ID) => { 
    
          fetch( BaseURL + soldlist, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            session_id: session_ID,
            limit: '',
            page: ''
            })
            })
          .then(response => response.json())
          .then((responseJson)=> {
            if(responseJson.status == 200){
            instance.setState({
             loading: false,
             refreshing: false,
             data: responseJson.products_list
            })
           
          }else if(responseJson.status == 400){
              instance.setState({
                  loading: false,
                  refreshing: false,
                })
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
          }else if(responseJson.status == 403){
            instance.setState({
              loading: false,
              refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            instance.props.navigation.navigate('Auth');
          }
          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

      getPlanDetail: function(instance){
        NetInfo.fetch().then(res => {
            if(res.isConnected){
            //AsyncStorage.getItem('session_id').then((session_ID) => { 
            //console.log('Response of Internet', BaseURL + UserCategoryList);
      instance.setState({loading:true})
      axios.get(BaseURL + subscriptionPlanDetal)
      .then((responseJson)=> {
             console.log(responseJson)
            if(responseJson.data.status_code == 200){
            instance.setState({
             loading: false,
             planDetail:responseJson.data.details,
             trialDays:responseJson.data.header_text
            //categoryTags: responseJson.data.details
            })
            
          }else{
            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
          }

          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                setTimeout( () => {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        //})
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },




      //Product By Categories ads/product_by_category TypeCategoryList
      ProductByCatListApi: function(instance){
        NetInfo.fetch().then(res => {
            if(res.isConnected){
            //AsyncStorage.getItem('session_id').then((session_ID) => { 
           

      axios.get(BaseURL + UserCategoryList)
      .then((responseJson)=> {
            if(responseJson.data.status_code == 200){
            instance.setState({
             loading: false,
            //  refreshing: false,
            categoryTags: responseJson.data.details
            })
            
          }else{
            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
          }

          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                setTimeout( () => {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        //})
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

      getProductStyle: function(instance){
      
        NetInfo.fetch().then(res => {
            if(res.isConnected){
            //AsyncStorage.getItem('session_id').then((session_ID) => { 
          

      axios.get(BaseURL + 'style_list')
      .then((responseJson)=> {

            if(responseJson.data.status_code == 200){
            instance.setState({
             loading: false,
            //  refreshing: false,
            StyleTags: responseJson.data.details
            })
           
          }else{
            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
          }

          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                setTimeout( () => {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        //})
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      getCities: function(instance){
        NetInfo.fetch().then(res => {
            if(res.isConnected){
            //AsyncStorage.getItem('session_id').then((session_ID) => { 
           

      axios.get(BaseURL + UserCity)
      .then((responseJson)=> {
            if(responseJson.data.status_code == 200){
              var region ={
                latitude: responseJson.data.details[0].co_ordinate.latitude,
                longitude: responseJson.data.details[0].co_ordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
           
              }
              
             
            instance.setState({
             loading: false,
            //  refreshing: false,
            city: responseJson.data.details,
            selectedRegion:region
          
            })
           
          }else{
            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
          }

          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                setTimeout( () => {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        //})
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

  

      BeerTypesListApi: function(instance){
        NetInfo.fetch().then(res => {
            if(res.isConnected){
            //AsyncStorage.getItem('session_id').then((session_ID) => { 
           

      axios.get(BaseURL + TypeCategoryList)
      .then((responseJson)=> {
            if(responseJson.data.status_code == 200){
            instance.setState({
             loading: false,
            //  refreshing: false,
            TypesTags: responseJson.data.details
            })
           
          }else{
            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT);
          }

          })
          .catch((error) => {
              instance.setState({
                loading: false,
                refreshing: false,
               })
               if(Platform.OS == 'ios'){
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }
               //console.log(error)
            }) //to catch the errors if any
        //})
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
             Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

      getBreweryByCityId: function(instance,id){
        NetInfo.fetch().then(res => {
    
            if(res.isConnected){
                AsyncStorage.getItem('session_id').then((token) => {
                   
            axios.post( BaseURL + brewery_by_id, {
            session_id: token,
            city_id:id
            }).then((responseJson)=> {
             
            if(responseJson.data.status_code == 200){
            instance.setState({
             loading: false,
             refreshing: false,
             data: responseJson.data.details
            })
            
          }else if(responseJson.data.status_code == 401){
            instance.setState({
                loading: false,
                refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
            }else{
              Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
            NavigationWithParams.navigate('Auth', '');
        }else if(responseJson.data.status_code == 403){
            instance.setState({
              loading: false,
              refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
          }
          })
          .catch((error) => {

            instance.setState({
              loading: false,
              refreshing: false,
             })

             if(error.response.data.status_code == 401){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
              }else{
                setTimeout( () => {
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
            
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                setTimeout( () => {
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
              setTimeout( () => {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              },200)
              }
              // Something happened in setting up the request that triggered an Error
             
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
              Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },

      GetProfileApi: function(instance){
        NetInfo.fetch().then(res => {
    
            if(res.isConnected){
                AsyncStorage.getItem('session_id').then((token) => {
                    
            axios.post( BaseURL + GetProfile, {
            session_id: token
            }).then((responseJson)=> {
            if(responseJson.data.status_code == 200){
            instance.setState({
             loading: false,
             refreshing: false,
             data: responseJson.data.profile
            })
            
          }else if(responseJson.data.status_code == 401){
            instance.setState({
                loading: false,
                refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
            }else{
              Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
            NavigationWithParams.navigate('Auth', '');
        }else if(responseJson.data.status_code == 403){
            instance.setState({
              loading: false,
              refreshing: false,
            })
            if(Platform.OS == 'ios'){
              Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
          }
            AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
          }
          })
          .catch((error) => {

            instance.setState({
              loading: false,
              refreshing: false,
             })

             if(error.response.data.status_code == 401){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
              }else{
                setTimeout( () => {
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
            
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                setTimeout( () => {
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                },200)
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
              setTimeout( () => {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              },200)
              }
              // Something happened in setting up the request that triggered an Error
             
            }
               //console.log(error)
            }) //to catch the errors if any
        })
        }else{
          instance.setState({
            loading: false,
            refreshing: false,
           })
      
          if(Platform.OS == 'ios'){
              Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }
      
      }
      });
      },
      ChangePassordValidations: function(instance){
        const { TextDialogOldPaswrd, TextDialogNewPaswrd, TextDialogNewConfirmPaswrd } = instance.state;

        if( Platform.OS == 'android' ){
            if(TextDialogOldPaswrd == ''){
                ToastAndroid.show( R.strings.changePasswordScreen.Toasts.emptyOldPassword , ToastAndroid.SHORT);
            }else if( TextDialogNewPaswrd == '' ){
                ToastAndroid.show( R.strings.changePasswordScreen.Toasts.emptyNewPassword , ToastAndroid.SHORT);
            }else if(TextDialogNewConfirmPaswrd == ''){
              ToastAndroid.show(R.strings.changePasswordScreen.Toasts.emptyNewConfirmPassword, ToastAndroid.SHORT);
            }else if(TextDialogNewConfirmPaswrd != TextDialogNewPaswrd){
              ToastAndroid.show(R.strings.changePasswordScreen.Toasts.PaswrdNotMatch, ToastAndroid.SHORT);
            }
            else{

                NetInfo.fetch().then(res => {
                    //console.log('Response of Internet', res )
                    if(res.isConnected){
    
                instance.setState({
                    loading: true
                  });
                  
                  AsyncStorage.getItem('session_id').then((token) => { 
                     
                axios.post( BaseURL + ChangePasUrl, {
                session_id: ''+token,
                old_password: TextDialogOldPaswrd,
                password: TextDialogNewPaswrd,
                confirm_password: TextDialogNewConfirmPaswrd
                }).then((responseJson) => {
                    instance.setState({
                        loading: false,
                       })
                      
                       if(responseJson.data.status_code == 200 ){
    
                        
                            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
                            
                            instance.setState({ dialogVisible: false })
                            
                       }
                  })
                  .catch(function(error) {
    
                    instance.setState({
                      loading: false,
                     })
                     if(error.response.data.status_code == 400 ){
                      
                      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
                    
                      
                     } else if(error.response.data.status_code == 401){
                      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
                      
                      AsyncStorage.clear();
                      NavigationWithParams.navigate('Auth', '');
                  }else if(error.response.data.status_code == 403 ) {
                     
                      // Request made and server responded
                      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
                      
                      AsyncStorage.clear();
              
                    NavigationWithParams.navigate('Auth', '');
                    }else {
                     ToastAndroid.show(error.message, ToastAndroid.SHORT)
                    
                      // Something happened in setting up the request that triggered an Error
                     
                    }

                    }.bind(instance));
                
                })
           
                    }else{
    
                            ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)
                        
    
                    }
                });      
                  
            }
        }else{
            if(TextDialogOldPaswrd == ''){
                Alert.alert(R.strings.changePasswordScreen.Toasts.emptyOldPassword,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }else if( TextDialogNewPaswrd == '' ){
                Alert.alert(R.strings.changePasswordScreen.Toasts.emptyNewPassword,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }else if(TextDialogNewConfirmPaswrd == ''){
              Alert.alert(R.strings.changePasswordScreen.Toasts.emptyNewConfirmPassword,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }else if(TextDialogNewConfirmPaswrd != TextDialogNewPaswrd){
              Alert.alert(R.strings.changePasswordScreen.Toasts.PaswrdNotMatch,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
            else{

                NetInfo.fetch().then(res => {
                    //console.log('Response of Internet', res )
                    if(res.isConnected){
    
                instance.setState({
                    loading: true
                  });
                  
                  AsyncStorage.getItem('session_id').then((token) => { 
                   
                axios.post( BaseURL + ChangePasUrl, {
                  session_id: ''+token,
                  old_password: TextDialogOldPaswrd,
                  password: TextDialogNewPaswrd,
                  confirm_password: TextDialogNewConfirmPaswrd
                }).then((responseJson) => {
                    instance.setState({
                        loading: false,
                       })
                      
                       if(responseJson.data.status_code == 200 ){
                            Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                            instance.setState({ dialogVisible: false })
                            NavigationWithParams.navigate('Auth', '');
                            
                       }
                  })
                  .catch(function(error) {
    
                    instance.setState({
                      loading: false,
                     })
                     if(error.response.data.status_code == 400 ){
                      setTimeout( () => {
                      Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      },200)                   
                     } else if(error.response.data.status_code == 401){
                      
                        Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      
                      AsyncStorage.clear();
                      NavigationWithParams.navigate('Auth', '');
                  }else if(error.response.data.status_code == 403 ) {
                      
                      // Request made and server responded
                      setTimeout( () => {
                      Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      },200)
                      AsyncStorage.clear();
              
                    NavigationWithParams.navigate('Auth', '');
                    }else {
                      setTimeout( () => {
                      Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      },200)
                      // Something happened in setting up the request that triggered an Error

                    }
                                                   
                    }.bind(instance));
                
                })
           
                    }else{
                    Alert.alert(R.strings.NoInernetConnection.text, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }
                });
                  
            }
        }

        
    },
    EditProfileApi: function(instance, Dpurl){
    
            const { avatarSource, imagePath, fileName, fileType, genderPickerValue } = instance.state;
        
                if(__DEV__){
          
              ['fullname', 
              'email', 
              //'stateName', 
              'phone', 
              'zipcode']
              .map((name) => ({ name, ref: instance[name] }))
              .forEach(({ name, ref }) => {
                console.log('EditProfileData', instance[name].state.text + '\n'+genderPickerValue );
              });
             }

            if(instance['fullname'].state.text == '' || instance['fullname'].state.text == undefined){
    
                if(Platform.OS == 'ios'){
                    Alert.alert(R.strings.registerScreen.Toasts.emptyName,'',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                }else if(Platform.OS == 'android'){
                    ToastAndroid.show(R.strings.registerScreen.Toasts.emptyName, ToastAndroid.SHORT)
                }
    
            }else if(instance['phone'].state.text == '' || instance['phone'].state.text == undefined){
              if(Platform.OS == 'ios'){
                Alert.alert(R.strings.registerScreen.Toasts.emptyPhoneno, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(R.strings.registerScreen.Toasts.emptyPhoneno, ToastAndroid.SHORT)
            }
            }else if(instance['phone'].state.text.length < 8 ){
              if(Platform.OS == 'ios'){
                Alert.alert(R.strings.registerScreen.Toasts.phoneNoLength, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(R.strings.registerScreen.Toasts.phoneNoLength, ToastAndroid.SHORT)
            }
            }
            else if(genderPickerValue == undefined){
    
                if(Platform.OS == 'ios'){
                  Alert.alert(R.strings.registerScreen.Toasts.emptyGender, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                }else if(Platform.OS == 'android'){
                    ToastAndroid.show(R.strings.registerScreen.Toasts.emptyGender, ToastAndroid.SHORT)
                }
    
            }
            else if(instance.state.stateName == '' || instance.state.stateName == undefined){   
                if(Platform.OS == 'ios'){
                    Alert.alert(R.strings.registerScreen.Toasts.emptyState, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    
                }else if(Platform.OS == 'android'){
                    ToastAndroid.show(R.strings.registerScreen.Toasts.emptyState, ToastAndroid.SHORT)
                }
            }
            else if(instance.state.age == '' || instance.state.age == undefined){   
              if(Platform.OS == 'ios'){
                  Alert.alert(R.strings.registerScreen.Toasts.emptyAge, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
  
              }else if(Platform.OS == 'android'){
                  ToastAndroid.show(R.strings.registerScreen.Toasts.emptyAge, ToastAndroid.SHORT)
              }
          }

            else if(instance['zipcode'].state.text == '' || instance['zipcode'].state.text == undefined){   
              if(Platform.OS == 'ios'){
                  Alert.alert(R.strings.registerScreen.Toasts.emptyZipCode, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
  
              }else if(Platform.OS == 'android'){
                  ToastAndroid.show(R.strings.registerScreen.Toasts.emptyZipCode, ToastAndroid.SHORT)
              }
          }
            else if (avatarSource == null && ( Dpurl == null || Dpurl == '' || Dpurl == undefined ) ){
              if(Platform.OS == 'ios'){
                Alert.alert('Please Select Image', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }else if(Platform.OS == 'android'){
                  ToastAndroid.show('Please Select Image', ToastAndroid.SHORT)
              }
          }else{
            
            NetInfo.fetch().then(res => {
              //console.log('Response of Internet', res )
              if(res.isConnected){
    
              instance.setState({
                loading: true
              });
              AsyncStorage.getItem('session_id').then((keyValue) => {
              const formData = new FormData();
              formData.append('session_id', ''+keyValue);
              formData.append('name', instance['fullname'].state.text );
              formData.append('phone', instance['phone'].state.text );
              formData.append('state', instance.state.stateName);
              formData.append('age', instance.state.age);
              formData.append('zipcode', instance['zipcode'].state.text );
              formData.append('gender', ''+genderPickerValue );
              if(imagePath == null){
    
              }else{
                if(Platform.OS == 'android'){
                  formData.append('image',{
                    uri:'file://' + imagePath.path,
                    name:fileName.name,
                    type:fileType.type,
                  });
                }else{
                  var fileExtension;
                  var uriPart;
                  uriPart = avatarSource.uri.split('.');
                  fileExtension = uriPart[uriPart.length - 1 ];
                  if( fileName.name === undefined || fileName.name === null && imagePath.path === undefined )
              {
                formData.append('image',{
                  uri: avatarSource.uri,
                  name: `photo.${fileExtension}`,
                  type:fileType.type,
                });
              }else{
    
                formData.append('image',{
                    uri:'file://' + avatarSource.uri,
                    name:fileName.name,
                    type:fileType.type,
                  });
                }
                }
                
              }
              
            
   
            axios({ url: BaseURL + editProfileURL, method : 'POST', data: formData})
            .then((responseJson) => {
                instance.setState({
                    loading: false,
                   })
                  
                   if(responseJson.data.status_code == 200 ){
                    // const items = [
                    //     ['username', responseJson.profile.name],
                    //     ['user_dp', responseJson.profile.profile_image],
                    //     ['user_location', responseJson.profile.location],
                    //     ['user_phone', responseJson.profile.phone],
                    //     ['user_lat', ''+responseJson.profile.latitude],
                    //     ['user_lng', ''+responseJson.profile.longitude]
                    // ]
                    //     AsyncStorage.multiSet(items, (error) => {
                    //         //to do something
                    //         if(__DEV__){
                    //             console.log('items Values', items + '\n' + error )
                    //         }
                    //     });

                    if(Platform.OS == 'ios'){
                            Alert.alert(responseJson.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                        }else if(Platform.OS == 'android'){
                            ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
                        }
                        instance.props.navigation.goBack();
                   }
              }).catch(function(error) {
    
                instance.setState({
                  loading: false,
                 })
    
                 if(error.response.data.status_code == 401){
                  if(Platform.OS == 'android'){
                    ToastAndroid.show(error.response.data.error_description, ToastAndroid.SHORT)
                  }else{
                    setTimeout( () => {
                    Alert.alert(error.response.data.error_description, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    },200)
                  }
                  AsyncStorage.clear();
                  NavigationWithParams.navigate('Auth', '');
              }else if(error.response.data.status_code == 403 ) {
                  
                  // Request made and server responded
                  if(Platform.OS == 'android'){
                  ToastAndroid.show(error.response.data.error_description, ToastAndroid.SHORT);
                  }else{
                    setTimeout( () => {
                    Alert.alert(error.response.data.error_description, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    },200)
                  }
                  AsyncStorage.clear();
          
                NavigationWithParams.navigate('Auth', '');
                }else {
                  if(Platform.OS == 'android'){
                    ToastAndroid.show(error.message, ToastAndroid.SHORT)
                }else {
                  setTimeout( () => {
                    Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                  },200)
                  }
                  // Something happened in setting up the request that triggered an Error
                 
                }

                //console.log('There has been a problem with your fetch operation: ' + error.message);
                //throw error;
                }.bind(instance));
              });
          }else{
    
            if(Platform.OS == 'ios'){
                Alert.alert('Internet Not Connected','',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
            }
        
        }
        });    
            
           }
    
        
    },



    ////--------- do----payment----------------


    do_Payment_stripe: function(instance,infoPament){
      
      const {getStateVal } = instance.state;
        
        NetInfo.fetch().then(res => {
         // console.log('Response of Internet', res+'\n'+CatID )

        if(res.isConnected){
          AsyncStorage.getItem('session_id').then((session_ID) => { 
            let val ={
              session_id: session_ID,
              plan_id:infoPament.plan_id,
               stripe_token:infoPament.stripe_token,
                amount:infoPament.amount
            }
           console.log("stripe data to sent>>>",val)
            instance.setState({
              loading: true,
             })
           
        axios.post(BaseURL + doPamentUrl,val).then((responseJson)=> {
          console.log('responseJson stripe')
          console.log(responseJson)
         
          if(responseJson.data.status_code == 200){
            
            AsyncStorage.setItem("subscriptionInfo", JSON.stringify(responseJson.data), (err)=> {

              if(err){
                 
                  throw err;
              }
             
          }).catch((err)=> {
            console.log('err>>>>>>')
            console.log(err)
            
          });
         
           
          // instance.setState({
          //  loading: false,
          //  subscriptionDeatail:responseJson.data
          
           
          // })

          instance.setState({
            loading: false,
            subscriptionDeatail:responseJson.data
             }, () => {
            setTimeout(() => {
              Alert.alert("Subscribed Successfully", '',
          [{ text: 'OK', onPress: () =>  instance.props.navigation.goBack(null),
          style:'cancel', }],
          {cancelable: true})
            }, 500);
          });
         

       
         
        console.log(responseJson.data.message)
          //ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
        }
        })
        .catch((error) => {
            instance.setState({
              loading: false,
              refreshing: false,
             })
             
             if(error.response.data.status_code == 401){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
              if(__DEV__){ console.log(error.response.data); }
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
              // Something happened in setting up the request that triggered an Error
             
            }

             //console.log(error)
          }) //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
  
    },


    //------------------------------------



    ////--------- cancel plan api----------------


    cancelPlan: function(instance){
      
      const {getStateVal } = instance.state;
       
       
        NetInfo.fetch().then(res => {
         // console.log('Response of Internet', res+'\n'+CatID )

        if(res.isConnected){
          AsyncStorage.getItem('session_id').then((session_ID) => { 
            let val ={
              session_id: session_ID,
              subscribe_id:instance.state.subscriptionDeatail.subscribe_id
              
            }
            instance.setState({
              loading: true,
             })
           
        axios.post(BaseURL + cancel_subscription,val).then((responseJson)=> {
         
          if(responseJson.data.status_code == 200){

          instance.setState({
           loading: false,
          // subscriptionDeatail:responseJson.data.details
          
           
          })
          instance.setState({
            loading: false,
             }, () => {
            setTimeout(() => {
              Alert.alert("Cancel Successfully", '',
          [{ text: 'OK', onPress: () =>  console.log('Cancelled'),
          style:'cancel', }],
          {cancelable: true})
            }, 500);
          });
          AsyncStorage.removeItem("subscriptionInfo");
         
          ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
        }
        })
        .catch((error) => {
          console.log("fjdjfgdfderror",error)
            instance.setState({
              loading: false,
              refreshing: false,
             })
             
             if(error.response.data.status_code == 401){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
             
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
              // Something happened in setting up the request that triggered an Error

            }

             //console.log(error)
          }) //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
  
    },


    //------------------------------------




    getNearBy_brewery: function(instance){
      
        NetInfo.fetch().then(res => {
         // console.log('Response of Internet', res+'\n'+CatID )

        if(res.isConnected){
          AsyncStorage.getItem('session_id').then((session_ID) => { 
            let val ={
              session_id: session_ID,
              latitude:instance.state.userLat,
              longitude:instance.state.userLong,
               
            }
          
           console.log("user Data to send",val)
        axios.post(BaseURL + searchProducts,val).then((responseJson)=> {
         console.log('getNearBy_brewery >>>>>>>>>>>> ')
          if(responseJson.data.status_code == 200){
          console.log(responseJson)
          instance.setState({
            nearByBrewerry:responseJson.data.details,
           loading: false,
          
           
          })
          
          //ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
        }
        })
        .catch((error) => {
            instance.setState({
              loading: false,
              refreshing: false,
             })
             
             if(error.response.data.status_code == 401){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
              
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
              // Something happened in setting up the request that triggered an Error
             
            }

             //console.log(error)
          }) //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
  
    },



    FilterApiFunction: function(instance){
      
      const {getStateVal } = instance.state;
       
        NetInfo.fetch().then(res => {
         // console.log('Response of Internet', res+'\n'+CatID )
         
        if(res.isConnected){
          AsyncStorage.getItem('session_id').then((session_ID) => { 
            let val ={
              session_id: session_ID,
          category_id: instance.state.categoryIdArr,
          type_id:instance.state.typeIdArr,
          style_id:instance.state.styleIdArr,
          distance:instance.state.value,
          latitude:instance.state.userLat,
          longitude:instance.state.userLong
            }
            console.log(val)
           
        axios.post(BaseURL + searchProducts,val).then((responseJson)=> {
         console.log(responseJson)
          if(responseJson.data.status_code == 200){

          instance.setState({
           loading: false,
           data:responseJson.data.details
           
          })
          
          ToastAndroid.show(responseJson.data.message, ToastAndroid.SHORT)
        }
        })
        .catch((error) => {
            instance.setState({
              loading: false,
              refreshing: false,
             })
             
             if(error.response.data.status_code == 401){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
             
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
              // Something happened in setting up the request that triggered an Error
             
            }

             //console.log(error)
          }) //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
  
    },

    ResetFilterValues: function(instance){
      instance.textInputMinPrice.clear();
      instance.textInputMaxPrice.clear();
        instance.setState({
          TextInputMaxPrice: '',
          TextInputMinPrice: '',
          PostedAgoValue: undefined,
          CitiesPickerValue: undefined,
          CategoryPickerValue: undefined
        })

    },

    ReportProductApi: function(instance, advt_id){

      NetInfo.fetch().then(res => {
        //console.log('Response of Internet', res )
        if(res.isConnected){
    instance.setState({
            loading: true
          });
      AsyncStorage.getItem('session_id').then((session_ID) => { 
       
      
        fetch( BaseURL1 + ReportProduct, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        session_id: session_ID,
        advertisement_id: ''+advt_id
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
          
            instance.setState({
          loading: false,
               })
                     
               if(responseJson.status == 200 ){
                if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                    }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }

        instance.props.navigation.goBack()

               }else if(responseJson.status == 400){
                if(Platform.OS == 'android'){
                  ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                  Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
                 
               }
               else if(responseJson.status == 403 ){
        
                 if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                    }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }
                    
                    AsyncStorage.clear();

                    instance.props.navigation.navigate('Auth')
                
               }else{
                instance.setState({
                  loading: false,
                  }) 
                if(Platform.OS == 'android'){
                    ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                }else{
                    Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                }
               }
              
          })
          .catch(function(error) {
    
            instance.setState({
              loading: false,
           });
    
           if(Platform.OS == 'android'){
            ToastAndroid.show(error.message, ToastAndroid.SHORT)

        }else{
            Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
       
            
            
            //throw error;
            
            }.bind(instance));
          })
          
        }else{
    
          if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }else{
              Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
      
      }
      });

      
      },

    SearchFilterFunction: function(instance, text, CatID){
      NetInfo.fetch().then(res => {
        
        if(res.isConnected){
          AsyncStorage.getItem('session_id').then((session_ID) => { 

        axios.post(BaseURL + searchProducts,{
          session_id: session_ID,
          search: text,
          latitude:instance.state.userLat,
         longitude:instance.state.userLong

          }).then((responseJson)=> {
            console.log("neaaaaaaar byyyyyyyyy",responseJson)
          if(responseJson.data.status_code == 200){
           
          instance.setState({
           loading: false,
           refreshing: false,
           data: responseJson.data.details
          })
          
        }
        })
        .catch((error) => {
            instance.setState({
              loading: false,
              refreshing: false,
             })
             
             if(error.response.data.status_code == 401){
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
              NavigationWithParams.navigate('Auth', '');
          }else if(error.response.data.status_code == 403 ) {
             
              // Request made and server responded
              if(Platform.OS == 'android'){
              ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
              }else{
                Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
              AsyncStorage.clear();
      
            NavigationWithParams.navigate('Auth', '');
            }else {
              if(Platform.OS == 'android'){
                ToastAndroid.show(error.message, ToastAndroid.SHORT)
            }else {
                Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
              // Something happened in setting up the request that triggered an Error
             
            }

             //console.log(error)
          }) //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('Internet Not Connected', '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
    },

    SellProducts: function(instance, Category_type){
      
      switch(Category_type){
        case 0:
          
        this.HousingCategory(instance, Category_type)
          
        break;

        case 1:
          
        this.ElectronicsCategory(instance, Category_type)
          
        break;

        case 2:
          
        this.HouseHoldItemsCategory(instance, Category_type)
          
        break;

        case 3:
          
        this.CarsCategory(instance, Category_type)
          
        break;

        case 4:
          
        this.BikesCategory(instance, Category_type)
          
        break;

        case 5:
          
        this.JobsCategory(instance, Category_type)
          
        break;

        case 6:
          
        this.ServicsCategory(instance, Category_type)
          
        break;

        case 7:
          
        this.OthersCategory(instance, Category_type)
          
        break;

      }
      

      
    },

    HousingCategory: function(instance, catID){
      var categoryId = catID + 1;
      const { avatarSource, imagePath, fileName, fileType, CategoryPickerValue, PropertyPickerValue,
        ListingPickerValue, BedRoomPickerValue, BathRoomPickerValue, CitiesPickerValue,
        ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
        CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }
      else if(PropertyPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyProperty, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyProperty,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }
      else if(ListingPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyListing, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyListing,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(BedRoomPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyBedRoom, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyBedRoom,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(BathRoomPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyBathRoom, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyBathRoom,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
         
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 
            
            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Housing');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('property_type', Platform.OS == 'ios' ? PropertyPickerValue.label : PropertyPickerValue);
            data.append('property_listing_type', Platform.OS == 'ios' ? ListingPickerValue.label : ListingPickerValue);
            data.append('property_bathroom', Platform.OS == 'ios' ? BathRoomPickerValue.label : BathRoomPickerValue);
            data.append('property_bedroom', Platform.OS == 'ios' ? BedRoomPickerValue.label : BedRoomPickerValue);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            var images = []
            instance.state.allImages.map( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
          
            }else{  
              data.append('images[]', s);
            // var image = {
            //   "uri": s.uri,
            //   "name": s.name,
            //   "type": s.type,
            //   }
            //   images.push(image)
          }
            })
            //data.append('images', images);

          // JSON.stringify({
          // description: TextInputDesc,
          // price: TextInputPrice,
          // currency: 'IN',
          // latitude: ''+PlacesSearch.location.longitude,
          // longitude: ''+PlacesSearch.location.longitude,
          // location: ''+PlacesSearch.address,
          // property_type: PropertyPickerValue.label,
          // property_listing_type: ListingPickerValue.label, 
          // property_bedroom: BedRoomPickerValue.label,
          // property_bathroom: BathRoomPickerValue.label,
          // car_year: '',
          // car_maker: '',
          // car_model: '',
          // car_color: '',
          // car_transmission: '',
          // car_seats: '',
          // car_mileage: '',
          // car_fueltype: '',
          // city: CitiesPickerValue.label,
          // category_name: 'Housing',
          // ...this.allImagesData(instance)
          // })
            
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
          
          //instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             //console.log(error)
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }
    },

    ElectronicsCategory: function(instance, catID){

      var categoryId = catID + 1;
      const { CitiesPickerValue, ConditionPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }
      else if(ConditionPickerValue == undefined){
       if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
        
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 
            
            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Electronics');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            //data.append('condition', Platform.OS == 'ios' ? ConditionPickerValue.label : ConditionPickerValue );
            var images = []
            instance.state.allImages.map( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
             
            }else{  
              data.append('images[]', s);
          }
            })

            
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
          
          //instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             //console.log(error)
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }

    },

    HouseHoldItemsCategory: function(instance, catID){

      var categoryId = catID + 1;
      const { avatarSource, imagePath, fileName, fileType, CategoryPickerValue, PropertyPickerValue,
        ListingPickerValue, BedRoomPickerValue, BathRoomPickerValue, CitiesPickerValue,
        ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
        CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }
      else if(ConditionPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
       }else{
        Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
        Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
        Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
        Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
         
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 
           
            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Household Items');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            var images = []
            instance.state.allImages.map( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
             
            }else{  
              data.append('images[]', s);
          }
            })
           
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
          
          //instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
           Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             //console.log(error)
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }

    },

    CarsCategory: function(instance, catID){

      var categoryId = catID + 1;
      const { CitiesPickerValue, ConditionPickerValue, YearsPickerValue,
        MakersPickerValue, ModelsPickerValue, CarTransMissionPickerValue, 
        CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages, TextInputCarMileage,
        TextInputCarColor } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(YearsPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyYear, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyYear,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }
      else if(MakersPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyMaker, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyMaker,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(ModelsPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyModal, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyModal,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(CarTransMissionPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTransmission, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTransmission,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(FuelPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyFuel, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyFuel,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
        
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 
            
            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Cars');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('car_year', Platform.OS == 'ios' ? YearsPickerValue.label : YearsPickerValue);
            data.append('car_maker', Platform.OS == 'ios' ? MakersPickerValue.label : MakersPickerValue);
            data.append('car_model', Platform.OS == 'ios' ? ModelsPickerValue.label : ModelsPickerValue);
            data.append('car_transmission', Platform.OS == 'ios' ? CarTransMissionPickerValue.label : CarTransMissionPickerValue);
            data.append('car_fueltype', Platform.OS == 'ios' ? FuelPickerValue.label : FuelPickerValue);
            data.append('car_seats', Platform.OS == 'ios' ? 
            CarSeatsPickerValue == undefined ? '' : CarSeatsPickerValue.label : 
            CarSeatsPickerValue == undefined ? '' : CarSeatsPickerValue);
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('car_color', TextInputCarColor);
            data.append('car_mileage', TextInputCarMileage);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            var images = []
            instance.state.allImages.map( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
            
            }else{  
              data.append('images[]', s);
          }
            })
            
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
         
          //instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             //console.log(error)
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }

    },

    BikesCategory: function(instance, catID){

      var categoryId = catID + 1;
      const { avatarSource, imagePath, fileName, fileType, CategoryPickerValue, PropertyPickerValue,
        ListingPickerValue, BedRoomPickerValue, BathRoomPickerValue, CitiesPickerValue,
        ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
        CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }
      else if(ConditionPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
         
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 

            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Motorcycles And Bajaj');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            var images = []
            instance.state.allImages.map( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
         
            }else{  
              data.append('images[]', s);
          }
            })
            
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
          
         // instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             //console.log(error)
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }

    },

    JobsCategory: function(instance, catID){

      var categoryId = catID + 1;
      const { avatarSource, imagePath, fileName, fileType, CategoryPickerValue, PropertyPickerValue,
        ListingPickerValue, BedRoomPickerValue, BathRoomPickerValue, CitiesPickerValue,
        ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
        CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
          if(__DEV__){
          console.log('Response of Internet', catID ) }
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 

            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Jobs');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            var images = []
            instance.state.allImages.map( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
         
            }else{  
              data.append('images[]', s);
          }
            })
            
           
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
          
          //instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             //console.log(error)
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }

    },

    ServicsCategory: function(instance, catID){

      var categoryId = catID + 1;
      const { avatarSource, imagePath, fileName, fileType, CategoryPickerValue, PropertyPickerValue,
        ListingPickerValue, BedRoomPickerValue, BathRoomPickerValue, CitiesPickerValue,
        ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
        CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
        
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 

            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Services');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            var images = []
            instance.state.allImages.map( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
          
            }else{  
              data.append('images[]', s);
          }
            })
           
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
          
          //instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             //console.log(error)
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }

    },

    OthersCategory: function(instance, catID){

      var categoryId = catID + 1;
      const { CategoryPickerValue, PropertyPickerValue,
        ListingPickerValue, BedRoomPickerValue, BathRoomPickerValue, CitiesPickerValue,
        ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
        CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
        TextInputDesc, TextInputTitle, allImages } = instance.state;

      if(TextInputTitle == ''){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(TextInputPrice == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }else if(TextInputDesc == ''){
        if(Platform.OS == 'android'){
           ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
        }else{
          Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      }
      else if(ConditionPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(CitiesPickerValue == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(PlacesSearch == undefined){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
        if(Platform.OS == 'android'){
          ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
       }else{
         Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
       }
      }else{
        NetInfo.fetch().then(res => {
          
        if(res.isConnected){
          instance.setState({
            loading: true
           })
          AsyncStorage.getItem('session_id').then((session_ID) => { 

            const data = new FormData();
            data.append('session_id', ''+session_ID);
            data.append('title', TextInputTitle);
            data.append('category', ''+categoryId);
            data.append('category_name', 'Other');
            data.append('description', TextInputDesc);
            data.append('price', TextInputPrice);
            data.append('currency', 'IN');
            data.append('latitude', ''+PlacesSearch.location.latitude);
            data.append('longitude', ''+PlacesSearch.location.longitude);
            data.append('location', ''+PlacesSearch.address);
            data.append('city', Platform.OS == 'ios' ? CitiesPickerValue.label : CitiesPickerValue );
            //data.append('images', instance.state.allImages[0]);
          //   var images = []
            instance.state.allImages.forEach( (s, i) => {
            if(s.uri == '' || s.uri == null || s.uri == undefined){
              
            }else{  
              //var image = s.uri;
             data.append('images[]', s);
            
            // var image = {
            //   uri: s.uri,
            //   name: s.name,
            //   type: s.type,
            //   }
              //images.push(image)
          }
            })
          //   data.append('images[]', images);
           
        fetch( BaseURL1 + sellProduct, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          },
          body: data,
          })
        .then(response => response.json())
        .then((responseJson)=> {
          if(responseJson.status == 200){

           
          instance.setState({
           loading: false,
           //refreshing: false,
           //FeaturedList: responseJson.ads_detail
          })
          if(Platform.OS == 'android'){
            ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
          }else{
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
         
          //instance.props.navigation.navigate(Routes.TabsHome)
        }else if(responseJson.status == 400){
            instance.setState({
                loading: false,
                //refreshing: false,
              })
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
            }else{
              Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        }else if(responseJson.status == 403){
          instance.setState({
            loading: false,
            //refreshing: false,
          })
          if(Platform.OS == 'ios'){
            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }
          AsyncStorage.clear();
    
          instance.props.navigation.navigate('Auth');
        }
        })
        .catch(function(error) {
            instance.setState({
              loading: false,
              //refreshing: false,
             })
             if(Platform.OS == 'ios'){
              Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              
          }else if(Platform.OS == 'android'){
              ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
             
          }.bind(instance)); //to catch the errors if any
        })
      }else{
        instance.setState({
          loading: false,
          //refreshing: false,
         })
    
        if(Platform.OS == 'ios'){
           Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            
        }else if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }
    
    }
    });
      }

    },


      SendMessage: function(instance, advtID, array, User2ID, UserID ){
 
        const { text }  = instance.state ;
        
        
         if(text == ''){

            if(Platform.OS == 'ios'){
                Alert.alert('', 'Please Enter Message',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }else if(Platform.OS == 'android'){
                ToastAndroid.show("Please Enter Message", ToastAndroid.SHORT)
            }
            
        }else{
              NetInfo.fetch().then(res => {
                
                if(res.isConnected){
                    AsyncStorage.getItem('session_id').then((sessionId) => {
                    fetch( BaseURL1 + sendMessage, {
                        method: 'POST',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        session_id: sessionId,
                        message: text.trim(),
                        advertisement_id: ''+advtID,
                        user_id: UserID == ''+array.posted_by_id ? ''+User2ID : ''+array.posted_by_id
                        })
                        })
                      .then(response => response.json())
                      .then((responseJson)=> {
                        if(responseJson.status == 200){
                        instance.setState({
                         text: '',
                        })
              
              // const chats = instance.state.dataSource.slice();
              // const chatLength = instance.state.dataSource.length
    
              // chats.push({ id: chatLength + 1, created_at: new Date(), msgs: text.trim(), sender_id: USerID,
              //    group_id: 1, user_name: UserName })
              // instance.setState({ dataSource: chats, text: '' });

                        this.SingleChatList(instance, array, User2ID)

                        // if(Platform.OS == 'android'){
                        //     ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                        //   }else{
                        //     alert(responseJson.message);
                        //   }
                        
                        
                      }else if(responseJson.status == 400){
                          instance.setState({
                              loading: false,
                            })
                          if(Platform.OS == 'android'){
                            ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                          }else{
                            Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                          }
                      }else if(responseJson.status == 403){
                        instance.setState({
                          loading: false,
                        })
                        if(Platform.OS == 'ios'){
                          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                          
                      }else if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                      }
                        AsyncStorage.clear();
                  
                        instance.props.navigation.navigate('Auth');
                      }
                      })
                      .catch((error) => {
                          instance.setState({
                            loading: false,
                           })
                           if(Platform.OS == 'ios'){
                            Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
                        }else if(Platform.OS == 'android'){
                            ToastAndroid.show(error.message, ToastAndroid.SHORT)
                        }
                           //console.log(error)
                        }) //to catch the errors if any
                    })
          }else{

            if(Platform.OS == 'ios'){
                Alert.alert('', R.strings.NoInernetConnection.text,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                
            }else if(Platform.OS == 'android'){
                ToastAndroid.show(R.strings.NoInernetConnection.text, ToastAndroid.SHORT)
            }
      
        }
        })
             
            }
    },

    //dataSource
    SingleChatList: function(instance, array, user2ID){

      NetInfo.fetch().then(res => {
        //console.log('Response of Internet', res )
        if(res.isConnected){
    


      AsyncStorage.getItem('session_id').then((session_ID) => { 
       
      
      
        fetch( user2ID == '0' || user2ID == 0 ? BaseURL1 + ReceiveChat + ''+session_ID + '&advertisement_id=' + ''+array.advertisement_id +
        '&user_id='+ ''+array.posted_by_id + '&old=1':
        BaseURL1 + ReceiveChat + ''+session_ID + '&advertisement_id=' + ''+array.advertisement_id +
         '&user_id='+ ''+user2ID + '&old=1', {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
        }).then((response) => response.json())
        .then((responseJson) => {
          
            instance.setState({
          loading: false,
               })
                      
               if(responseJson.status == 200 ){
                instance.setState({
                  dataSource: responseJson.chat_list
                })


               }else if(responseJson.status == 400){
              //   if(Platform.OS == 'android'){
              //     ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              // }else{
              //     alert(responseJson.error_description)
              // }
                 
               }
               else if(responseJson.status == 403 ){
        
                 if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                    }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }
                    
                    AsyncStorage.clear();

                    instance.props.navigation.navigate('Auth')
                
               }else{
                instance.setState({
                  loading: false,
                  }) 
                // if(Platform.OS == 'android'){
                //     ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                // }else{
                //     alert(responseJson.error_description)
                // }
               }
              
          })
          .catch(function(error) {
    
            instance.setState({
              loading: false,
           });
    
        //    if(Platform.OS == 'android'){
        //     ToastAndroid.show(error.message, ToastAndroid.SHORT)
        //     console.log('Error Events', error.message)
        // }else{
        //     alert(error.message)
        // }
       
            
            //throw error;
            
            }.bind(instance));
          })
          
        }else{
    
          if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }else{
              Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
      
      }
      });

      
      },

    ChatUsersList:  function(instance){

      NetInfo.fetch().then(res => {
        //console.log('Response of Internet', res )
        if(res.isConnected){
    
      AsyncStorage.getItem('session_id').then((session_ID) => { 
      
        fetch( BaseURL1 + chatUersList + ''+session_ID, {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
        }).then((response) => response.json())
        .then((responseJson) => {
          
            instance.setState({
          loading: false,
          refreshing: false
               })
                     
               if(responseJson.status == 200 ){
                instance.setState({
                  dataSource: responseJson.chat
                })


               }else if(responseJson.status == 400){
                if(Platform.OS == 'android'){
                  ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
              }else{
                  Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
                 
               }
               else if(responseJson.status == 403 ){
        
                 if(Platform.OS == 'android'){
                        ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                    }else{
                        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                    }
                    
                    AsyncStorage.clear();

                    instance.props.navigation.navigate('Auth')
                
               }else{
                
                if(Platform.OS == 'android'){
                    ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                }else{
                    Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                }
               }
              
          })
          .catch(function(error) {
    
            instance.setState({
              loading: false,
              refreshing: false
              }) 
    
           if(Platform.OS == 'android'){
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
       
        }else{
            Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
        
            
            
            //throw error;
            
            }.bind(instance));
          })
          
        }else{
          instance.setState({
            loading: false,
            refreshing: false
            }) 
          if(Platform.OS == 'android'){
              ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
          }else{
              Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
      
      }
      });

      
      },

//CAr Maker Picker
CarMakerPicker : function (instance){
  if(instance.state.disabledMakers){
    if(instance.state.allCarMakers.length == 0){
      if(Platform.OS == 'android'){
      ToastAndroid.show('Check your Internet Connection or refresh the Screen', ToastAndroid.SHORT);
      }else{
        Alert.alert('', 'Check your Internet Connection or refresh the Screen',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
    }
  }else{
    instance.setState({ MakersVisible: true })
  }
},
//Car Models Picker
CarModelsPicker :function (instance) {
  if(instance.state.disabledMakers){
    if (instance.state.allCarModels.length == 0) {
      if(Platform.OS == 'android'){
      ToastAndroid.show('Please Select Atleast One Car Maker', ToastAndroid.SHORT);
      }else{
        Alert.alert('', 'Please Select Atleast One Car Maker',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
    }
  }else{ 
    if (instance.state.allCarMakers.length == 0) {
      if(Platform.OS == 'android'){
      ToastAndroid.show('Check your Internet Connection or refresh the Screen', ToastAndroid.SHORT);
      }else{
        Alert.alert('', 'Check your Internet Connection or refresh the Screen',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
    }else if (instance.state.allCarModels.length == 0) {
      if(Platform.OS == 'android'){
      ToastAndroid.show('Please Select Atleast One Car Maker', ToastAndroid.SHORT);
      }else{
        Alert.alert('', 'Please Select Atleast One Car Maker',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
    }
    else{
      instance.setState({ ModelsVisible: true })
    }
    
  }
},

CarMakerList: function(instance, maker_id){
        NetInfo.fetch().then(res => {
          //console.log('Response of Internet', res )
          if(res.isConnected){
      
        
          fetch( maker_id == '' || maker_id == null || maker_id == undefined ? BaseURL1 + getCarMakerModels
          : BaseURL1 + getCarMakerModels +'?maker_id=' + ''+maker_id, {
          method: 'GET',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
          }).then((response) => response.json())
          .then((responseJson) => {
            
              instance.setState({
            loading: false,
            refreshing: false
                 })
                        
                 if(responseJson.status == 200 ){
                   if(maker_id == '' || maker_id == null || maker_id == undefined){
                    instance.setState({
                      allCarMakers: responseJson['product list']
                    })
                   }else{
                    instance.setState({
                      allCarModels: responseJson['model list']
                    })
                   }
                  
  
  
                 }else if(responseJson.status == 400){
                //   if(Platform.OS == 'android'){
                //     ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                // }else{
                //     alert(responseJson.error_description)
                // }
                   
                 }
                 else if(responseJson.status == 403 ){
          
                   if(Platform.OS == 'android'){
                          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                      }else{
                          Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                      }
                      
                      AsyncStorage.clear();
  
                      instance.props.navigation.navigate('Auth')
                  
                 }else{
                  instance.setState({
                    loading: false,
                    }) 
                  // if(Platform.OS == 'android'){
                  //     ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
                  // }else{
                  //     alert(responseJson.error_description)
                  // }
                 }
                
            })
            .catch(function(error) {
      
              instance.setState({
                loading: false,
                refreshing: false
             });
      
          //    if(Platform.OS == 'android'){
          //     ToastAndroid.show(error.message, ToastAndroid.SHORT)
          //     console.log('Error Events', error.message)
          // }else{
          //     alert(error.message)
          // }
         
              
              
              //throw error;
              
              }.bind(instance));
            
            
          }else{
      
            if(Platform.OS == 'android'){
                ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
            }else{
                Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
        
        }
        });
},

EditSellProduct: function(instance, Category_type, advtID){
      
  switch(Category_type){
    case 0:
      
    this.EditHousingCategory(instance, Category_type, advtID)
      
    break;

    case 1:
      
    this.EditElectronicsCategory(instance, Category_type, advtID)
      
    break;

    case 2:
      
    this.EditHouseHoldItemsCategory(instance, Category_type, advtID)
      
    break;

    case 3:
      
    this.EditCarsCategory(instance, Category_type, advtID)
      
    break;

    case 4:
      
    this.EditBikesCategory(instance, Category_type, advtID)
      
    break;

    case 5:
      
    this.EditJobsCategory(instance, Category_type, advtID)
      
    break;

    case 6:
      
    this.EditServicsCategory(instance, Category_type, advtID)
      
    break;

    case 7:
      
    this.EditOthersCategory(instance, Category_type, advtID)
      
    break;

  }
  

  
},

EditHousingCategory: function(instance, catID, advtID){
  var categoryId = catID + 1;
  const { PropertyPickerValue,
    ListingPickerValue, BedRoomPickerValue, BathRoomPickerValue, CitiesPickerValue,
    propertyType, propertyListingType, propertyBedroom, propertyBathroom, city, address,
    carYear, carMaker, carModel, carTransmission, carSeats, carFueltype, PlacesSearch, TextInputPrice,
    TextInputDesc, TextInputTitle, allImages } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }
  else if(PropertyPickerValue == undefined && propertyType == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyProperty, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyProperty,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }
  else if(ListingPickerValue == undefined && propertyListingType == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyListing, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyListing,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(BedRoomPickerValue == undefined && propertyBedroom == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyBedRoom, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyBedRoom,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(BathRoomPickerValue == undefined && propertyBathroom == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyBathRoom, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyBathRoom,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(CitiesPickerValue == undefined && city == '' ){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {} ){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
    
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 
        
        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Housing');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude : ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location : ''+PlacesSearch.address);
        data.append('property_type', Platform.OS == 'ios' ? PropertyPickerValue == undefined ? propertyType : PropertyPickerValue.label 
        : PropertyPickerValue);
        data.append('property_listing_type', Platform.OS == 'ios' ? ListingPickerValue == undefined ? propertyListingType : ListingPickerValue.label 
        : ListingPickerValue);
        data.append('property_bathroom', Platform.OS == 'ios' ? BathRoomPickerValue == undefined ? propertyBathroom : BathRoomPickerValue.label 
        : BathRoomPickerValue);
        data.append('property_bedroom', Platform.OS == 'ios' ? BedRoomPickerValue == undefined ? propertyBedroom : BedRoomPickerValue.label 
        : BedRoomPickerValue);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? city : CitiesPickerValue.label 
        : CitiesPickerValue );
        var images = []
        instance.state.allImages.map( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
          if(__DEV__){ console.log('Empty Image of Index' + i) }
        }else{  
          data.append('images[]', s);
        // var image = {
        //   "uri": s.uri,
        //   "name": s.name,
        //   "type": s.type,
        //   }
        //   images.push(image)
      }
        })
        //data.append('images', images);

      // JSON.stringify({
      // description: TextInputDesc,
      // price: TextInputPrice,
      // currency: 'IN',
      // latitude: ''+PlacesSearch.location.longitude,
      // longitude: ''+PlacesSearch.location.longitude,
      // location: ''+PlacesSearch.address,
      // property_type: PropertyPickerValue.label,
      // property_listing_type: ListingPickerValue.label, 
      // property_bedroom: BedRoomPickerValue.label,
      // property_bathroom: BathRoomPickerValue.label,
      // car_year: '',
      // car_maker: '',
      // car_model: '',
      // car_color: '',
      // car_transmission: '',
      // car_seats: '',
      // car_mileage: '',
      // car_fueltype: '',
      // city: CitiesPickerValue.label,
      // category_name: 'Housing',
      // ...this.allImagesData(instance)
      // })
       
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
      
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }
},

EditElectronicsCategory: function(instance, catID, advtID){

  var categoryId = catID + 1;
  const { propertyType, propertyListingType, propertyBedroom, propertyBathroom, city, address,
    carYear, carMaker, carModel, carTransmission, carSeats, carFueltype, CitiesPickerValue, ConditionPickerValue, PlacesSearch, TextInputPrice,
    TextInputDesc, TextInputTitle, allImages } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }
  else if(ConditionPickerValue == undefined){
   if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(CitiesPickerValue == undefined && city == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {} ){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
   
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 
        
        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Electronics');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude : ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location : ''+PlacesSearch.address);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? ''+city : CitiesPickerValue.label : CitiesPickerValue );
        //data.append('condition', Platform.OS == 'ios' ? ConditionPickerValue.label : ConditionPickerValue );
        var images = []
        instance.state.allImages.map( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
      
        }else{  
          data.append('images[]', s);
      }
        })

       
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
      
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }

},

EditHouseHoldItemsCategory: function(instance, catID, advtID){

  var categoryId = catID + 1;
  const { propertyType, propertyListingType, propertyBedroom, propertyBathroom, city, address,
    carYear, carMaker, carModel, carTransmission, carSeats, carFueltype, CitiesPickerValue,
    ConditionPickerValue, PlacesSearch, TextInputPrice, TextInputDesc, TextInputTitle, allImages } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }
  else if(ConditionPickerValue == undefined){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(CitiesPickerValue == undefined && city == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {} ){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
  
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 
       
        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Household Items');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude : ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location : ''+PlacesSearch.address);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? city : CitiesPickerValue.label : CitiesPickerValue );
        var images = []
        instance.state.allImages.map( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
  
        }else{  
          data.append('images[]', s);
      }
        })
        
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
      
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }

},

EditCarsCategory: function(instance, catID, advtID){

  var categoryId = catID + 1;
  const { propertyType, propertyListingType, propertyBedroom, propertyBathroom, city, address,
    carYear, carMaker, carModel, carTransmission, carSeats, carFueltype,
    CitiesPickerValue, ConditionPickerValue, YearsPickerValue,
    MakersPickerValue, ModelsPickerValue, CarTransMissionPickerValue, 
    CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
    TextInputDesc, TextInputTitle, allImages, TextInputCarMileage,
    TextInputCarColor } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(YearsPickerValue == undefined && carYear == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyYear, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyYear,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }
  else if(MakersPickerValue == undefined && carMaker == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyMaker, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyMaker,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(ModelsPickerValue == undefined && carModel == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyModal, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyModal,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(CarTransMissionPickerValue == undefined && carTransmission == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTransmission, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTransmission,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(FuelPickerValue == undefined && carFueltype == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyFuel, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyFuel,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(CitiesPickerValue == undefined && city == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {} ){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
    
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 
        
        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Cars');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('car_year', Platform.OS == 'ios' ? YearsPickerValue == undefined ? carYear : YearsPickerValue.label : YearsPickerValue);
        data.append('car_maker', Platform.OS == 'ios' ? MakersPickerValue == undefined ? carMaker : MakersPickerValue.label : MakersPickerValue);
        data.append('car_model', Platform.OS == 'ios' ? ModelsPickerValue == undefined ? carModel : ModelsPickerValue.label : ModelsPickerValue);
        data.append('car_transmission', Platform.OS == 'ios' ? CarTransMissionPickerValue == undefined ? carTransmission : CarTransMissionPickerValue.label : CarTransMissionPickerValue);
        data.append('car_fueltype', Platform.OS == 'ios' ? FuelPickerValue == undefined ? carFueltype : FuelPickerValue.label : FuelPickerValue);
        data.append('car_seats', Platform.OS == 'ios' ? 
        CarSeatsPickerValue == undefined ? carSeats : CarSeatsPickerValue.label : 
        CarSeatsPickerValue);
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude : ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location : ''+PlacesSearch.address);
        data.append('car_color', TextInputCarColor);
        data.append('car_mileage', TextInputCarMileage);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? city : CitiesPickerValue.label
        : CitiesPickerValue );
        var images = []
        instance.state.allImages.map( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
       
        }else{  
          data.append('images[]', s);
      }
        })
        
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
      
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }

},

EditBikesCategory: function(instance, catID, advtID){

  var categoryId = catID + 1;
  const { propertyType, propertyListingType, propertyBedroom, propertyBathroom, city, address,
    carYear, carMaker, carModel, carTransmission, carSeats, carFueltype, CitiesPickerValue,
    ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
    CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
    TextInputDesc, TextInputTitle, allImages } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }
  else if(ConditionPickerValue == undefined){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(CitiesPickerValue == undefined && city == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {}){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
    
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 

        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Motorcycles And Bajaj');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude : ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location : ''+PlacesSearch.address);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? city : CitiesPickerValue.label : CitiesPickerValue );
        var images = []
        instance.state.allImages.map( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
          if(__DEV__){ console.log('Empty Image of Index' + i) }
        }else{  
          data.append('images[]', s);
      }
        })
        
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
      
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }

},

EditJobsCategory: function(instance, catID, advtID){

  var categoryId = catID + 1;
  const { city, address, CitiesPickerValue,
    ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
    CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
    TextInputDesc, TextInputTitle, allImages } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(CitiesPickerValue == undefined && city == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {}){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
     
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 

        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Jobs');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude : ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location : ''+PlacesSearch.address);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? city : CitiesPickerValue.label : CitiesPickerValue );
        var images = []
        instance.state.allImages.map( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
       
        }else{  
          data.append('images[]', s);
      }
        })
        
       
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
     
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }

},

EditServicsCategory: function(instance, catID, advtID){

  var categoryId = catID + 1;
  const { city, address, CitiesPickerValue,
    ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
    CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
    TextInputDesc, TextInputTitle, allImages } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(CitiesPickerValue == undefined && city == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {}){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
   
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 

        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Services');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude : ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location : ''+PlacesSearch.address);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? city : CitiesPickerValue.label
        : CitiesPickerValue );
        var images = []
        instance.state.allImages.map( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
          if(__DEV__){ console.log('Empty Image of Index' + i) }
        }else{  
          data.append('images[]', s);
      }
        })
       
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
      
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }

},

EditOthersCategory: function(instance, catID, advtID){

  var categoryId = catID + 1;
  const { city, address, CitiesPickerValue,
    ConditionPickerValue, YearsPickerValue, MakersPickerValue, ModelsPickerValue,
    CarTransMissionPickerValue, CarSeatsPickerValue, FuelPickerValue, PlacesSearch, TextInputPrice,
    TextInputDesc, TextInputTitle, allImages } = instance.state;

  if(TextInputTitle == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyTitle, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyTitle,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(TextInputPrice == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyPrice, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyPrice,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }else if(TextInputDesc == ''){
    if(Platform.OS == 'android'){
       ToastAndroid.show(R.strings.PostScreen.Toasts.emptyDescription, ToastAndroid.SHORT)
    }else{
      Alert.alert('', R.strings.PostScreen.Toasts.emptyDescription,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
  }
  else if(ConditionPickerValue == undefined){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCondition, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCondition,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(CitiesPickerValue == undefined && city == ''){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyCity, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyCity,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(PlacesSearch == undefined && address == {}){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyAddress, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyAddress,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else if(allImages[0].imageUrl == R.strings.PostScreen.ImagePlaceHolderUrl){
    if(Platform.OS == 'android'){
      ToastAndroid.show(R.strings.PostScreen.Toasts.emptyImage, ToastAndroid.SHORT)
   }else{
     Alert.alert('', R.strings.PostScreen.Toasts.emptyImage,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
   }
  }else{
    NetInfo.fetch().then(res => {
 
    if(res.isConnected){
      instance.setState({
        loading: true
       })
      AsyncStorage.getItem('session_id').then((session_ID) => { 

        const data = new FormData();
        data.append('session_id', ''+session_ID);
        data.append('advertisement_id',''+advtID);
        data.append('title', TextInputTitle);
        data.append('category', ''+categoryId);
        data.append('category_name', 'Other');
        data.append('description', TextInputDesc);
        data.append('price', TextInputPrice);
        data.append('currency', 'IN');
        data.append('latitude', PlacesSearch == undefined ? ''+address.latitude : ''+PlacesSearch.location.latitude);
        data.append('longitude', PlacesSearch == undefined ? ''+address.longitude :  ''+PlacesSearch.location.longitude);
        data.append('location', PlacesSearch == undefined ? ''+address.location :  ''+PlacesSearch.address);
        data.append('city', Platform.OS == 'ios' ? CitiesPickerValue == undefined ? city : CitiesPickerValue.label
        : CitiesPickerValue );
        //data.append('images', instance.state.allImages[0]);
      //   var images = []
        instance.state.allImages.forEach( (s, i) => {
        if(s.uri == '' || s.uri == null || s.uri == undefined){
          if(__DEV__){ console.log('Empty Image of Index' + i) }
        }else{  
          //var image = s.uri;
         data.append('images[]', s);
        
        // var image = {
        //   uri: s.uri,
        //   name: s.name,
        //   type: s.type,
        //   }
          //images.push(image)
      }
        })
      //   data.append('images[]', images);
      
    fetch( BaseURL1 + EditSellProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      },
      body: data,
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){

      instance.setState({
       loading: false,
       //refreshing: false,
       //FeaturedList: responseJson.ads_detail
      })
      if(Platform.OS == 'android'){
        ToastAndroid.show( responseJson.error_description, ToastAndroid.SHORT);
      }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
      
      instance.props.navigation.goBack();
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch(function(error) {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
        
      }.bind(instance)); //to catch the errors if any
    })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
  }

},

//Expire Products List Api
ExpireProductsListApi: function(instance){
  NetInfo.fetch().then(res => {
      //console.log('Response of Internet', res )
      if(res.isConnected){
      AsyncStorage.getItem('session_id').then((session_ID) => { 

    fetch( BaseURL + getExpireProducts, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      session_id: session_ID,
      limit: '',
      page: ''
      })
      })
    .then(response => response.json())
    .then((responseJson)=> {
      if(responseJson.status == 200){
      instance.setState({
       loading: false,
       refreshing: false,
       data: responseJson['product list']
      })
      
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch((error) => {
        instance.setState({
          loading: false,
          refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }) //to catch the errors if any
  })
  }else{
    instance.setState({
      loading: false,
      refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
},

ReactivateProductApi: function(instance, advt_id){
  NetInfo.fetch().then(res => {

      if(res.isConnected){
      AsyncStorage.getItem('session_id').then((session_ID) => { 

    fetch( BaseURL1 + reactivateProduct, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      session_id: session_ID,
      advertisement_id: ''+advt_id
      })
      })
    .then(response => response.json())
    .then((responseJson)=> {
        
      if(responseJson.status == 200){
      instance.setState({
          data: instance.state.data.filter(item => item.advertisement_id != advt_id)
        })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.success, ToastAndroid.SHORT);
        }else{
        Alert.alert('', responseJson.success,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch((error) => {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }) //to catch the errors if any
  })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
},

RemoveSingleImageApi: function(instance, ID){
  NetInfo.fetch().then(res => {
  
      if(res.isConnected){
      //AsyncStorage.getItem('session_id').then((session_ID) => { 
        instance.setState({
          loading: true,
          //refreshing: false,
        })
    fetch( BaseURL1 + removeSinglePic, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      image_id: ID
      })
      })
    .then(response => response.json())
    .then((responseJson)=> {
       
      if(responseJson.status == 200){
        instance.setState({
          loading: false,
          //refreshing: false,
        })
      // instance.setState({
      //     data: instance.state.data.filter(item => item.advertisement_id != advt_id)
      //   })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT);
        }else{
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }

        var foundIndex = instance.state.allImages.findIndex(item =>  item.id == ID && item.showDelete === true )
         
          if(foundIndex == null || foundIndex == undefined || foundIndex == -1 ){
            if(Platform.OS == 'android'){
              ToastAndroid.show('Array Index is Out of bound', ToastAndroid.SHORT);
            }else{
            Alert.alert('', 'Array Index is Out of bound',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
          }else{
          instance.state.allImages[foundIndex].imageUrl = R.strings.PostScreen.ImagePlaceHolderUrl;
          instance.state.allImages[foundIndex].showDelete = false;
          instance.state.allImages[foundIndex].name = '',
          instance.state.allImages[foundIndex].uri = '',
          instance.state.allImages[foundIndex].type = ''

            instance.setState({ 
              allImages: instance.state.allImages,
             })
            }
      
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch((error) => {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }) //to catch the errors if any
  //})
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
},

EnablePushApi: function(instance, status){
  NetInfo.fetch().then(res => {
     
      if(res.isConnected){
        instance.setState({ loading: true });

      AsyncStorage.getItem('session_id').then((session_ID) => { 
     console.log("enter1")
    fetch( BaseURL + enablePush, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      session_id: session_ID,
      status: status ? '1': '0'
      })
      })
    .then(response => response.json())
    .then((responseJson)=> {
      console.log("enter2")
       console.log(responseJson)
      if(responseJson.status_code == 200){
      instance.setState({ switchValue: status, loading: false });

      AsyncStorage.setItem('push', status ? '1' : '0');

        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }else{
        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch((error) => {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }) //to catch the errors if any
  })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
},

NotificationListApi: function(instance){
  NetInfo.fetch().then(res => {
      //console.log('Response of Internet', res )
      if(res.isConnected){
      AsyncStorage.getItem('session_id').then((session_ID) => { 

    axios.post(BaseURL + NotificationList,{
      session_id: session_ID
      }).then((responseJson)=> {
      if(responseJson.data.status_code == 200){
        console.log(">>>>>>>>>>>>>>>>>>>notification list")
        console.log(responseJson)
      instance.setState({
       loading: false,
       refreshing: false,
       data: responseJson.data.profile
      })
      
    }
    })
    .catch((error) => {
        instance.setState({
          loading: false,
          refreshing: false,
         })
         if(error.response.data.status_code == 401){
          if(Platform.OS == 'android'){
            ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
          }else{
            setTimeout( () => {
            Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            },200)
          }
          AsyncStorage.clear();
          NavigationWithParams.navigate('Auth', '');
      }else if(error.response.data.status_code == 403 ) {
          if(__DEV__){ console.log(error.response.data); }
          // Request made and server responded
          if(Platform.OS == 'android'){
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
          }else{
            setTimeout( () => {
            Alert.alert(error.response.data.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            },200)
          }
          AsyncStorage.clear();
          NavigationWithParams.navigate('Auth', '');
        }else {
         if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
        }else{
          setTimeout( () => {
          Alert.alert(error.message, '',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        },200)
        }
        
    }
         //console.log(error)
      }) //to catch the errors if any
  })
  }else{
    instance.setState({
      loading: false,
      refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
},

DeletePostApi: function(instance, advt_id){
  NetInfo.fetch().then(res => {
     
      if(res.isConnected){ 
      AsyncStorage.getItem('session_id').then((session_ID) => { 

    fetch( BaseURL1 + DeletePost, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      session_id: session_ID,
      advertisement_id: ''+advt_id
      })
      })
    .then(response => response.json())
    .then((responseJson)=> {
        
      if(responseJson.status == 200){
      instance.setState({
          data: instance.state.data.filter(item => item.advertisement_id != advt_id)
        })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.message, ToastAndroid.SHORT);
        }else{
        Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
      
    }else if(responseJson.status == 400){
        instance.setState({
            loading: false,
            //refreshing: false,
          })
        if(Platform.OS == 'android'){
          ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
        }else{
          Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    }else if(responseJson.status == 403){
      instance.setState({
        loading: false,
        //refreshing: false,
      })
      if(Platform.OS == 'ios'){
        Alert.alert('', responseJson.error_description,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }else if(Platform.OS == 'android'){
      ToastAndroid.show(responseJson.error_description, ToastAndroid.SHORT)
    }
      AsyncStorage.clear();

      instance.props.navigation.navigate('Auth');
    }
    })
    .catch((error) => {
        instance.setState({
          loading: false,
          //refreshing: false,
         })
         if(Platform.OS == 'ios'){
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }else if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
         //console.log(error)
      }) //to catch the errors if any
  })
  }else{
    instance.setState({
      loading: false,
      //refreshing: false,
     })

    if(Platform.OS == 'ios'){
       Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true}) 
    }else if(Platform.OS == 'android'){
        ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
    }

}
});
},

DeactivateUserApi: function(instance){

  NetInfo.fetch().then(res => {
    //console.log('Response of Internet', res )
    if(res.isConnected){
instance.setState({
        loading: true
      });
  AsyncStorage.getItem('session_id').then((session_ID) => { 
  
  
    fetch( BaseURL1 + DeactivateAccount, {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    session_id: session_ID,
    status: '0'
    }),
    }).then((response) => response.json())
    .then((responseJson) => {
      
        instance.setState({
      loading: false,
           })
                 
           if(responseJson.status == 200 ){
            // this.setState({
            //   loading: false,
            //   dialogVisible: false
            //   }) 
            // if(Platform.OS == 'android'){
            //         ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
            //     }else{
            //         alert(responseJson.message)
            //     }
               
    AsyncStorage.clear();

    instance.props.navigation.navigate('Auth')

           }else if(responseJson.status == 400){
            if(Platform.OS == 'android'){
              ToastAndroid.show(responseJson.error_message, ToastAndroid.SHORT)
          }else{
              Alert.alert('', responseJson.error_message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
          }
          
          AsyncStorage.clear();

          instance.props.navigation.navigate('Auth')
             
           }
           else if(responseJson.status == 403 ){
            // this.setState({
            //   loading: false,
            //   dialogVisible: false
            //   }) 
             if(Platform.OS == 'android'){
                    ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                }else{
                    Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                }
                
                AsyncStorage.clear();

                instance.props.navigation.navigate('Auth')
            
           }else{
            // this.setState({
            //   loading: false,
            //   }) 
            if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
            }else{
                Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
           }
          
      })
      .catch(function(error) {

        instance.setState({
          loading: false,
       });

       if(Platform.OS == 'android'){
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      
    }else{
        Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
    }
   
        
        
        //throw error;
        
        }.bind(instance));
      })
      
    }else{

      if(Platform.OS == 'android'){
          ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
      }else{
          Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
  
  }
  });

  
  },
  getContactDetail: function(instance){

    NetInfo.fetch().then(res => {
      //console.log('Response of Internet', res )
      if(res.isConnected){
  instance.setState({
          loading: true
        });
    AsyncStorage.getItem('session_id').then((session_ID) => { 
    console.log(session_ID)
    
      fetch( BaseURL + 'getAppDetail', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      session_id: session_ID,
      }),
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(">>>>>>>>>>>>>>>>>>>",responseJson)  
          instance.setState({
        loading: false,
             })
                
             if(responseJson.status_code == 200 ){
              instance.setState({
                //loading: false,
                contactDetail: responseJson.profile
                }) 
              // if(Platform.OS == 'android'){
              //         ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
              //     }else{
              //         alert(responseJson.message)
              //     }
                 
     
  
      
  
             }else if(responseJson.status == 400){
              if(Platform.OS == 'android'){
                ToastAndroid.show(responseJson.error_message, ToastAndroid.SHORT)
            }else{
                Alert.alert('', responseJson.error_message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
            }
            
            
  
         
               
             }
             else if(responseJson.status == 403 ){
              // this.setState({
              //   loading: false,
              //   dialogVisible: false
              //   }) 
               if(Platform.OS == 'android'){
                      ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                  }else{
                      Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
                  }
                  
                  AsyncStorage.clear();
  
                  instance.props.navigation.navigate('Auth')
              
             }else{
              // this.setState({
              //   loading: false,
              //   }) 
              if(Platform.OS == 'android'){
                  ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
              }else{
                  Alert.alert('', responseJson.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
              }
             }
            
        })
        .catch(function(error) {
  
          instance.setState({
            loading: false,
         });
  
         if(Platform.OS == 'android'){
          ToastAndroid.show(error.message, ToastAndroid.SHORT)
        
      }else{
          Alert.alert('', error.message,[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
      }
     
          
          
          //throw error;
          
          }.bind(instance));
        })
        
      }else{
  
        if(Platform.OS == 'android'){
            ToastAndroid.show("Internet Not Connected", ToastAndroid.SHORT)
        }else{
            Alert.alert('', 'Internet Not Connected',[{ text: 'OK', onPress: () =>  console.log('Cancelled'),style:'cancel', }],{cancelable: true})
        }
    
    }
    });
  
    
    }

  

    // var response =  {"session_id" : sessionId, "user_to_id": User2ID, "text": text.trim() }
              
    //           const chats = this.state.dataSource.slice();
    //           const chatLength = this.state.dataSource.length
    
    //           chats.push({ id: chatLength + 1, created_at: new Date(), message: text.trim(), user_from_id: useRId, user_to_id: User2ID })
    //           instance.setState({ dataSource: chats, text: '',  });
    //           console.log('Emitted Data', response );

    //         this.socket.emit('send_message', response )


    }
 

export default ApiCalls;

export const redeemCheck = (data) => {
  return axios.post(BaseURL + redeem_product, {
    session_id: token,
    bewery_id: data.breweryId,
    product_id: data.prod_id,
 
  },configJson).then((res) => {
      if (res.data.status_code) {
       
        return res
      } else {
        return res
      }
    }).catch((err) => {
     
      return err.response
    })


}
