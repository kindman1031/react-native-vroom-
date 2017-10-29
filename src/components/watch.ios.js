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
import carImg from '../assets/watch.png';
import nextImg from '../assets/next.png';
import starImg from '../assets/star.png';
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



class Watch extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          selected: -1,
          user: this.props.auth.user,
          watchList: this.props.auth.watch.watchList, 
          isBusy: false, 
        };
    }
    next() {
		if(this.state.selected==-1){			
			alert("Please select your watch");
		}
		else{
            this.props.actions.Auth.nexttoMusic(this.state.selected, () => {
				this.setState({isBusy: false});
			})
		}
		
      }
    renderWatchList() {
        var list = [];
        
        _.map(this.state.watchList, (obj, key) => {
            var list_Star = [];
            for (var i = 0; i < obj.ratings; i++) {
                list_Star.push(
                    <Image source={ starImg } style={styles.star} key={i} />
                )
            }
            list.push(
                <View style={styles.driverinfoP} key={key}>
                    <TouchableOpacity
                            onPress={() => this.setState({selected:key})}
                        >
                        <View style={styles.driverinfo}>
                        
                            <Image style={styles.listItemImage} />
                            <View style={[styles.listItemInfo, {backgroundColor: this.state.selected == key ?'yellow' :'white'}]}>
                                <Text style={styles.listItemJob}>{obj.title}</Text>
                                <Text style={styles.listItemMail}>{obj.description}</Text>
                                
                                <View style={{flexDirection:'row'}}>
                                    {list_Star}
                                </View>
                            </View>
                            
                        </View>
                    </TouchableOpacity> 
                    <View style={styles.line}>
                    </View>
                </View>
            )
            
        })
        return list;
    }
    render() {

        return (
            <View style={styles.drawer}>
                <View style={styles.header} key={0}>
                    
                    <Image source={logoImg}
							style={styles.inlineImg} />
                    
                    <View style={styles.headerInfo} key={1}>
                        <Text style={styles.headerTitle} key={0}>
                        Welcome {this.state.user.fname}
                        </Text>
                    </View>
                </View>
                <View style={styles.content} key={1}>
                    <View style={styles.scrollHeader}>
                        
                        <Image source={carImg}
                                style={styles.inlineImgCar} />
                        
                        <View style={styles.headerInfo} key={1}>
                            <Text style={styles.driverInput} key={0}>
                            What are you watching?
                            </Text>
                        </View>
                        
                    </View>
                    <View style={styles.line}>
                    </View>
                    <ScrollView style={styles.scroll}>
                        {
                            // console.log("asd",this.state.driverList)
                            
                            this.renderWatchList()
                        }
                    </ScrollView>
                    <TouchableOpacity
                            onPress={() => this.setState({selected:-2})}
                        >
                        
                        <View style={[styles.driverSelect, {backgroundColor: this.state.selected == -2 ?'yellow' :'white'}]} key={-2}>
                            <Text style={styles.choice}>Drivers Choice</Text>
                        </View>
                            
                        
                    </TouchableOpacity> 
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
      backgroundColor: '#f1f4f4'
    },
    header: {
      
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'center',
      
    },
    bottom: {
        
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-end',
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
        backgroundColor: '#f1f4f4',
        paddingTop: 10,
        marginBottom: 0
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
      width: DEVICE_WIDTH*2/6,
      height: DEVICE_WIDTH/6,
      marginRight: 10,
      resizeMode: 'stretch'
    },
    star: {
        width: 10,
        height: 10,
        resizeMode: 'stretch'
      },
    listItemInfo: {
        width: DEVICE_WIDTH*7/13,
        borderWidth: 3,
        borderColor: '#ff9300',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10
      },
    driverSelect: {
        marginTop: 10,
        width: DEVICE_WIDTH*9/10,
        borderWidth: 3,
        borderColor: '#ff9300',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        paddingTop: 1,
        paddingBottom: 1
    },
    inlineImg: {
		width: 100,
        height: 25,
        resizeMode: 'stretch'
    },
    inlineImgCar: {
		width: 60,
        height: 30,
        resizeMode: 'stretch'
    },
    listItemJob: {
		color: '#838787',
        fontSize: 13,
    },
    listItemMail: {
		color: '#838787',
        fontSize: 12,
    },
    listItemPhone: {
		color: '#838787',
        fontSize: 12,
    },
    choice: {
        color: '#838787',
        fontSize: 20,
    },
    next: {
        width: 100,
        height: 25,
        resizeMode: 'stretch',
        marginRight: 20
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
