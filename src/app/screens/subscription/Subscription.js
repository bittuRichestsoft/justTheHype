import React, { Component } from 'react';
import {
  SafeAreaView, Picker, Button,
  StyleSheet, ActionSheetIOS,
  ScrollView, Platform,
  View, TouchableOpacity, FlatList,
  Text, Image, TextInput, ToastAndroid,
  StatusBar, ImageBackground, Dimensions, Alert, Modal, Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import R from '../../res/R';
import Triangle from '../../utils/arrowUp';
import ApiCalls from '../../utils/ApiCalls';
const { height, width } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen');
import stripe from 'tipsi-stripe'
import Loader from '../../utils/Loader';
import CheckBox  from '../../components/CheckBox/CheckBox'

export default class Subscription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planDetail: [],
      trialDays: '',
      subscriptionDeatail: '',
      subscriptionStatus: "",
      loading: false,
      showCancelModal: false,
      termsAccepted: false,
    }

  }
  componentDidMount() {
    stripe.setOptions({
     
     // publishableKey: 'pk_test_51GwWAjLAfxWEWGEJDCfSGiQopK1L8SmbEg6LoqGAXDnoKL8YpuJPHyvchbIzRXle5YmmQgs1vJCdiM2dvU0vCTjn00TYihFKIk',
      publishableKey:'pk_live_51GwWAjLAfxWEWGEJ0279jOVTF1GR6qcLlMxhrugk3eYIGTvOxVntqCRgPcD13LaWGHYFN28dEuOA8TS5aUYU67Rc00jLkNlAxu',

     // androidPayMode: 'test', // Android only
    })
    ApiCalls.getPlanDetail(this)
    console.log(this.state.planDetail)
  }
  selectedPlan =async(id, price) =>{
    if(this.state.termsAccepted){

    
    try {
      const value = await AsyncStorage.getItem('subscriptionInfo');
      console.log(JSON.parse(value));
      let data =JSON.parse(value)
      
      if (value == null) {
          // We have data!!
         
         
          this.handleCardPayPress(id, price)
          //this.props.navigation.navigate('payment');
      }else{
        alert("Already Purchased")
      }
  } catch (error) {
    console.log(error)
      // Error retrieving data
  }
    
    }else{
      alert('Please read Agreement and then select plan')
    }
  }
  handleCardPayPress = async (id, price) => {


    try {

      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,

      })
      var tokenStripe = token.tokenId
      console.log("tokenStripe",tokenStripe)
      //order_data.token = token.tokenId
      var order = {
        plan_id: id,
        stripe_token: tokenStripe,
        amount: price
      }
      this.doPament(order)


    } catch (error) {
      console.log("error-------part")
      console.log(error)
      alert(error)
      //this.setState({ loading: false })
    }
  }
  doPament(order) {
    ApiCalls.do_Payment_stripe(this, order)
  }
  cancelPlan = async () => {
    this.setState({ showCancelModal: true })

  }
  handleCheckBox = () => this.setState({ termsAccepted: !this.state.termsAccepted })
  cancelPlanNow= async () => {
    this.setState({ showCancelModal: false })
      try {
        const value = await AsyncStorage.getItem('subscriptionInfo');
        console.log(AsyncStorage)
        if (value !== null) {
            // We have data!!
            console.log(JSON.parse(value));
            let data =JSON.parse(value)
            this.setState({subscriptionDeatail:data})
            ApiCalls.cancelPlan(this)
        }
        // else{
        //   alert("No Plan")
        // }
    } catch (error) {

      console.log("no plan",error)
        // Error retrieving data
    }

  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <ImageBackground source={require('../../assets/images/wineGlass.png')}
          style={{ width: width, height: height, flex: 1 }} blurRadius={0.7} >



          <View style={[styles.HeaderStyle]}>

            <View style={{ height: 30, width: 30 }} />


            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 15,
                fontWeight: Platform.OS == 'android' ? 'normal' : '500',
                color: 'white',
                textAlign: 'center',
                textTransform: 'capitalize'
              }} >Subscription Plan</Text>
            </View>

            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.props.navigation.goBack(null)
              }} style={{ marginRight: 10}} >

              <Image
                style={{ width: 20, height: 20, tintColor: 'white' }}
                source={require('../../assets/images/cancel.png')}
              />
            </TouchableOpacity>




          </View>
          <ScrollView

          >

            <View style={{ padding: 10 }} >

              <View style={{ marginLeft: 20 }} >
                <Text style={{
                  fontSize: 30,
                  fontWeight: Platform.OS == 'android' ? 'bold' : '500',
                  color: 'white',
                  textAlign: 'left',
                  marginBottom: 20,
                }} >{this.state.trialDays}</Text>

                <Text style={{
                  fontSize: 15,
                  fontWeight: Platform.OS == 'android' ? '700' : '500',
                  color: 'white',
                  textAlign: 'left',
                  marginBottom: 20,
                }} >{'\u2B24'}   Access To Dozens Of Craft Beers</Text>

                <Text style={{
                  fontSize: 15,
                  fontWeight: Platform.OS == 'android' ? '700' : '500',
                  color: 'white',
                  textAlign: 'left',
                  marginBottom: 20,
                }} >{'\u2B24'}   New Tap Choices Every Month</Text>


                <Text style={{
                  fontSize: 15,
                  fontWeight: Platform.OS == 'android' ? '700' : '500',
                  color: 'white',
                  textAlign: 'left',
                  marginBottom: 20,
                }} >{'\u2B24'}   Recurring Billing, Cancel Anytime</Text>

              </View>
              <View style={{ marginTop: 40}} >
              <CheckBox
              selected={this.state.termsAccepted} 
              onPress={this.handleCheckBox}
              text='I agree to the Terms of Use and Privacy Policy'
              textStyle={ {fontSize: 13, marginLeft: 15,color:'white'} }
              color = 'white'
              />
              <View><TouchableOpacity
              //onPress={()=>{ this.props.navigation.navigate('webViews',{ 'type': 2 })}}
              onPress={()=>{ Linking.openURL('https://www.jttadmin.com/tap_brewery/public/api/v1/privacy-policy');}}
              style={{paddingBottom:10}}
              >
                <Text style={{color:'white',fontSize:14}}>By clicking "Agree & Subscribe," you agree to our
              <Text style={{fontSize:16,textDecorationLine: 'underline'}}> Subscriber Agreement</Text>  and are enrolling in automatic payments for
              that will continue until you cancel. You can cancel at any time, effective at the end of the billing period. There are no refunds or credits for
              partial months or years</Text></TouchableOpacity></View>
                <View style={{ flexDirection: 'row', justifyContent: 'center',  }} >

                  <TouchableOpacity style={[styles.SignInBtnContainer, { width: width / 3.5, padding: 3, marginRight: 20 }]}
                    activeOpacity={0.9}
                    onPress={() => {
                      this.selectedPlan(this.state.planDetail[0].id, this.state.planDetail[0].price)
                      // this.props.navigation.navigate('payment');
                      //alert(this.state.planDetail[0].subscription_name)

                    }}
                  >
                    <View style={{ backgroundColor: '#f4af40', borderRadius: 5, padding: 10, }} >
                      <Text style={[styles.buttonText, {
                        fontSize: 12, color: 'white', fontWeight: 'bold', marginBottom: 10
                      }]}
                      >{this.state.planDetail.length == 0 ? '' : this.state.planDetail[0].stripe_plan}</Text>
                      <Text style={[styles.buttonText, {
                        fontSize: 12, color: 'black', fontWeight: 'normal'
                      }]}
                      ></Text>
                    </View>

                    <View style={{ backgroundColor: 'white', height: 3, borderColor: 'white', width: '100%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />

                    <View style={{ backgroundColor: 'transparent', borderRadius: 5, padding: 10 }} >
                      <Text style={[styles.buttonText, {
                        fontSize: 20, color: 'white', fontWeight: 'bold'
                      }]}
                      >{this.state.planDetail.length == 0 ? '' : this.state.planDetail[0].price}</Text>
                    </View>

                  </TouchableOpacity>

                  <View style={{ marginBottom: 50 }} >

                    <TouchableOpacity style={[styles.SignInBtnContainer, {
                      width: width / 3.5,
                      borderWidth: 0, backgroundColor: R.colors.colorRed, height: 30, borderRadius: 5
                    }]}
                      activeOpacity={1}
                      onPress={() => {

                        //this.props.navigation.goBack();
                      }}
                    >
                      <Text style={{
                        fontSize: 15,
                        fontWeight: Platform.OS == 'android' ? '700' : '500',
                        color: 'white',
                        textAlign: 'center',
                      }} >Most Popular</Text>
                    </TouchableOpacity>



                    <Triangle />


                    <TouchableOpacity style={[styles.SignInBtnContainer, { width: width / 3.5, padding: 3, marginRight: 20 }]}
                      activeOpacity={0.9}
                      onPress={() => {
                        this.selectedPlan(this.state.planDetail[1].id, this.state.planDetail[1].price)
                        //this.props.navigation.navigate('payment');
                      }}
                    >
                      <View style={{ backgroundColor: R.colors.colorWhiteBlur, borderRadius: 5, padding: 10, }} >
                        <Text style={[styles.buttonText, {
                          fontSize: 12, color: 'black', fontWeight: 'bold', marginBottom: 10
                        }]}
                        >{this.state.planDetail.length == 0 ? '' : this.state.planDetail[1].stripe_plan}</Text>
                        <Text style={[styles.buttonText, {
                          fontSize: 12, color: 'black', fontWeight: 'normal'
                        }]}
                        >Save {this.state.planDetail.length == 0 ? '' : this.state.planDetail[1].percentage}%</Text>
                      </View>

                      <View style={{ backgroundColor: 'white', height: 3, borderColor: 'white', width: '100%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />

                      <View style={{ backgroundColor: 'transparent', borderRadius: 5, padding: 10 }} >
                        <Text style={[styles.buttonText, {
                          fontSize: 20, color: 'white', fontWeight: 'bold'
                        }]}
                        >{this.state.planDetail.length == 0 ? '' : this.state.planDetail[1].price}</Text>
                      </View>

                    </TouchableOpacity>

                  </View>
                  <TouchableOpacity style={[styles.SignInBtnContainer, { padding: 3, width: width / 3.5, }]}
                    activeOpacity={0.9}
                    onPress={() => {
                      this.selectedPlan(this.state.planDetail[2].id, this.state.planDetail[2].price)
                      // this.props.navigation.navigate('payment');
                    }}
                  >
                    <View style={{ backgroundColor: R.colors.colorYellow, borderRadius: 5, padding: 10, }} >
                      <Text style={[styles.buttonText, {
                        fontSize: 12, color: 'white', fontWeight: 'bold', marginBottom: 10
                      }]}
                      >{this.state.planDetail.length == 0 ? '' : this.state.planDetail[2].stripe_plan}</Text>
                      <Text style={[styles.buttonText, {
                        fontSize: 12, color: 'black', fontWeight: 'normal'
                      }]}
                      >Save {this.state.planDetail.length == 0 ? '' : this.state.planDetail[2].percentage}%</Text>
                    </View>

                    <View style={{ backgroundColor: 'white', height: 3, borderColor: 'white', width: '100%', alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />

                    <View style={{ backgroundColor: 'transparent', borderRadius: 5, padding: 10 }} >
                      <Text style={[styles.buttonText, {
                        fontSize: 20, color: 'white', fontWeight: 'bold'
                      }]}
                      >{this.state.planDetail.length == 0 ? '' : this.state.planDetail[2].price}</Text>
                    </View>

                  </TouchableOpacity>


                </View>

               
                {/* <View >  <Text style={{color:'white',fontSize:14}}>
                “By clicking "Agree & Subscribe," you agree to our
Subscriber Agreement and are enrolling in automatic payments for
hat will continue until you cancel. You can cancel at any time, effective at the end of the billing period. There are no refunds or credits for
partial months or years.
                  </Text></View> */}
                <Modal
                  transparent={true}
                  animationType={'none'}
                  visible={this.state.showCancelModal}
                  onRequestClose={() => { this.setState({ showCancelModal: false }) }}>
                  <View style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#00000040',
                  }}>
                    <View style={{
                      backgroundColor: '#FFFFFF',
                      width: '77%',
                      borderRadius: 20,
                      //padding: 20,
                      // borderColor: R.colors.yellowColor,
                      borderWidth: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <TouchableOpacity
                        onPress={() => { this.setState({ showCancelModal: false }) }}
                        style={{ position: 'absolute', top: 10, right: 10 }}
                      >
                        <View ><Image source={require('../../assets/images/cancel.png')}
                          style={{
                            height: 18,
                            width: 18,

                          }} /></View>
                      </TouchableOpacity>
                      <View style={[styles.box1]}>


                        <View style={{ height: 60, width: 200, }}

                        >
                          <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, marginTop: 15 }}>Are you Sure ?</Text>
                          </View>
                        </View>

                        <View style={{ padding: 15 }}>
                          <View >
                            <Image source={require('../../assets/images/logo.png')}
                              style={{
                                height: 80,
                                width: 80,
                                borderRadius: 80 / 2,
                                alignSelf: 'center',
                              }} />
                          </View>

                          <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                            <TouchableOpacity style={{
                              height: 50,
                              marginTop: 20,
                              borderRadius: 10,
                              alignSelf: 'center',
                              backgroundColor: R.colors.PrimaryColor,
                              paddingVertical: 10,
                              flex: 1,
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
                            }}
                              activeOpacity={0.7} onPress={() => { this.cancelPlanNow() }} >
                              <Text style={[styles.buttonText, {
                                padding: 10,
                                fontSize: 12, fontWeight: 'normal'
                              }]}
                              >YES</Text>
                            </TouchableOpacity>
                          </View>



                        </View>
                      </View>

                    </View>
                  </View>

                </Modal>


                <TouchableOpacity style={[styles.SignInBtnContainer, { width: width / 2.5, height: 50, marginTop: 20 }]}
                  activeOpacity={0.9}
                  onPress={() => {
                    this.cancelPlan()
                    // this.props.navigation.goBack(null);
                    //   if (Platform.OS == 'android') {
                    //     ToastAndroid.show('Restore Purchase Successfully', ToastAndroid.SHORT);
                    //   } else {
                    //     alert('Restore Purchase Successfully')
                    //   }

                  }
                  }
                >
                  <Text style={{
                    fontSize: 15,
                    fontWeight: Platform.OS == 'android' ? '700' : '500',
                    color: 'white',
                    textAlign: 'center',
                    padding: 10
                  }} >
                    Cancel Plan
                    </Text>
                </TouchableOpacity>

              </View>

            </View>

            {/* <View style={{ flexDirection: 'row', marginTop: 100, width: '100%', justifyContent: 'center' }} >

              <Text style={{
                fontSize: 12,
                fontWeight: Platform.OS == 'android' ? '700' : '500',
                color: 'white',
                textAlign: 'right',
                marginRight: 20,
                flex: 0.4,
              }} >Our Terms of Service</Text>
              <View style={{ backgroundColor: 'white', height: '100%', borderColor: 'white', borderWidth: 1, }} />
              <TouchableOpacity
                 onPress={()=>{ Linking.openURL('http://167.172.209.57/tap_brewery/api/v1/privacy-policy');}}
              >
              <Text style={{
                fontSize: 12,
                fontWeight: Platform.OS == 'android' ? '700' : '500',
                color: 'white',
                textAlign: 'left',
                marginLeft: 20,
                flex: 0.4
              }} >Privacy Policy</Text>

              </TouchableOpacity>
       

            </View> */}

          </ScrollView>

        </ImageBackground>
        <Loader loading={this.state.loading} />
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  HeaderStyle: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    marginBottom: 0,
    backgroundColor: 'transparent',
    width: width
  },
  SignInBtnContainer: {
    height: undefined,
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: R.colors.GlowColor,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize'
  }
})