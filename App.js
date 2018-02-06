import React from 'react';
import { StyleSheet, Text, View ,StatusBar } from 'react-native';
import MapView from './component/MapView';
import SearchPlace from './component/SearchPlace';

export default class App extends React.Component {
  state={
    location:{},
    error:{},
    view:'search'
  };

   componentDidMount() {
        navigator.geolocation.getCurrentPosition (
            (position) => this.setLocationState(position.coords),
            (error)    => this.setError(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});
    }
    
    distance(lat1, lon1, lat2, lon2) {

      let radlat1 = Math.PI * lat1/180
      let radlat2 = Math.PI * lat2/180
      let theta = lon1-lon2
      let radtheta = Math.PI * theta/180
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = dist * 180/Math.PI
      dist = dist * 60 * 1.1515
      // if (unit=="K") { dist = dist * 1.609344 }
      // if (unit=="N") { dist = dist * 0.8684 }
      return dist * 1.609344;
    }

    checkDisanceToAlert(location){
      let {longitude,latitude} = this.state.location;
      if(this.distance(latitude,longitude,location.latitude,location.longitude) < 1.2){
        alert('your reached the place');
      }
    }

    setError(error){
       this.setState({error:error});
    }

    backgroundAlertProcess(){
      navigator.geolocation.watchPosition (
            (position) => this.checkDisanceToAlert(position.coords),
            (error)    => this.setError(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});
    }

    setLocationState(location){
        this.setState({location:location});
    }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar
         backgroundColor="blue"
         barStyle="light-content"
         message="Silent Switch ON"
         visible={true}
       />
        {this.state.view === 'search' &&<SearchPlace 
        setLocationState={(s)=>this.setLocationState(s)}
        changeView={()=>this.setState({view:'map'})}
        backgroundAlertProcess={()=>this.backgroundAlertProcess()}
        />}
        {this.state.view === 'map' && this.state.location.latitude && <MapView 
          latitude={this.state.location.latitude} 
          longitude={this.state.location.longitude}/>
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:30
  },
});
