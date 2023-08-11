import React, { Component } from 'react';
import {
  SafeAreaView, Picker, Button,
  StyleSheet, ActionSheetIOS,
  ScrollView, Platform, PermissionsAndroid,
  View, TouchableOpacity, FlatList,
  Text, Image, TextInput, ToastAndroid, RefreshControl,
  StatusBar, ImageBackground, Dimensions
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import R from '../../res/R';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { getStatusBarHeight } from 'react-native-status-bar-height';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNGooglePlaces from 'react-native-google-places';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';
import RNLocation from 'react-native-location';
import { getUserCurrentLocation } from '../../utils/Global';
RNLocation.configure({
  distanceFilter: 5.0
})

const { height, width } = Platform.OS == 'ios' ? Dimensions.get('screen') : Dimensions.get('window');


export default class home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      refreshing: false,
      region: {
        latitude: 30.7046,
        longitude: 76.7179,
        latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      },
      city:[],
      regionCordinate: 'mohali',
      selectedRegion:'',
      userLat:30.7046,
      userLong:76.7179,
      nearByBrewerry:[],
      markers: [
        {
          coordinate: {
            latitude: 30.7333,
            longitude: 76.7794
          },
          key: '0',
          name: 'Invictus Brewing Company',
          image: require('../../assets/images/invictus-logoo.png')
        },
        {
          coordinate: {
            latitude: 30.7373,
            longitude: 76.7714
          },
          key: '1',
          name: 'Great Divide Brewing Company',
          image: require('../../assets/images/great-divide-logoo.png')
        },
        {
          coordinate: {
            latitude: 30.7379,
            longitude: 76.7734
          },
          key: '2',
          name: 'Insight Brewing Company',
          image: require('../../assets/images/insight-logo.png')
        },
        {
          coordinate: {
            latitude: 30.7353,
            longitude: 76.7754
          },
          key: '3',
          name: 'Pryes Brewing Company',
          image: require('../../assets/images/pryes-logo.png')
        },
        {
          coordinate: {
            latitude: 30.7313,
            longitude: 76.7774
          },
          key: '4',
          name: 'the Unofficial Brewing Company',
          image: require('../../assets/images/the-unofficial-logo.png')
        }
      ],
      PlacesSearch: undefined,
      setPlace:undefined,
    }
    //ApiCalls.getCities(this)
  }
  selectedCity(value,index){
    if(value!=null){

    
    let ind =index-1;
   // selectedRegion
    var region ={
      latitude: this.state.city[ind].co_ordinate.latitude,
      longitude: this.state.city[ind].co_ordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
 
    }
   // console.log('selectedRegion'+region)
    this.setState({
      regionCordinate: value,
      selectedRegion:region
    });
    ApiCalls.getBreweryByCityId(this,this.state.city[ind].city_id)
  }else{
    ApiCalls.getBreweryByCityId(this,this.state.city[0].city_id)
  }
  }
  getCurrentPosition = () => {
    this._mapView.animateToCoordinate(
      {
        latitude: 32.7765,
        longitude: 79.9311,
      }, 1000)
  }
  

  renderShowLocationButton = () => {
    return (
      <TouchableOpacity
        style={styles.myLocationButton}
        onPress={() => {
          this.getCurrentPosition()
        }}
      >
        <MaterialCommunityIcons name='crosshairs-gps' size={24} />
      </TouchableOpacity>
    )

  }

  getNearByBrewery= async() => {
    const userLocation= await getUserCurrentLocation().catch(e => console.log('Error: ', e.message));

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
        var regionSet = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    this.setState({
      userLat: userLocation.latitude,
      userLong: userLocation.longitude,
      region:regionSet
    })
   
    //console.log(regionSet)
   
   
    

   // alert(JSON.stringify(userData))
    // RNLocation.requestPermission({
    //   ios: "whenInUse",
    //   android: {
    //     detail: "coarse"
    //   }
    // }).then(granted => {
    //   if (granted) {
    //     this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {

    //       console.log("  user location>>>>>>>>>>>>")
    //       console.log(locations)
    //      // alert(JSON.stringify(locations[0].longitude)
    //       /* Example location returned
    //       {
    //         speed: -1,
    //         longitude: -0.1337,
    //         latitude: 51.50998,
    //         accuracy: 5,
    //         heading: -1,
    //         altitude: 0,
    //         altitudeAccuracy: -1
    //         floor: 0
    //         timestamp: 1446007304457.029,
    //         fromMockProvider: false
    //       }
    //       */
    //     })
    //   }
    // })
    ApiCalls.getNearBy_brewery(this)
  }

  markerClick(m) {

    this.props.navigation.navigate('desc', { 'detail': m })
    // this.props.navigation.navigate('desc')
   // alert("under development")
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        
        var setPlaceData = {
          latitude: place.location.latitude,
          longitude: place.location.longitude,
          latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }
        this.setState({ PlacesSearch: place,
          setPlace:setPlaceData

         })
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log('Error in AutoComplete', error.message));  // error is a Javascript Error object
  }
  componentWillMount(){
    this.getNearByBrewery()
  }

  componentDidMount() {
  
    this.getNearByBrewery()
    ApiCalls.SearchFilterFunction(this, '', '1')
     ApiCalls.getCities(this)
     
    
    //  if(this.state.city.length!=0){
    //   console.log("this.state.city") 
    //   console.log(this.state.city) 
    //  }
  
    //this.setState({regionCordinate:this.state.city[0].value})

  }

  onRefreshApi = () => {
    this.setState({ refreshing: true });
    ApiCalls.SearchFilterFunction(this, '', '1')
  }

  noItemDisplay() {
    return (
      <View style={{ flex: 1, height: 200, marginLeft: width / 2 - 60, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 10 }} >

        {/* <Image source = {{ uri: item.user_image }} style = {{ height: 40, width: 40, borderRadius: 20, marginLeft: 10, }}  /> */}

        <Text style={{ fontSize: 15, fontWeight: '500', color: 'black', }} >No Brewery Found</Text>


      </View>

    )
  }
  
  render() {
let Off_a_Craft_Beer ='off a craft beer'
    return (
      <SafeAreaView style={{ flex: 1 }}  >
        { /*Header View */}
        <View style={[styles.HeaderStyle]}>

          <TouchableOpacity
            onPress={() => {
              const { navigate } = this.props.navigation.openDrawer();;
            }}
          >
            <View style={[{ flexDirection: 'row', marginLeft: 15 }]}>

              <Image
                style={{ width: 24, height: 24 }}
                source={require('../../assets/images/hamberIcon.png')}
              />
            </View>
          </TouchableOpacity>


          {/* <View style={{ flex: 0.96, alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.9}
              style={styles.location}
              onPress={() => this.openSearchModal()}
            >
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../assets/images/locIcon.png')}
              />
              <Text numberOfLines={1}
                style={[styles.titlestyle, { width: 100 }]}>{this.state.PlacesSearch == undefined ? 'Search Place' : this.state.PlacesSearch.address}</Text>

              <Image
                style={{ width: 16, height: 16, marginLeft: 10 }}
                source={require('../../assets/images/btmArrow.png')}
              />
            </TouchableOpacity>
            

          </View> */}
         
          {/* <View style={{  flex: 0.96, alignItems: 'center',borderRadius:40,marginLeft:50,marginRight:20,backgroundColor:'white', }}>
          <Image
                style={{ width: 20, height: 20 ,position:"absolute",left:10,marginTop:15,}}
                source={require('../../assets/images/locIcon.png')}
              />
          <RNPickerSelect
            
              placeholder={
                { label: 'Search Place', value: null, color: 'White', }
              }
              onValueChange={(value,index) => {
               this.selectedCity(value,index)
                
              }}
              items={this.state.city}
             
             
              value={this.state.regionCordinate}
              textInputProps={{ fontSize: 16, color: "white" }}
              onDonePress={() => { console.log("press") }}
              pickerProps={{ style: { marginLeft:40,overflow: 'hidden' } }}

            />

</View> */}

<View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',marginRight:10}}>
  <View>

  
          <TouchableOpacity activeOpacity={0.9}
            onPress={() => {
              this.props.navigation.navigate('Search')
            }}
            style={styles.whiteView}>

            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../assets/images/searchIcon.png')}
            />
          </TouchableOpacity>
          </View>
          </View>
          {/*<TouchableOpacity activeOpacity={0.9}
  style= {[styles.whiteView,{ marginLeft: 10 }]}
  onPress={() => { this.props.navigation.navigate('MyProfile') } }
  >
  
     <Image
        style={{ width: 24, height: 24 }}
        source={ require('../../assets/images/myAccount.png') }
          />
  </TouchableOpacity>*/}

        </View>

        {/* <Image
        style={{ width: '100%', height: height/1.8 }}
        source={ require('../../assets/images/mapImg.jpg') }
        /> */}

        <View style={{ flex: 1 }}  >
        {!!this.state.region.latitude && !!this.state.region.longitude &&
          <MapView
            ref={mapView => { this._mapView = mapView }}
            showsMyLocationButton={true}
            showsUserLocation={true}
            showsCompass={true}
            followsUserLocation={true}
            loadingEnabled={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps {this.renderShowLocationButton()}
            mapType={'standard'}
            style={styles.map}
            region={this.state.setPlace == undefined ? this.state.region : this.state.setPlace}
            // region={{
            //   latitude: this.state.PlacesSearch == undefined ? 30.7046 : this.state.PlacesSearch.location.latitude,
            //   longitude: this.state.PlacesSearch == undefined ? 76.7179 : this.state.PlacesSearch.location.longitude,
            //   latitudeDelta: 0.015,
            //   longitudeDelta: 0.0121
            // }}



            //  region={{
            //   latitude: this.state.city.length!=0 ? this.state.selectedRegion.latitude : 30.7333,
            //   longitude: this.state.city.length!=0 ? this.state.selectedRegion.longitude  : 76.7794,
            //   latitudeDelta: 0.015,
            //   longitudeDelta: 0.0121
            // }}
            
          >
            {this.state.data.map(marker => (
              <Marker coordinate={marker.coordinate}
                title={marker.name}
                image={marker.logo_image}
                key={marker.key}
                onPress={() => { this.markerClick(marker) }}
              />
            ))}
          </MapView>
  }


          <View style={styles.borderTop} >
            <View style={[styles.Nearby, { justifyContent: 'center' }]} >
              <View style={{
                flex: 0.9, alignItems: 'flex-start',
                flexDirection: 'row'
              }}>
                <Text numberOfLines={1}
                  style={[styles.titlestyle]}>Nearby</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Search')
                 // this.getNearByBrewery()
                }}
              >
                <Text numberOfLines={1}
                  style={[styles.titlestyle, { padding: 5, fontSize: 12, fontWeight: 'normal' }]}>View All</Text>

              </TouchableOpacity>

            </View>
            <FlatList
              data={this.state.nearByBrewerry}
              style={{ marginBottom: 10, marginRight: 0 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.name.toString()}
              ListEmptyComponent={this.noItemDisplay()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefreshApi}
                />
              }
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      try {
                        this.props.navigation.navigate('desc', { 'detail': item })
                      } catch (e) { console.error(e); }

                    }}
                    style={styles.Card2Style}
                  >
                    <View style={{ width: width / 1.5 }}  >
                      <ImageBackground source={item.image == null || item.image == undefined || item.image == '' ?
                        require('../../assets/images/INvictus.jpeg') : { uri: item.image }} style={[styles.FeaturedIconStyle]}
                        imageStyle={{ borderRadius: 20 }} >
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                          <View style={{
                            right: 0, marginRight: 10, marginTop: 10, marginBottom: 5,
                            height: '65%', flexDirection: 'column', zIndex: 999
                          }} >

                            <View style={{ padding: 5, backgroundColor: R.colors.colorOrange, borderRadius: 5 }} >
                              <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >{item.discount}% {(Off_a_Craft_Beer).toUpperCase()}</Text>
                            </View>

                            {/* <View style={{ padding: 5, backgroundColor: R.colors.colorOrange, marginTop: 5, borderRadius: 5}} >
                          <Text style={{ fontSize: 10, textAlign: 'center', fontWeight: 'bold', color: 'white' }} >1 Drink Free</Text>
                        </View> */}

                          </View>

                          <View style={{
                            flexDirection: 'row', alignSelf: 'center', bottom: 0, backgroundColor: '#26262691',
                            padding: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                          }} >

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
                                  style={[styles.titlestyle, { color: 'white', fontSize: 10, fontWeight: 'normal' }]}>{item.distance}</Text>

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
            {/* Login Button */}
            <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 10, marginLeft: 20, marginRight: 20 }]}
              activeOpacity={0.9}
              onPress={() => {
                //this.handleCardPayPress()
                 this.props.navigation.navigate('Subscription')
                
              }}
            >
              <Text style={[styles.titlestyle, { color: 'white', textTransform: 'none' }]} >{'Buy A Package'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Loader loading={this.state.loading} />
      </SafeAreaView>
    )

  }

}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ?
  getStatusBarHeight(true) : StatusBar.currentHeight;


const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    right: 0,
    width: '100%'
  },
  HeaderStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 999, overflow: 'visible',
    top: Platform.OS == 'ios' ? STATUSBAR_HEIGHT : 5,
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
    fontSize: 16, marginLeft: 5,
    fontWeight: Platform.OS == 'ios' ? '500' : 'bold',
    color: 'black',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  whiteView: {
    padding: 10, backgroundColor: 'white', borderRadius: 24,
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
  location: {
    flexDirection: 'row', backgroundColor: 'white', padding: 10,
    borderRadius: 20, alignItems: 'center',
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
  borderTop: {
    backgroundColor: R.colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
  Nearby: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 999,
    bottom: 0,
    overflow: 'visible'
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
  myLocationButton: {
    backgroundColor: 'yellow',
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 15,
    elevation: 3,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 50,
    zIndex: 999
  }
});