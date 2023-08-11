import React, {Component} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image, Switch, ImageBackground,
Dimensions, Platform, ScrollView, ToastAndroid, Alert, StyleSheet, FlatList } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';

import R from '../../res/R';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';

const { height, width } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen');

export default class RedeemHistory extends Component{

    constructor(props){
        super(props);
        this.state = {
         redeemHistory:[],
         loading:false
         }
    }
    componentDidMount(){
      ApiCalls.redeem_History(this)
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "95%",
              alignSelf: 'center',
              backgroundColor: R.colors.lineColor,
              
            }}
          />
        );
      };

    render() {
        return (
            <SafeAreaView style={{
                flex: 1
            }}>
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
            style={styles.titlestyle}>{'Redemption History'}</Text>
            

            </View>

            <View style= {{ height: 10, width: 30 }}/>   

          </View>

            <FlatList
            data={this.state.redeemHistory}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={( {item, index}) => {
                return(
               
                  <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>{ 
                    //this.props.navigation.navigate('desc') 
                  }}
                  style={styles.Card2Style}
                  >
                
                <Image style={[styles.ListImage]}
                  source={{uri: item.product_image}}
                  />

                <View style={[{ margin: 10, width: '60%' }]} >

                <Text  style={styles.buttonText} >{item.product_name}</Text>

                <Text numberOfLines={2} style={[styles.timeText,{ flexShrink: 1 }]}>{item.created_at}</Text>

                <View style={styles.lineStyle} />

                <View style={styles.ViewNameLogoStyle} >

                <View style={styles.logosView} >  
                <Image style={styles.logos} resizeMode={'stretch'}
                source={{uri: item.bewery_logo} } 
                />
                </View>

                <Text numberOfLines={2} style={[styles.buttonText,{ fontWeight: 'normal', flexShrink: 1 }]}>{item.bewery_name}</Text>

                </View>

                </View>

                  </TouchableOpacity>
                )}}
            />
              <Loader loading={this.state.loading} />
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
      textAlign: 'left',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'black',
      textTransform: 'capitalize'
  },
  timeText: {
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: 'gray',
    textTransform: 'capitalize',
    marginTop: 5
},
  Card2Style:{
    backgroundColor: 'white',
    margin: 5,
    flexDirection: 'row', 
    padding: 5 
    },
    ListImage: {
        height: 120,
        width: width/3,
        borderRadius: 10
    },
    lineStyle:{ 
        width: '100%',
        height: 0.5,
        backgroundColor: R.colors.lineColor,
        marginTop: 10
     },
     ViewNameLogoStyle:{
        flexDirection: 'row',
        padding: 0,
        marginTop: 10,
        alignItems: 'center'
     },
     logosView:{
         height: 35,
         width: 35,
       //  borderRadius: 35/2,
        // borderWidth: 2,
        // borderColor: 'black',
         overflow: 'hidden',
         justifyContent: 'center',
         marginRight: 10
     },
     logos:{
        height: 45,
        width: 45,
        alignSelf: 'center'
    }
  })