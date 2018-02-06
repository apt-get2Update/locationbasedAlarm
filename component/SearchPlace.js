import React from 'react';
import {View, TextInput, TouchableHighlight,Text,ScrollView} from 'react-native';
const key = 'AIzaSyDItLdaNjtFGp6tV34MjmL23JjgdjEB6Z0';
export default class SearchPlace extends React.Component {
  state={
    text:'',
    result:[{}]
  };

  handleSelection(r){
    console.log({latitude:r.geometry.location.lat,longitude:r.geometry.location.lng});
    this.props.setLocationState({latitude:r.geometry.location.lat,longitude:r.geometry.location.lng});
    this.props.changeView();
    this.props.backgroundAlertProcess();
  }

  onPressButton(){
    let {text} = this.state;
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${text}&key=${key}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({result:responseJson.results});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={{height:'100%',width:'100%'}}>
       <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>
      <TouchableHighlight 
        style={{backgroundColor:'#f8bbd0',padding:10,marginTop:20,alignItems:'center'}} 
        onPress={()=>this.onPressButton()}>
        <Text>search</Text>
      </TouchableHighlight>
      <ScrollView style={{padding:20}}>
        {
          this.state.result.map((r,i)=>{
            return (<TouchableHighlight 
                      style={{backgroundColor:'#deffff',marginTop:15,padding:5}}
                      key={i}
                      onPress={()=>this.handleSelection(r)}>
                        <Text>{r.formatted_address}</Text>
                    </TouchableHighlight>)
          })
        }
      </ScrollView>
      </View>
    );
  }
}

