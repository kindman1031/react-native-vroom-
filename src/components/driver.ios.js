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
import carImg from '../assets/car.png';
import { menuItems } from '../data.service';

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



class Driver extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          selected: -1,
        };
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
                <View style={styles.content} key={1}>
                    <View style={styles.scrollHeader}>
                        
                        <Image source={carImg}
                                style={styles.inlineImgCar} />
                        
                        <View style={styles.headerInfo} key={1}>
                            <Text style={styles.driverInput} key={0}>
                            Pick a driver
                            </Text>
                        </View>
                        
                    </View>
                    <View style={styles.line}>
                    </View>
                    <ScrollView style={styles.scroll}>
                        {menuItems.map((item, idx) => (
                            <View style={styles.driverinfoP}>
                                <View style={styles.driverinfo}>
                                    <Image source={{ uri: item.thumb}} style={styles.listItemImage} />
                                    <View style={styles.listItemInfo}>
                                        <Text style={styles.listItemName}>Paige Hawkins</Text>
                                        <Text style={styles.listItemJob}>Sophomore Mechanical Engineering</Text>
                                        <Text style={styles.listItemMail}>p.hawkins2016@gmail.com</Text>
                                        <Text style={styles.listItemPhone}>240-997-2231</Text>
                                        <Text style={styles.listItemComment}>The saddest thing in life is wasted talent</Text>
                                    </View>
                                </View>
                                <View style={styles.line}>
                                </View>
                            </View>
                        
                        ))}
                    </ScrollView>
                </View>
                {/* <View style={styles.header} key={2}>
                    <TouchableHighlight
                        underlayColor="#B5B5B5"
                        onPress={() => Actions.driver()}
                    >
                        <Text style={styles.headerTitle}>Next</Text>    
                    </TouchableHighlight>
                </View> */}
            </View>

            
        );
    }
}



  const styles = StyleSheet.create({
    drawer: {
      flex: 1,
      backgroundColor: '#f1f4f4'
    },
    header: {
      
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'center',
      
    },
    scrollHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:10,
      },
    line: {
        borderBottomWidth: 2,
        borderBottomColor: '#94d9f6',
        width:DEVICE_WIDTH*3/4,
        marginBottom: 10,
    },
    scroll: {
        backgroundColor: '#dcdcdf',
        paddingTop: 10,
        marginBottom: 20
    },
    content: {
      justifyContent:'center',
      alignItems:'center',
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
    driverInput: {
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#a7a7a7',
        paddingLeft: 5,
        paddingTop: 5,
        backgroundColor: 'white',
        width: DEVICE_WIDTH*2/3,
        marginLeft: 30,
      },
    driverinfo: {
        flexDirection:'row',
        paddingTop: 0,
        marginBottom: 10,
        marginTop: 0,
        alignItems: 'center',
    },
    driverinfoP: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 50,
      marginBottom: 10
    },
    listItemTitle: {
      fontSize: 18,
      flexShrink: 1,
    },
    listItemImage: {
      width: DEVICE_WIDTH/7,
      height: DEVICE_WIDTH/7,
      marginRight: 10,
      resizeMode: 'stretch'
    },
    listItemInfo: {
        width: DEVICE_WIDTH*9/13,
        borderWidth: 3,
        borderColor: '#ff9300',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white'
      },
    inlineImg: {
		width: 100,
        height: 30,
        resizeMode: 'stretch'
    },
    inlineImgCar: {
		width: 40,
        height: 40,
        resizeMode: 'stretch'
    },
    listItemName: {
        color: '#838787',
        fontSize: 16,
    },
    listItemJob: {
		color: '#212121',
        fontSize: 13,
    },
    listItemMail: {
		color: '#9ad2ed',
        fontSize: 12,
    },
    listItemPhone: {
		color: '#7e57c2',
        fontSize: 12,
    },
    listItemComment: {
		color: '#212121',
        fontSize: 12,
    },
    next: {
        fontSize: 30
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
