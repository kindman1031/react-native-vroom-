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
import handImg from '../assets/hand.png';
import arrImg from '../assets/arrow.png';
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



class Signup extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          selected: 1,
        };
    }
    render() {

        return (
            <View style={styles.drawer}>
                <View style={styles.header} key={0}>
                    
					<TouchableOpacity
                        onPress={() => Actions.login()}
                    >
					<View style={styles.headerInfo} key={1}>
						<Text style={styles.headerTitle} key={0}>
						Login
						</Text>
					</View>  
                    </TouchableOpacity>
                    
                </View>
				<View style={styles.scrollHeader}>
                        
					<Image source={carImg}
							style={styles.inlineImgCar} />
					
					<Text style={styles.driverInput} key={0}>
					VROOM TO DRIVE
					</Text>
			
				</View>
				<TouchableOpacity
						onPress={() => this.setState({selected:1})}
					>
					<View style={styles.scrollHeader}>
						
							<Text style={[styles.signLabel,{color: this.state.selected == 1 ?'green' :'white'}]} key={0}>
								Signup
							</Text>
							<Image source={arrImg}
									style={styles.inlineImgArr} />
						
						
						
						
				
					</View>
				</TouchableOpacity>
				<View style={styles.line}>
				</View>
				<View style={styles.scrollHeader}>
					
					<Image source={handImg}
							style={styles.inlineImgHnad} />
					
					<Text style={styles.driverInput} key={0}>
					VROOM TO RIDE
					</Text>
			
				</View>
				<TouchableOpacity
						onPress={() => this.setState({selected:2})}
					>
					<View style={styles.scrollHeader}>
						
							<Text style={[styles.signLabel,{color: this.state.selected == 2 ?'green' :'white'}]} key={0}>
								Signup
							</Text>
							<Image source={arrImg}
									style={styles.inlineImgArr} />
						
					</View>
				</TouchableOpacity>

                <View style={styles.content} key={1}>
					{this.state.selected == 1 && (
						<View>
						<View style={{flexDirection:'row'}}>
							<TextInput style={styles.firstname}
									placeholder='First Name'
							/>
							<TextInput style={styles.lastname}
								placeholder='Last Name'
							/>
						</View>
						<View style={{flexDirection:'row', marginTop: 10}}>
							<TextInput style={styles.title}
							placeholder='Title'
							/>
							<TextInput style={styles.major}
								placeholder='Major or Dept'
							/>
						</View>
						<View style={{flexDirection:'row', marginTop: 10}}>
							<TextInput style={styles.email}
									placeholder='Email'
							/>
							<TextInput style={styles.phone}
								placeholder='Phone'
							/>
						</View>
						<TextInput style={styles.pass}
							secureTextEntry={true}
							placeholder='Create Password'
						/>
						<TextInput style={styles.passagain}
							secureTextEntry={true}
							placeholder='Enter password again'
						/>
						</View>
					)}

					{this.state.selected == 2 && (
						<View>
						<View style={{flexDirection:'row'}}>
							<TextInput style={styles.firstname}
									placeholder='First Name'
							/>
							<TextInput style={styles.lastname}
								placeholder='Last Name'
							/>
						</View>
						<View style={{flexDirection:'row', marginTop: 10}}>
							<TextInput style={styles.email}
									placeholder='Email'
							/>
							<TextInput style={styles.phone}
								placeholder='Phone'
							/>
						</View>
						<TextInput style={styles.pass}
							secureTextEntry={true}
							placeholder='Create Password'
						/>
						<TextInput style={styles.passagain}
							secureTextEntry={true}
							placeholder='Enter password again'
						/>
						</View>
					)}
						
                    
                    
                </View>
                <View style={styles.bottom} key={2}>
                    <TouchableOpacity
                        onPress={() => Actions.login()}
                    >
                        <Image source={nextImg}
							style={styles.next} />   
                    </TouchableOpacity>
                </View> 
            </View>

            
        );
    }
}



  const styles = StyleSheet.create({
    drawer: {
      flex: 1,
	  backgroundColor: '#f1f4f4',
	  justifyContent:'center',
	  alignItems: 'center'
    },
    header: {
      
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      justifyContent:'flex-end',
	  alignItems:'center',
	  alignSelf: 'flex-end'
      
    },
    bottom: {
        
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
		alignSelf: 'flex-start',
		marginBottom: 40,
      },
    scrollHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
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
	  backgroundColor: '#f1f4f4',
	  color: '#838787'
    },
    driverInput: {
        fontSize: 20,
        paddingLeft: 5,
        paddingTop: 5,
        backgroundColor: '#fdcb56',
        marginLeft: 30,
	  },
	  signLabel: {
        fontSize: 15,
        paddingLeft: 5,
        paddingTop: 5,
        backgroundColor: '#f1f4f4',
		marginLeft: 30,
		color: 'white'
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
		width: 50,
        height: 40,
        resizeMode: 'stretch'
	},
	inlineImgHnad: {
		width: 40,
        height: 40,
        resizeMode: 'stretch'
	},
	inlineImgArr: {
		width: 20,
        height: 20,
		resizeMode: 'stretch',
		marginLeft: 30,
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
        height: 30,
        resizeMode: 'stretch',
        marginLeft: 30
	},
	firstname: {
        width: DEVICE_WIDTH*0.4,
		height: 40,
		borderWidth: 1,
		borderColor: '#ff9300',
		marginRight: 10,
	},
	lastname: {
        width: DEVICE_WIDTH*0.4,
		height: 40,
		borderWidth: 1,
        borderColor: '#ff9300',
	},
	title: {
        width: DEVICE_WIDTH*0.2,
		height: 40,
		borderWidth: 1,
		borderColor: '#ff9300',
		marginRight: 10,
	},
	major: {
        width: DEVICE_WIDTH*0.6,
		height: 40,
		borderWidth: 1,
        borderColor: '#ff9300',
	},
	email: {
        width: DEVICE_WIDTH*0.5,
		height: 40,
		borderWidth: 1,
		borderColor: '#ff9300',
		marginRight: 10,
	},
	phone: {
        width: DEVICE_WIDTH*0.3,
		height: 40,
		borderWidth: 1,
        borderColor: '#ff9300',
	},
	pass: {
		marginTop: 10,
        width: DEVICE_WIDTH*0.6,
		height: 40,
		borderWidth: 1,
		borderColor: '#ff9300',
		alignSelf: 'flex-start'
	},
	passagain: {
		marginTop: 10,
        width: DEVICE_WIDTH*0.7,
		height: 40,
		borderWidth: 1,
		borderColor: '#ff9300',
		alignSelf: 'flex-start'
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
