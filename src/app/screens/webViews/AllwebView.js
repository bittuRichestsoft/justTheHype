import React, { Component } from 'react';
import {
    SafeAreaView,Text, View, TouchableOpacity, Image, Switch, ImageBackground,
    Dimensions, Platform, ScrollView, ToastAndroid, Alert, StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import R from '../../res/R';
import ApiCalls from '../../utils/ApiCalls';

let CenterWidth = Platform.OS == 'android' ?
    Dimensions.get('window').width / 2 - 50 : Dimensions.get('screen').width / 2 - 50;

const { width, height } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen');

var type;

export default class AllwebView extends Component {


    constructor(props) {
        super(props);

        const { navigation } = this.props;

        type = navigation.getParam('type', 1);

        this.state = {
            dataSource: [
                {
                    id: 0,
                    image: require('../../assets/images/step1.png'),
                    title: 'Visit an Independent Craft Brewery',
                    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. \n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.\n\nVarious versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.'
                },
                {
                    id: 1,
                    image: require('../../assets/images/step2.png'),
                    title: 'Redeem for 50% a Craft Beer',
                    desc: ''
                },
                {
                    id: 2,
                    image: require('../../assets/images/step3.png'),
                    title: 'Enjoy Your Beer',
                    desc: 'Keep discovering great spots locally and across the United States. Share the app with your friends and family'
                }
            ],
            contactDetail:''
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (__DEV__) {
            console.log('Data Type', + '\n' + newProps.navigation.state.params.type + '\n' + newProps)
            console.log('Previous Value', type)
        }
        if (type == newProps.navigation.state.params.type) {

        } else {
            type = newProps.navigation.state.params.type;
        }

    }

    renderViews = (type) => {

        switch (type) {

            case 1:
                return (
                    <View >

                        <View style={[styles.ViewCard1]}>

                            <View style={{ flexDirection: 'row', marginLeft: '5%', alignItems: 'center' }} >

                                <View style={styles.logosView} >
                                    <Image style={styles.logos}
                                        source={require('../../assets/images/calliconwhite.png')}
                                    />
                                </View>

                                <View style={[{ margin: 10, width: '60%' }]} >

                                    <Text style={styles.buttonText} >{'Contact No'}</Text>

                                    <Text style={styles.timeText}>{this.state.contactDetail.phone}</Text>

                                </View>
                            </View>

                            <View
                                style={{
                                    height: 1,
                                    width: "95%",
                                    alignSelf: 'center',
                                    backgroundColor: R.colors.lineColor,

                                }}
                            />

                            <View style={{ flexDirection: 'row', marginLeft: '5%', alignItems: 'center' }} >

                                <View style={styles.logosView} >
                                    <Image style={styles.logos}
                                        source={require('../../assets/images/mail.png')}
                                    />
                                </View>

                                <View style={[{ margin: 10, width: '60%' }]} >

                                    <Text style={styles.buttonText} >{'Email'}</Text>

                                    <Text style={styles.timeText}>{this.state.contactDetail.email}</Text>

                                </View>
                            </View>


                        </View>

                        <View style={[styles.ViewCard, { padding: 0, height: height / 2.5, justifyContent: 'center', alignItems: 'center' }]}>

                            {/* <Image style={{  height: height/2.6, width: '97%', alignSelf: 'center', borderRadius: 10 }}
            source={require('../../assets/images/mapImg.jpg')}
            /> */}
                            {/* {this.state.contactDetail=='' ? 
         <MapView
         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
         mapType={'terrain'}
         style={{ height: height / 2.6, width: '97%', alignSelf: 'center', borderRadius: 10 }}
         region={{
             latitude: 32.784618,
             longitude: -79.940918,
             latitudeDelta: 0.015,
             longitudeDelta: 0.0121
         }}
     >

         <Marker coordinate={{
             latitude:32.784618,
             longitude:-79.940918
         }} />

     </MapView>: */}
     {!!this.state.contactDetail.latitude && !!this.state.contactDetail.longitude &&
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                mapType={'terrain'}
                                style={{ height: height / 2.6, width: '97%', alignSelf: 'center', borderRadius: 10 }}
                                region={{
                                    latitude: this.state.contactDetail=='' ? 32.784618:parseFloat(this.state.contactDetail.latitude),
                                    longitude: this.state.contactDetail=='' ? -79.940918:parseFloat(this.state.contactDetail.longitude),
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121
                                }}
                            >

                                <Marker coordinate={{
                                    latitude: this.state.contactDetail=='' ? 32.784618:parseFloat(this.state.contactDetail.latitude),
                                    longitude: this.state.contactDetail=='' ? -79.940918:parseFloat(this.state.contactDetail.longitude)
                                }} />

                            </MapView>}
                            {/* //} */}

                        </View>

                    </View>
                )
                break;

            case 2:

                return (
                    <View style={styles.ViewCard} activeOpacity={1} >

                    <WebView
                            source={{
                            uri: 'https://www.jttadmin.com/tap_brewery/public/api/v1/privacy-policy'
                            }}
                            style={{ marginTop: 20 }}
                        />
                        {/* <Text style={styles.desstyle}>
                        This privacy policy ("Policy") describes how the personally identifiable information ("Personal Information") you may provide in the "Just The TAP" mobile application ("Mobile Application" or "Service") and any of its related products and services (collectively, "Services") is collected, protected and used. It also describes the choices available to you regarding our use of your Personal Information and how you can access and update this information.
                        </Text>
                        <Text style={styles.desstyle}> 
                        This Policy is a legally binding agreement between you ("User", "you" or "your") and Amendment XXI LLC ("Amendment XXI LLC", "we", "us" or "our"). By accessing and using the Mobile Application and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.
                        </Text>
                        <Text style={{ fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        textTransform: 'capitalize',
        marginTop: 10,
        fontWeight:'600'
        }}>
                            Automatic collection of information</Text> 
                        <Text style={styles.desstyle}>
AWhen you use the Mobile Application, our servers automatically record information that your device sends. This data may include information such as your device's IP address and location, device name and version, operating system type and version, language preferences, information you search for in the Mobile Application, access times and dates, and other statistics.Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding the usage of the Mobile Application and Services. This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system.
                        </Text> */}

                    </View>

                )

                break;
        }

    }
    componentDidMount(){
        ApiCalls.getContactDetail(this)
    }



    render() {

        return (
            <SafeAreaView style={{
                flex: 1, backgroundColor: R.colors.GlowColor
            }}>
                <View style={styles.Header} >
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}>
                        <View style={{ flexDirection: 'row', paddingLeft: 15, paddingBottom: 5, }}>

                            <Image
                                style={{ width: 24, height: 24 }}
                                source={require('../../assets/images/back_arrow.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={1}
                            style={styles.titlestyle}>{type == 1 ? 'Contact Us' : ' Privacy Policy & Billing Terms'}</Text>


                    </View>

                    <View style={{ height: 10, width: 30 }} />

                </View>

                <View style={{ height: 60, marginBottom: -60, backgroundColor: R.colors.PrimaryColor }} />

                {/* <ScrollView> */}

                    <View style={{ padding: 10 }} >

                        {this.renderViews(type)}
                    </View>

                {/* </ScrollView> */}
            </SafeAreaView>

        )

    }

}

const styles = StyleSheet.create({
    Header: {
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
    titlestyle: {
        fontSize: 15,
        fontWeight: Platform.OS == 'android' ? 'bold' : '500',
        color: 'white',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    desstyle: {
        fontSize: 12,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        textTransform: 'capitalize',
        marginTop: 10,
    },
    ViewCard: {
        padding: 10,
        borderRadius: 10,
        margin: 5,
        height: height,
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

    },
    ViewCard1: {
        padding: 10,
        borderRadius: 10,
        margin: 5,
        marginBottom: 10,
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
    logosView: {
        height: 35,
        width: 35,
        borderRadius: 35 / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: 'black'
    },
    logos: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        tintColor: 'white'
    }
})
