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
import carImg from '../assets/graph.png';
import nextImg from '../assets/submit.png';
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



class Music extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          selected: -1,
          user: this.props.auth.user,
          musicList: this.props.auth.music.musicList, 
          isBusy: false, 
        };
    }
    next() {
		if(this.state.selected==-1){			
			alert("Please select your music");
		}
		else{
            this.props.actions.Auth.nexttoFinal(this.state.selected, () => {
				this.setState({isBusy: false});
			})
		}
		
      }
    renderMusicList() {
        var list = [];
        
        _.map(this.state.musicList, (obj, key) => {
            list.push(
                
                <View style={styles.driverinfoP} key={key}>
                    <TouchableOpacity
                            onPress={() => this.setState({selected:key})}
                        >
                        <View style={styles.driverinfo}>
                        
                            <Image source={{ uri: obj.artwork}} style={styles.listItemImage} />
                            <View style={[styles.listItemInfo, {backgroundColor: this.state.selected == key ?'yellow' :'white'}]}>
                                <Text style={styles.listItemName}>{obj.audiotitle}</Text>
                                <Text style={styles.listItemSubtitle}>{obj.genre}</Text>
                                <Text style={styles.listItemDes}>{obj.description}</Text>
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
                            Pick your music?
                            </Text>
                        </View>
                        
                    </View>
                    <View style={styles.line}>
                    </View>
                    <View style={styles.vrsoundtitle}>
                            <Text style={styles.choice}>VR Soundtrack(Accompanying Track)</Text>
                    </View>
                    <ScrollView style={styles.scroll}>
                        {
                            // console.log("asd",this.state.driverList)
                            
                            this.renderMusicList()
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
    star: {
        width: 10,
        height: 10,
        resizeMode: 'stretch'
      },
      listItemImage: {
        width: DEVICE_WIDTH/7,
        height: DEVICE_WIDTH/7,
        marginRight: 10,
        resizeMode: 'stretch'
      },
      listItemInfo: {
          width: DEVICE_WIDTH*9/13,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: 'white'
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
        paddingBottom: 1,
        paddingTop: 5,
        paddingBottom: 5
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
    inlineImgCar: {
		width: 40,
        height: 40,
        resizeMode: 'stretch'
    },
    listItemName: {
        color: 'black',
        fontSize: 14,
    },
    listItemSubtitle: {
		color: '#838787',
        fontSize: 12,
    },
    listItemDes: {
		color: 'black',
        fontSize: 12,
    },
    choice: {
        color: '#838787',
        fontSize: 16,
    },
    next: {
        width: 100,
        height: 25,
        resizeMode: 'stretch',
        marginRight: 20
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Music);
