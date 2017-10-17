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
    TouchableHighlight,
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

import { Colors, Device, FontSize, PaddingSize } from '../lib/device-info';

import logoImg from '../assets/logo.png';
import { menuItems } from '../data.service';
import MapView from 'react-native-maps';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

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



class Result extends Component {
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
            <View style={styles.drawer}>
                <View style={styles.header} key={0}>
                    
                    <Image source={logoImg}
							style={styles.inlineImg} />
                    
                    <View style={styles.headerInfo} key={1}>
                        <Text style={styles.headerTitle} key={0}>
                        Welcome passenger
                        </Text>
                    </View>
                </View>
                <View style={styles.scrollHeader}>
                        
                        <View style={styles.vrsoundtitle}>
                            <Text style={styles.choice}>We are on our way</Text>
                        </View>
                        <View style={styles.line}>
                        </View>  
                    </View>
                    
                <View style={styles.content} key={1}>
                    
                    <MapView
                    style={styles.map}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    onRegionChange={this.onRegionChange.bind(this)}
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
                    
                </View>

            </View>

            
        );
    }
}



  const styles = StyleSheet.create({
    drawer: {
      flex: 1,
      backgroundColor: '#f1f4f4',
    },
    header: {
      
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'center',
      
    },
    map: {
        flex: 7,
    },
    bottom: {
        
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems:'center',
        
      },
    scrollHeader: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:10,
      },
    line: {
        borderBottomWidth: 2,
        borderBottomColor: '#94d9f6',
        width:DEVICE_WIDTH*3/4,
        marginBottom: 10,
        marginTop: 10,
    },
    content: {
      justifyContent:'center',
    //   alignItems:'center',
      flex: 10,
    },
    headerTitle: {
      fontSize: 20,
      borderWidth: 1,
      borderColor: '#4472c4',
      paddingLeft: 5,
      paddingTop: 5,
      backgroundColor: '#c2c2c2',
    },
    vrsoundtitle: {
        marginTop: 10,
        width: DEVICE_WIDTH*9/10,
        borderWidth: 3,
        borderColor: '#ff9300',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        paddingTop: 1,
        paddingBottom: 1,
        paddingTop: 5,
        paddingBottom: 5
    },
    inlineImg: {
		width: 100,
        height: 25,
        resizeMode: 'stretch'
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Result);
