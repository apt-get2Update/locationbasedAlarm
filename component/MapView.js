import React from 'react';
import {View} from 'react-native';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';

export default class MapViewComponent extends React.Component {
  onRegionChange(r){
    console.log(r);
  }
  onPress(l){
    console.log(l);
  }
  render() {
    let {latitude,longitude}=this.props;
    return (
      <View style={{height:'70%',width:'100%'}}>
        <MapView
          style={{height:'100%',width:'100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude ,
            longitude:longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude
              }}
              title={'hai'}
              onPress={(l)=>this.onPress(l)}
              description={'hello'}>
            <MapView.Callout onPress={(l)=>this.onPress(l)}/>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

