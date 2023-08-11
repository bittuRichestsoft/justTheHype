import React,{ Component } from 'react';
import { View, Text, KeyboardAvoidingView, ImageBackground, Dimensions,
Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView,
Platform, Alert, FlatList, RefreshControl,Switch
} from 'react-native';
import R from '../../res/R';
import AsyncStorage from '@react-native-community/async-storage';
import ApiCalls from '../../utils/ApiCalls';
import Loader from '../../utils/Loader';

const { height, width } = Platform.OS == 'android' ? Dimensions.get('window') : Dimensions.get('screen')
var userId

class NotificationSetting extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            data :[],
            switchValue: false,
          }
    }
    toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    //ApiCalls.EnablePushApi(this, value);
    //state changes according to switch
    //which will result in re-render the text
    this.setState({ switchValue: value })
  };

    componentDidMount(){
     ApiCalls.NotificationListApi(this);

      this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        () => {
          //this.setState({ loading: true });
          //ApiCalls.NotificationListApi(this);
        }
      );

    }

    componentWillUnmount() {
     // this.willFocusSubscription.remove();
    }

    onRefresh = () => {
      this.setState({ 
        refreshing: true
       });
    ApiCalls.NotificationListApi(this);
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: R.colors.lineColor,
              
            }}
          />
        );
      };
    
      ListEmpty = () => {
        return (
          //View to show when list is empty
          <View style={{  padding: 10, marginTop: height/2.5, height: 40, }}>
            
            {/* <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 15, color: 'black' }}>No Notification Found Settinf</Text> */}
    
          </View>
        );
      };
    
    render() {
        return (
            <SafeAreaView style ={[{ flex: 1, backgroundColor: R.colors.white } ]}  >
                
                {/* HeaderHome */}
                <View style={styles.HeaderStyle}>

<TouchableOpacity
          
          onPress={() => { this.props.navigation.goBack(null)  }}>
      <View style= {{ flexDirection: 'row', paddingLeft: 15 }}>

          <Image
              style={{ width: 24, height: 24 }}
              source={ require('../../assets/images/back_arrow.png') }
          />
  </View>
  </TouchableOpacity>
          

            <View style= {{ flex: 1 }}> 
            <Text numberOfLines={1}
            style={styles.titlestyle}>Notifications</Text>
            

            </View>

            <View style= {{ height: 10, width: 30 }}/>   

        </View>
        
    <View style={{ height: 1, backgroundColor: R.colors.GlowColor}} /> 

    {/* <TouchableOpacity activeOpacity={1}
    style={{ flexDirection: 'row', paddingLeft: 25, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} 
        onPress={() => { this.toggleSwitch(!this.state.switchValue) }}>
      <Image source = {require('../../assets/images/notification.png') } 
 style = {{ 
  height: 24,
  width: 24
  }} />

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 15, flexDirection: 'row' }} >
    <Text style= {{ color: 'black', textAlign: 'left', fontWeight: Platform.OS == 'android' ? 'bold' : '700', 
    fontSize: 15, }}>Notifications</Text>

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} >

<Switch
          style={{ marginTop: 0 }}
          onValueChange={this.toggleSwitch}
          value={this.state.switchValue}
          trackColor={{true: R.colors.PrimaryColor, false: Platform.OS=='android'?'#d3d3d3':'#fbfbfb' }}
          thumbColor={'#FFFFFF'}
          ios_backgroundColor="#fbfbfb"

        />
    
</View>
   
    </View>
    </TouchableOpacity>
     <TouchableOpacity activeOpacity={1}
    style={{ flexDirection: 'row', paddingLeft: 25, paddingTop: 15, paddingBottom: 15, paddingRight: 10 }} 
        onPress={() => {this.props.navigation.navigate('notificationHistory') }}>
      <Image source = {require('../../assets/images/notification.png') } 
 style = {{ 
  height: 24,
  width: 24
  }} />

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 15, flexDirection: 'row' }} >
    <Text style= {{ color: 'black', textAlign: 'left', fontWeight: Platform.OS == 'android' ? 'bold' : '700', 
    fontSize: 15, }}>Notifications History</Text>

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }} >


    
</View>
    
    </View>
    </TouchableOpacity> */}

        <FlatList
            data={this.state.data}
            horizontal={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            ListEmptyComponent = {this.ListEmpty}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={(item, index) => item.notification_id.toString()}
            renderItem={({ item, index }) => {
              return(
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                   
                }}>
              <View style = {{ flex: 1, flexDirection: 'row', padding: 10 }} >
              
              <Image source = {{uri:item.bewery_image}}
               style = {{ height: 45, width: 45, borderRadius: 45/2, marginLeft: 10, }} />
              
               <View style = {{ flex: 1, marginLeft: 10, }} >
         
               <View style = {{ flex: 1, flexDirection: 'row',}} >
         
               <Text style = {{ fontSize: 12, fontWeight: '500', color: 'black', marginRight: 5, }} >
                 
               <Text numberOfLines={1} style = {{ fontSize: 12, fontWeight: Platform.OS == 'android' ? 'bold' : '700', color: 'black', marginRight: 5, }} >{item.message}</Text>
                </Text>
         
               
         
               </View>
               <View style = {{ flex: 1, flexDirection: 'row', marginTop: 5  }} >
         
               
         
              <Text style = {{ fontSize: 12, fontWeight: '300', }}>{item.redeem_name}  </Text>
              
         
               </View>
               <Text style = {{ fontSize: 12, fontWeight: '300', }}>{item.bewery_name}</Text>
         
               <View style = {{ flex: 1, flexDirection: 'row', marginTop: 5  }} >
         
               
         
               <Text style = {{ fontSize: 12, fontWeight: '300', }}>{item.created_at + ' ago'}</Text>
         
               </View>
               
         
               </View>
         
              </View> 
              </TouchableOpacity>
               )
            }}        
          />
<Loader loading={this.state.loading} />
</SafeAreaView>
        )
    }
    
}

export default NotificationSetting

const styles = StyleSheet.create({
    HeaderStyle:{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 5,
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
    titlestyle:{
        fontSize: 15,
        fontWeight: Platform.OS == 'android' ? 'bold' : '500',
        color: 'white',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    CardStyle:{
        backgroundColor: 'white',
        shadowRadius: 1,
        borderRadius: 20,
        margin: 5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 1
    
            },
          }),
        },
        categoryIconStyle:{
            padding: 0,
          margin: 5,
          height: 48,
          width: 48,
          resizeMode : 'stretch',
          alignSelf: 'center'
          },
          selectedGreenColor:{ 
            fontSize: 10, 
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
            marginTop: 5,
            marginBottom: 3, 
            }
    })