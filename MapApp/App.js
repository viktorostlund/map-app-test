import React, { Component } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import { API_KEY } from 'react-native-dotenv'
console.log(API_KEY);

const startLocation = {
  latitude: 59.3324,
  longitude: 18.0645,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

Geocoder.init(API_KEY);

export default class HelloWorldApp extends Component {
  
  constructor() {
    super();
    this.state = { 
      region: startLocation,
      currentLocation: 'Hej'
    };
  }

  componentDidMount() {
    this.setNewMarkerLocation(this.state.region.latitude, this.state.region.longitude);
  }

  async setNewMarkerLocation(lat, long) {
    const address = await Geocoder.from(lat, long)
      .then(json => json.results[0]['formatted_address'])
      .catch(error => console.warn(error));
    this.setState({
      currentLocation: address
    });
  }

  render() {
    return (
      <MapView
        style={{flex: 1}}
        region={this.state.region}
        onRegionChange={() => this.setState({region: this.onRegionChange})}
        showsUserLocation={true}
        onMarkerDragEnd={(e) => {
          this.setNewMarkerLocation(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
        }
      }
      >
        <Marker draggable
          coordinate={startLocation}
          title='Din plats'
          description={this.state.currentLocation}
        />
      </MapView>
    );
  }
}
