import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

import { Colors, Device, FontSize, PaddingSize } from '../lib/device-info';
import MapView from 'react-native-maps';

// map redux store to props
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

// map actions to props
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            Auth: bindActionCreators(AuthAction, dispatch),
        }
    }
}



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            pressed_mapRegion: null,
            pressed_lastLat: null,
            pressed_lastLong: null,
        }
    }
    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            // If there are no new values set the current ones
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }
    onMapPress(e) {
        let region = {
          latitude:       e.nativeEvent.coordinate.latitude,
          longitude:      e.nativeEvent.coordinate.longitude,
        }
        this.setState({
            pressed_mapRegion: region,
            // If there are no new values set the current ones
            pressed_lastLat: region.latitude || this.state.pressed_lastLat,
            pressed_lastLong: region.longitude || this.state.pressed_lastLong
        });
        alert(this.state.lastLat);
    }
    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
            latitude:       position.coords.latitude,
            longitude:      position.coords.longitude,
            latitudeDelta:  0.00922*1.5,
            longitudeDelta: 0.00421*1.5
            }
            
            this.onRegionChange(region, region.latitude, region.longitude);
        });
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.button_container}>				
						<View style={styles.buttonL}>
							<Text>Please select your destination</Text>
						</View>
				</View>
                <MapView
                style={styles.map}
                region={this.state.mapRegion}
                showsUserLocation={true}
                followUserLocation={true}
                onRegionChange={this.onRegionChange.bind(this)}
                onPress = {this.onMapPress.bind(this)}
                >
                    <MapView.Marker
                    coordinate={{
                        latitude: (this.state.lastLat + 0.00050) ,
                        longitude: (this.state.lastLong + 0.00050) ,
                    }}>
                    <View>
                        
                    </View>
                    </MapView.Marker>
                    <MapView.Marker
                    coordinate={{
                        latitude: (this.state.pressed_lastLat + 0.0000) ,
                        longitude: (this.state.pressed_lastLong + 0.0000) ,
                    }}/>
                    
                </MapView>
                <View style={styles.button_container}>
				
						<TouchableOpacity style={styles.buttonL}>
							<Text style={styles.text} onPress={() => Actions.driver()}>Next</Text>
						</TouchableOpacity>
						
					
				</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
    },
    map: {
        flex: 7,
    },
    button_container: {
		flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 15
	},
	buttonL: {
		alignItems:'center',
		justifyContent: 'center',
		backgroundColor: '#00c3ff',
		height: 40,
		borderRadius: 20,
		paddingLeft:20,
		paddingRight:20,
		marginRight:10,
	},
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
