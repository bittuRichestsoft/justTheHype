import React, {Component} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image, Switch, ImageBackground,
Dimensions, Platform, ScrollView, ToastAndroid, Alert, StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';

import R from '../../res/R';

let CenterWidth = Platform.OS == 'android' ?
Dimensions.get('window').width/2-50 : Dimensions.get('screen').width/2-50 ;

const { width, height } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen') ;

export default class HowitWork extends Component{


    constructor(props){
        super(props);
        this.state = {
            dataSource:[
                {
                    id: 0,
                    image: require('../../assets/images/step1.png'),
                    title: 'Visit An Independent Craft Brewery',
                    desc: 'Just The TAP is a subscription-based mobile app that works with independent craft breweries for you to explore your neighbors in beer throughout the year'
                },
                {
                    id: 1,
                    image: require('../../assets/images/step2.png'),
                    title: 'Redeem For 50% A Craft Beer',
                    desc: ''
                },
                {
                    id: 2,
                    image: require('../../assets/images/step3.png'),
                    title: 'Enjoy Your Beer',
                    desc: 'Keep discovering great spots locally and across the United States. Share the app with your friends and family'
                }
            ]
        }
    }


    render(){

        return(
            <SafeAreaView style={{
                flex: 1, backgroundColor: R.colors.GlowColor
            }}>
          <View style = {styles.Header} >
          <TouchableOpacity
          onPress={() => { this.props.navigation.goBack(null)  }}>
      <View style= {{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 5, }}>

          <Image
              style={{ width: 24, height: 24 }}
              source={ require('../../assets/images/back_arrow.png') }
          />
  </View>
  </TouchableOpacity>
       
  <View style= {{ flex: 1 }}> 
            <Text numberOfLines={1}
            style={[styles.titlestyle,{ textTransform: 'none' }]}>{'How It Works'}</Text>
            

            </View>

            <View style= {{ height: 10, width: 30 }}/>   

          </View>


        <View style = {{ height: 60, marginBottom: -60, backgroundColor: R.colors.PrimaryColor }} />

        <ScrollView>

        <View style={{ padding: 10 }} >

        {this.state.dataSource.map((tag, i) => {
    return(
            <TouchableOpacity style={styles.ViewCard} key={i} activeOpacity={1} >

            <View style={{ height: 50, width: 50, padding: 0, alignSelf: 'center', 
            alignItems: 'center', justifyContent: 'center', borderRadius: 50/2, borderColor: R.colors.lineColor, borderWidth: 2  }} >

            <Image style={{  height: 40, width: 40, alignSelf: 'center' }}
            source={tag.image}
            />

            </View>

            <Text style={[styles.titlestyle,{ marginTop: 10, color: 'black', textTransform: 'none'}]}>{tag.title}</Text>

           <Text style={[styles.desstyle,{ textTransform: 'none' }]}>{tag.desc}</Text>

            </TouchableOpacity>

    )
        })}
        </View>

        </ScrollView>
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

     }
})
