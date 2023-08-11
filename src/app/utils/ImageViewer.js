import React, { Component } from 'react';
import { View,
  Text,
  TouchableOpacity,
  Animated,
  Image, ToastAndroid,
  Platform, StyleSheet , SafeAreaView, ActivityIndicator } from 'react-native';
  import { PinchGestureHandler, State } from 'react-native-gesture-handler'

  var Imgurl;

  export default class ImageViewer extends Component{

    state = {
        loading: true
      }

    constructor(props){
        super(props);

        const { navigation } = this.props;
        Imgurl = navigation.getParam('imgurl', '');
        if(__DEV__){
        console.log('Image Url', Imgurl);
        }
    }
    scale = new Animated.Value(1)
    onZoomEvent = Animated.event(
      [
        {
          nativeEvent: { scale: this.scale }
        }
      ],
      {
        useNativeDriver: true
      }
    )
  
    onZoomStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        Animated.spring(this.scale, {
          toValue: 1,
          useNativeDriver: true
        }).start()
      }
    }

    render(){
        
        return(
            <SafeAreaView style = {{ flex: 1 }} >
            <View style={{ flex: 1, backgroundColor: 'black' }}>

            <View style={{
            height: 45,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            elevation: 3,
            backgroundColor: 'black'
        }}>
        <TouchableOpacity
                onPress={() => { this.props.navigation.goBack() }}
                activeOpacity={0.7} 
                >
                <View style= {{ flexDirection: 'row', padding: 10, }}>

                <Image
                    style={{ width: 20, height: 20, tintColor: 'white' }}
                    source={ require('../assets/images/cancel.png') }
                />

                </View>
            </TouchableOpacity> 
            <View style= {{ flex: 1 }}>
            <Text numberOfLines={1}
            style={{
                fontSize: 15,
                fontWeight: Platform.OS == 'android' ? 'bold' : '500',
                color: 'white',
                textAlign: 'center',
            }}>Image Viewer</Text>
            </View>
            <View style= {{ height: 10, width: 30 }}/>   
        </View>
        
            <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              <PinchGestureHandler
        onGestureEvent={this.onZoomEvent}
        onHandlerStateChange={this.onZoomStateChange}>
            
            <Animated.Image 
            style = {{ height: "90%", width: "100%", transform: [{ scale: this.scale }] }}
            resizeMode={"contain"} 
            source={{ uri: Imgurl }}
            onLoadEnd={this._onLoadEnd}
            onError={this._onLoadError}
            />
    
    </PinchGestureHandler>

            <ActivityIndicator
          style={styles.activityIndicator}
          animating={this.state.loading}
          size="large"
          color={Platform.OS == 'android' ? "white" : "gray"}
        />

            </View>
            </View>
            
            </SafeAreaView>
        );
    }

    _onLoadEnd = () => {
        this.setState({
          loading: false
        })
      }

      _onLoadError = () => {
        if(Platform.OS == 'android'){
          ToastAndroid.show('Network Fail Error', ToastAndroid.SHORT);
        }else{
          alert('Network Fail Error')
        }
        
        this.setState({
          loading: false
        })
      }

  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }
  })