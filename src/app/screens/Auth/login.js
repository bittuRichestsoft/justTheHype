
import React,{ Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView, Platform,
  View, TouchableOpacity,
  Text, Image, TextInput,
  StatusBar, ImageBackground, Dimensions, KeyboardAvoidingView,ToastAndroid
} from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import R from '../../res/R';
import Svg, {
  Line,
} from 'react-native-svg';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';

  let defaults = {
    firstname: 'Eddard',
    lastname: 'Stark',
    about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
  };

export default class login extends Component{


    constructor(props){
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);

        this.emailRef = this.updateRef.bind(this, 'email');
        this.passwordRef = this.updateRef.bind(this, 'password');
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            loading: false,
            secureTextEntry: true,
            ...defaults,
            userInfo:''
          };

    }

    componentDidMount(){
  
    }

    fieldRef = React.createRef();

  onSubmit = () => {
    let { current: field } = this.fieldRef;

   // console.log(field.value());
  };

  formatText = (text) => {
    return text.replace(/[^+\d]/g, '');
  };

  updateRef(name, ref) {
    this[name] = ref;
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  }

  onChangeText(text) {
    ['email', 'password']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  loginWithFacebook = (instance) => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only")
  }
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
         // console.log("==> Login cancelled", result);
        } else {
          // console.log(
          //   "==> Login success with permissions: " +
          //     result.grantedPermissions.toString()
          // );
          AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            initUser(accessToken, instance)
            //console.log(accessToken)
          })
        }
        
       },
       function(error) {
        //console.log("==> Login fail with error: " + error);
       }
     );

     function initUser(token, instance) {
      fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        // Some user object has been set up somewhere, build that user here
        // if(__DEV__){
        //   console.log('All Types', json)
        // console.log('All Fileds type', json.name+'\n'+json.id+'\n'+json.friends+'\n'+json.email )
        // }
        var intIntostring = json.id
        const userInfo = json;
      //   if(__DEV__){
      //     console.log('UserInfo   ', userInfo);
      // }
      console.log(userInfo)
      instance.setState({ userInfo: userInfo });
      
         ApiCalls.socialLoginValidations(instance, 'f')
      })
      .catch((error) => {
        console.log(error)
        if(Platform.OS == 'android'){
          ToastAndroid.show(error.message,ToastAndroid.SHORT)
        }else{
          this.refs.toast.show(error.message);
        }
        //reject('ERROR GETTING DATA FROM FACEBOOK')
      })
    }

  }


  onSubmitEmail() {
    this.password.focus();
  }

  onSubmit() {
    let errors = {};

    ['email', 'password']
      .forEach((name) => {
        let value = this[name].value();

        if (!value) {
          errors[name] = 'Should not be empty';
        } else {
          if ('password' === name && value.length < 6) {
            errors[name] = 'Too short';
          }
        }
      });

    this.setState({ errors });
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  onSubmitPassword() {
    this.password.blur();
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry?
      'visibility':
      'visibility-off';

    return (
      <MaterialIcon
        size={24}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }


    render(){
        
        let { errors = {}, secureTextEntry, ...data } = this.state;
      let { firstname, lastname } = data;

      let defaultEmail = '';
        
      return (
  <>
        <SafeAreaView style = {{ flex: 1 }} >

        <KeyboardAvoidingView style = {{ flex: 1 }} 
        behavior= {(Platform.OS === 'ios')? "padding" : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        enabled >
        <View style={{ flex: 1 }} >
        <ScrollView contentContainerStyle = {{ flexGrow: 1}}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
      <View >
  <View style={{ backgroundColor: R.colors.PrimaryColor, borderBottomRightRadius: 50, padding: 10 }} >
  <Image
          style = { styles.imageStyle }
          source = { require('../../assets/images/logo.png') }
          />
  <Text style={{ fontSize: 12, textAlign: 'center', color: 'white', fontWeight: '700', marginTop: 5 }}
   >Just The TAP</Text>

  </View>
  <View style={{ backgroundColor: R.colors.PrimaryColor }} >
  <View style={{ backgroundColor: R.colors.white, borderTopLeftRadius: 50, padding: 35, }} >

        <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 20, marginBottom: 30 }} >Login to continue</Text>

        <TextField
                ref={this.emailRef}
                defaultValue={defaultEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType='next'
                label='Email'
                error={errors.email}
              />       

          <TextField
                ref={this.passwordRef}
                secureTextEntry={secureTextEntry}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={false}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPassword}
                returnKeyType='done'
                label='Password'
                error={errors.password}
                //title='Choose wisely'
                maxLength={30}
                //characterRestriction={20}
                renderRightAccessory={this.renderPasswordAccessory}
              />
 
          { /*Forget Password */}
<View style = { [styles.rowViewStyle, { marginBottom: 0 }] } >

        <View 
        style = {{ flex: 1, flexDirection: 'row' }}
        />

        <TouchableOpacity onPress = {() => { this.props.navigation.navigate('forgotpaswrd') } }
        style = {{ paddingLeft: 10, paddingTop: 10, paddingBottom: 10, justifyContent: 'center'  }}
        activeOpacity={0.8}
        >
        <Text style = {{ fontSize: 12, color: 'black', fontWeight: '500' }} >Forgot Password?</Text>
        </TouchableOpacity>
        </View>

           {/* Login Button */}
          <TouchableOpacity style = {[styles.buttonContainer,{ marginBottom: 30 }]} 
          activeOpacity={0.9} 
          onPress={() => {
            ApiCalls.LoginValidations(this)
            //this.props.navigation.navigate('register')
          }}
          >
          <Text style = {styles.buttonText} >{R.strings.LoginScreen.Texts.login}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }} >
          <Svg height="1" width="75">
          <Line x1="100%" y1="2" x2="0" y2="2" stroke={R.colors.colorGray} strokeWidth="5" /> 
                                                     
          </Svg>
          <Text style={{ fontSize: 12, color: 'black', fontWeight: Platform.OS == 'android' ? 'normal' : '700' }} >  OR  </Text> 
          <Svg height="1" width="75" >
          <Line x1="100%" y1="2" x2="0" y2="2" stroke={R.colors.colorGray} strokeWidth="5" />
          </Svg>
          </View>
          {/* <View style={{ flexDirection: 'row', marginBottom: 30 }} > */}
          {/* <TouchableOpacity style = {[styles.SocialbtnContainer,{ flexDirection: 'row', flex: 0.5, marginRight: 10 }]} 
          activeOpacity={0.9} 
          onPress={() => {}}>
          <Image source={require('../../assets/images/google.png')} 
          style={styles.SocialIconStyle} />
  
          <Text style = {[styles.buttonText,{ flex: 1, fontSize: 13, color: 'black', fontWeight: 'normal' }]} >Google</Text>
          </TouchableOpacity>
           */}
          {/* <TouchableOpacity style = {[styles.SocialbtnContainer,{ flexDirection: 'row', flex: 1 }]} 
          activeOpacity={0.9} 
          onPress={() => {this.loginWithFacebook(this)}}>
          <Image source={require('../../assets/images/fb_.png')} 
          style={styles.SocialIconStyle} />
          <Text style = {[styles.buttonText,{ flex: 1 , fontSize: 13, color: 'black', fontWeight: 'normal' }]} >Facebook</Text>
          </TouchableOpacity> */}

          {/* </View> */}

          <TouchableOpacity style = {[styles.SignInBtnContainer]} 
          activeOpacity={0.9} 
          onPress={() => {
           this.props.navigation.navigate('register');
          }}
          >
          <Text style = {[styles.buttonText,{ padding: 10,
           fontSize: 12, color: 'black', fontWeight: 'normal' }]}
            >Create New Account</Text>
          </TouchableOpacity>

          </View>
          </View>  
          </View>
          </ScrollView>      
        </View>
        </KeyboardAvoidingView>

          <Loader loading={this.state.loading} />
          </SafeAreaView>
      </>
    )
  }
  }

  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: R.colors.white,
    },
  imageStyle: {
      height: 120,
      width: 120,
      alignSelf: 'center'
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
  rowViewStyle: { 
  flex: 1,
  flexDirection: 'row',
  marginBottom: 10 ,
  marginLeft: 0,
  marginRight: 5
  },
  SocialbtnContainer: {
      height: 45,
      borderRadius: 45/2,
      backgroundColor: R.colors.GlowColor,
      alignItems: 'center',
      justifyContent: 'flex-start'
  },
  SocialIconStyle: {
  marginLeft: 3,
  height: 36,
  width: 36,
  resizeMode : 'stretch',
  alignItems: 'center'
  },
  SignInBtnContainer: {
      height: 40,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: R.colors.GlowColor,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignSelf: 'center',
  }
  });