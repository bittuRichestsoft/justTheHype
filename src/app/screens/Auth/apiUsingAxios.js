import React from 'react';
import axios from 'axios';
import { Text, View, FlatList } from 'react-native';
const URL = 'https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt'

export default class Requests extends React.Component {
  state = {
    nameList: []
  }
// make the GET request to fetch data from the URL then using promise function to handle response.
  componentDidMount() {
    axios.get(URL)
      .then(res => {
        this.setState({ nameList: res.data.datasources });
        if(__DEV__){ console.log('Whole Data', res) }
      })
  }

  render() {
   const {nameList} = this.state;
   return (
      <View>
          <FlatList
                    data={this.state.nameList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={( {item, index}) => {
                      return(
                        <View>
        <Text style={{ color: 'black' }} >{item.name}</Text>

                            </View>
                      )}} />
      </View>
    )
  }
}