import React, { Component } from 'react';
import {
  SafeAreaView, Picker, Button,
  StyleSheet, ActionSheetIOS,
  ScrollView, Platform, Modal,
  View, TouchableOpacity,
  Text, Image, ToastAndroid,
  StatusBar, ImageBackground, Dimensions
  
} from 'react-native';
import R from '../../res/R';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const { height, width } = Platform.OS == 'ios' ? Dimensions.get('screen') : Dimensions.get('window');
import { getStatusBarHeight } from 'react-native-status-bar-height';
 import Share from 'react-native-share';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';


export default class redeem extends Component {


  constructor(props) {
    super(props);
    this.state = {
      show: false,
      breweryInfo:'',
      loading: false,
    }
  }
  // Capitalize(str){
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  //   }

  onShare = () => {
    // setTimeout(() => {

    // }, 200);
  
   
    var brew = this.props.navigation.getParam('breweryName');
     var breweryImage = this.props.navigation.getParam('brew_Image');
     var breweryName = this.props.navigation.getParam('breweryFullName');
     // justTheTap://AppStack/drawerHome/home
     var applInk ='justTheTap://AppStack/drawerHome/home'
    var options = {
     // message:"I just received 50% this beer! \n"+breweryName+"\n"+brew +"\n"+applInk,
     message:breweryName+"\n"+brew ,
      url:breweryImage,
     //url:applInk,
    }
    if(Platform.OS == 'ios'){
      Share.open(options)
      .then((res) => { 
        this.setState({ show: false });
        console.log(res) })
      .catch((err) => { 
        this.setState({ show: false });
        err && console.log(err); });
    }else{
      Share.isPackageInstalled('com.richestsoft.tapbrewery')
      .then((response) => {
        if(response.isInstalled){
          Share.open(options)
      .then((res) => { 
        this.setState({ show: false });
        console.log(res) })
      .catch((err) => { 
        this.setState({ show: false });
        err && console.log(err); });
        }else{
          alert("App not installed")
        }
        console.log(response);
        // { isInstalled: true/false, message: 'Package is Installed' }
      })
      .catch((error) => {
        console.log(error);
        // { error }
      });
    }
   

   
    // console.log()

  
    

    
   
    // try {
    //   const result = Share.share({
      
    //     url:breweryImage,
    //     message: brew,
    //   });
    //   if (result.action === Share.sharedAction) {
        
    //     if (result.activityType) {
          
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };
  redemNow(){
    var breweryId = this.props.navigation.getParam('breweryId');
    var prod_id = this.props.navigation.getParam('prod_id');


    let info = {
      breweryId:breweryId,
      prod_id:prod_id,
      // name:name,
      // image:image
    }
  
    this.setState({
      breweryInfo:info,
      //show:true
     })

     ApiCalls.redeem_Now(this )

    // this.setState({ show: false });
    //  this.props.navigation.goBack() 
  }
  render() {
    const brewerySelected =this.props.navigation.getParam('breweryName')
    const breweryImage = this.props.navigation.getParam('brew_Image');
    const giveTap='Give It A Little Tappy' 
    const tapTapTaparoo='Tap Tap Taparoo'
    return (
      <SafeAreaView style={{ flex: 1 }} >
        <View >
          <TouchableOpacity activeOpacity={0.9}
            style={{
              position: 'absolute', zIndex: 999, paddingTop: 3, paddingLeft: 3, paddingRight: 3,
              borderRadius: 200 / 2, borderColor: R.colors.orangeColor, borderWidth: 5, alignSelf: 'center', marginTop: height / 2 - 100
            }}
            onPress={() => { this.redemNow()}}
          >

            <Image
              style={styles.imageStyle}
              source={require('../../assets/images/logo.png')}
            />
          </TouchableOpacity>
          <ImageBackground style={{height: height / 2 ,width:width,}} imageStyle={{ backgroundColor: R.colors.PrimaryColor, borderBottomRightRadius: 50, padding: 10, height: height / 2 }} 
          resizeMode='cover'
          source={breweryImage == null || breweryImage == undefined || this.state.productImage == '' ?
              { uri: R.strings.ProductDescScreen.Texts.image } : { uri: breweryImage }} 
          >
            
            {/* <View style={{ marginTop: '5%' }}>
              <Text style={{ fontSize: 15, color: 'white', fontWeight: '700' }}>Show Screen To Taproom Server</Text>
            </View> */}
            <TouchableOpacity
            style={{marginTop:10,marginLeft:10}}
          onPress={() => { this.props.navigation.goBack(null)  }}>
      {/* <View style= {{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 5, }}></View> */}

          <Image
              style={{ width: 24, height: 24 }}
              source={ require('../../assets/images/back_arrow.png') }
          />
  
  </TouchableOpacity>
            {/* <View style={{ transform: [{ rotate: '180deg' }], marginTop: '5%' }} >
              <MaterialIcon
                style={{ alignSelf: 'center' }}
                size={32}
                name={'access-time'}
                color={'white'}
              />
              <Text style={{ fontSize: 32, textAlign: 'center', color: 'white', fontWeight: '700' }}
              >29:45</Text>
              <Text style={{ fontSize: 15, textAlign: 'center', color: 'white', fontWeight: 'normal' }}
              >Till towards the server</Text>
            </View> */}
          </ImageBackground>
          

          <View style={{ backgroundColor: R.colors.PrimaryColor }} >
            <View style={{ backgroundColor: R.colors.white, borderTopLeftRadius: 50, padding: 30, height: height / 2, justifyContent: 'flex-end' }} >
            <Text style={{ fontSize: 18, textAlign: 'center', color: 'black', fontWeight: '700', marginBottom: Platform.OS == 'ios' ? getStatusBarHeight(true) >= 44 ? 44 : '5%' : '5%' }}>{(brewerySelected)}</Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: 'black', fontWeight: '700', marginBottom: Platform.OS == 'ios' ? getStatusBarHeight(true) >= 44 ? 44 : '5%' : '5%' }}>{(giveTap)}.{'\n'}{(tapTapTaparoo)}</Text>
            </View>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.show}
          onRequestClose={() => { this.setState({ show: false }); this.props.navigation.goBack() }}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>

              <View style={[styles.box1]}>
                <View style={[styles.HeaderStyle]}>

                  <View style={{ height: 30, width: 30 }} />


                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: Platform.OS == 'android' ? 'normal' : '500',
                      color: 'black',
                      textAlign: 'center',
                      textTransform: 'capitalize'
                    }} ></Text>
                  </View>

                  <TouchableOpacity activeOpacity={0.9}
                    onPress={() => {
                      this.setState({ show: false })
                      this.props.navigation.goBack()
                    }} style={{ marginRight: 10 }} >

                    <Image
                      style={{ width: 20, height: 20, tintColor: 'black' }}
                      source={require('../../assets/images/cancel.png')}
                    />
                  </TouchableOpacity>




                </View>

                {/* Profile Image  */}
                <Image source={require('../../assets/images/logo.png')}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 150 / 2,
                    alignSelf: 'center',
                  }} />
                <Text style={[styles.buttonText, {
                  padding: 10,
                  fontSize: 12, color: 'black', fontWeight: 'normal'
                }]}
                >Nice Selection. Cheers! Share this redemption with your friends and family and come back soon! Don’t forget to tip your server! </Text>
                {/* Redeem Button */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                  {/* <TouchableOpacity style={[styles.buttonContainer, { marginRight: 10, }]}
                    activeOpacity={0.7} onPress={() => { this.onShare() }} >
                    <Text style={[styles.buttonText, {
                      padding: 10,
                      fontSize: 12, fontWeight: 'normal'
                    }]}
                    >Share</Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity style={styles.buttonContainer}
                    activeOpacity={0.7} onPress={() => { this.setState({show:false}) }} >
                    <Text style={[styles.buttonText, {
                      padding: 10,
                      fontSize: 12, fontWeight: 'normal'
                    }]}
                    >Ok</Text>
                  </TouchableOpacity>

                </View>
              </View>

            </View>
          </View>

        </Modal>
        <Loader loading={this.state.loading} />

      </SafeAreaView>
    )
  } 
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: R.colors.white,
  },
  imageStyle: {
    height: 180,
    width: 180,
    alignSelf: 'center'
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    borderColor: R.colors.yellowColor,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box1: {

    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: R.colors.PrimaryColor,
    paddingVertical: 10,
    flex: 0.5,
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
  HeaderStyle: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 999,
    paddingTop: 20,
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
});
