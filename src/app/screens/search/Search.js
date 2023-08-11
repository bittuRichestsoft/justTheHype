import React, { Component } from 'react';
import {
  SafeAreaView, Picker, Button,
  StyleSheet, ActionSheetIOS,
  ScrollView, Platform,
  View, TouchableOpacity, FlatList,
  Text, Image, TextInput, ToastAndroid,
  StatusBar, ImageBackground, Dimensions, Modal
} from 'react-native';
import R from '../../res/R';
import Slider from "react-native-slider";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';
import { getUserCurrentLocation } from '../../utils/Global';
const { height, width } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen')

export default class Search extends Component {


  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      text: '',
      loading: true,
      categoryTags: [],
      TypesTags: [],
      // StyleTags: [{ style_id:1,name: 'Amber', click: false }, { style_id:2,name: 'Blonde', click: false },
      // { style_id:3,name: 'Brown', click: false }, { style_id:4,name: 'Cream', click: false }, { style_id:5,name: 'Golden', click: false },
      // { style_id:6,name: 'Pale', click: false }, { style_id:7,name: 'Pilsner', click: false }, { style_id:8,name: 'Porter', click: false }],
      modalVisible: false,
      data: [],
      categoryIdArr:[],
      styleIdArr:[],
      typeIdArr:[],
      StyleTags:[],
      userLat:"",
      userLong:"",

    };
  }

 async componentDidMount() {
    const userLocation= await getUserCurrentLocation().catch(e => console.log('Error: ', e.message));
//alert(JSON.stringify(userLocation))
    // var regionSet = {
    //   latitude: userLocation[0].latitude,
    //   longitude: userLocation[0].longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // }
    // this.setState({
    //   userLat: userLocation[0].latitude,
    //   userLong: userLocation[0].longitude,
    //   region:regionSet
    // })
    this.setState({
      userLat: userLocation.latitude,
      userLong: userLocation.longitude
    })
      
    // this.setState({
    //   userLat: userLocation.latitude,
    //   userLong: userLocation.longitude,
    //   region:regionSet
    // })
   
    ApiCalls.getProductStyle(this);
   // ApiCalls.ProductByCatListApi(this);
    ApiCalls.BeerTypesListApi(this);

    ApiCalls.SearchFilterFunction(this, '', '1')
  }

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({ text: '' })
  }

  SearchFilterFunction(text) {
    //that.searchpage = that.searchpage + 1;
   
    var newData = this.state.data.filter(function (item) {
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.match(textData)
      //item.name.toLowerCase().match(text)
    })

   

    if (text == '' || text == undefined || text == null) {
      newData = [
        {
          id: 1,
          name: 'Invictus Brewing Company',
          icon: require('../../assets/images/INvictus.jpeg'),
          logo: require('../../assets/images/InvictusLOGO.jpg'),
          status: true
        },
        {
          id: 2,
          name: 'Greater Divide Brewing Company',
          icon: require('../../assets/images/GreatDivide.jpeg'),
          logo: require('../../assets/images/greatDivideLogo.jpeg'),
          status: false
        },
        {
          id: 3,
          name: 'Smaller Brewing Company',
          icon: require('../../assets/images/INvictus.jpeg'),
          logo: require('../../assets/images/InvictusLOGO.jpg'),
          status: false
        },
        {
          id: 4,
          name: 'Greater Brewing Company',
          icon: require('../../assets/images/GreatDivide.jpeg'),
          logo: require('../../assets/images/greatDivideLogo.jpeg'),
          status: false
        },
        {
          id: 5,
          name: 'Invictus Brewing Company',
          icon: require('../../assets/images/INvictus.jpeg'),
          logo: require('../../assets/images/InvictusLOGO.jpg'),
          status: false
        },
        {
          id: 6,
          name: 'Smaller Brewing Company',
          icon: require('../../assets/images/GreatDivide.jpeg'),
          logo: require('../../assets/images/greatDivideLogo.jpeg'),
          status: false
        },
        {
          id: 7,
          name: 'Greater Brewing Company',
          icon: require('../../assets/images/GreatDivide.jpeg'),
          logo: require('../../assets/images/greatDivideLogo.jpeg'),
          status: false
        },
        {
          id: 8,
          name: 'Invictus Brewing Company',
          icon: require('../../assets/images/INvictus.jpeg'),
          logo: require('../../assets/images/InvictusLOGO.jpg'),
          status: false
        }
      ]
    }

    this.setState({
      data: newData,
      text: text
    })
  }
  resetFilterValues(){
  this.setState({
    value: 1,
  })
 //console.log()
  for(var i=0 ;i<this.state.categoryTags.length;i++){
    this.state.categoryTags[i].click = false
  }
  for(var i=0 ;i<this.state.TypesTags.length;i++){
    this.state.TypesTags[i].click = false
  }
  for(var i=0 ;i<this.state.StyleTags.length;i++){
    this.state.StyleTags[i].click = false
  }
  ApiCalls.SearchFilterFunction(this, '', '1')
  this.setState({
    modalVisible: !this.state.modalVisible
  });
  }

  setModalVisibility = async() => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
    
    const userCurrentLocation= await getUserCurrentLocation();
    // this.setState({
    //   userLat: userCurrentLocation[0].latitude,
    //   userLong: userCurrentLocation[0].longitude
    // })
     this.setState({
      userLat: userCurrentLocation.latitude,
      userLong: userCurrentLocation.longitude
    })

   ApiCalls.FilterApiFunction(this)
   
  };

  noItemDisplay() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }} >

        {/* <Image source = {{ uri: item.user_image }} style = {{ height: 40, width: 40, borderRadius: 20, marginLeft: 10, }}  /> */}

        <Text style={{ fontSize: 15, fontWeight: '500', color: 'black', }} >No Match Found</Text>


      </View>

    )
  }

  render() {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: R.colors.white }]}  >


        <View style={{
          marginBottom: 0,
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

          {/* HeaderHome */}
          <View style={{
            height: 45,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingTop: Platform.OS == 'android' ? 5 : 10,
            backgroundColor: R.colors.PrimaryColor,
          }}>

            <TouchableOpacity
              style={{ justifyContent: 'center' }}
              onPress={() => { this.props.navigation.goBack(null) }}>
              <View style={{ flexDirection: 'row', paddingLeft: 15 }}>

                <Image
                  style={{ width: 24, height: 24 }}
                  source={require('../../assets/images/back_arrow.png')}
                />
              </View>
            </TouchableOpacity>



            <View style={{ flex: 1 }}>
              <Text numberOfLines={1}
                style={{
                  fontSize: 15,
                  fontWeight: Platform.OS == 'android' ? 'bold' : '500',
                  color: 'white',
                  textAlign: 'center',
                  textTransform: 'capitalize'
                }}>{'Search'}</Text>


            </View>

            <View style={{ height: 10, width: 30, paddingRight: 10 }} />

            <TouchableOpacity onPress={() => {
              this.setModalVisibility()
              //this.props.navigation.navigate(Routes.Filter)

            }}>
              <View style={{ flexDirection: 'row', paddingRight: 10, paddingBottom: 5 }}>

                <Image
                  style={{ width: 24, height: 24, tintColor: 'white' }}
                  source={require('../../assets/images/ic_filter.png')}
                />
              </View>
            </TouchableOpacity>


          </View>


          {/* Next View */}
          <View style={
            { backgroundColor: R.colors.PrimaryColor, alignItems: 'center', height: 60, zIndex: 999, overflow: 'visible' }
          } >
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                height: 50,
                borderColor: 'transparent',
                backgroundColor: 'white',
                paddingRight: 0,
                borderRadius: 10,
                borderWidth: 1,
                overflow: 'hidden',
                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                  },
                  android: {
                    elevation: 2

                  },
                }),
              }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: 5 }} activeOpacity={0.7}

              >
                <Image source={require('../../assets/images/searchIcon.png')}
                  style={[styles.imageStyle, { marginLeft: 10, tintColor: R.colors.colorGray }]} />
                <TextInput style={[styles.inputSearch, { flex: 1, height: 50, alignItems: 'center', color: 'black' }]}
                  placeholderTextColor={R.colors.colorGray}
                  onChangeText={(text) => { ApiCalls.SearchFilterFunction(this, text, '1'); this.setState({ text }) }}
                  ref={'textInput1'}
                  placeholder={'Search'}></TextInput>

                {this.state.text === '' ? <View style={{ height: 20, width: 20 }} />
                  : <TouchableOpacity activeOpacity={0.7}
                    style={{ marginRight: 10, height: 20, width: 20, backgroundColor: R.colors.lightGray, borderRadius: 20 / 2, justifyContent: 'center' }}
                    onPress={() => {
                      this.clearText('textInput1');
                      this.setState({ text: '' });
                      ApiCalls.SearchFilterFunction(this, '', '1')
                    }}
                  >
                    <Image source={require('../../assets/images/cancel.png')}
                      style={[styles.imageStyle, { margin: 0, width: 10, height: 10, tintColor: R.colors.white, alignSelf: 'center' }]} />
                  </TouchableOpacity>
                }
              </View>
            </View>




          </View>



        </View>

        {this.state.data.length == 0 ?
          this.noItemDisplay() :
          <FlatList
            data={this.state.data}
            style={{ marginBottom: 10, marginRight: 0 }}
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.name.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    this.props.navigation.navigate('desc', { 'detail': item })
                  }}
                  style={styles.Card2Style}
                >
                  <View style={{ width: width / 2.1 }}  >
                    <ImageBackground source={item.image == null || item.image == undefined || item.image == '' ?
                      require('../../assets/images/INvictus.jpeg') : { uri: item.image }} style={[styles.FeaturedIconStyle]}
                      imageStyle={{ borderRadius: 20 }} >
                      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                        <View style={{
                          right: 0, marginRight: 10, marginTop: Platform.OS == 'ios' ? 10 : 5, marginBottom: 5,
                          height: '65%', flexDirection: 'column', zIndex: 999
                        }} >

                          <View style={{ padding: 5, backgroundColor: R.colors.colorOrange, borderRadius: 5 }} >
                            <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >{item.discount}% {('Off a Craft Beer').toUpperCase()}</Text>
                          </View>

                          {/* <View style={{ padding: 5, backgroundColor: R.colors.colorOrange, marginTop: 5, borderRadius: 5}} >
                          <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >1 Drink Free</Text>
                        </View> */}

                        </View>

                        <View style={{
                          flexDirection: 'row', alignSelf: 'center', bottom: 0, backgroundColor: '#26262691',
                          padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                        }} >

                          {/* <Image
                            style={{ width: 30, height: 30, borderRadius: 30 / 2, marginRight: 10, }}
                            source={require('../../assets/images/InvictusLOGO.jpg')}
                          /> */}
                          <Image
                              style={{ width: 40, height: 40, borderRadius: 40 / 2, marginRight: 10, }}
                              source={item.image == null || item.image == undefined || item.image == '' ?
                        require('../../assets/images/INvictus.jpeg') : { uri: item.logo_image }}
                             // source={require('../../assets/images/InvictusLOGO.jpg')}
                            />
                          <View style={{ flex: 1 }} >
                            <Text numberOfLines={1} style={{ fontSize: 10, textAlign: 'left', fontWeight: 'normal', color: 'white' }} >{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }} >
                              <Image
                                style={{ width: 12, height: 12, tintColor: 'white' }}
                                source={require('../../assets/images/locIcon.png')}
                              />
                              <Text numberOfLines={1}
                                style={[styles.titlestyle, { color: 'white', fontSize: 10, marginLeft: 5, fontWeight: 'normal' }]}>{item.distance}</Text>

                            </View>
                          </View>
                          <View style={{ padding: 5, height: 30, backgroundColor: R.colors.colorGreen, borderRadius: 5, justifyContent: 'center' }} >
                            <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >Open</Text>
                          </View>


                        </View>
                      </View>
                    </ImageBackground>
                  </View>

                </TouchableOpacity>
              )
            }} />
        }

        <Modal visible={this.state.modalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={this.setModalVisibility}
        >

          <SafeAreaView style={{ flex: 1, }}  >
            <View style={[styles.HeaderStyle]}>
              <TouchableOpacity

                onPress={() => { this.setModalVisibility() }}>
                <View style={{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 5, }}>

                  <Image
                    style={{ width: 24, height: 24, }}
                    source={require('../../assets/images/back_arrow.png')}
                  />
                </View>
              </TouchableOpacity>


              <View style={{ flex: 1 }}>
                <Text numberOfLines={1}
                  style={[styles.titlestyle]}>Filter</Text>


              </View>

              <View style={{ height: 10, width: 30 }} />



            </View>

            <ScrollView contentContainerStyle={{ padding: 20, }} >

              <View >
                <View style={{ flexDirection: 'row', marginBottom: 20 }} >
                  <Text style={{
                    fontSize: 15,
                    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
                    color: 'black',
                    textAlign: 'center',
                    textTransform: 'capitalize'
                  }} >Distance</Text>
                  <View style={{ flex: 1 }} />
                  <Text>{this.state.value} Miles</Text>
                </View>

                <Slider
                  value={this.state.value}
                  onValueChange={value => this.setState({ value })}
                  trackStyle={styles.track}
                  thumbStyle={styles.thumb}
                  minimumTrackTintColor={R.colors.PrimaryColor}
                  minimumValue={1}
                  maximumValue={1000}
                  step={5}
                />

                {/* <Text style={{
                  fontSize: 15,
                  fontWeight: Platform.OS == 'android' ? 'bold' : '500',
                  color: 'black',
                  textTransform: 'capitalize',
                  marginTop: 20,
                  marginBottom: 10
                }} >Beer Category</Text> */}
{/* 
                <View style={{ flexDirection: 'row', overflow: 'scroll' }} >
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {this.state.categoryTags.map((tag, i) => {
                       
                      return (
                        
                        <TouchableOpacity key={i} style={tag.click ? [styles.ClickedView] : [styles.SignInBtnContainer]}
                          activeOpacity={0.9}
                          onPress={() => {
                            var foundIndex = this.state.categoryTags.findIndex(items => items.category_id == tag.category_id);
                          
                            if (this.state.categoryTags[foundIndex].click) {
                              var dummyList = this.state.categoryTags;
                              dummyList[foundIndex].click = false;
                              this.setState({ categoryTags: dummyList })
                              this.state.categoryIdArr.pop(this.state.categoryTags[foundIndex].category_id)
                            
                            } else {
                              var dummyList = this.state.categoryTags;
                              dummyList[foundIndex].click = true;
                              this.setState({ categoryTags: dummyList })
                              this.state.categoryIdArr.push(this.state.categoryTags[foundIndex].category_id)
                             
                            }
                           

                          }}
                        >
                          <Text style={tag.click ? [styles.buttonText, {
                            padding: 10,
                            fontSize: 12, fontWeight: 'normal'
                          }] : [styles.buttonText, {
                            padding: 10,
                            fontSize: 12, color: 'black', fontWeight: 'normal'
                          }]}
                          >{tag.category_name}</Text>
                        </TouchableOpacity>
                      )
                    })}
                  </ScrollView>
                </View> */}

                <Text style={{
                  fontSize: 15,
                  fontWeight: Platform.OS == 'android' ? 'bold' : '500',
                  color: 'black',
                  textTransform: 'capitalize',
                  marginTop: 20,
                  marginBottom: 10
                }} >Beer Types</Text>

                <View style={{
    flexDirection: 'row',
    flexWrap: 'wrap'
  }} 
    >
                  {/* <ScrollView   showsHorizontalScrollIndicator={false} > */}
                    {this.state.TypesTags.map((tag, i) => {
                      return (
                        <View>
                        <TouchableOpacity key={i} style={tag.click ? [styles.ClickedView] : [styles.SignInBtnContainer]}
                          activeOpacity={0.9}
                          //style={{backgroundColor: i==0 ? 'red':''}}
                          onPress={() => {
                            var foundIndex = this.state.TypesTags.findIndex(items => items.type_id == tag.type_id);
                           
                            if (this.state.TypesTags[foundIndex].click) {
                              var dummyList = this.state.TypesTags;
                              dummyList[foundIndex].click = false;
                              this.setState({ TypesTags: dummyList })
                             
                              this.state.typeIdArr.pop(this.state.TypesTags[foundIndex].type_id)
                             
                            } else {
                              var dummyList = this.state.TypesTags;
                              dummyList[foundIndex].click = true;
                              this.setState({ TypesTags: dummyList })
                              
                              this.state.typeIdArr.push(this.state.TypesTags[foundIndex].type_id)
                            
                            }
                          }}>
                          <Text style={tag.click ? [styles.buttonText, {
                            padding: 10,
                            fontSize: 12, fontWeight: 'normal'
                          }] : [styles.buttonText, {
                            padding: 10,
                            fontSize: 12, color: 'black', fontWeight: 'normal'
                          }]}
                          >{tag.type_name}</Text>
                        </TouchableOpacity>
                        </View>
                      )
                    })}
                  {/* </ScrollView> */}
                </View>

                <Text style={{
                  fontSize: 15,
                  fontWeight: Platform.OS == 'android' ? 'bold' : '500',
                  color: 'black',
                  textTransform: 'capitalize',
                  marginTop: 20,
                  marginBottom: 10
                }} >Beer Styles</Text>

                {/* <View style={{ flexDirection: 'row', overflow: 'scroll' }} > */}
                <View style={{  flexDirection: 'row',
    flexWrap: 'wrap' }} >
                  {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} > */}
                   
                    {this.state.StyleTags.map((tag, i) => {
                      return (
                        <TouchableOpacity key={i} style={tag.click ? [styles.ClickedView] : [styles.SignInBtnContainer]}
                          activeOpacity={0.9}
                          onPress={() => {
                            var foundIndex = this.state.StyleTags.findIndex(items => items.style_id == tag.style_id);
                            
                            if (this.state.StyleTags[foundIndex].click) {
                              var dummyList = this.state.StyleTags;
                              dummyList[foundIndex].click = false;
                              this.setState({ StyleTags: dummyList })
                             
                              this.state.styleIdArr.pop(this.state.StyleTags[foundIndex].style_id)
                             
                            } else {
                              var dummyList = this.state.StyleTags;
                              dummyList[foundIndex].click = true;
                              this.setState({ StyleTags: dummyList })
                             
                              this.state.styleIdArr.push(this.state.StyleTags[foundIndex].style_id)
                            
                            }
                          }}
                        >
                          <Text style={tag.click ? [styles.buttonText, {
                            padding: 10,
                            fontSize: 12, fontWeight: 'normal'
                          }] : [styles.buttonText, {
                            padding: 10,
                            fontSize: 12, color: 'black', fontWeight: 'normal'
                          }]}
                          >{tag.style_name}</Text>
                        </TouchableOpacity>
                      )
                    })}
                  {/* </ScrollView> */}
                </View>


              </View>

            </ScrollView>

            <View style={Platform.OS == 'android' ?
              { flexDirection: 'row', bottom: 10, paddingTop: 10, borderTopColor: R.colors.hintColor, borderTopWidth: 1, paddingLeft: 20, paddingRight: 20 }
              : { flexDirection: 'row', bottom: getStatusBarHeight() >= 44 ? 0 : 10, paddingTop: 10, borderTopColor: R.colors.hintColor, borderTopWidth: 1, paddingLeft: 20, paddingRight: 20 }
            } >

              <TouchableOpacity style={[styles.buttonContainer, {
                alignItems: 'center', borderWidth: 1,
                borderColor: R.colors.PrimaryColor, backgroundColor: 'white', flex: 0.5
              }]}
                activeOpacity={0.8}
                onPress={() => {
                 this.resetFilterValues()
                  //this.setModalVisibility()
                  //   var dummyArray = this.state.categoryTags;
                  //   {this.state.categoryTags.map((tag, i) => {

                  //       if(tag.click){
                  //         tag.click = false
                  //       }
                  //     this.setState({  })
                  // })}
                  this.setState({ value: 1 })
                }}
              >
                <Text style={[styles.buttonText, { color: R.colors.PrimaryColor }]} >{'Reset'}</Text>
              </TouchableOpacity>
              <View style={{ flex: 0.1 }} />
              <TouchableOpacity style={[styles.buttonContainer, { alignItems: 'center', flex: 0.5 }]}
                activeOpacity={0.8}
                onPress={() => {
                  this.setModalVisibility()
 //ApiCalls.FilterApiFunction(this)
                }}
              >
                <Text style={styles.buttonText} >{'Save'}</Text>
              </TouchableOpacity>

            </View>



          </SafeAreaView>

        </Modal>

        <Loader loading={this.state.loading} />
      </SafeAreaView>
    )
  }

}


const styles = StyleSheet.create({
  imageStyle: {
    padding: 0,
    margin: 5,
    height: 16,
    width: 16,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  inputSearch: {
    paddingLeft: 5,
    height: 50,
    fontSize: 12,
    color: R.colors.colorGray,
  },
  track: {
    height: 3,
    borderRadius: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: 'white',
    borderColor: R.colors.PrimaryColor,
    borderWidth: 2,
  },
  SignInBtnContainer: {
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    marginTop:10,
    borderColor: R.colors.GlowColor,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ClickedView: {
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    marginTop:10,
    borderColor: 'transparent',
    backgroundColor: R.colors.PrimaryColor,
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
  HeaderStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.PrimaryColor,
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
  titlestyle: {
    fontSize: 15,
    fontWeight: Platform.OS == 'android' ? 'bold' : '500',
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  buttonContainer: {
    height: 50,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: R.colors.PrimaryColor,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
        borderWidth: 0.2,
        borderColor: '#000'

      },
    })
  },
  Card2Style: {
    backgroundColor: 'white',
    shadowRadius: 1,
    margin: 5,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,


      },
    }),
  },
  FeaturedIconStyle: {
    height: 180,
    width: '100%',
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  selectedGreenColor: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
})