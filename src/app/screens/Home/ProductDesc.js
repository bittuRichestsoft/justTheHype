import React, { Component } from 'react';
import {
  SafeAreaView, Picker, Button,
  StyleSheet, ActionSheetIOS,
  ScrollView, Platform, Linking,
  View, TouchableOpacity, FlatList,
  Text, Image, TextInput, ToastAndroid,
  StatusBar, ImageBackground, Dimensions, Modal,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { TextField } from 'react-native-material-textfield';
import R from '../../res/R';
import Swiper from 'react-native-swiper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ApiCalls from '../../utils/ApiCalls';
import redeemCheck from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';

const array = ['adv', 'sfasg', 'asfgsg'];
const { height, width } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen');

// const lat = 30.7333;
// const lng = 76.7794;

// const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
// const latLng = `${lat},${lng}`;
// const label = 'Custom Label';
// const url = Platform.select({
//   ios: `${scheme}${label}@${latLng}`,
//   android: `${scheme}${latLng}(${label})`
// });
let detailsArray;
export default class ProductDesc extends Component {

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    detailsArray = navigation.getParam('detail', {});
    if (__DEV__) { console.log('Hello', getStatusBarHeight(true)); console.log('detailsArray', detailsArray) }
    this.state = {
      dataSource: [],
      notify: true,
      showRedeemModal: false,
      redeemcode: "",
      breweryForShare:"",
      reedeemStatus:'',
      breweryInfo:'',
      loading: false,
    }
   
  }
  getRedeemCode(val) {
    this.setState({ redeemcode: val })
  }
  setNotification() {
    if (this.state.notify) {
      this.setState({ notify: false })
    } else {
      this.setState({ notify: true })
    }
  }
  RedeemNow =async(name,image,prod_id) => {
    try {
      const value = await AsyncStorage.getItem('subscriptionInfo');
    console.log(">>>>>>>",value)
      if (value !== null) {
          // We have data!!
       
         
          let info = {
            breweryId:detailsArray.key,
            prod_id:prod_id,
            name:name,
            image:image
          }
          this.setState({breweryForShare:name,
          productImage:image,
          breweryInfo:info,
         // showRedeemModal: true,
      
         })

         this.props.navigation.navigate('redeem',{
                        breweryName:name,
                        brew_Image:image,
                        breweryId:detailsArray.key,
                        prod_id:prod_id,
                        breweryFullName:detailsArray.name
                      })


         
      }else{
        this.props.navigation.navigate('sub') 
      }
  } catch (error) {
    console.log(error)
      // Error retrieving data
  }
    
   
    
    //ApiCalls.redeem_Now(this,info )
   
  }
  pressRedeem() {
    //console.log(this.state.breweryInfo)
    ApiCalls.redeem_Now(this )
    // this.setState({ showRedeemModal: false

    //  });


    

  }
  facebookOpen(){
    console.log(detailsArray.facebook_link)
    Linking.openURL(detailsArray.facebook_link).catch(err => console.error("Couldn't load page", err));
  }
  instagramOpen(){
    Linking.openURL(detailsArray.instagram_link).catch(err => console.error("Couldn't load page", err));

  }
  render() {
    let brewery =  this.props.navigation.getParam('detail', {});
    const lat = brewery.coordinate.latitude;
const lng = brewery.coordinate.longitude;

const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
const latLng = `${lat},${lng}`;
const label = 'Custom Label';
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`
});
    

    function Foreground({ animatedValue }) {
      const pagesCount = brewery.banner_images.length - 1;
      const gambar = [...new Array(pagesCount + 1)].map((it, idx) => {
       
        return(
          <TouchableOpacity activeOpacity={1} style={styles.slide} key={idx} >
          <FastImage
            style={styles.image}
            source={{ uri: brewery.banner_images[idx], priority: FastImage.priority.high }}
            
            // onProgress={({nativeEvent: {loaded, total}}) => { 
            //   if(__DEV__){ 
            //     console.log('Native Downloading', loaded +'      ' + total)
            //   }
            //  } } 
          />
          {/* <ActivityIndicator
      style={styles.activityIndicator}
      animating={that.state.loadingImage}
      size="large"
      color={R.colors.PrimaryColor}
    /> */}
        </TouchableOpacity>
        )
      });
      return (

        <Swiper containerStyle={{ height: 400, width: '100%' }}
          autoplay={true}
          autoplayTimeout={5}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{ zIndex: 999, backgroundColor: R.colors.colorGray, borderColor: R.colors.colorGray, borderWidth: 1, width: 10, height: 10, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}
          activeDot={<View style={{ zIndex: 999, backgroundColor: 'white', borderColor: 'white', borderWidth: 1, width: 10, height: 10, borderRadius: 5, marginLeft: 5, marginRight: 5 }} />}
          paginationStyle={{
            bottom: Platform.OS == 'ios' ? getStatusBarHeight(true) <= 20 ? 120 : 80 : 80
          }}
          loop={true}>
            {gambar}
          {/* <View>
            <TouchableOpacity activeOpacity={1} style={styles.slide}
              onPress={() => {
                //animatedValue.props.navigation.navigate(Routes.SliderView,{ array: array })
              }}>
              <Image
                style={[styles.image]}
                source={require('../../assets/images/GreatDivide.jpeg')}
              />
            </TouchableOpacity>
          </View> */}
          {/* <View >
            <TouchableOpacity activeOpacity={1} style={styles.slide}
              onPress={() => {
                //animatedValue.props.navigation.navigate(Routes.SliderView,{ array: array })
              }}>
              <Image
                style={[styles.image]}
                source={require('../../assets/images/INvictus.jpeg')}
              />
            </TouchableOpacity>

          </View> */}
        </Swiper>
      )
    }
    return (
      <SafeAreaView style={styles.container} >
        <View style={[styles.HeaderStyle]}>

          <TouchableOpacity style={{ paddingLeft: 15 }}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <View style={[styles.whiteView, { flexDirection: 'row', paddingBottom: 5, }]}>

              <Image
                style={{ width: 24, height: 24, tintColor: 'black' }}
                source={require('../../assets/images/back_arrow.png')}
              />
            </View>

          </TouchableOpacity>


          <View style={{ flex: 0.96, width: '90%', alignItems: 'center' }} />
          {/* {this.state.notify ?
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.setNotification()
              }}
              style={styles.whiteView}>

              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../assets/images/notification.png')}
              />
            </TouchableOpacity> :
            <TouchableOpacity activeOpacity={0.9}
              onPress={() => {
                this.setNotification()
              }}
              style={styles.whiteView}>

              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../assets/images/unselectnotification.png')}
              />
            </TouchableOpacity>} */}


        </View>
        <ScrollView nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >

          <View style={{
            backgroundColor: R.colors.PrimaryColor, borderBottomRightRadius: Platform.OS == 'ios' ? getStatusBarHeight(true) <= 20 ? 150 : 100 : 100,
            padding: 0, height: 400, overflow: 'hidden'
          }} >

            <Foreground animatedValue={this} />

          </View>
          <View style={{ backgroundColor: R.colors.white, borderTopLeftRadius: 50, paddingLeft: 15, paddingRight: 15, top: Platform.OS == 'ios' ? getStatusBarHeight(true) <= 20 ? -100 : -50 : -50 }} >
            <View style={{ padding: 5, height: 30, width: 50, alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'center', backgroundColor: R.colors.colorGreen, borderBottomRightRadius: 5, borderBottomLeftRadius: 5, top: -10 }} >
              <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >Open</Text>
            </View>
            <Text style={{ fontSize: 15, textAlign: 'left', fontWeight: '700', color: 'black' }} >{detailsArray.name}</Text>

            <View style={{ flexDirection: 'row', marginTop: 5 }} >
              {/* <View style={{
                padding: 5, height: 30, width: 50, alignItems: 'center', alignSelf: 'flex-end',
                backgroundColor: R.colors.GlowColor, borderRadius: 5, flexDirection: 'row', marginRight: 15
              }} >
                <Image
                  style={{ width: 12, height: 12, marginRight: 5 }}
                  source={require('../../assets/images/starIcon.png')}
                />
                <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'normal', color: 'black' }} >4.5</Text>
              </View> */}

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }} >
                <Image
                  style={{ width: 16, height: 16, marginRight: 5 }}
                  source={require('../../assets/images/locIcon.png')}
                />
                <Text numberOfLines={1}
                  style={[styles.titlestyle, { fontSize: 12, fontWeight: 'normal' }]}>{detailsArray.distance}</Text>

              </View>

            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }} >
              <View
                style={[styles.whiteView, { backgroundColor: R.colors.GlowColor, height: 36, width: 36, justifyContent: 'center', marginRight: 15 }]}>

                <Image
                  style={{ width: 20, height: 20, tintColor: 'black', alignSelf: 'center' }}
                  source={require('../../assets/images/clockIcon.png')}
                />

              </View>
              <Text style={{ fontSize: 12, textAlign: 'left', fontWeight: 'normal' }} >Open {detailsArray.opening_time} - {detailsArray.closing_time}</Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }} >
              <View
                style={[styles.whiteView, { backgroundColor: R.colors.GlowColor, height: 36, width: 36, justifyContent: 'center', marginRight: 15 }]}>

                <Image
                  style={{ width: 20, height: 20, tintColor: 'black', alignSelf: 'center' }}
                  source={require('../../assets/images/callicon.png')}
                />

              </View>
              <Text style={{ fontSize: 12, textAlign: 'left', fontWeight: 'normal' }} >{detailsArray.phone}</Text>

            </View>

            
            <View style={{ flexDirection: 'row', marginTop: 5 ,justifyContent:"center" }} >
            <TouchableOpacity
            onPress={()=>{
              this.facebookOpen()
            }}
            >

              <View
                style={[styles.whiteView, { backgroundColor: R.colors.GlowColor, height: 36, width: 36, marginRight: 15 }]}>

                <Image
                  style={{ width: 30, height: 30, alignSelf: 'center' }}
                  source={require('../../assets/images/facebook-logo.png')}
                />

              </View>
              </TouchableOpacity>
              <TouchableOpacity
               onPress={()=>{
               this.instagramOpen()
              }}
              >

              <View
                style={[styles.whiteView, { backgroundColor: R.colors.GlowColor, height: 36, width: 36, marginRight: 15 }]}>

                <Image
                  style={{ width: 30, height: 30, alignSelf: 'center' }}
                  source={require('../../assets/images/instagramIcon.png')}
                />

              </View>
              </TouchableOpacity>

            </View>
           
            <Text style={{ fontSize: 12, textAlign: 'left', fontWeight: 'normal', lineHeight: 18, marginBottom: 20 }} >{detailsArray.description}</Text>

            <View style={{ height: 2, backgroundColor: R.colors.GlowColor, width: '100%', marginBottom: 20 }} />

            <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 20 }} >Get Directions</Text>

            <View style={{ flexDirection: 'row', marginBottom: 20 }} >
              <TouchableOpacity style={[styles.SignInBtnContainer, { flexDirection: 'row', width: 130, alignItems: 'center', marginRight: 10 }]}
                activeOpacity={0.7}
                onPress={() => {
                  //this.props.navigation.goBack(); 
                Linking.openURL(url);
               //Linking.openURL(`https://m.uber.com/ul/?action=setPickup&client_id=TJXgPFPLizMmp7hKBpCB6y3Guc2tocm2&pickup=my_location&dropoff[formatted_address]=Chandigarh%20International%20Airport%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%2C%20India&dropoff[latitude]=${detailsArray.coordinate.latitude}&dropoff[longitude]=${detailsArray.coordinate.longitude}`);

                }}
              >
                <Image
                  style={{ width: 20, height: 20, tintColor: 'black', alignSelf: 'center', marginRight: 10 }}
                  source={require('../../assets/images/directionIcon.png')}
                />
                <Text style={[styles.buttonText, {
                  fontSize: 12, color: 'black', fontWeight: 'normal'
                }]}
                >Google Map</Text>
              </TouchableOpacity>

              {/*<TouchableOpacity style = {[styles.SignInBtnContainer, { flexDirection: 'row', padding: 5, alignItems: 'center' }]} 
          activeOpacity={0.7} 
          onPress={() => {
            //this.props.navigation.goBack(); 
          }}
          >
          <Image
        style={{ width: 20, height: 20, tintColor: 'black', alignSelf: 'center', marginRight: 10 }}
        source={ require('../../assets/images/uber.png') }
          />
          <Text style = {[styles.buttonText,{ textTransform: 'uppercase',
           fontSize: 12, color: 'black', fontWeight: 'normal' }]}
            >Uber</Text>
          </TouchableOpacity>*/}

            </View>

            <View style={{ height: 2, backgroundColor: R.colors.GlowColor, width: '100%', marginBottom: 20 }} />

            {/* Our Beers View */}

            <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }} >

              <View style={{ flex: 1 }} >
                <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 5 }} >Our Beers</Text>
                <Text style={{ fontSize: 12, fontWeight: 'normal', color: R.colors.colorGray }} >One Redemption every 24 hours</Text>
              </View>
              <View style={{ padding: 5, height: 30, backgroundColor: R.colors.colorOrange, borderRadius: 5, justifyContent: 'center' }} >
                <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >{detailsArray.discount}% {('Off a Craft Beer').toUpperCase()}</Text>
              </View>

            </View>

            {/* Items List */}
            <FlatList
              data={detailsArray.products}
              style={{ marginBottom: 10 }}
              horizontal={false}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.name.toString() + item.price.toString()}
              renderItem={({ item, index }) => {
                return (

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      //this.props.navigation.navigate('desc') 
                    }}
                    style={styles.Card2Style}
                  >
                    <View style={{ width: width / 2.3 }}  >
                      <Image style={styles.ListImage}
                        source={item.images == null || item.images == undefined || item.images == '' ?
                          { uri: R.strings.ProductDescScreen.Texts.image } : { uri: item.images }}
                      />

                      <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '500', marginBottom: 10, marginTop: 10,height:35 }} >{item.name}</Text>

                      <TouchableOpacity style={{ padding: 5, height: 30, width: 80, backgroundColor: R.colors.PrimaryColor, borderRadius: 5, justifyContent: 'center', }} activeOpacity={0.7}
                        // onPress={() => { this.props.navigation.navigate('redeem')  } }
                        onPress={() => { this.RedeemNow(item.name,item.images,item.product_id) }}
                      >
                        <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >Redeem</Text>
                      </TouchableOpacity>

                    </View>

                  </TouchableOpacity>


                )
              }} />
            <Modal
              transparent={true}
              animationType={'none'}
              visible={this.state.showRedeemModal}
              onRequestClose={() => { this.setState({ showRedeemModal: false }) }}>
              <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                  <TouchableOpacity
                  onPress={()=>{this.setState({ showRedeemModal: false }) }}
                  style={{position:'absolute',top:10,right:10}}
                  >
                 <View ><Image source={require('../../assets/images/cancel.png')}
                          style={{
                            height: 18,
                            width: 18,
                          
                          }} /></View>
                          </TouchableOpacity>
                  <View style={[styles.box1]}>

                    {/* <View >
                   <Image style={{borderTopLeftRadius:20,borderTopRightRadius:20}} source={ require('../../assets/images/INvictus.jpeg')}  ></Image>
                 <Text>Tittle</Text>
                     </View> */}
                    {/* <View style={{ flex:1 , justifyContent: 'center', alignItems: 'center' }}> */}
                    <View style={{height:60,width:200,}}
                      //imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, }}
                      // resizeMode='cover'
                      // source={this.state.productImage == null || this.state.productImage == undefined || this.state.productImage == '' ?
                      //     { uri: R.strings.ProductDescScreen.Texts.image } : { uri: this.state.productImage }} 
                     // source={this.state.productImage}
                     >
                      <View style={{ flex: 1, justifyContent: "center",alignItems:'center' }}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18,marginTop:15}}>Click Redeem Now</Text>
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
                      {/* <View ><Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Redeem</Text></View> */}
                      {/* <View ><Text style={{ fontSize: 13, textAlign: "center" }}>Enter your code to Redeem</Text></View> */}

                      {/* Redeem Button */}
                      {/* <View style={{ marginTop: 10 }}>

                        <TextInput
                          style={{ height: 40, borderColor: 'gray', borderWidth: 1, textAlign: 'center' }}
                          onChangeText={text => this.getRedeemCode(text)}
                          placeholder="Please enter the code"
                          placeholderTextColor="grey"

                          value={this.state.redeemcode}
                        />

                      </View> */}
                      <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                        <TouchableOpacity style={[styles.buttonContainer]}
                          activeOpacity={0.7} onPress={() => { this.pressRedeem() }} >
                          <Text style={[styles.buttonText, {
                            padding: 10,
                            fontSize: 12, fontWeight: 'normal'
                          }]}
                          >Redeem Now</Text>
                        </TouchableOpacity>
                      </View>



                    </View>
                  </View>

                </View>
              </View>

            </Modal>


          </View>

        </ScrollView>
        <Loader loading={this.state.loading} />

      </SafeAreaView>
    )
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ?
  getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  HeaderStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 999,
    //paddingTop: 20,
    top: STATUSBAR_HEIGHT,
    position: 'absolute',
    backgroundColor: 'transparent',
    width: width
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: width,
    height: height / 2,
    resizeMode: 'cover'
  },
  whiteView: {
    padding: 5, backgroundColor: 'white', borderRadius: 24,
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
  // modal design----------------------------
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',

  },

  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: '77%',
    borderRadius: 20,
    //padding: 20,
    // borderColor: R.colors.yellowColor,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box1: {

    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  HeaderStyles: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 999,
    paddingTop: 20,
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize'
  },
  buttonContainer: {
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
  },
  //-----------------------end----------
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
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize'
  },
  Card2Style: {
    backgroundColor: 'white',
    shadowRadius: 1,
    margin: 5,
  },
  ListImage: {
    height: 200,
    width: width / 2.3,
    borderRadius: 20
  }
})