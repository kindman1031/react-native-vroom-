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
    ActivityIndicator
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

import { Colors, Device, FontSize, PaddingSize } from '../lib/device-info';

import logoImg from '../assets/logo.png';
import carImg from '../assets/car.png';
import nextImg from '../assets/next.png';
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



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            pressed_mapRegion: null,
            pressed_lastLat: null,
            pressed_lastLong: null,
            destination: '',
            isBusy: false,
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

    next() {
		if(this.state.destination==null || this.state.destination==''){			
			alert("Please enter your destination");
		}
		else{
            this.props.actions.Auth.next(this.state.destination, () => {
				this.setState({isBusy: false});
			})
		}
		
	  }
    render() {

        return (
            <View style={styles.drawer}>
                <View style={styles.header} key={0}>
                    
                    <Image source={logoImg}
							style={styles.inlineImg} />
                    
                    <View style={styles.headerInfo} key={1}>
                        
                        <Text style={styles.headerTitle} key={0}>
                        gggwwwWelcome {this.state.user.fname}
                        </Text>
                    </View>
                </View>
                <View style={styles.scrollHeader}>
                        
                        <View style={styles.vrsoundtitle}>
                            <Image source={carImg}
                                style={styles.inlineImgCar} />
                            <TextInput style={styles.choice}
                                placeholder='wwwWhere are you goingggggg?'
                                value={this.state.username}
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='done'
                                onChangeText={(value)=>this.setState({destination: value})}
                            />
                            
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
                    
                </View>
                <View style={styles.bottom} key={2}>
                    <TouchableOpacity
                        onPress={() => this.next()}
                    >
                        <Image source={nextImg}
							style={styles.next} />   
                    </TouchableOpacity>
                </View> 
                {
					this.state.isBusy &&
					<ActivityIndicator
						animating={true}
						style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(250,250,250,0.7)'}}
					/>
				}
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
        marginTop: 2,
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
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        width: DEVICE_WIDTH*9/10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        paddingTop: 1,
        paddingBottom: 1,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#f1f4f4',
    },
    inlineImg: {
		width: 100,
        height: 25,
        resizeMode: 'stretch'
    },
    choice: {
        backgroundColor: '#f1f4f4',
        fontSize: 16,
    },
    inlineImgCar: {
		width: 50,
        height: 40,
        resizeMode: 'stretch',
        marginRight: 20,
    },
    next: {
        width: 100,
        height: 25,
        resizeMode: 'stretch',
        marginRight: 20
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);

