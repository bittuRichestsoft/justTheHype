import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { width } = Dimensions.get('screen');

function MiniOfflineSign() {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  }

class OfflineNotice extends PureComponent{
    state = {
        isConnected: true
      };

      componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
      }

      componentWillUnmount(){
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
      }

      handleConnectivityChange = isConnected => {
          if(isConnected){
            this.setState({ isConnected });
          }else{
            this.setState({ isConnected });
          }
      }

render(){
    if(!this.state.isConnected){
    return <MiniOfflineSign/>;
    }
    return null;
    }
    }

const styles = StyleSheet.create({
    offlineContainer: {
      backgroundColor: '#b52424',
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: width,
      //marginTop: Platform.OS == 'ios' ? getStatusBarHeight(true) > 20 ? getStatusBarHeight(true) : 0 : 0,
      position: 'absolute',
      zIndex: 999,
      bottom: Platform.OS == 'ios' ? getStatusBarHeight(true) > 20 ? 20 : 0 : 0
    },
    offlineText: { 
      color: '#fff'
    }
  });

  export default OfflineNotice;