import React,{ Component } from 'react';
import {
  SafeAreaView, StyleSheet,
  ScrollView, Platform,
  View, TouchableOpacity,
  Text, Image, TextInput, ToastAndroid,
  StatusBar, ImageBackground, Dimensions
} from 'react-native';
import R from '../../res/R';

const { height, width } = Platform.OS == 'ios' ? Dimensions.get('screen') : Dimensions.get('window');


export default class OrderPlaced extends Component{


    constructor(props){
        super(props);
    }


render(){
    return(
        <SafeAreaView  style={{ flex: 1 }} >

<ScrollView >

<View style={{ margin: 20, }} >

<View style = {{ 
  height: 100,
  width: 100,
  borderRadius: 100/2,
  backgroundColor: R.colors.colorYellow,
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
        elevation: 5

    },
  })
  }} >
<Image source = {require('../../assets/images/tick.png') } 
      style = {{ 
       height: 50,
       width: 50,
       tintColor: 'white'
       }} />
  </View>

<Text style={[styles.buttonText,{ fontWeight: '700' }]} >{'Order Placed'}</Text>

<Text style={styles.desstyle} >{'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}</Text>

   
<Text style={[styles.buttonText,{ fontWeight: '700', fontSize: 16, color: R.colors.colorYellow }]} >{'Blarney Brothers'}</Text>

<Text style={styles.timeText}>{'March 20, 2020 at 1: 25 PM'}</Text>


<View style={styles.ViewNameLogoStyle} >

                <View style={styles.logosView} >  
                <Image style={styles.logos} resizeMode={'stretch'}
                source={require('../../assets/images/InvictusLOGO.jpg')}  
                />
                </View>

                <Text style={[styles.buttonText,{ fontWeight: 'normal', marginTop: 0, fontSize: 16 }]}>{'Invictus Brewing Company'}</Text>

                </View>


<View style={{ justifyContent: 'flex-end', height: height/2.3 }} >
<TouchableOpacity style = {[styles.buttonContainer,{ marginBottom: 0 }]} 
          activeOpacity={0.9} 
          onPress={() => {
            //this.props.navigation.navigate('Auth');
            this.props.navigation.goBack();
            // if (Platform.OS == 'android') {
            // ToastAndroid.show('Password Changed Successfully', ToastAndroid.SHORT);
            // }else{
            //   alert('Password Changed Successfully');
            // }
          }}
          >
          <Text style = {[styles.buttonText,{ color: 'white', marginTop: 0, fontSize: 16 }]} >View Details</Text>
          </TouchableOpacity>

{/* Keep Order Button */}
<TouchableOpacity style = {[styles.buttonContainer,{ marginTop: 10 }]} 
          activeOpacity={0.9} 
          onPress={() => {
            //this.props.navigation.navigate('Auth');
            this.props.navigation.goBack();
            // if (Platform.OS == 'android') {
            // ToastAndroid.show('Password Changed Successfully', ToastAndroid.SHORT);
            // }else{
            //   alert('Password Changed Successfully');
            // }
          }}
          >
          <Text style = {[styles.buttonText,{ color: 'white', marginTop: 0, fontSize: 16 }]} >Keep Order</Text>
          </TouchableOpacity>
          </View>
</View>
</ScrollView>
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
        marginTop: 10,
        lineHeight: 20
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
        ViewNameLogoStyle:{
            flexDirection: 'row',
            padding: 0,
            marginTop: 30,
            alignItems: 'center',justifyContent: 'center'
         },
         logosView:{
             height: 35,
             width: 35,
             borderRadius: 35/2,
             borderWidth: 2,
             borderColor: 'black',
             overflow: 'hidden',
             justifyContent: 'center',
             marginRight: 10
         },
         logos:{
            height: 45,
            width: 45,
            alignSelf: 'center'
        },
        timeText: {
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'normal',
            color: 'gray',
            textTransform: 'capitalize',
            marginTop: 10
        }

})