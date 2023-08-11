import React, {Component} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image, ActionSheetIOS, ImageBackground, KeyboardAvoidingView,
Dimensions, Platform, ScrollView, ToastAndroid, Alert, StyleSheet, TextInput, Picker } from 'react-native';

import R from '../../res/R';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { width, height } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen') ;

const CountryList =[
    {"id": 1, "name": "Afghanistan"}, {"id": 2, "name": "Albania"},
    {"id": 3, "name": "Algeria"}, {"id": 4, "name": "Andorra"},{"id": 5, "name": "India"},
    {"id": 6, "name": "United Kingdom"}, {"id": 7, "name": "United Arab Emirates"},
    {"id": 8, "name": "United States of America"}, {"id": 9, "name": "Yemen"},
    {"id": 10, "name": "Zimbabwe"}]

let NewArray = ['Cancel'];

export default class PaymentScreen extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            data: [],
            cardExpiry: '',
            CountryName: undefined,
            radioSelected: 1
        }
    }

    componentDidMount(){
      try {
      CountryList.map( (s, i) => {
        NewArray.push(s.name);
      });
    } catch (error) {
      console.log(error);
    }
    }

    radioClick(id) {
        this.setState({
          radioSelected: id
        })
      }

      _handlingCardExpiry(text) {
        if (text.indexOf('.') >= 0 || text.length > 5) {
            // Since the keyboard will have a decimal and we don't want
            // to let the user use decimals, just exit if they add a decimal
            // Also, we only want 'MM/YY' so if they try to add more than
            // 5 characters, we want to exit as well
            return;
        }
    
        if (text.length === 2 && this.state.cardExpiry.length === 1) {
            // This is where the user has typed 2 numbers so far
            // We can manually add a slash onto the end
            // We check to make sure the current value was only 1 character
            // long so that if they are backspacing, we don't add on the slash again
            text += '/'
        }
    
        // Update the state, which in turns updates the value in the text field
        this.setState({
            cardExpiry: text
        });
    }

    onPressCountry = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: NewArray,
        title: "Select Country *",
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        }else{
        this.setState({ CountryName: NewArray[buttonIndex] })
        }
      }
    );

render(){
    let CountryItems = CountryList.map( (s, i) => {
        return <Picker.Item key={i} value={s.name} label={s.name} />
      });

      const products = [{
        id: 1, logo: require('../../assets/images/visa.png'),
      },
      {
        id: 2, logo: require('../../assets/images/mastercard.png'),
      },
      {
        id: 3, logo: require('../../assets/images/american_express.png'),
      },
      {
        id: 4, logo: require('../../assets/images/jcb.png'),
      }];

    return(
        <SafeAreaView style={{ flex: 1 }} >

        <View style = {styles.Header} >
          <TouchableOpacity
          onPress={() => { this.props.navigation.goBack()  }}>
      <View style= {{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 5, }}>

          <Image
              style={{ width: 24, height: 24 }}
              source={ require('../../assets/images/back_arrow.png') }
          />
  </View>
  </TouchableOpacity>
       
  <View style= {{ flex: 1 }}> 
            <Text numberOfLines={1}
            style={styles.titlestyle}>{'Payment Method'}</Text>
            

            </View>

            <View style= {{ height: 10, width: 30 }}/>   

          </View>


        <View style = {{ height: 60, marginBottom: -60, backgroundColor: R.colors.PrimaryColor }} />
        <KeyboardAvoidingView style = {{ flex: 1 }} 
        behavior= {(Platform.OS === 'ios')? "padding" : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        enabled >
        <View style={{ flex: 1 }} >
        <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}
        contentContainerStyle = {{ flexGrow: 1}}
        contentInsetAdjustmentBehavior="automatic" >

        <View style={[styles.ViewCard1]}>

<View style={{ marginLeft: '2%' }} >

<View style={styles.logosView} >  
 <Image style={styles.logos}
  source={require('../../assets/images/stripe.png')}  
  />

  <View style={{ flex: 1, alignItems: 'flex-end' }} >
  <View style={{ height: 24, width: 24, borderRadius: 24/2,
    borderColor: R.colors.hintColor, borderWidth: 1, backgroundColor: R.colors.colorYellow }} />

  </View>
  
  </View>

<View style={{ flexDirection: 'row', marginTop: 10 }} >
 {products.map((val) => {
        return (
          <TouchableOpacity key={val.id} onPress={this.radioClick.bind(this, val.id)} 
          activeOpacity={1} style={{ marginRight: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 1.4,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                val.id == this.state.radioSelected ?
                  <View style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: '#000',
                  }} />
                  : null
              }
            </View>
            <Image style={{ height: 32, width: 32, marginLeft: 5 }}
            source={val.logo}
            />
            </View>
          </TouchableOpacity>
        )
      })
    }
    </View>

{/* <Text style={[styles.buttonText,{ fontSize: 16, color: 'gray', fontWeight: '700', textAlign: 'left' }]} >{'Petra_Stark1243@gmail.com'}</Text> */}

</View>  

</View>

        <View style={{ padding: 10, marginTop: 10 }} >

        <Text style={[styles.desstyle,{ textAlign: 'left', color: R.colors.hintColor,
         fontWeight: 'bold', marginBottom: 10, paddingLeft: 5 }]}>Card details</Text>

<View style={[styles.input,{ flexDirection: 'row', paddingLeft: 0, marginBottom: 0, borderRadius: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} >

<TextInput style={{ paddingLeft: 10 }}
            placeholder = {'1234 1234 1234 1234'}
            placeholderTextColor = {R.colors.lineColor}
            returnKeyType = {Platform.OS == 'android' ? "next" : "done"}
            // onSubmitEditing = {() => this.passwordInput.focus() }
            onChangeText={TextInputTitle => this.setState({TextInputTitle})}
            keyboardType = 'number-pad'
            maxLength={16}
            >
            </TextInput>
            

</View>
<View style={[styles.input,{ flexDirection: 'row',  padding: 0, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]} >
<TextInput style = {{  height: 45, flex: 0.45 }}
            placeholder = {'MM / YY'}
            onChangeText={this._handlingCardExpiry.bind(this)}
            placeholderTextColor = {R.colors.lineColor}
            returnKeyType = {Platform.OS == 'android' ? "next" : "done"}
            // onSubmitEditing = {() => this.passwordInput.focus() }
            //onChangeText={TextInputTitle => this.setState({TextInputTitle})}
            keyboardType = 'number-pad'
            maxLength={4}
            >
            </TextInput>

    <View style={{ height: '100%', width: 1, backgroundColor: 'gray'}} />
        <View style={{ flexDirection: 'row', flex: 0.55 }} >
            <TextInput style = {{ height: 45, flex: 1, paddingLeft: 10 }}
            placeholder = {'CVC'}
            placeholderTextColor = {R.colors.lineColor}
            returnKeyType = {Platform.OS == 'android' ? "next" : "done"}
            // onSubmitEditing = {() => this.passwordInput.focus() }
            onChangeText={TextInputTitle => this.setState({TextInputTitle})}
            keyboardType = 'number-pad'
            maxLength={3}
            >
            </TextInput>

          <View style={{ flex: 1, justifyContent: 'center' }} >
          <Image
          source={require('../../assets/images/cvc_no.png')}
          style={{ height: 24, width: 36, alignSelf: 'flex-end', marginRight: 10 }}
          />
          </View>
          </View>
            </View>

        <Text style={[styles.desstyle,{ textAlign: 'left', color: R.colors.hintColor,
         fontWeight: 'bold', marginBottom: 10, paddingLeft: 5 }]}>Name on card</Text>

        <TextInput style = {[styles.input,{ padding: 10 }]}
                    placeholder = {''}
                    placeholderTextColor = {'gray'}
                    returnKeyType = "next"
                    // onSubmitEditing = {() => this.passwordInput.focus() }
                    onChangeText={TextInputTitle => this.setState({TextInputTitle})}
                    keyboardType = 'default'
                    maxLength={75}
                    >
                    </TextInput>

                    <Text style={[styles.desstyle,{ textAlign: 'left', color: R.colors.hintColor,
         fontWeight: 'bold', marginBottom: 10, paddingLeft: 5 }]}>Country or region</Text>
        
        <View style={[styles.input,{justifyContent: 'center', paddingLeft: 0, marginBottom: 0, borderRadius: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }]} >

        {Platform.OS == 'ios' ?
       <TouchableOpacity style={{ justifyContent: 'center', }} onPress={this.onPressCountry}>
       <Text style={[{ color: this.state.CountryName == undefined ? R.colors.lineColor : 'black', textAlign: 'left', textTransform: 'capitalize', paddingLeft: 10,
      fontSize: 15, fontWeight: 'normal' }]}>{this.state.CountryName == undefined ? 'Select Country' : this.state.CountryName }</Text>
       </TouchableOpacity>:
        <Picker
        style={{width:'100%', height: 40, color: R.colors.hintColor, alignSelf: 'center' }}
        mode = 'dropdown'
        // itemStyle = {{ fontSize: 11, color: '#34495e' }} fontSize: 11, color: '#34495e', 
		    selectedValue={this.state.CountryName}
		    onValueChange={(itemValue,itemIndex) => this.setState({CountryName:itemValue})}
		    >
		    <Picker.Item label="Select Country"  value={undefined}/>
		    {CountryItems}
		    </Picker>
        }
        </View>

        <TextInput style = {[styles.input,{ padding: 10, borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}
                    placeholder = {'Zip code'}
                    placeholderTextColor = {R.colors.lineColor}
                    returnKeyType = "done"
                    // onSubmitEditing = {() => this.passwordInput.focus() }
                    onChangeText={TextInputTitle => this.setState({TextInputTitle})}
                    keyboardType = 'number-pad'
                    maxLength={8}
                    >
                    </TextInput>


        </View>

        <View style={{ justifyContent: 'flex-end', paddingLeft: 10, paddingRight: 10 }} >
        <TouchableOpacity style = {[styles.buttonContainer,{ marginBottom: 0, }]} 
          activeOpacity={0.9} 
          onPress={() => {
            this.props.navigation.navigate('orderplaced');
            // if (Platform.OS == 'android') {
            // ToastAndroid.show('Password Changed Successfully', ToastAndroid.SHORT);
            // }else{
            //   alert('Password Changed Successfully');
            // }
          }}
          >
          <Text style = {[styles.buttonText,{ color: 'white', marginTop: 0, fontSize: 16, fontWeight: 'normal' }]} >Add Payment Method</Text>
          </TouchableOpacity>
</View>

    </ScrollView>
        </View>
        </KeyboardAvoidingView>
             </SafeAreaView>
            )
}


}


const styles = StyleSheet.create({
    Header:{
      height: 50,
      backgroundColor: R.colors.PrimaryColor,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      zIndex: 999,
      alignItems: 'center',
      paddingBottom: 0,
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
    desstyle:{
        fontSize: 12,
        fontWeight: 'normal',
        color: 'gray',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: 10
    },
    ViewCard:{ 
        padding: 10,
        borderRadius: 10,
        margin: 5,
        height: height/4,
        backgroundColor: 'white',
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
     ViewCard1:{ 
        padding: 10,
        borderRadius: 15,
        margin: 5,
        marginBottom: 10,
        backgroundColor: 'white',
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
     buttonContainer: {
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: R.colors.colorYellow,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'capitalize',
        marginTop: 20
    },
    logosView:{
        flexDirection: 'row'
    },
    logos:{
       height: 45,
       width: 120,
   },
   input: {
    paddingLeft: 10,
    borderRadius: 10,
    height: 45,
    fontSize: 16,
    backgroundColor: 'white',
    borderColor: R.colors.colorGray,
    borderWidth: 1,
    marginBottom: 20,
    color: 'black',
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
}
})