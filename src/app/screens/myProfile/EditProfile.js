import React, {Component} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image, Switch, ActionSheetIOS,
Dimensions, Platform, ScrollView, KeyboardAvoidingView, Alert, StyleSheet, Picker } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';

import R from '../../res/R';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';

let CenterWidth = Platform.OS == 'android' ?
Dimensions.get('window').width/2-50 : Dimensions.get('screen').width/2-50 ;
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';


let UserName='';
let userDp='';
let userEmail='';
let sessionId = '';
let userId = '';
let userPhone = '';
let userZipcode = '';
let userState = '';
let userGender= '';
let pushStatus = '';

let NewArray = ['Cancel', 'Male', 'Female', 'Prefer Not to Say'];


let defaults = {};
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

class EditProfile extends Component<{}, State> {

  constructor(props){
    super(props);
    
    const { navigation } = this.props;
    UserName = navigation.getParam('UserName', '');
    userDp = navigation.getParam('userDp', '');
    userEmail = navigation.getParam('userEmail', '');
    userGender = navigation.getParam('userGender', '');
    userZipcode = navigation.getParam('userZipcode', '');
    userState = navigation.getParam('userState', '');
    age= navigation.getParam('age', '');

    defaults = { fullname: UserName, email: userEmail, phone: '8564589656', zipcode: userZipcode,
stateName: userState,age:age };
    this.state = {
      loading: false,
      userInfo: null,
      error: null,
      switchValue: false,
      avatarSource: null,
      //age:"",
      imagePath: null,
      fileName: null,
      fileType: null,
      genderPickerValue: userGender == '' || userGender == null || userGender == undefined ? undefined : userGender,
      category: userGender == '' || userGender == null || userGender == undefined ? undefined : userGender,
      ...defaults
    }

    this.onFocus = this.onFocus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmitFullName = this.onSubmitFullName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPhone= this.onSubmitPhone.bind(this);
    this.onSubmitZipCode = this.onSubmitZipCode.bind(this);
    this.onSubmitState = this.onSubmitState.bind(this);

    this.fullnameRef = this.updateRef.bind(this, 'fullname');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.phoneRef = this.updateRef.bind(this, 'phone');
    this.zipcodeRef = this.updateRef.bind(this, 'zipcode');
   // this.stateRef = this.updateRef.bind(this, 'stateName');


}

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
    'phone', 
    'zipcode', 
    'email', 
    //'stateName'
  ]
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
     'phone']
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


  onSubmitEmail() {
    this.phone.focus();
  }

  onSubmitPhone() {
    this.stateName.focus();
  }

  onSubmitZipCode(){
    this.zipcode.blur();
  }

  onSubmitFullName() {
    this.phone.focus();
    }

  onSubmitState(){
    this.zipcode.focus();
  }

toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    //ApiCalls.EnablePushApi(this, value);
    //state changes according to switch
    //which will result in re-render the text
    this.setState({ switchValue: value })
  };

CallAsyncData = () => {
  
}

componentDidMount(){
  

  
this.CallAsyncData()
  

this.willFocusSubscription = this.props.navigation.addListener(
  'willFocus',
  () => {
    //this.setState({ loading: true });
    this.CallAsyncData()
    
    // this.ProfileApiData();
  }
);

}

componentWillUnmount() {
  this.willFocusSubscription.remove();
}


launchGallery = () => {
    const options = {
    //   quality: 1.0,
    //   maxWidth: 500,
    //   maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled photo picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        let pathImg = { path: response.path };
        let filename = { name: response.fileName };
        let filetype = { type: response.type };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

       

        this.setState({
          avatarSource: source,
          imagePath: pathImg,
          fileName: filename,
          fileType: filetype,
        });
      }
    });
  }


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
        }else if(buttonIndex === 1){
          this.setState({ category: NewArray[buttonIndex], genderPickerValue: 'male' })
        }else if(buttonIndex === 2){
          this.setState({ category: NewArray[buttonIndex], genderPickerValue: 'female' })
        } else if(buttonIndex === 3){
          this.setState({ category: NewArray[buttonIndex], genderPickerValue: 'PreferNottoSay' })
        }       
        else{
        this.setState({ category: NewArray[buttonIndex] })
        }
      }
    );

    render() {
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
            style={styles.titlestyle}>{'Edit Profile'}</Text>
            

            </View>

            <View style= {{ height: 10, width: 30 }}/>   

          </View>

          <KeyboardAvoidingView style = {{ flex: 1 }} 
        behavior= {(Platform.OS === 'ios')? "padding" : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        enabled >
        <View style={{ flex: 1 }} >
     
    <ScrollView contentContainerStyle = {{ flexGrow: 1}}
    contentInsetAdjustmentBehavior="automatic"
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


<TouchableOpacity activeOpacity={0.7} onPress={() => {
  this.props.navigation.navigate('imageViewer', {'imgurl': this.state.avatarSource == null ? userDp : this.state.avatarSource.uri } )
} }>
{this.state.avatarSource == null ? (
<Image source = {userDp == '' || userDp == undefined || userDp == null ?
 require('../../assets/images/forgotPaswrd.jpg') : { uri: userDp } } 
      style = {{ 
       height: 95,
       width: 95,
       borderRadius: 100/2,
       }} />
       ):
       (<Image source = {this.state.avatarSource} 
    style = {{ 
     height: 95,
     width: 95,
     borderRadius: 100/2,
     }} />
       )}
   </TouchableOpacity>
   


</View>

<TouchableOpacity onPress={() => { this.launchGallery() } }
style={{ padding: 10, height: 35, alignItems: 'center', justifyContent: 'center', marginTop: 10,
   backgroundColor: R.colors.GlowColor, borderRadius: 10, flexDirection: 'row', 
   zIndex: 999 }} >
<Image
    style={{ width: 16, height: 16, marginRight: 5 }}
    source={ require('../../assets/images/upload.png') }
    />  
  <Text style={{ fontSize: 11, textAlign: 'center', color: 'black' }} >Upload</Text>
  </TouchableOpacity>

</View>

<View style={{ padding: 20 }} >
<TextField
    ref={this.fullnameRef}
    value={defaults.fullname}
    autoCorrect={false}
    enablesReturnKeyAutomatically={true}
    onFocus={this.onFocus}
    onChangeText={this.onChangeText}
    onSubmitEditing={this.onSubmitFullName}
    label='Full Name'
    returnKeyType='next'
    />

<TextField
                ref={this.emailRef}
                value={defaults.email}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                returnKeyType='next'
                editable={false}
                label='Email'
              /> 
              <TextField
                ref={this.phoneRef}
                value={defaults.phone}
                keyboardType='number-pad'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPhone}
                returnKeyType={Platform.OS == 'ios' ? 'done' : 'next'}
                label='Phone Number'
              /> 
               
               <View style={ styles.input} >
               {Platform.OS == 'ios' ?
       <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.onPressGCategory}>
       <Text style={[styles.buttonText,{ color: 'black', textAlign: 'left',
      fontSize: 15, fontWeight: 'normal' }]}>{this.state.category == undefined || this.state.category == '' || this.state.category == null ?
    'Select Gender *' : this.state.category}</Text>
       </TouchableOpacity>:
          <Picker
        style={{width:'100%', height: 40, color: R.colors.hintColor, alignSelf: 'center' }}
        mode = 'dropdown'
        selectedValue={this.state.genderPickerValue}
        onValueChange={(itemValue,itemIndex) => this.setState({genderPickerValue: itemValue})}
        >
        <Picker.Item label="Select Gender *"  value={undefined}/>
        <Picker.Item value={'male'} label={'Male'} />
        <Picker.Item value={'female'} label={'Female'} />
        <Picker.Item value={'notPreferToSay'} label={'Prefer Not to Say'} />
        </Picker>}
        </View>
               {/* <TextField
                ref={this.stateRef}
                value={defaults.stateName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitState}
                returnKeyType={'next'}
                label='State'
              />  */}
              {/* <View style={{borderBottomColor:R.colors.lineColor,borderBottomWidth:1,marginTop:13}}>
              <Picker
        style={{width:'100%', height: 40, color: R.colors.hintColor, alignSelf: 'center' }}
        mode = 'dropdown'
        selectedValue={this.state.stateName}
        onValueChange={(itemValue,itemIndex) => this.setState({stateName: itemValue})}
        >
        <Picker.Item label="Select State"  value={undefined}/>
        {stateOfAmerica.map((item, index) => {
        return (<Picker.Item label={item.name} value={item.name} key={item.name}/>) 
    })}
       
  
        </Picker>

              </View> */}

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
                            value={(this.state.age).toString()}
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
                                paddingVertical: 10,
                                color: 'black',
                              },
                              
                              inputIOS: {
                                color: 'black',
                               
                                paddingHorizontal: 10,
                               // paddingBottom: 12,
                              },


                            }}


                          />
                        </View>
                      </View>









<View
style={{borderBottomColor:R.colors.lineColor,borderBottomWidth:1,marginTop:10}}
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



<View style={{  width: '100%' }}>
                                <RNPickerSelect
                                    placeholder={
                                        { label: '     Select State', value: null, color: R.colors.hintColor, }
                                    }
                                    onValueChange={(value, index) => this.setState({stateName: value})}
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
                                            paddingVertical: 10,
                                            color: 'black',
                                        },
                                        
                              inputIOS: {
                                color: 'black',
                               
                                paddingHorizontal: 10,
                               // paddingBottom: 12,
                              },


                                    }}


                                />
                            </View>
        </View>
              
            

               <TextField
                ref={this.zipcodeRef}
                value={defaults.zipcode}
                keyboardType='numeric'
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitZipCode}
                returnKeyType={Platform.OS == 'ios' ? 'done' : 'next'}
                label='Zip Code'
              />

 {/* SignUp Button */}
 <TouchableOpacity style = {[styles.buttonContainer]} 
          activeOpacity={0.9} 
          onPress={() => {
            ApiCalls.EditProfileApi(this, userDp)
            //this.props.navigation.navigate('Auth');
            // this.props.navigation.goBack();
            // if (Platform.OS == 'android') {
            // ToastAndroid.show('Profile Updated Successfully', ToastAndroid.SHORT);
            // }else{
            //   alert('Profile Updated Successfully');
            // }
          }}
          >
          <Text style = {styles.buttonText} >Save</Text>
          </TouchableOpacity>
      

</View>
    </ScrollView>
        </View>
        </KeyboardAvoidingView>
        <Loader loading={this.state.loading} />
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

}

export default EditProfile;

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
  buttonContainer: {
    height: 50,
    marginTop: 50,
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
input: {
  flex: 0.5,
  height: 50,
  backgroundColor: 'white',
  borderColor: R.colors.lineColor,
  borderBottomWidth: 1,
  paddingBottom: 0,
  justifyContent: 'center'        
}
})