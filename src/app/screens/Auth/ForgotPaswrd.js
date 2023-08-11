import React,{ Component } from 'react';
import {
  SafeAreaView, StyleSheet,
  ScrollView, Platform,
  View, TouchableOpacity,
  Text, Image, Dimensions, Alert, KeyboardAvoidingView
} from 'react-native';
import R from '../../res/R';
import { TextField } from 'react-native-material-textfield';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';

const { height, width } = Platform.OS == 'ios' ? Dimensions.get('screen') : Dimensions.get('window');


export default class ForgotPassword extends Component{


    constructor(props){
        super(props);

        this.state = {
          loading: false
        }

        this.emailRef = this.updateRef.bind(this, 'email');
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);


    }

    updateRef(name, ref) {
        this[name] = ref;
      }

      onChangeText(text) {
        ['email']
          .map((name) => ({ name, ref: this[name] }))
          .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
              this.setState({ [name]: text });
            }
          });
      }

      onSubmitEmail() {
        this.email.blur();
      }

render(){
    return(
        <SafeAreaView style = {{ flex: 1 }} >

<View style = {styles.Header} >
          <TouchableOpacity
          onPress={() => { this.props.navigation.goBack()  }}>
      <View style= {{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 5, }}>

          <Image
              style={{ width: 24, height: 24, tintColor: 'black', marginTop: 20 }}
              source={ require('../../assets/images/back_arrow.png') }
          />
  </View>
  </TouchableOpacity>
       
  <View style= {{ flex: 1 }}> 
            

            </View>

            <View style= {{ height: 10, width: 30 }}/>   

          </View>

          <KeyboardAvoidingView style = {{ flex: 1 }} 
        behavior= {(Platform.OS === 'ios')? "padding" : null}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
        enabled >
        <View style={{ flex: 1 }} >

<ScrollView contentContainerStyle = {{ flexGrow: 1}}
            contentInsetAdjustmentBehavior="automatic">

<View style={{ margin: 20 }} >

<Image
        style={{ width: '100%', height: height/3}} resizeMode={'contain'}
        source={ require('../../assets/images/forgotPaswrd.jpg') }
        />

<Text style={styles.buttonText} >{'Forgot Password'}</Text>

<Text style={styles.desstyle} >{'We will email you a link to reset your password.'}</Text>


<TextField
                ref={this.emailRef}
                defaultValue={''}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType='done'
                label='Email'
              />    

{/* SignUp Button */}
<TouchableOpacity style = {[styles.buttonContainer,{ marginBottom: 30 }]} 
          activeOpacity={0.9} 
          onPress={() => {
            //this.props.navigation.navigate('Auth');
            ApiCalls.handleForgetSubmit(this)
            }}>
          <Text style = {[styles.buttonText,{ color: 'white', marginTop: 0, fontSize: 16 }]} >Send</Text>
          </TouchableOpacity>
      
</View>

</ScrollView>
</View>
</KeyboardAvoidingView>
<Loader loading={this.state.loading} />
        </SafeAreaView>
    )
}

}


const styles = StyleSheet.create({

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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'capitalize',
        marginTop: 20
    },
    desstyle:{
        fontSize: 12,
        fontWeight: 'normal',
        color: 'gray',
        textAlign: 'center',
        marginTop: 10
    },
    Header:{
        height: 50,
        backgroundColor: 'transparent',
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

})