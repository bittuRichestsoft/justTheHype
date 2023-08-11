
import React, { Component } from 'react';
import {
  SafeAreaView, Picker, Button,
  StyleSheet, ActionSheetIOS,
  ScrollView, Platform,
  View, TouchableOpacity,
  Text, Image, TextInput, ToastAndroid,
  StatusBar, ImageBackground, Dimensions, KeyboardAvoidingView
} from 'react-native';
import R from '../../res/R';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, {
  Line,
} from 'react-native-svg';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '../../components/CheckBox/CheckBox'
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';
import RNPickerSelect from 'react-native-picker-select';

const Cities_List = [
  { "id": 1, "name": "Adama" },
  { "id": 2, "name": "Addis Ababa" },
  { "id": 3, "name": "Adigrat" },
  { "id": 4, "name": "Adwa" },
  { "id": 5, "name": "Agaro" },
  { "id": 6, "name": "Aksum" },
  { "id": 7, "name": "Alaba Kulito" },
  { "id": 8, "name": "Alamata" },
  { "id": 9, "name": "Alemaya" },
  { "id": 10, "name": "Aleta Wendo" },
  { "id": 11, "name": "Ambo" },
  { "id": 12, "name": "Arba Minch" },
  { "id": 13, "name": "Areka" },
  { "id": 14, "name": "Arsi Negele" },
  { "id": 15, "name": "Asella" },
  { "id": 16, "name": "Asosa" },
  { "id": 17, "name": "Bahir Dar" },
  { "id": 18, "name": "Bale Robe" },
  { "id": 19, "name": "Bishoftu" },
  { "id": 20, "name": "Boditi" },
  { "id": 21, "name": "Bonga" },
  { "id": 22, "name": "Bule Hora Town" },
  { "id": 23, "name": "Burayu" },
  { "id": 24, "name": "Butajira" },
  { "id": 25, "name": "Chiro" },
  { "id": 26, "name": "Dangila" },
  { "id": 27, "name": "Debre Birhan" },
  { "id": 28, "name": "Debre Birhan" },
  { "id": 29, "name": "Debre Tabor" },
  { "id": 30, "name": "Degehabur" },
  { "id": 31, "name": "Dembi Dolo" },
  { "id": 32, "name": "Dessie" },
  { "id": 33, "name": "Dilla" },
  { "id": 34, "name": "Dire Dawa" },
  { "id": 35, "name": "Durame" },
  { "id": 36, "name": "Fiche" },
  { "id": 37, "name": "Finote Selam" },
  { "id": 38, "name": "Gambela" },
  { "id": 39, "name": "Gimbi" },
  { "id": 40, "name": "Goba" },
  { "id": 41, "name": "Gode" },
  { "id": 42, "name": "Gondar" },
  { "id": 43, "name": "Harar" },
  { "id": 44, "name": "Hawassa" },
  { "id": 45, "name": "Hosaena" },
  { "id": 46, "name": "Jijiga" },
  { "id": 47, "name": "Jimma" },
  { "id": 48, "name": "Jinka" },
  { "id": 49, "name": "Kobo" },
  { "id": 50, "name": "Kombolcha" },
  { "id": 51, "name": "Mekelle" },
  { "id": 52, "name": "Meki" },
  { "id": 53, "name": "Metu" },
  { "id": 54, "name": "Mizan Teferi" },
  { "id": 55, "name": "Modjo" },
  { "id": 56, "name": "Mota" },
  { "id": 57, "name": "Negele Borana" },
  { "id": 58, "name": "Nekemte" },
  { "id": 59, "name": "Sawla" },
  { "id": 60, "name": "Sebeta" },
  { "id": 61, "name": "Shashamane" },
  { "id": 62, "name": "Shire (Inda Selassie)" },
  { "id": 63, "name": "Sodo" },
  { "id": 64, "name": "Tepi" },
  { "id": 65, "name": "Welkite" },
  { "id": 66, "name": "Woldiya" },
  { "id": 67, "name": "Woliso" },
  { "id": 68, "name": "Wukro" },
  { "id": 69, "name": "Yirgalem" },
  { "id": 70, "name": "Ziway" },
];

var stateOfAmerica = [
  {
    "label": "Alabama",
    "value": "AL"
  },
  {
    "label": "Alaska",
    "value": "AK"
  },
  {
    "label": "American Samoa",
    "value": "AS"
  },
  {
    "label": "Arizona",
    "value": "AZ"
  },
  {
    "label": "Arkansas",
    "value": "AR"
  },
  {
    "label": "California",
    "value": "CA"
  },
  {
    "label": "Colorado",
    "value": "CO"
  },
  {
    "label": "Connecticut",
    "value": "CT"
  },
  {
    "label": "Delaware",
    "value": "DE"
  },
  {
    "label": "District Of Columbia",
    "value": "DC"
  },
  {
    "label": "Federated States Of Micronesia",
    "value": "FM"
  },
  {
    "label": "Florida",
    "value": "FL"
  },
  {
    "label": "Georgia",
    "value": "GA"
  },
  {
    "label": "Guam",
    "value": "GU"
  },
  {
    "label": "Hawaii",
    "value": "HI"
  },
  {
    "label": "Idaho",
    "value": "ID"
  },
  {
    "label": "Illinois",
    "value": "IL"
  },
  {
    "label": "Indiana",
    "value": "IN"
  },
  {
    "label": "Iowa",
    "value": "IA"
  },
  {
    "label": "Kansas",
    "value": "KS"
  },
  {
    "label": "Kentucky",
    "value": "KY"
  },
  {
    "label": "Louisiana",
    "value": "LA"
  },
  {
    "label": "Maine",
    "value": "ME"
  },
  {
    "label": "Marshall Islands",
    "value": "MH"
  },
  {
    "label": "Maryland",
    "value": "MD"
  },
  {
    "label": "Massachusetts",
    "value": "MA"
  },
  {
    "label": "Michigan",
    "value": "MI"
  },
  {
    "label": "Minnesota",
    "value": "MN"
  },
  {
    "label": "Mississippi",
    "value": "MS"
  },
  {
    "label": "Missouri",
    "value": "MO"
  },
  {
    "label": "Montana",
    "value": "MT"
  },
  {
    "label": "Nebraska",
    "value": "NE"
  },
  {
    "label": "Nevada",
    "value": "NV"
  },
  {
    "label": "New Hampshire",
    "value": "NH"
  },
  {
    "label": "New Jersey",
    "value": "NJ"
  },
  {
    "label": "New Mexico",
    "value": "NM"
  },
  {
    "label": "New York",
    "value": "NY"
  },
  {
    "label": "North Carolina",
    "value": "NC"
  },
  {
    "label": "North Dakota",
    "value": "ND"
  },
  {
    "label": "Northern Mariana Islands",
    "value": "MP"
  },
  {
    "label": "Ohio",
    "value": "OH"
  },
  {
    "label": "Oklahoma",
    "value": "OK"
  },
  {
    "label": "Oregon",
    "value": "OR"
  },
  {
    "label": "Palau",
    "value": "PW"
  },
  {
    "label": "Pennsylvania",
    "value": "PA"
  },
  {
    "label": "Puerto Rico",
    "value": "PR"
  },
  {
    "label": "Rhode Island",
    "value": "RI"
  },
  {
    "label": "South Carolina",
    "value": "SC"
  },
  {
    "label": "South Dakota",
    "value": "SD"
  },
  {
    "label": "Tennessee",
    "value": "TN"
  },
  {
    "label": "Texas",
    "value": "TX"
  },
  {
    "label": "Utah",
    "value": "UT"
  },
  {
    "label": "Vermont",
    "value": "VT"
  },
  {
    "label": "Virgin Islands",
    "value": "VI"
  },
  {
    "label": "Virginia",
    "value": "VA"
  },
  {
    "label": "Washington",
    "value": "WA"
  },
  {
    "label": "West Virginia",
    "value": "WV"
  },
  {
    "label": "Wisconsin",
    "value": "WI"
  },
  {
    "label": "Wyoming",
    "value": "WY"
  }
]

let ageArr = [] 
for(var i = 21 ; i<=100;i++){
 var age =  {
    "label": (i).toString(),
    "value": (i).toString()
  }
  ageArr.push(age)
}

let defaults = {
  fullname: '',
  // stateName: '',
  zipcode: ''
};
let NewArray = ['Cancel', 'Male', 'Female','Prefer Not to Say'];

export default class register extends Component {


  constructor(props) {
    super(props);

    // Cities_List.map( (s, i) => {
    //   NewArray.push(s.name);
    // });

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFullName = this.onSubmitFullName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitZipCode = this.onSubmitZipCode.bind(this);
    this.onSubmitState = this.onSubmitState.bind(this);

    this.fullnameRef = this.updateRef.bind(this, 'fullname');
    //  this.stateRef = this.updateRef.bind(this, 'stateName');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.zipcodeRef = this.updateRef.bind(this, 'zipcode');
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      loading: false,
      category: 'Select Gender *',
      termsAccepted: false,
      CitiesPickerValue: undefined,
      genderPickerValue: undefined,
      age:"",
      secureTextEntry: true,
      ...defaults,
    };

  }

  componentDidMount() {
  
  }

  fieldRef = React.createRef();

  onSubmit = () => {
    let { current: field } = this.fieldRef;

    // console.log( 'NEw Value', field.value());
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
    ['fullname',
      // 'stateName', 
      'zipcode',
      'email',
      'password']
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmit() {
    let errors = {};

    ['fullname',
      //'stateName',
      'zipcode',
      'email',
      'password']
      .forEach((name) => {
        let value = this[name].value();
        // if(__DEV__){ console.log('123456789', value) }
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

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onSubmitZipCode() {
    this.email.focus();
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;

    let name = secureTextEntry ?
      'visibility' :
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

  onSubmitFullName() {
    this.stateName.focus();
  }

  onSubmitState() {
    this.zipcode.focus();
  }

  handleCheckBox = () => this.setState({ termsAccepted: !this.state.termsAccepted })

  onPressGCategory = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: NewArray,
        title: "Select Gender *",
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          this.setState({ category: NewArray[buttonIndex], genderPickerValue: 'male' })
        } else if (buttonIndex === 2) {
          this.setState({ category: NewArray[buttonIndex], genderPickerValue: 'female' })
        }
        else if(buttonIndex === 3){
          this.setState({ category: NewArray[buttonIndex], genderPickerValue: 'PreferNottoSay' })
        } 
        else {
          this.setState({ category: NewArray[buttonIndex] })
        }
      }
    );


  render() {

    let { errors = {}, secureTextEntry, ...data } = this.state;
    let { fullname, zipcode } = data;

    let defaultEmail = '';

    let serviceItems = Cities_List.map((s, i) => {
      return <Picker.Item key={i} value={s.name} label={s.name} />
    });

    return (
      <>
        <SafeAreaView style={{ flex: 1 }} >
          <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={(Platform.OS === 'ios') ? "padding" : null}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            enabled >
            <View style={{ flex: 1 }} >
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <View >
                  <View style={[styles.HeaderStyle]}>

                    <TouchableOpacity
                      onPress={() => { this.props.navigation.goBack() }}>
                      <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                        <Image
                          style={{ width: 24, height: 24 }}
                          source={require('../../assets/images/back_arrow.png')}
                        />
                      </View>
                    </TouchableOpacity>

                  </View>
                  <View style={{ backgroundColor: R.colors.PrimaryColor, borderBottomRightRadius: 50, padding: 10 }} >
                    <Image
                      style={styles.imageStyle}
                      source={require('../../assets/images/logo.png')}
                    />
                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white', fontWeight: '700', marginTop: 5 }}
                    >Just The TAP</Text>

                  </View>
                  <View style={{ backgroundColor: R.colors.PrimaryColor }} >
                    <View style={{ backgroundColor: R.colors.white, borderTopLeftRadius: 50, padding: 35 }} >

                      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 20, marginBottom: 5 }} >Signup</Text>
                      <Text style={{ fontSize: 12, fontWeight: 'normal', marginBottom: 30, color: R.colors.colorGray }} >Sign up to create an account</Text>


                      <TextField
                        ref={this.fullnameRef}
                        value={defaults.fullname}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitFullName}
                        returnKeyType='next'
                        label='Full Name'
                        error={errors.fullname}
                      />

                      {/* <View style={ styles.input} >
       {Platform.OS == 'ios' ?
       <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.onPressCity}>
       <Text style={[styles.buttonText,{ color: 'black', textAlign: 'left',
      fontSize: 15, fontWeight: 'normal' }]}>{this.state.category}</Text>
       </TouchableOpacity>
       :
        <Picker
        style={{width:'100%', height: 40, color: R.colors.hintColor, alignSelf: 'center' }}
        mode = 'dropdown'
        selectedValue={this.state.CitiesPickerValue}
        onValueChange={(itemValue,itemIndex) => this.setState({CitiesPickerValue:itemValue})}
        >
        <Picker.Item label="City *"  value={undefined}/>
        {serviceItems}
        </Picker>
      }
        </View> */}


                      {/* <TextField
                ref={this.stateRef}
                value={defaults.stateName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitState}
                returnKeyType='next'
                label='State'
                error={errors.state}
              />    */}

                      <View
                        style={{ borderBottomColor: R.colors.lineColor, borderBottomWidth: 1, marginTop: 10 }}
                      >


                        <View style={{ width: '100%' }}>
                          <RNPickerSelect
                            placeholder={
                              { label: 'Select Age', value: null, color: R.colors.hintColor, }
                            }
                            onValueChange={(value, index) => this.setState({ age: value })}
                            items={ageArr

                            }
                            value={this.state.age}
                            //itemKey={1}

                            Icon={() => {
                              return <Icon name='ios-arrow-down'
                                type='ionicon'
                                color='#000000'
                                size={24} />;
                            }}
                           // useNativeAndroidPickerStyle={false}

                            style={{
                              inputAndroid: {
                                // backgroundColor: 'transparent',
                                paddingLeft: 10,
                                height: 40,
                                fontSize: 12,
                                paddingHorizontal: 20,
                                paddingVertical: 8,
                                color: 'black',

                              }, iconContainer: {
                                top: 5,
                                right: 15,
                              },

                              inputIOSContainer: {
                                // paddingLeft: 10,
                                height: 40,
                                fontSize: 16,
                                // paddingHorizontal: 10,
                                //paddingVertical: 10,
                                color: 'black',
                              },
                              inputIOS: {
                                color: 'black',
                                paddingTop: 20,
                                paddingHorizontal: 10,
                                //paddingBottom: 12,
                              },


                            }}


                          />
                        </View>
                      </View>






                      <View
                        style={{ borderBottomColor: R.colors.lineColor, borderBottomWidth: 1, marginTop: 15 }}
                      >
                        {/* 
                 <Picker
        //style={{width:'100%', height: 40, color: R.colors.hintColor, alignSelf: 'center' }}
        mode = 'dropdown'
        selectedValue={this.state.stateName}
        onValueChange={(itemValue,itemIndex) => this.setState({stateName: itemValue})}
        >
        <Picker.Item label="Select State"  value={undefined}/>
        {stateOfAmerica.map((item, index) => {
        return (<Picker.Item label={item.name} value={item.name} key={item.name}/>) 
    })}
       
  
        </Picker> */}

                        <View style={{ width: '100%' }}>
                          <RNPickerSelect
                            placeholder={
                              { label: 'Select State', value: null, color: R.colors.hintColor, }
                            }
                            onValueChange={(value, index) => this.setState({ stateName: value })}
                            items={stateOfAmerica

                            }
                            value={this.state.stateName}
                            //itemKey={1}

                            Icon={() => {
                              return <Icon name='ios-arrow-down'
                                type='ionicon'
                                color='#000000'
                                size={24} />;
                            }}
                            useNativeAndroidPickerStyle={false}

                            style={{
                              inputAndroid: {
                                // backgroundColor: 'transparent',
                                paddingLeft: 10,
                                height: 40,
                                fontSize: 12,
                                paddingHorizontal: 20,
                                paddingVertical: 8,
                                color: 'black',

                              }, iconContainer: {
                                top: 5,
                                right: 15,
                              },

                              inputIOSContainer: {
                                // paddingLeft: 10,
                                height: 40,
                                fontSize: 16,
                                // paddingHorizontal: 10,
                               // paddingVertical: 10,
                                color: 'black',
                              }
                              ,
                              inputIOS: {
                                color: 'black',
                                paddingTop: 20,
                                paddingHorizontal: 10,
                               // paddingBottom: 12,
                              },
                              


                            }}


                          />
                        </View>
                      </View>





                      <View style={{ flex: 0.5, }} >
                        <TextField
                          ref={this.zipcodeRef}
                          defaultValue={defaults.zipcode}
                          keyboardType='numeric'
                          enablesReturnKeyAutomatically={true}
                          onFocus={this.onFocus}
                          onChangeText={this.onChangeText}
                          onSubmitEditing={this.onSubmitZipCode}
                          returnKeyType={Platform.OS == 'ios' ? 'done' : 'next'}
                          label='Zip Code'
                          error={errors.zipcode}
                          maxLength={8}
                        />
                      </View>

                      <View style={styles.input} >
                        {Platform.OS == 'ios' ?
                          <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.onPressGCategory}>
                            <Text style={[styles.buttonText, {
                              color: 'black', textAlign: 'left',
                              fontSize: 15, fontWeight: 'normal'
                            }]}>{this.state.category}</Text>
                          </TouchableOpacity> :
                          <Picker
                            style={{ width: '100%', height: 40, color: R.colors.hintColor, alignSelf: 'center' }}
                            mode='dropdown'
                            selectedValue={this.state.genderPickerValue}
                            onValueChange={(itemValue, itemIndex) => this.setState({ genderPickerValue: itemValue })}
                          >
                            <Picker.Item label="Select Gender *" value={undefined} />
                            <Picker.Item value={'male'} label={'Male'} />
                            <Picker.Item value={'female'} label={'Female'} />
                            <Picker.Item value={'notPreferToSay'} label={'Prefer Not to Say'} />
                          </Picker>}
                      </View>

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

                      <CheckBox
                        selected={this.state.termsAccepted}
                        onPress={this.handleCheckBox}
                        text='I agree to the Terms of Use and Privacy Policy'
                        textStyle={{ fontSize: 13, marginLeft: 15 }}
                        color='#211f30'
                      />

                      {/* SignUp Button */}
                      <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 30 }]}
                        activeOpacity={0.9}
                        onPress={() => {
                          console.log(this)
                          ApiCalls.RegisterValidations(this)
                          //this.props.navigation.navigate('Auth');
                          // this.props.navigation.goBack();
                          // if (Platform.OS == 'android') {
                          // ToastAndroid.show('Successfully Registered', ToastAndroid.SHORT);
                          // }else{
                          //   alert('Successfully Registered');
                          // }
                        }}
                      >
                        <Text style={styles.buttonText} >Create Account</Text>
                      </TouchableOpacity>


                      <TouchableOpacity style={[styles.SignInBtnContainer]}
                        activeOpacity={0.9}
                        onPress={() => {
                          this.props.navigation.goBack();
                        }}
                      >
                        <Text style={[styles.buttonText, {
                          padding: 10,
                          fontSize: 12, color: 'black', fontWeight: 'normal'
                        }]}
                        >Login</Text>
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
        borderColor: '#000'

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
    borderRadius: 50 / 2
  },
  IconStyle: {
    padding: 10,
    marginRight: 15,
    height: 16,
    width: 16,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  rowViewStyle: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 5
  },
  SocialbtnContainer: {
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: R.colors.GlowColor,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  SocialIconStyle: {
    marginRight: 20,
    marginLeft: 3,
    height: 36,
    width: 36,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  SignInBtnContainer: {
    height: 40,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: R.colors.GlowColor,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  HeaderStyle: {
    height: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    marginTop: 40,
    backgroundColor: R.colors.PrimaryColor
  },
  input: {
    flex: 0.5,
    height: 50,
    backgroundColor: 'white',
    borderColor: R.colors.lineColor,
    borderBottomWidth: 1,
    paddingBottom: 0,
    justifyContent: 'center'
  }
});